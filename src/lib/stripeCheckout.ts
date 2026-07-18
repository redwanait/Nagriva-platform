import type { Plan } from '../hooks/usePlans';

/**
 * Placeholder for Stripe Checkout integration.
 *
 * When Stripe is configured, this function should:
 * 1. Create a Stripe Checkout Session via your backend API
 * 2. Redirect the user to the Stripe Checkout URL
 *
 * @param plan - The selected paid plan
 */
export async function openStripeCheckout(plan: Plan): Promise<void> {
  // TODO: Replace with actual Stripe Checkout integration
  //
  // Example implementation:
  //
  // const response = await fetch('/api/create-checkout-session', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     planId: plan.id,
  //     priceId: plan.stripe_price_id,
  //   }),
  // });
  //
  // if (!response.ok) throw new Error('Failed to create checkout session');
  //
  // const { url } = await response.json();
  // window.location.href = url;

  console.log(
    `[Stripe Checkout] Plan: ${plan.name}, Price: $${plan.price}/${plan.billing_cycle}`,
  );
}
