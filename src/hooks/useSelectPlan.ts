import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { openStripeCheckout } from '../lib/stripeCheckout';
import type { Plan } from './usePlans';

export interface SelectPlanResult {
  type: 'free' | 'paid';
  planName: string;
}

async function upsertFreeSubscription(userId: string, plan: Plan, user: { id: string; email?: string }): Promise<void> {
  // ── Step 1: Verify the Free plan row exists in `plans` ──
  console.log('[FreePlan] Step 1 — Verifying plan exists in DB. plan.id:', plan.id, 'plan.name:', plan.name);
  const { data: planRow, error: planFetchErr } = await supabase
    .from('plans')
    .select('id, name, slug')
    .eq('id', plan.id)
    .maybeSingle();

  console.log('[FreePlan] planRow:', planRow);
  if (planFetchErr) console.error('[FreePlan] planFetchErr:', planFetchErr);
  if (!planRow) {
    console.error('[FreePlan] Plan not found in DB! plan.id does not match any row in plans table.');
    throw new Error(`Plan "${plan.name}" (id: ${plan.id}) not found in the plans table.`);
  }

  // ── Step 2: Verify the user has a row in `profiles` ──
  console.log('[FreePlan] Step 2 — Verifying profile exists. userId:', userId);
  const { data: profile, error: profileErr } = await supabase
    .from('profiles')
    .select('id, email, full_name')
    .eq('id', userId)
    .maybeSingle();

  console.log('[FreePlan] profile:', profile);
  if (profileErr) console.error('[FreePlan] profileErr:', profileErr);
  if (!profile) {
    console.error('[FreePlan] No profile row for this user. owner_id FK will fail.');
    throw new Error('No profile found for the authenticated user. Cannot set owner_id.');
  }

  // ── Step 3: Check for existing subscription row ──
  console.log('[FreePlan] Step 3 — Checking existing user_subscriptions for owner_id:', userId);
  const { data: existing, error: fetchError } = await supabase
    .from('user_subscriptions')
    .select('id, plan_id, status')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  console.log('[FreePlan] existing subscription:', existing);
  if (fetchError) {
    console.error('[FreePlan] fetchError (SELECT):', fetchError);
    throw fetchError;
  }

  const now = new Date().toISOString();

  if (existing) {
    // ── Step 4a: UPDATE existing row ──
    const payload = {
      plan_id: plan.id,
      status: 'active',
      updated_at: now,
    };
    console.log('[FreePlan] Step 4a — Updating existing subscription. id:', existing.id, 'payload:', payload);

    const { data: updateData, error: updateError } = await supabase
      .from('user_subscriptions')
      .update(payload)
      .eq('id', existing.id)
      .select();

    console.log('[FreePlan] update result data:', updateData);
    if (updateError) {
      console.error('[FreePlan] UPDATE error:', updateError);
      console.error('[FreePlan] UPDATE error.message:', updateError.message);
      console.error('[FreePlan] UPDATE error.details:', updateError.details);
      console.error('[FreePlan] UPDATE error.hint:', updateError.hint);
      console.error('[FreePlan] UPDATE error.code:', updateError.code);
      throw updateError;
    }
    console.log('[FreePlan] UPDATE succeeded');
  } else {
    // ── Step 4b: INSERT new row ──
    const payload = {
      owner_id: userId,
      plan_id: plan.id,
      status: 'active',
      updated_at: now,
    };
    console.log('[FreePlan] Step 4b — Inserting new subscription. payload:', payload);
    console.log('Auth user:', user);
    console.log('Auth user id:', user?.id);
    console.log('Owner id being inserted:', payload.owner_id);
    console.log('Payload:', payload);

    const { data: insertData, error: insertError } = await supabase
      .from('user_subscriptions')
      .insert(payload)
      .select();

    console.log('[FreePlan] insert result data:', insertData);
    if (insertError) {
      console.error('[FreePlan] INSERT error:', insertError);
      console.error('[FreePlan] INSERT error.message:', insertError.message);
      console.error('[FreePlan] INSERT error.details:', insertError.details);
      console.error('[FreePlan] INSERT error.hint:', insertError.hint);
      console.error('[FreePlan] INSERT error.code:', insertError.code);
      throw insertError;
    }
    console.log('[FreePlan] INSERT succeeded');
  }
}

export function useSelectPlan() {
  const queryClient = useQueryClient();

  return useMutation<SelectPlanResult, Error, Plan>({
    mutationFn: async (plan: Plan) => {
      // ── Step 0: Verify authentication ──
      console.log('[FreePlan] Step 0 — Authenticating user...');
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      console.log('[FreePlan] authenticated user:', user ? { id: user.id, email: user.email } : null);
      if (authError) console.error('[FreePlan] authError:', authError);
      if (authError || !user) throw new Error('You must be logged in to choose a plan.');

      const { data: sessionData } = await supabase.auth.getSession();
      console.log('[FreePlan] session:', sessionData?.session);
      console.log('[FreePlan] access_token:', sessionData?.session?.access_token ? 'present' : 'MISSING');

      const isFreePlan = plan.name.toLowerCase() === 'free';
      console.log('[FreePlan] isFreePlan:', isFreePlan, 'plan.name:', plan.name);

      if (isFreePlan) {
        await upsertFreeSubscription(user.id, plan, user);
        return { type: 'free', planName: plan.name };
      }

      await openStripeCheckout(plan);
      return { type: 'paid', planName: plan.name };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
    },
  });
}
