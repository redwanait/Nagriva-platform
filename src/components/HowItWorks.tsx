import { useInView } from '../hooks/useInView';

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, isInView } = useInView(0.15);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col how-it-works-card transition-all ease-out ${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDuration: '500ms', transitionDelay: `${index * 150}ms` }}
    >
      <div className="mb-8">
        <span className="how-it-works-number select-none leading-none">
          {step.step}
        </span>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue mb-7">
        {step.icon}
      </div>

      <h3 className="text-[22px] md:text-2xl font-semibold text-deep-black mb-3 tracking-tight leading-snug">
        {step.title}
      </h3>
      <p className="text-gray-500/90 leading-[1.7] mb-8 text-[15px]">
        {step.description}
      </p>

      <div className="mt-auto rounded-2xl border border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
        {step.preview}
      </div>
    </div>
  );
}

const steps = [
  {
    step: '01',
    title: 'Create Business',
    description: 'Set up your company profile in under 2 minutes. Add your brand, products, and knowledge base.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    preview: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Business Setup</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full how-it-works-badge">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Complete
          </span>
        </div>
        <div className="space-y-2.5">
          <PreviewRow label="Business Name" value="Acme Inc." />
          <PreviewRow label="Industry" value="Technology" />
          <PreviewRow label="Knowledge Base" value="24 docs uploaded" />
          <PreviewRow label="Services" value="5 services added" />
        </div>
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 how-it-works-checkmark">
            <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <span className="text-xs font-semibold text-emerald-600">Business Created</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: '02',
    title: 'Generate AI Agent',
    description: 'Our AI creates a custom agent trained on your business data, ready to handle real conversations.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    preview: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Agent</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full how-it-works-badge">
            Ready
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-royal-blue to-royal-blue-light text-white text-sm font-bold shadow-sm shadow-royal-blue/20">
            E
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-deep-black leading-tight">Emma</p>
            <p className="text-xs text-gray-400">Customer Agent</p>
          </div>
        </div>
        <div className="space-y-2.5 pt-1">
          <TrainingBar label="Product Knowledge" percent={100} />
          <TrainingBar label="Brand Voice" percent={100} />
          <TrainingBar label="FAQ Handling" percent={100} />
        </div>
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 how-it-works-checkmark">
            <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <span className="text-xs font-semibold text-emerald-600">Training Complete</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: '03',
    title: 'Deploy Everywhere',
    description: 'One click to go live on your website, WhatsApp, Messenger, and more channels coming soon.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
    preview: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Channels</span>
          <span className="text-[11px] font-medium text-gray-400">1 of 4 live</span>
        </div>
        <ChannelRow name="Website" available status="Live" icon="website" />
        <ChannelRow name="WhatsApp" available={false} status="Coming Soon" icon="whatsapp" />
        <ChannelRow name="Messenger" available={false} status="Coming Soon" icon="messenger" />
        <ChannelRow name="API" available={false} status="Coming Soon" icon="api" />
      </div>
    ),
  },
];

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-medium text-deep-black">{value}</span>
    </div>
  );
}

function TrainingBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-gray-500">{label}</span>
        <span className="text-[11px] font-semibold text-emerald-600">{percent}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full how-it-works-progress-bar"
          style={{ '--bar-width': `${percent}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

function ChannelRow({ name, available, status, icon }: { name: string; available: boolean; status: string; icon: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    website: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    whatsapp: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    messenger: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z" />
      </svg>
    ),
    api: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${available ? 'bg-white text-gray-700 shadow-sm border border-gray-100' : 'bg-gray-50 text-gray-300 border border-gray-100'}`}>
          {iconMap[icon]}
        </div>
        <span className={`text-xs font-medium ${available ? 'text-deep-black' : 'text-gray-400'}`}>{name}</span>
      </div>
      {available ? (
        <div className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          <span className="text-[11px] font-semibold text-emerald-600">{status}</span>
        </div>
      ) : (
        <span className="text-[10px] text-gray-300 font-medium">{status}</span>
      )}
    </div>
  );
}

const placeholderLogos = [
  'Acme Corp',
  'TechFlow',
  'CloudBase',
  'DataSync',
  'NexGen',
];

export default function HowItWorks() {
  const { ref: trustRef, isInView: trustInView } = useInView(0.1);

  return (
    <section id="how-it-works" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-20 md:mb-24">
          <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
            How it works
          </span>
          <h2 className="heading-lg text-deep-black mb-5">
            Build Your AI Team in 3 Simple Steps
          </h2>
          <p className="text-gray-500/80 text-lg max-w-2xl mx-auto leading-relaxed">
            From creating your business profile to deploying AI agents across your channels—all in just a few minutes.
          </p>
        </div>

        {/* Steps grid with connection line */}
        <div className="relative">
          {/* Desktop connection line */}
          <div className="hidden lg:block absolute top-[80px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-[1px]">
            <div className="w-full h-full bg-gray-100 rounded-full" />
            <div className="absolute inset-y-0 left-0 how-it-works-gradient-line" />
            {/* Arrow indicators */}
            <div className="absolute top-1/2 left-[33%] -translate-y-1/2">
              <svg className="h-3.5 w-3.5 text-royal-blue/30 how-it-works-arrow" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="absolute top-1/2 left-[66%] -translate-y-1/2">
              <svg className="h-3.5 w-3.5 text-royal-blue/30 how-it-works-arrow" viewBox="0 0 16 16" fill="none" style={{ animationDelay: '0.3s' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="lg:hidden absolute top-0 bottom-0 left-[23px] w-[1px] bg-gray-100">
            <div className="w-full how-it-works-gradient-line-vertical" />
          </div>

          <div className="grid gap-8 lg:gap-10 lg:grid-cols-3">
            {steps.map((step, index) => (
              <StepCard key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Trust section */}
        <div
          ref={trustRef}
          className={`mt-24 md:mt-32 pt-16 border-t border-gray-100 transition-all duration-700 ease-out ${
            trustInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-center text-sm text-gray-400 font-medium mb-10">
            Trusted by modern businesses to deploy AI agents faster
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
            {placeholderLogos.map((logo) => (
              <div
                key={logo}
                className="text-gray-300 font-semibold text-lg tracking-tight select-none"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
