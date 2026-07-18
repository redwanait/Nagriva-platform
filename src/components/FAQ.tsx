import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does it take to set up an AI agent?",
      answer: "Most businesses are up and running in under 10 minutes. Our guided setup walks you through creating your business profile, training your AI on your knowledge base, and deploying to your preferred channels. No technical expertise required.",
    },
    {
      question: "Can I customize the AI agent's responses?",
      answer: "Absolutely. You can fully customize your agent's personality, tone, responses, and behavior. Set custom rules for when to hand off to humans, which topics to handle, and how to represent your brand voice.",
    },
    {
      question: "What happens when the AI can't answer a question?",
      answer: "Nagriva's intelligent handoff system automatically detects when a conversation needs human attention. It seamlessly transfers the chat to your team with full context, so customers never have to repeat themselves.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes. We're SOC 2 Type II certified with end-to-end encryption. Your data is stored in secure, redundant data centers and is never used to train other AI models. We're fully GDPR compliant.",
    },
    {
      question: "Can I integrate with my existing tools?",
      answer: "Nagriva integrates with popular CRM, helpdesk, and business tools including Salesforce, HubSpot, Zendesk, Google Calendar, and more. Our API (coming soon) will support custom integrations.",
    },
    {
      question: "What languages do you support?",
      answer: "Our AI agents support 95+ languages with automatic detection. When a customer messages in a different language, the agent responds fluently in their preferred language without any configuration.",
    },
  ];

  return (
    <section id="faq" className="section-padding">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-royal-blue tracking-wide uppercase mb-4 block">FAQ</span>
          <h2 className="heading-lg text-deep-black">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-xl overflow-hidden transition-colors ${
                openIndex === index ? 'border-gray-300 bg-gray-50/50' : 'hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
              >
                <span className="text-base font-semibold text-deep-black">{faq.question}</span>
                <svg
                  className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-5 text-gray-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
