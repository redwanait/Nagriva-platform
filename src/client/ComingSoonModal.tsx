import { X, Sparkles } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] border border-royal-blue/10">
              <Sparkles className="w-5 h-5 text-royal-blue" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-deep-black">Coming Soon</h2>
              <p className="text-xs text-gray-500">Subscription Plans</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-deep-black hover:border-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            We&apos;re currently building our subscription and billing system. Soon you&apos;ll be able to
            upgrade your plan, unlock premium AI Employees, increase usage limits, and access advanced features.
          </p>

          {/* What's Coming Info Box */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-8">
            <h3 className="text-sm font-semibold text-deep-black mb-3">What&apos;s coming:</h3>
            <ul className="space-y-2">
              {[
                'Free Plan',
                'Starter Plan',
                'Pro Plan',
                'Business Plan',
                'Secure Stripe Payments',
                'Automatic Billing',
                'Usage Tracking',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-royal-blue flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-deep-black bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-royal-blue rounded-xl hover:bg-royal-blue-dark transition-colors shadow-sm hover:shadow-md hover:shadow-royal-blue/20"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
