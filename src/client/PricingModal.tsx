import { useState, useEffect } from 'react';
import { X, CheckCircle2, Crown, Loader2 } from 'lucide-react';
import { usePlans, type Plan } from '../hooks/usePlans';
import { formatBytes } from '../hooks/useStorageUsage';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: Plan) => void;
  currentPlanId?: string | null;
  isProcessing?: boolean;
}

function formatPrice(price: number): string {
  return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export default function PricingModal({ isOpen, onClose, onSelectPlan, currentPlanId, isProcessing }: PricingModalProps) {
  const { data: plans, isLoading, error } = usePlans();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) setSelectedId(null);
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSelect(plan: Plan) {
    setSelectedId(plan.id);
    onSelectPlan(plan);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06] border border-royal-blue/10">
              <Crown className="w-5 h-5 text-royal-blue" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-deep-black">Choose a Plan</h2>
              <p className="text-xs text-gray-500">Select the plan that fits your needs</p>
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
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-royal-blue animate-spin mb-3" />
              <p className="text-sm text-gray-500">Loading plans...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-sm text-red-500 mb-2">Failed to load plans</p>
              <p className="text-xs text-gray-400">{error instanceof Error ? error.message : String(error)}</p>
            </div>
          ) : !plans || plans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-sm text-gray-500">No plans available yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {plans.map((plan) => {
                const isCurrent = plan.id === currentPlanId;
                const isSelected = selectedId === plan.id;

                return (
                  <div
                    key={plan.id}
                    onClick={() => !isCurrent && handleSelect(plan)}
                    className={`relative rounded-xl border-2 p-5 transition-all duration-200 ${
                      isCurrent
                        ? 'border-royal-blue bg-royal-blue/[0.02] cursor-default'
                        : isSelected
                          ? 'border-royal-blue bg-royal-blue/[0.04] shadow-md cursor-pointer'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer'
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-royal-blue text-white">
                          CURRENT
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-deep-black">{plan.name}</h3>
                        </div>
                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-2xl font-bold text-deep-black">{formatPrice(plan.price)}</span>
                          <span className="text-sm text-gray-500">/ {plan.billing_cycle === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {plan.ai_limit} AI Employee{plan.ai_limit !== 1 ? 's' : ''}
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {plan.message_limit.toLocaleString()} messages/mo
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {formatBytes(plan.storage_limit)} storage
                          </span>
                        </div>
                        {plan.features && plan.features.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {plan.features.map((feature) => (
                              <span
                                key={feature}
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 text-gray-600"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {!isCurrent && (
                        <button
                          disabled={isSelected || isProcessing}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 flex-shrink-0 ${
                            isSelected
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-royal-blue text-white hover:bg-royal-blue-dark shadow-sm hover:shadow-md hover:shadow-royal-blue/20'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Selecting...
                            </>
                          ) : (
                            'Select Plan'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
