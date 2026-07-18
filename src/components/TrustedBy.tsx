export default function TrustedBy() {
  const companies = [
    { name: 'Stripe', width: 'w-16' },
    { name: 'Vercel', width: 'w-20' },
    { name: 'Linear', width: 'w-16' },
    { name: 'Notion', width: 'w-20' },
    { name: 'Figma', width: 'w-14' },
    { name: 'Slack', width: 'w-16' },
  ];

  return (
    <section className="border-y border-gray-100 bg-gray-50/50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-400 mb-8 tracking-wide uppercase">
          Trusted by forward-thinking companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-16">
          {companies.map((company) => (
            <div key={company.name} className="flex items-center opacity-40 hover:opacity-60 transition-opacity">
              <span className={`text-xl font-bold tracking-tight text-gray-900 ${company.width}`}>
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
