import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import {
  ArrowRight,
  Pen,
  CheckCircle2,
  Send,
  User,
  Users,
  Eye,
  Link2,
  BookOpen,
  Rocket,
  Globe,
  Star,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import Toast from './Toast';
import Footer from './Footer';

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function RevealBlock({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const inputClass = 'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10';

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function ContributorsPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Become a Contributor | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Share your expertise with thousands of readers. Apply to become a Nagriva contributor and help businesses learn about AI, SaaS, automation, and business growth.');
  }, []);

  return (
    <>
      <main>
        <HeroSection />
        <BenefitsSection />
        <ApplicationFormSection onSubmit={() => setSubmitted(true)} submitted={submitted} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

/* ─── Section 1 — Hero ────────────────────────────────────────────────── */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-royal-blue-light/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className={`mb-6 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
                <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
                Contributors Program
              </span>
            </div>

            <div className={`mb-8 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h1 className="heading-xl text-deep-black mb-6">
                Become a{' '}
                <span className="text-royal-blue">Nagriva Contributor</span>
              </h1>
              <p className="text-body max-w-lg">
                Share your expertise with thousands of readers and help businesses learn about AI, SaaS, automation, software engineering and business growth.
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a href="#apply-form" className="btn-primary text-base px-8 py-3.5 gap-2">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#benefits" className="btn-secondary text-base px-8 py-3.5">
                See Benefits
              </a>
            </div>
          </div>

          {/* Right — Illustration */}
          <div className={`transition-all duration-900 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative">
              <div className="absolute inset-0 -m-8 bg-royal-blue/[0.06] rounded-full blur-[80px] pointer-events-none" />

              <div className="relative rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-2xl shadow-royal-blue/[0.08] p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-royal-blue-light/[0.08] rounded-full blur-[60px] pointer-events-none" />

                {/* Article preview card */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center shadow-lg shadow-royal-blue/20">
                      <Pen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-deep-black">Write & Publish</p>
                      <p className="text-xs text-emerald-600 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Contributors Program — Open
                      </p>
                    </div>
                  </div>

                  {/* Article mock */}
                  <div className="rounded-xl border border-gray-100 bg-white p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-royal-blue/[0.06] text-[10px] font-bold text-royal-blue tracking-wider uppercase">AI</span>
                      <span className="text-xs text-gray-400">5 min read</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded-full w-full" />
                      <div className="h-3 bg-gray-200 rounded-full w-4/5" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 bg-gray-100 rounded-full w-full" />
                      <div className="h-2 bg-gray-100 rounded-full w-full" />
                      <div className="h-2 bg-gray-100 rounded-full w-3/4" />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="h-6 w-6 rounded-full bg-royal-blue/10 flex items-center justify-center text-[8px] font-bold text-royal-blue">JD</div>
                      <span className="text-xs text-gray-500">Your Name</span>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Published', value: '120+' },
                      { label: 'Contributors', value: '45' },
                      { label: 'Readers', value: '50K+' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <p className="text-base font-bold text-deep-black">{stat.value}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 md:-right-6 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/50 p-3 hidden md:block" style={{ animation: 'aboutFloat 4s ease-in-out infinite' }}>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-royal-blue/10 flex items-center justify-center">
                    <Star className="h-4 w-4 text-royal-blue" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-deep-black">Top Quality</p>
                    <p className="text-[10px] text-gray-500">Editorial Review</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2 — Benefits ────────────────────────────────────────────── */

const benefits = [
  {
    icon: User,
    title: 'Build your personal brand',
    description: 'Establish yourself as a thought leader in AI, SaaS, and technology by publishing on a trusted platform.',
    color: 'text-royal-blue',
  },
  {
    icon: Eye,
    title: 'Reach thousands of readers',
    description: 'Your articles are seen by a growing audience of business leaders, developers, and tech enthusiasts worldwide.',
    color: 'text-emerald-500',
  },
  {
    icon: Star,
    title: 'Get featured on Nagriva',
    description: 'Selected articles are featured on our homepage, newsletter, and social media channels for maximum exposure.',
    color: 'text-amber-500',
  },
  {
    icon: Link2,
    title: 'High-quality backlinks',
    description: 'Every published article includes a bio with backlinks to your website, LinkedIn, or portfolio.',
    color: 'text-violet-500',
  },
  {
    icon: Users,
    title: 'Join the Contributors community',
    description: 'Connect with other expert writers, share insights, and collaborate on future content.',
    color: 'text-rose-500',
  },
  {
    icon: Rocket,
    title: 'Help businesses learn AI',
    description: 'Make a real impact by educating businesses on how to leverage AI for growth and efficiency.',
    color: 'text-sky-500',
  },
];

function BenefitsSection() {
  return (
    <section id="benefits" className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Rocket className="h-3.5 w-3.5" />
              Benefits
            </span>
            <h2 className="heading-lg text-deep-black mb-5">
              Why Contribute to Nagriva?
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Writing for Nagriva gives you visibility, credibility, and a chance to shape the conversation around AI and technology.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map((benefit, i) => (
            <RevealBlock key={benefit.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-royal-blue group-hover:text-white flex-shrink-0">
                  <benefit.icon className={`h-5 w-5 ${benefit.color} group-hover:text-white`} />
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{benefit.description}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3 — Application Form ────────────────────────────────────── */

interface FormState {
  full_name: string;
  email: string;
  linkedin: string;
  website: string;
  country: string;
  job_title: string;
  company: string;
  topics: string;
  bio: string;
  motivation: string;
  experience: string;
  portfolio: string;
  article_idea: string;
  confirm_original: boolean;
}

const initialForm: FormState = {
  full_name: '',
  email: '',
  linkedin: '',
  website: '',
  country: '',
  job_title: '',
  company: '',
  topics: '',
  bio: '',
  motivation: '',
  experience: '',
  portfolio: '',
  article_idea: '',
  confirm_original: false,
};

function ApplicationFormSection({ onSubmit, submitted }: { onSubmit: () => void; submitted: boolean }) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, confirm_original: e.target.checked }));
    if (errors.confirm_original) {
      setErrors((prev) => ({ ...prev, confirm_original: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.full_name.trim()) newErrors.full_name = 'Full name is required.';
    else if (form.full_name.trim().length > 100) newErrors.full_name = 'Full name must be 100 characters or fewer.';

    if (!form.email.trim()) newErrors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = 'Please enter a valid email address.';

    if (!form.linkedin.trim()) newErrors.linkedin = 'LinkedIn profile is required.';
    else if (form.linkedin.trim().length > 300) newErrors.linkedin = 'LinkedIn URL must be 300 characters or fewer.';

    if (form.website.trim() && form.website.trim().length > 300) newErrors.website = 'Website URL must be 300 characters or fewer.';

    if (!form.country.trim()) newErrors.country = 'Country is required.';

    if (!form.job_title.trim()) newErrors.job_title = 'Job title is required.';
    else if (form.job_title.trim().length > 100) newErrors.job_title = 'Job title must be 100 characters or fewer.';

    if (form.company.trim() && form.company.trim().length > 100) newErrors.company = 'Company name must be 100 characters or fewer.';

    if (!form.topics.trim()) newErrors.topics = 'Please tell us what topics you write about.';
    else if (form.topics.trim().length > 500) newErrors.topics = 'Topics must be 500 characters or fewer.';

    if (!form.bio.trim()) newErrors.bio = 'A short bio is required.';
    else if (form.bio.trim().length > 1000) newErrors.bio = 'Bio must be 1000 characters or fewer.';

    if (!form.motivation.trim()) newErrors.motivation = 'Please share why you want to contribute.';
    else if (form.motivation.trim().length > 1000) newErrors.motivation = 'Response must be 1000 characters or fewer.';

    if (!form.experience.trim()) newErrors.experience = 'Writing experience is required.';
    else if (form.experience.trim().length > 1000) newErrors.experience = 'Response must be 1000 characters or fewer.';

    if (form.portfolio.trim() && form.portfolio.trim().length > 500) newErrors.portfolio = 'Portfolio links must be 500 characters or fewer.';

    if (!form.article_idea.trim()) newErrors.article_idea = 'Please share at least one article idea.';
    else if (form.article_idea.trim().length > 1000) newErrors.article_idea = 'Response must be 1000 characters or fewer.';

    if (!form.confirm_original) newErrors.confirm_original = 'Please confirm your content is original.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const { error } = await supabase.from('contributor_applications').insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      linkedin: form.linkedin.trim(),
      website: form.website.trim() || null,
      country: form.country.trim(),
      job_title: form.job_title.trim(),
      company: form.company.trim() || null,
      topics: form.topics.trim(),
      bio: form.bio.trim(),
      motivation: form.motivation.trim(),
      experience: form.experience.trim(),
      portfolio: form.portfolio.trim() || null,
      article_idea: form.article_idea.trim(),
      status: 'pending',
    });

    setLoading(false);

    if (error) {
      console.error('Contributor application error:', error);
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      return;
    }

    setToast({ message: 'Application submitted successfully!', type: 'success' });
    onSubmit();
  };

  if (submitted) {
    return <SuccessScreen />;
  }

  return (
    <section id="apply-form" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(30,64,175,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-max relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <RevealBlock>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Send className="h-3.5 w-3.5" />
              Apply
            </span>
            <h2 className="heading-lg text-deep-black mb-5">
              Submit Your Application
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Tell us about yourself and your writing interests. We review every application personally.
            </p>
          </RevealBlock>
        </div>

        <RevealBlock>
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 md:p-10 shadow-lg shadow-gray-200/40">
              <div className="space-y-6">

                {/* Row: Full Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" required error={errors.full_name}>
                    <input type="text" name="full_name" value={form.full_name} onChange={handleChange} placeholder="John Doe" className={inputClass} />
                  </Field>
                  <Field label="Email Address" required error={errors.email}>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" className={inputClass} />
                  </Field>
                </div>

                {/* Row: LinkedIn + Website */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="LinkedIn Profile" required error={errors.linkedin}>
                    <input type="url" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/you" className={inputClass} />
                  </Field>
                  <Field label="Personal Website" optional error={errors.website}>
                    <input type="url" name="website" value={form.website} onChange={handleChange} placeholder="https://yoursite.com" className={inputClass} />
                  </Field>
                </div>

                {/* Row: Country + Job Title */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Country" required error={errors.country}>
                    <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Your country" className={inputClass} />
                  </Field>
                  <Field label="Job Title" required error={errors.job_title}>
                    <input type="text" name="job_title" value={form.job_title} onChange={handleChange} placeholder="e.g. AI Engineer" className={inputClass} />
                  </Field>
                </div>

                {/* Company */}
                <Field label="Company" optional error={errors.company}>
                  <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc." className={inputClass} />
                </Field>

                {/* Topics */}
                <Field label="Topics You Write About" required error={errors.topics}>
                  <input type="text" name="topics" value={form.topics} onChange={handleChange} placeholder="e.g. AI, SaaS, automation, business growth" className={inputClass} />
                  <p className="text-xs text-gray-400 mt-1.5">Comma-separated. e.g. AI, SaaS, automation, software engineering</p>
                </Field>

                {/* Bio */}
                <Field label="Short Bio" required error={errors.bio}>
                  <textarea name="bio" rows={3} value={form.bio} onChange={handleChange} placeholder="Tell us a bit about yourself and your expertise..." className={`${inputClass} resize-none`} />
                  <p className="text-xs text-gray-400 mt-1.5">{form.bio.length}/1000 characters</p>
                </Field>

                {/* Motivation */}
                <Field label="Why do you want to contribute?" required error={errors.motivation}>
                  <textarea name="motivation" rows={3} value={form.motivation} onChange={handleChange} placeholder="What motivates you to write for Nagriva?" className={`${inputClass} resize-none`} />
                  <p className="text-xs text-gray-400 mt-1.5">{form.motivation.length}/1000 characters</p>
                </Field>

                {/* Experience */}
                <Field label="Writing Experience" required error={errors.experience}>
                  <textarea name="experience" rows={3} value={form.experience} onChange={handleChange} placeholder="Describe your writing background, published articles, blogs, or publications..." className={`${inputClass} resize-none`} />
                  <p className="text-xs text-gray-400 mt-1.5">{form.experience.length}/1000 characters</p>
                </Field>

                {/* Portfolio */}
                <Field label="Portfolio Links" optional error={errors.portfolio}>
                  <textarea name="portfolio" rows={2} value={form.portfolio} onChange={handleChange} placeholder="Links to your published articles, blog, or writing portfolio..." className={`${inputClass} resize-none`} />
                  <p className="text-xs text-gray-400 mt-1.5">{form.portfolio.length}/500 characters</p>
                </Field>

                {/* Article Idea */}
                <Field label="Article Idea" required error={errors.article_idea}>
                  <textarea name="article_idea" rows={3} value={form.article_idea} onChange={handleChange} placeholder="Describe your proposed article topic, outline, or idea..." className={`${inputClass} resize-none`} />
                  <p className="text-xs text-gray-400 mt-1.5">{form.article_idea.length}/1000 characters</p>
                </Field>

                {/* Original Content Checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={form.confirm_original}
                        onChange={handleCheckbox}
                        className="peer sr-only"
                      />
                      <div className={`h-5 w-5 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                        form.confirm_original
                          ? 'bg-royal-blue border-royal-blue'
                          : errors.confirm_original
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300 bg-white group-hover:border-royal-blue/40'
                      }`}>
                        {form.confirm_original && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 leading-snug">
                      I confirm this content is original and I have the rights to publish it.
                    </span>
                  </label>
                  {errors.confirm_original && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.confirm_original}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-8 bg-royal-blue text-white font-medium rounded-xl transition-all duration-300 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98] text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-royal-blue disabled:hover:shadow-none disabled:active:scale-100"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </RevealBlock>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}

/* ─── Field Component ──────────────────────────────────────────────────── */

function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-deep-black mb-2">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
        {optional && <span className="text-gray-400 font-normal ml-1">(optional)</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Success Screen ───────────────────────────────────────────────────── */

function SuccessScreen() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(30,64,175,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-max relative z-10">
        <div ref={ref} className={`max-w-2xl mx-auto text-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 md:p-16 shadow-lg shadow-gray-200/40">

            {/* Green check icon */}
            <div className="mb-8">
              <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-deep-black mb-4 tracking-tight">
              Application Submitted Successfully
            </h2>

            {/* Description */}
            <div className="space-y-3 mb-8">
              <p className="text-[15px] text-gray-500 leading-relaxed">
                Thank you for applying to become a Nagriva Contributor.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                Our editorial team has received your application.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                Your application is currently under review.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                If approved, we'll contact you by email with the next steps.
              </p>
            </div>

            {/* Review time */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue mb-8">
              <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
              Estimated review time: 3–5 business days
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-royal-blue rounded-xl transition-all duration-300 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]"
              >
                <BookOpen className="h-4 w-4" />
                Back to Blog
              </a>
              <a
                href="#/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-600 bg-white rounded-xl border border-gray-200 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]"
              >
                <Globe className="h-4 w-4" />
                Return Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4 — CTA ─────────────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <h2 className="heading-lg text-deep-black mb-4">
                Share Your Expertise.{' '}
                <span className="text-royal-blue">Shape the Future.</span>
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Join a growing community of expert contributors helping businesses understand and leverage AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#apply-form" className="btn-primary text-base px-8 py-3.5 gap-2">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#benefits" className="btn-secondary text-base px-8 py-3.5">
                  View Benefits
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
