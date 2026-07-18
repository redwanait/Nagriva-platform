import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Types ─── */
interface Message {
  type: 'user' | 'ai';
  label: string;
  text: string;
}

interface Industry {
  id: string;
  name: string;
  icon: React.ReactNode;
  messages: Message[];
  statusLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

/* ─── Data ─── */
const industries: Industry[] = [
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 11-3 0 3.354 3.354 0 013 0zm-3.75 0h.008v.008h-.008V17.25z" />
      </svg>
    ),
    messages: [
      { type: 'user', label: 'Customer', text: "Hi, I'd like to order two large Margherita pizzas for delivery." },
      { type: 'ai', label: 'Nagriva AI', text: "Great choice! That's $34.98 total. Your estimated delivery is 25 minutes. Shall I confirm?" },
      { type: 'user', label: 'Customer', text: 'Yes, confirm please.' },
      { type: 'ai', label: 'Nagriva AI', text: "Your order is confirmed! You'll receive a tracking link shortly." },
    ],
    statusLabel: 'Order Confirmed',
    ctaLabel: 'Try Restaurant Demo',
    ctaHref: '#demo-restaurant',
  },
  {
    id: 'law',
    name: 'Law Firms',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    messages: [
      { type: 'user', label: 'Prospect', text: 'I need help with an employment contract dispute.' },
      { type: 'ai', label: 'Nagriva AI', text: "I can help with that. Could you share a brief summary of the issue so I can match you with the right attorney?" },
      { type: 'user', label: 'Prospect', text: 'My employer modified my bonus terms without notice.' },
      { type: 'ai', label: 'Nagriva AI', text: "Thank you. I've scheduled a consultation with our employment law specialist for Thursday at 2:00 PM." },
    ],
    statusLabel: 'Consultation Booked',
    ctaLabel: 'Try Law Firm Demo',
    ctaHref: '#demo-law',
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    messages: [
      { type: 'user', label: 'Lead', text: "I'm looking for a 3-bedroom apartment in downtown, budget around $2,500." },
      { type: 'ai', label: 'Nagriva AI', text: "I found 4 listings that match. Here's one at 142 Main St — 3 bed, 2 bath, $2,400/mo with a rooftop terrace." },
      { type: 'user', label: 'Lead', text: "That looks great. Can I schedule a viewing?" },
      { type: 'ai', label: 'Nagriva AI', text: "You're confirmed for Saturday at 11:00 AM. I've sent the details to your email." },
    ],
    statusLabel: 'Viewing Confirmed',
    ctaLabel: 'Try Real Estate Demo',
    ctaHref: '#demo-realestate',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    messages: [
      { type: 'user', label: 'Customer', text: "Where is my order? It's been 3 days." },
      { type: 'ai', label: 'Nagriva AI', text: "Let me check — order #NG-2048 is in transit and arriving tomorrow by 5 PM. Here's your tracking link." },
      { type: 'user', label: 'Customer', text: "Can I change the delivery address?" },
      { type: 'ai', label: 'Nagriva AI', text: "Done! Updated to 789 Oak Ave. You'll receive a confirmation shortly." },
    ],
    statusLabel: 'Issue Resolved',
    ctaLabel: 'Try E-commerce Demo',
    ctaHref: '#demo-ecommerce',
  },
  {
    id: 'agencies',
    name: 'Agencies',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    messages: [
      { type: 'user', label: 'New Lead', text: "Hi, we need help with social media marketing for our SaaS startup." },
      { type: 'ai', label: 'Nagriva AI', text: "Thanks for reaching out! I'd love to learn more. What's your monthly budget and target audience?" },
      { type: 'user', label: 'New Lead', text: 'Around $5K/month, targeting B2B SaaS founders.' },
      { type: 'ai', label: 'Nagriva AI', text: "Perfect fit. I've created a project brief and assigned it to our SaaS marketing team. You'll hear from them within 2 hours." },
    ],
    statusLabel: 'Qualified Lead',
    ctaLabel: 'Try Agency Demo',
    ctaHref: '#demo-agencies',
  },
  {
    id: 'clinics',
    name: 'Clinics',
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    messages: [
      { type: 'user', label: 'Patient', text: 'I need to book an appointment for a check-up.' },
      { type: 'ai', label: 'Nagriva AI', text: "Of course! We have availability tomorrow at 10:30 AM and 2:15 PM. Which works best?" },
      { type: 'user', label: 'Patient', text: '10:30 AM works.' },
      { type: 'ai', label: 'Nagriva AI', text: "You're booked for tomorrow at 10:30 AM with Dr. Chen. Please arrive 10 minutes early." },
    ],
    statusLabel: 'Appointment Confirmed',
    ctaLabel: 'Try Clinic Demo',
    ctaHref: '#demo-clinics',
  },
];

