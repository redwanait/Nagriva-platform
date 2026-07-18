import { useState } from 'react';
import { Check, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses getting started with AI.',
      price: annual ? 49 : 59,
      features: [
        '1 AI Agent',
        '500 conversations/month',
        'Website widget',
        'Basic analytics',
        'Email support',
        'Knowledge base (100 items)',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'For growing businesses that need more power.',
      price: annual ? 149 : 179,
      features: [
        '5 AI Agents',
        '5,000 conversations/month',
        'WhatsApp + Messenger',
        'Advanced analytics',
        'Priority support',
        'Knowledge base (1,000 items)',
        'Human handoff',
        'Custom branding',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom requirements.',
      price: null,
      features: [
        'Unlimited agents',
        'Unlimited conversations',
        'All channels + API',
        'Custom analytics',
        'Dedicated support',
        'Unlimited knowledge base',
        'Human handoff + routing',
        'White-label option',
        'SLA guarantee',
        'SSO & SAML',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const trustItems = [
    { icon: '⭐⭐⭐⭐⭐', label: 'Rated 4.9/5' },
    { icon: <Shield className="w-4 h-4" />, label: '2,000+ Businesses' },
    { icon: <Zap className="w-4 h-4" />, label: '14-Day Free Trial' },
    { icon: <Check className="w-4 h-4" />, label: 'Cancel Anytime' },
  ];

  return (
    <section id="pricing" className="section-padding bg-gray-50/50 relative overflow-hidden">
      {/* Subtle blue radial gradient behind cards */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(30,64,175,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-royal-blue tracking-wide uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="heading-lg text-deep-black mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-body max-w-2xl mx-auto mb-10">
            Start free, scale as you grow. No hidden fees.
          </p>

          {/* iOS-style toggle */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full border border-gray-200/80 bg-white shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                !annual
                  ? 'bg-deep-black text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                annual
                  ? 'bg-deep-black text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Annual
              <span className="ml-1.5 inline-flex items-center text-[11px] font-bold text-emerald-500 tracking-wide">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card group relative rounded-2xl p-8 transition-all duration-500 ease-out cursor-default ${
                plan.popular
                  ? 'pricing-card-popular bg-white border-2 border-royal-blue/30 shadow-xl shadow-royal-blue/[0.08] lg:scale-[1.04] z-10'
                  : 'bg-white border border-gray-200/80 hover:border-gray-300'
              }`}
            >
              {/* Subtle glow behind popular plan */}
              {plan.popular && (
                <div
                  className="pointer-events-none absolute -inset-1 rounded-2xl opacity-60 blur-2xl"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(30,64,175,0.10) 0%, transparent 70%)',
                    zIndex: -1,
                  }}
                />
              )}

              {/* Best Value badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-royal-blue text-white text-xs font-semibold rounded-full shadow-lg shadow-royal-blue/25">
                    <Sparkles className="w-3.5 h-3.5" />
                    Best Value
                  </div>
                </div>
              )}

              {/* Plan name & description */}
              <div className="mb-8">
                <h3 className="text-base font-semibold text-deep-black mb-1.5">{plan.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                {plan.price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-[3.25rem] font-bold text-deep-black tracking-tight leading-none">
                      ${plan.price}
                    </span>
                    <span className="text-sm font-normal text-gray-400 ml-0.5">/month</span>
                  </div>
                ) : (
                  <div className="text-[3.25rem] font-bold text-deep-black tracking-tight leading-none">
                    Custom
                  </div>
                )}
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-400">
                  <Check className="w-3.5 h-3.5 text-gray-300" />
                  No credit card required
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                  <Check className="w-3.5 h-3.5 text-gray-300" />
                  Cancel anytime
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full group/btn flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                  plan.popular
                    ? 'bg-royal-blue text-white hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]'
                    : 'bg-deep-black text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-black/10 active:scale-[0.98]'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </button>

              {/* Features */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <ul className="space-y-0">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="group/feature flex items-start gap-3 py-2.5 px-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-gray-50/80"
                    >
                      <Check className="h-4.5 w-4.5 text-royal-blue flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-[13.5px] text-gray-600 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-sm text-gray-500"
            >
              <span className="flex items-center justify-center text-royal-blue">
                {item.icon}
              </span>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
