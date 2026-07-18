import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import {
  MessageSquare, Headphones, ArrowRight, ChevronDown,
  Clock, Globe, Zap, Send, CheckCircle2, Mail,
  MapPin, MessageCircle, Bot, Star, Phone,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import Toast from './Toast';
import Footer from './Footer';

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

function RevealBlock({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════ */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className={`mb-6 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
                <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
                Contact
              </span>
            </div>

            <div className={`mb-8 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="heading-xl text-deep-black mb-6">
                Let's build your AI workforce{' '}
                <span className="text-royal-blue">together.</span>
              </h1>
              <p className="text-body max-w-lg">
                Our sales, support, and enterprise teams are ready to help you deploy intelligent AI agents for your business.
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="#" className="btn-primary text-base px-8 py-3.5">
                Book a Demo
                <svg className="h-4 w-4 ml-1.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a href="#" className="btn-secondary text-base px-8 py-3.5">
                Contact Sales
              </a>
            </div>
          </div>

          {/* Right — AI Communication Illustration */}
          <div className={`transition-all duration-900 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative">
              {/* Soft background glow */}
              <div className="absolute inset-0 -m-8 bg-royal-blue/[0.06] rounded-full blur-[80px] pointer-events-none" />

              {/* Main glass container */}
              <div className="relative rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-2xl shadow-royal-blue/[0.08] p-6 md:p-8 overflow-hidden">
                {/* Subtle inner glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-royal-blue-light/[0.08] rounded-full blur-[60px] pointer-events-none" />

                {/* Chat header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-royal-blue to-royal-blue-light flex items-center justify-center shadow-lg shadow-royal-blue/20">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-deep-black">Nagriva AI</p>
                    <p className="text-xs text-emerald-600 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online — typically replies instantly
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-royal-blue/[0.06] flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-royal-blue" />
                  </div>
                </div>

                {/* Chat messages */}
                <div className="space-y-4 mb-6">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] px-4 py-3 bg-royal-blue text-white rounded-2xl rounded-br-md text-sm leading-relaxed shadow-lg shadow-royal-blue/10">
                      Hi! I need help setting up AI agents for my support team.
                    </div>
                  </div>

                  {/* AI response */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl rounded-bl-md text-sm leading-relaxed">
                      Of course! I can help you deploy intelligent agents in minutes. What channel would you like to start with?
                    </div>
                  </div>

                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] px-4 py-3 bg-royal-blue text-white rounded-2xl rounded-br-md text-sm leading-relaxed shadow-lg shadow-royal-blue/10">
                      WhatsApp and web chat to start.
                    </div>
                  </div>

                  {/* AI response */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl rounded-bl-md text-sm leading-relaxed">
                      Great choice! I'll configure both channels for you now. Your agents will be live in under 5 minutes.
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex justify-start">
                    <div className="px-4 py-3 bg-gray-100 rounded-2xl rounded-bl-md flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-sm text-gray-400 flex-1">Type your message...</span>
                  <div className="h-8 w-8 rounded-lg bg-royal-blue flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-95">
                    <Send className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating notification — top right */}
              <div className="absolute -top-3 -right-3 md:-right-6 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/50 p-3 hidden md:block" style={{ animation: 'aboutFloat 4s ease-in-out infinite' }}>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-deep-black">Agent Online</p>
                    <p className="text-[10px] text-gray-500">Ready to assist</p>
                  </div>
                </div>
              </div>

              {/* Floating notification — bottom left */}
              <div className="absolute -bottom-3 -left-3 md:-left-6 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/50 p-3 hidden md:block" style={{ animation: 'aboutFloatSlow 5s ease-in-out infinite' }}>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-royal-blue/[0.06] flex items-center justify-center">
                    <Star className="h-4 w-4 text-royal-blue" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-deep-black">CSAT 4.9/5</p>
                    <p className="text-[10px] text-gray-500">2,000+ reviews</p>
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

/* ═══════════════════════════════════════════
   SECTION 2 — CONTACT OPTIONS
   ═══════════════════════════════════════════ */

const contactOptions = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Sales',
    description: 'Get pricing, custom quotes, and discuss how Nagriva fits your business needs.',
    response: 'Avg. response: 2 hours',
    cta: 'Contact Sales',
    href: '#contact-form-section',
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: 'Support',
    description: 'Get help with setup, troubleshooting, integrations, and technical questions.',
    response: 'Avg. response: 15 min',
    cta: 'Get Support',
    href: '#/help-center',
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'WhatsApp',
    description: 'Chat with us directly on WhatsApp for quick answers and real-time assistance.',
    response: 'Available now',
    cta: 'Chat on WhatsApp',
    href: 'https://wa.me/212728427278',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email',
    description: "Send us a detailed message and we'll get back to you within 24 hours.",
    response: 'Reply within 24h',
    cta: 'Send Email',
    href: 'mailto:Redwanaitlhadj16@gmail.com',
  },
];

function ContactOptionsSection() {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-24 lg:py-20">
      <div className="container-max">
        <div className="text-center mb-12 md:mb-16">
          <RevealBlock>
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-4 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              How can we help?
            </span>
            <h2 className="heading-lg text-deep-black mb-4">
              Get in touch
            </h2>
            <p className="text-body max-w-2xl mx-auto">Choose the right channel for your needs.</p>
          </RevealBlock>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {contactOptions.map((option, i) => (
            <RevealBlock key={option.title} delay={i * 80}>
              <div className="group h-full rounded-[20px] border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/25 hover:shadow-xl hover:shadow-royal-blue/[0.06] hover:-translate-y-1 cursor-pointer flex flex-col">
                <div className="h-12 w-12 rounded-2xl bg-royal-blue/[0.06] flex items-center justify-center text-royal-blue mb-4 transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-105">
                  {option.icon}
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-2">{option.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{option.description}</p>
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-gray-500">{option.response}</span>
                </div>
                <a
                  href={option.href}
                  {...(option.target ? { target: option.target } : {})}
                  {...(option.rel ? { rel: option.rel } : {})}
                  onClick={(e) => {
                    if (option.href === '#contact-form-section') {
                      e.preventDefault();
                      document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-medium text-deep-black transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:border-royal-blue"
                >
                  {option.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — CONTACT FORM + INFO
   ═══════════════════════════════════════════ */

function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToast({ message: 'Please fill in all required fields.', type: 'error' });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('contact_messages').insert({
      full_name: formData.name.trim(),
      business_email: formData.email.trim(),
      company: formData.company.trim() || null,
      message: formData.message.trim(),
    });

    setLoading(false);

    if (error) {
      console.error('Contact form submission error:', error);
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      return;
    }

    setToast({ message: 'Message sent successfully! We\'ll get back to you within 24 hours.', type: 'success' });
    setFormData({ name: '', email: '', company: '', message: '' });
    setSubmitted(true);
  };

  return (
    <section id="contact-form-section" className="section-padding bg-gray-50/50 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(30,64,175,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-max relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <RevealBlock>
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-4 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Send a Message
            </span>
            <h2 className="heading-lg text-deep-black mb-4">
              Let's start a conversation
            </h2>
            <p className="text-body max-w-2xl mx-auto">Fill out the form and our team will get back to you within 24 hours.</p>
          </RevealBlock>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3">
            <RevealBlock>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-lg shadow-gray-200/40">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-deep-black mb-2">Message Sent!</h3>
                    <p className="text-sm text-gray-500 mb-6">We've received your message and will get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', company: '', message: '' }); }}
                      className="btn-primary text-sm px-6 py-3"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text" name="name" required value={formData.name} onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Email *</label>
                        <input
                          type="email" name="email" required value={formData.email} onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text" name="company" value={formData.company} onChange={handleChange}
                        placeholder="Acme Inc."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea
                        name="message" required rows={4} value={formData.message} onChange={handleChange}
                        placeholder="Tell us about your needs..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-deep-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/10 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 px-8 bg-royal-blue text-white font-medium rounded-xl transition-all duration-300 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98] text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-royal-blue disabled:hover:shadow-none disabled:active:scale-100"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </RevealBlock>
          </div>

          {/* Info sidebar — Glass card */}
          <div className="lg:col-span-2">
            <RevealBlock delay={100}>
              <div className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-8 shadow-lg shadow-gray-200/40 h-full flex flex-col">
                <h3 className="text-sm font-semibold text-deep-black mb-6">Quick Info</h3>

                <div className="space-y-5 flex-1">
                  {[
                    { icon: <Zap className="h-4 w-4" />, label: 'Average Response Time', value: '< 15 minutes', color: 'text-royal-blue' },
                    { icon: <Clock className="h-4 w-4" />, label: 'Business Hours', value: 'Mon–Fri, 9AM–6PM PST' },
                    { icon: <Globe className="h-4 w-4" />, label: 'Languages Supported', value: '50+ languages' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-royal-blue/[0.06] flex items-center justify-center text-royal-blue shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                        <p className={`text-sm font-medium ${item.color || 'text-deep-black'}`}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 my-6" />

                <div className="space-y-4">
                  {[
                    { icon: <Phone className="h-4 w-4" />, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/+212728427278' },
                    { icon: <Mail className="h-4 w-4" />, label: 'Email', value: 'Redwanaitlhadj16@gmail.com', href: 'mailto:support@nagriva.ai' },
                    { icon: <MapPin className="h-4 w-4" />, label: 'Location', value: 'Morocco, AZ', href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 group/item">
                      <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 transition-colors duration-200 group-hover/item:bg-royal-blue/[0.06] group-hover/item:text-royal-blue">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-medium text-royal-blue hover:underline">{item.value}</a>
                        ) : (
                          <p className="text-sm font-medium text-deep-black">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 — FAQ
   ═══════════════════════════════════════════ */

const faqData = [
  {
    q: 'How quickly will I receive a response?',
    a: 'Our average response time is under 15 minutes for technical support and under 2 hours for sales inquiries. Enterprise customers with SLA agreements receive even faster response times.',
  },
  {
    q: 'Can I schedule a demo before purchasing?',
    a: 'Absolutely! We offer free, no-obligation demos tailored to your industry and use case. Our team will walk you through the platform and show you exactly how Nagriva can benefit your business.',
  },
  {
    q: 'Is there a free trial available?',
    a: 'Yes! We offer a 14-day free trial on all plans, no credit card required. This gives you full access to explore all features before making a commitment.',
  },
  {
    q: 'What languages do you support?',
    a: 'Our AI agents support over 50 languages natively. Our human support team can assist in English, Spanish, French, German, Portuguese, Mandarin, Japanese, and Arabic.',
  },
  {
    q: 'How do I get enterprise-level support?',
    a: 'Contact our sales team or click "Contact Sales" above. We\'ll discuss your requirements and set up a dedicated account team, custom SLA, and priority onboarding for your organization.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-16 md:px-12 lg:px-24 lg:py-20">
      <div className="container-max">
        <div className="text-center mb-12">
          <RevealBlock>
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-4 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              FAQ
            </span>
            <h2 className="heading-lg text-deep-black mb-4">
              Frequently asked questions
            </h2>
            <p className="text-body max-w-2xl mx-auto">Quick answers to common questions.</p>
          </RevealBlock>
        </div>

        <RevealBlock>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-3">
              {faqData.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-300 ${
                    openIndex === i
                      ? 'border-royal-blue/20 bg-white shadow-lg shadow-royal-blue/[0.06]'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-[15px] font-semibold text-deep-black pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                        openIndex === i ? 'rotate-180 text-royal-blue' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5 — FINAL CTA
   ═══════════════════════════════════════════ */

function FinalCTASection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,64,175,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-max relative z-10">
        <div className="relative rounded-[20px] overflow-hidden bg-deep-black p-10 md:p-16">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-royal-blue/[0.08] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-royal-blue-light/[0.06] rounded-full blur-[100px] pointer-events-none" />

          <div ref={ref} className={`relative text-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-5">
              Let's Build Your AI Workforce{' '}
              <span className="text-royal-blue-light">Together.</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
              Ready to transform your business with intelligent AI agents? Get started today or talk to our team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-deep-black font-medium rounded-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-lg active:scale-[0.98]">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white border border-white/15 font-medium rounded-xl transition-all duration-300 hover:bg-white/15 hover:border-white/25 active:scale-[0.98]">
                Start Free
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-white/30" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-white/30" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-white/30" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */

export default function ContactPage() {
  return (
    <>
      <main>
        <HeroSection />
        <ContactOptionsSection />
        <ContactFormSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
