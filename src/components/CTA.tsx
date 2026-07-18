export default function CTA() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-3xl bg-deep-black px-8 py-20 text-center lg:px-16 lg:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-royal-blue/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-royal-blue/10 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="heading-lg text-white mb-6">
              Ready to Build Your First AI Employee?
            </h2>
            <p className="text-body max-w-xl mx-auto mb-10 text-gray-400">
              Join thousands of businesses already using Nagriva to automate their operations. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#/onboarding" className="inline-flex items-center justify-center px-8 py-4 bg-white text-deep-black font-semibold rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-lg active:scale-[0.98]">
                Start Free
                <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a href="#" className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border border-gray-600 transition-all duration-200 hover:border-gray-400 hover:bg-white/5">
                Schedule Demo
              </a>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              No credit card required · 14-day free trial · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
