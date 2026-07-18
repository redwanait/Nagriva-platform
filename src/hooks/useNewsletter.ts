import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export type NewsletterSource = 'blog' | 'homepage' | 'footer' | 'contact' | 'article' | 'webinars' | 'changelog';

interface UseNewsletterReturn {
  subscribe: (email: string, source: NewsletterSource) => Promise<{ success: boolean; message: string }>;
  loading: boolean;
}

export function useNewsletter(): UseNewsletterReturn {
  const [loading, setLoading] = useState(false);

  const subscribe = useCallback(async (email: string, source: NewsletterSource) => {
    const trimmed = email.trim().toLowerCase();

    if (!trimmed) {
      return { success: false, message: 'Please enter your email address.' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: trimmed, source });

      if (error) {
        if (error.code === '23505' || error.message?.includes('unique')) {
          return { success: true, message: 'You are already subscribed.' };
        }
        console.error('Newsletter subscription error:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
      }

      return { success: true, message: "Thanks for subscribing! You'll receive the latest Nagriva updates." };
    } catch {
      return { success: false, message: 'Network error. Please check your connection and try again.' };
    } finally {
      setLoading(false);
    }
  }, []);

  return { subscribe, loading };
}
