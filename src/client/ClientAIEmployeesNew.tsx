import { useState } from 'react';
import {
  ArrowLeft,
  Bot,
  Globe,
  MessageSquare,
  FileText,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import Toast from '../components/Toast';

/* ── Constants ── */

const MODELS = ['GPT-5.5', 'GPT-4.1', 'Claude', 'Gemini', 'DeepSeek'] as const;
const LANGUAGES = ['English', 'Arabic', 'French', 'Spanish', 'Auto Detect'] as const;

/* ── Types ── */

interface FormData {
  name: string;
  description: string;
  website: string;
  whatsapp: string;
  model: string;
  language: string;
  temperature: number;
  systemPrompt: string;
}

interface FormErrors {
  name?: string;
}

/* ── Helpers ── */

function goBack() {
  window.location.hash = '#/client-dashboard/ai-employees';
}

const INPUT_CLASS =
  'w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white';

const SELECT_CLASS =
  'w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-deep-black outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 focus:bg-white appearance-none';

/* ── Component ── */

export default function ClientAIEmployeesNew() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    website: '',
    whatsapp: '',
    model: MODELS[0],
    language: LANGUAGES[0],
    temperature: 0.7,
    systemPrompt: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function update(field: keyof FormData, value: string | number) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'name' && errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!formData.name.trim()) {
      next.name = 'AI Employee Name is required.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Not authenticated');

      const payload = {
        owner_id: user.id,
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        website: formData.website.trim() || null,
        whatsapp_number: formData.whatsapp.trim() || null,
        language: formData.language,
        model: formData.model,
        temperature: formData.temperature,
        system_prompt: formData.systemPrompt.trim() || null,
        status: 'active',
        service_id: null,
      };

      const { data, error: insertError } = await supabase
        .from('ai_employees')
        .insert(payload)
        .select();

      console.log('Payload:', payload);
      console.log('Data:', data);
      console.error('Supabase Error:', insertError);

      if (insertError) {
        alert(JSON.stringify(insertError, null, 2));
        throw insertError;
      }

      setToast({ message: 'AI Employee created successfully.', type: 'success' });
      setTimeout(() => { goBack(); }, 1000);
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Failed to create AI Employee.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {/* ── Header ── */}
      <section className="flex items-center justify-between gap-6 py-2 mb-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 text-gray-500 hover:text-deep-black hover:border-gray-300 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-deep-black tracking-tight mb-1">
              Create AI Employee
            </h1>
            <p className="text-[15px] text-gray-500">
              Create and configure a new AI employee for your business.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Card ── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 transition-all duration-300">

        {/* ── Section 1: Basic Information ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-blue/[0.06]">
              <Bot className="w-4 h-4 text-royal-blue" />
            </div>
            <h2 className="text-sm font-semibold text-deep-black">Basic Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <Bot className="w-3.5 h-3.5" />
                AI Employee Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="e.g. Sarah the Sales Assistant"
                className={INPUT_CLASS}
              />
              {submitted && errors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Website */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <Globe className="w-3.5 h-3.5" />
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => update('website', e.target.value)}
                placeholder="https://example.com"
                className={INPUT_CLASS}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" />
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Briefly describe what this AI employee does..."
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => update('whatsapp', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-gray-100 mb-10" />

        {/* ── Section 2: AI Configuration ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-blue/[0.06]">
              <Sparkles className="w-4 h-4 text-royal-blue" />
            </div>
            <h2 className="text-sm font-semibold text-deep-black">AI Configuration</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Model */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Model
              </label>
              <div className="relative">
                <select
                  value={formData.model}
                  onChange={(e) => update('model', e.target.value)}
                  className={SELECT_CLASS}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px',
                  }}
                >
                  {MODELS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Language
              </label>
              <div className="relative">
                <select
                  value={formData.language}
                  onChange={(e) => update('language', e.target.value)}
                  className={SELECT_CLASS}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px',
                  }}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Temperature */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Temperature
                </label>
                <span className="text-sm font-bold text-deep-black">{formData.temperature.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={formData.temperature}
                onChange={(e) => update('temperature', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-royal-blue"
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-gray-400">0.0 — Precise</span>
                <span className="text-[10px] text-gray-400">1.0 — Creative</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-gray-100 mb-10" />

        {/* ── Section 3: System Prompt ── */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-blue/[0.06]">
              <FileText className="w-4 h-4 text-royal-blue" />
            </div>
            <h2 className="text-sm font-semibold text-deep-black">System Prompt</h2>
          </div>

          <textarea
            rows={8}
            value={formData.systemPrompt}
            onChange={(e) => update('systemPrompt', e.target.value)}
            placeholder="You are a professional AI assistant.&#10;Help customers, answer questions and represent the business professionally."
            className={`${INPUT_CLASS} resize-none font-mono text-[13px] leading-relaxed`}
          />
          <p className="mt-2 text-xs text-gray-400">
            This prompt defines how your AI employee behaves and responds to customers.
          </p>
        </div>

        {/* ── Bottom Actions ── */}
        <div className="flex items-center justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={goBack}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Bot className="w-4 h-4" />
                Create AI Employee
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