/* ─── Main Component ─── */
export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeId, setActiveId] = useState(industries[0].id);
  const [displayed, setDisplayed] = useState(industries[0]);
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'entering'>('visible');

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const switchIndustry = useCallback((id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setPhase('exiting');
    setTimeout(() => {
      setDisplayed(industries.find(i => i.id === id)!);
      setPhase('entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase('visible'));
      });
    }, 280);
  }, [activeId]);

  const active = industries.find(i => i.id === activeId)!;

  return (
    <section id="solutions" ref={sectionRef} className="section-padding">
      <div className="sol-container">

        {/* ── Header ── */}
        <div
          className="sol-header"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="sol-badge">SOLUTIONS</span>
          <h2 className="heading-lg text-deep-black mb-5">
            One Platform. Endless Use Cases.
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            See how Nagriva adapts to different industries with specialized AI employees that automate conversations, bookings, support, and lead qualification.
          </p>
        </div>

        {/* ── Pills ── */}
        <div
          className="sol-pills"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
          }}
        >
          {industries.map(ind => (
            <button
              key={ind.id}
              onClick={() => switchIndustry(ind.id)}
              className={`sol-pill ${activeId === ind.id ? 'sol-pill-active' : ''}`}
            >
              {ind.icon}
              {ind.name}
            </button>
          ))}
        </div>

        {/* ── Demo Frame ── */}
        <div
          className="sol-demo-frame"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
          }}
        >
          {/* Chrome bar */}
          <div className="sol-chrome">
            <div className="sol-chrome-dots">
              <span /><span /><span />
            </div>
            <div className="sol-chrome-bar">
              <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span>nagriva.ai/{active.id}</span>
            </div>
            <div className="sol-chrome-spacer" />
          </div>

          {/* Chat area */}
          <div className="sol-chat-body">
            {/* AI Header */}
            <div
              className="sol-chat-ai-header"
              style={{
                opacity: phase === 'exiting' ? 0.5 : 1,
                transition: 'opacity 0.25s ease',
              }}
            >
              <div className="sol-avatar">
                <img
                  src="/favicon.png?v=4"
                  alt="Nagriva"
                  className="sol-avatar-img"
                />
              </div>
              <div>
                <div className="sol-ai-name">Nagriva AI</div>
                <div className="sol-ai-status">
                  <span className="sol-online-dot" />
                  Active now
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="sol-messages">
              {displayed.messages.map((msg, i) => (
                <div
                  key={`${displayed.id}-${i}`}
                  className={`sol-msg ${msg.type === 'user' ? 'sol-msg-user' : 'sol-msg-ai'}`}
                  style={{
                    opacity: phase === 'visible' ? 1 : 0,
                    transform: phase === 'visible'
                      ? 'translateY(0) scale(1)'
                      : msg.type === 'user'
                        ? 'translateY(10px) scale(0.97)'
                        : 'translateY(-10px) scale(0.97)',
                    transition: `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
                  }}
                >
                  <span className={`sol-msg-label ${msg.type === 'user' ? 'sol-msg-label-user' : 'sol-msg-label-ai'}`}>
                    {msg.label}
                  </span>
                  <span className={`sol-msg-bubble ${msg.type === 'user' ? 'sol-msg-bubble-user' : 'sol-msg-bubble-ai'}`}>
                    {msg.text}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              <div
                className="sol-typing"
                style={{
                  opacity: phase === 'visible' ? 1 : 0,
                  transition: `opacity 0.3s ease ${displayed.messages.length * 120 + 200}ms`,
                }}
              >
                <span className="sol-typing-dot" style={{ animationDelay: '0ms' }} />
                <span className="sol-typing-dot" style={{ animationDelay: '200ms' }} />
                <span className="sol-typing-dot" style={{ animationDelay: '400ms' }} />
              </div>
            </div>

            {/* Footer */}
            <div className="sol-footer">
              <div
                className="sol-status-badge"
                style={{
                  opacity: phase === 'visible' ? 1 : 0,
                  transform: phase === 'visible' ? 'scale(1)' : 'scale(0.9)',
                  transition: `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${displayed.messages.length * 120 + 350}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${displayed.messages.length * 120 + 350}ms`,
                }}
              >
                <svg className="h-4 w-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {displayed.statusLabel}
              </div>

              <a href={displayed.ctaHref} className="sol-cta-link">
                {displayed.ctaLabel}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
