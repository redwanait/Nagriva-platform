import { useEffect, useRef, useState } from "react";

const businessMetrics = [
  { value: "68%", label: "Faster Response Time", arrow: "↓" },
  { value: "42%", label: "Qualified Leads", arrow: "↑" },
  { value: "98%", label: "Customer Satisfaction", arrow: null },
];

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="h-[18px] w-[18px] text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
      </svg>
      Verified
    </span>
  );
}

const logos = [
  { name: "Shopify", svg: <path d="M15.272 5.893v8.047a.398.398 0 0 1-.486.386l-2.038-.505a.399.399 0 0 1-.278-.386V6.07a.2.2 0 0 0-.2-.2h-.926a.2.2 0 0 0-.2.2v7.432a.398.398 0 0 1-.486.386l-2.038-.505a.399.399 0 0 1-.278-.386V7.37a.2.2 0 0 0-.2-.2h-.926a.2.2 0 0 0-.2.2v6.13a.399.399 0 0 1-.278.386l-2.084-.517a.398.398 0 0 1-.278-.386V7.295a.349.349 0 0 1 .325-.348l1.875-.124a.349.349 0 0 1 .36.347v.56h.003a.2.2 0 0 0 .2.2h.923a.2.2 0 0 0 .2-.2V6.07a.399.399 0 0 1 .386-.486l2.038.505a.398.398 0 0 1 .278.386v4.448a.2.2 0 0 0 .2.2h.926a.2.2 0 0 0 .2-.2V7.37a.399.399 0 0 1 .386-.486l2.038.505a.398.398 0 0 1 .278.386Z" /> },
  { name: "Slack", svg: <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" /> },
  { name: "OpenAI", svg: <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" /> },
  { name: "WhatsApp", svg: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /> },
  { name: "HubSpot", svg: <path d="M18.3 14.59c-.09-.05-1.8-1.07-2.1-1.2-.29-.14-.5-.19-.72.19-.21.38-.82 1.2-1 1.45-.2.25-.39.28-.72.09-.32-.18-1.37-.5-2.61-1.6-.96-.86-1.62-1.92-1.81-2.24-.19-.32-.02-.49.14-.65.15-.15.32-.39.48-.58.16-.2.21-.34.32-.56.1-.22.05-.41-.02-.58-.08-.17-.72-1.73-.99-2.37-.26-.62-.53-.53-.72-.54l-.62-.01c-.2 0-.52.08-.8.38-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.23 5.13 4.53.72.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 0C5.49 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65c1.73.95 3.72 1.45 5.69 1.45 6.55 0 11.89-5.33 11.89-11.89 0-3.15-1.23-6.11-3.48-8.41A11.82 11.82 0 0012.05 0z" /> },
  { name: "Google", svg: <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1ZM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23ZM5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62ZM12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" /> },
];

export default function Testimonials() {
  const trustRef = useRef<HTMLDivElement>(null);
  const [trustVisible, setTrustVisible] = useState(false);

  useEffect(() => {
    const el = trustRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTrustVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-xs font-semibold text-royal-blue tracking-widest uppercase mb-4 block">
            Customer Success
          </span>
          <h2 className="heading-lg text-deep-black">
            Built for businesses that ship
          </h2>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="rounded-2xl border border-gray-100 bg-white transition-all duration-500 hover:border-gray-200 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
            <div className="grid md:grid-cols-[1fr,auto,1fr]">
              {/* Left — Quote */}
              <div className="relative p-8 md:p-10 flex flex-col justify-between">
                {/* Watermark Quote Mark */}
                <div className="absolute top-6 right-8 text-gray-100 select-none pointer-events-none">
                  <svg className="w-24 h-24 md:w-28 md:h-28" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.3 4.5C7.3 7.1 5.5 11 5.5 15.5c0 3 2.2 5 5 5 2.8 0 5-2.2 5-5s-2.2-5-5-5c-.5 0-1 .1-1.5.3C9.8 7.2 11.3 5 11.3 4.5zM20.8 4.5c-4 2.6-5.8 6.5-5.8 11 0 3 2.2 5 5 5 2.8 0 5-2.2 5-5s-2.2-5-5-5c-.5 0-1 .1-1.5.3 1.3-2.6 2.3-4.8 2.3-5.3z" />
                  </svg>
                </div>

                <div className="relative">
                  <Stars className="mb-5" />

                  <blockquote className="text-[28px] md:text-[30px] leading-[1.45] tracking-tight text-deep-black font-normal">
                    &ldquo;Nagriva fundamentally changed how we handle customer
                    interactions. Our team went from drowning in repetitive tickets
                    to focusing on high-value conversations.&rdquo;
                  </blockquote>
                </div>

                <div className="relative mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-deep-black text-sm">Amara Okafor</p>
                      <VerifiedBadge />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">VP of Operations, Arcline Digital</p>
                  </div>

                  {/* Company Logo */}
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px bg-gray-100 my-8" />

              {/* Mobile Divider */}
              <div className="md:hidden mx-8 border-t border-gray-100" />

              {/* Right — Business Impact */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-5">
                  Business Impact
                </p>

                <div className="space-y-3">
                  {businessMetrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 transition-all duration-300 hover:border-gray-200 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                    >
                      {m.arrow ? (
                        <span className="text-emerald-500 text-sm font-bold leading-none">{m.arrow}</span>
                      ) : (
                        <span className="w-[14px]" />
                      )}
                      <span className="text-xl font-bold tracking-tight text-deep-black">{m.value}</span>
                      <span className="text-[13px] text-gray-500 font-medium">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div
          ref={trustRef}
          className={`
            border-t border-gray-100 pt-16 text-center
            transition-all duration-700 ease-out
            ${trustVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          {/* Stars + Rating */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Stars className="[&_svg]:h-5 [&_svg]:w-5" />
            <span className="text-lg font-bold tracking-tight text-deep-black">4.9/5</span>
          </div>

          {/* Subtitle + Badge */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <p className="text-[15px] text-gray-500">
              Trusted by <span className="text-deep-black font-semibold">2,000+ businesses</span> worldwide
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-royal-blue bg-royal-blue/5 border border-royal-blue/10 rounded-full px-2 py-0.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          </div>

          {/* Logos */}
          <div className="flex items-center justify-center gap-10 md:gap-16">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <svg className="h-6 md:h-7 w-auto" viewBox="0 0 24 24" fill="currentColor">
                  {logo.svg}
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
