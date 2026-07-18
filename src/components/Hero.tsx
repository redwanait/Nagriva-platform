export default function Hero() {
  const agents = [
    { name: 'Customer Agent', status: 'Online', color: 'bg-emerald-400' },
    { name: 'Sales Agent', status: 'Online', color: 'bg-emerald-400' },
    { name: 'Booking Agent', status: 'Online', color: 'bg-emerald-400' },
    { name: 'Support Agent', status: 'Online', color: 'bg-emerald-400' },
  ];

  const metrics = [
    { label: 'Conversations', value: '2,847', change: '+24%' },
    { label: 'Resolution Rate', value: '94.2%', change: '+5.1%' },
    { label: 'Avg. Response', value: '0.8s', change: '-12%' },
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 mb-8 animate-fade-up">
              <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
              <span className="text-sm font-medium text-gray-600">AI Agent Platform</span>
            </div>

            <h1 className="heading-xl text-deep-black mb-6 animate-fade-up delay-100">
              Build Your AI Workforce in Minutes
            </h1>

            <p className="text-body mb-10 animate-fade-up delay-200">
              Create intelligent AI Employees that answer customers, automate tasks, and help your business grow 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <a href="#/onboarding" className="btn-primary px-8 py-4 text-base">
                Get Started
                <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a href="#" className="btn-secondary px-8 py-4 text-base">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </a>
            </div>
          </div>

          <div className="relative animate-slide-up delay-300">
            <div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50 overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/favicon.png?v=4" alt="Nagriva" width={32} height={32} className="h-8 w-8 rounded-[50%] object-contain" />
                    <span className="text-sm font-semibold text-deep-black">AI Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-xs text-gray-500">All systems operational</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-px bg-gray-100">
                {metrics.map((metric) => (
                  <div key={metric.label} className="bg-white px-6 py-4">
                    <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-deep-black">{metric.value}</span>
                      <span className="text-xs font-medium text-emerald-600 mb-1">{metric.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-deep-black">Active Agents</span>
                  <span className="text-xs text-gray-500">4 active</span>
                </div>
                <div className="space-y-3">
                  {agents.map((agent) => (
                    <div key={agent.name} className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 transition-colors hover:border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
                          <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-deep-black">{agent.name}</p>
                          <p className="text-xs text-gray-500">Handling queries</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${agent.color}`} />
                        <span className="text-xs font-medium text-emerald-600">{agent.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg animate-fade-in delay-600">
              <div className="flex h-full flex-col items-center justify-center">
                <svg className="h-6 w-6 text-royal-blue mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                <span className="text-lg font-bold text-deep-black">98%</span>
                <span className="text-[10px] text-gray-500">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
