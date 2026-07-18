import { useEffect, useState, useMemo, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import { useNewsletter } from '../hooks/useNewsletter';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  Bug,
  Shield,
  Zap,
  Mail,
  Rocket,
  MessageCircle,
  Store,
  Users,
  Mic,
  Workflow,
  Code2,
  ThumbsUp,
  Lightbulb,
  Send,
  X,
  ChevronDown,
  ChevronUp,
  Circle,
  Target,
  FlaskConical,
  Heart,
  BookOpen,
  Megaphone,
} from 'lucide-react';
import Footer from './Footer';
import Toast from './Toast';
import {
  changelogEntries,
  filterCategories,
  upcomingFeatures,
  communityIdeas,
  communityStats,
  achievements,
  featureCategories,
  type ChangelogCategory,
  type ChangelogEntry,
  type CommunityIdea,
  type UpcomingFeature,
} from '../data/changelogData';

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function RevealBlock({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function categoryBadgeStyle(category: string): string {
  const styles: Record<string, string> = {
    New: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Improved: 'bg-blue-50 text-blue-700 border border-blue-200',
    Fixed: 'bg-amber-50 text-amber-700 border border-amber-200',
    Security: 'bg-purple-50 text-purple-700 border border-purple-200',
    'Breaking Change': 'bg-red-50 text-red-700 border border-red-200',
  };
  return styles[category] || 'bg-gray-50 text-gray-600 border border-gray-200';
}

function categoryIcon(category: string) {
  const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    New: Sparkles,
    Improved: Zap,
    Fixed: Bug,
    Security: Shield,
    'Breaking Change': Megaphone,
  };
  return icons[category] || CheckCircle2;
}

function statusBadgeStyle(status: string): string {
  const styles: Record<string, string> = {
    'In Progress': 'bg-blue-50 text-blue-700 border border-blue-200',
    Planned: 'bg-amber-50 text-amber-700 border border-amber-200',
    Research: 'bg-purple-50 text-purple-700 border border-purple-200',
    Released: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'Under Review': 'bg-gray-50 text-gray-600 border border-gray-200',
  };
  return styles[status] || 'bg-gray-50 text-gray-600 border border-gray-200';
}

function upcomingIcon(iconName: string) {
  const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    mic: Mic,
    'message-circle': MessageCircle,
    workflow: Workflow,
    store: Store,
    code: Code2,
    users: Users,
  };
  return icons[iconName] || Sparkles;
}

function statusIcon(status: string) {
  const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    'In Progress': Target,
    Planned: Rocket,
    Research: FlaskConical,
  };
  return icons[status] || Circle;
}

const IDEAS_STORAGE_KEY = 'nagriva_community_votes';

function loadVotes(): Record<string, number> {
  try {
    const raw = localStorage.getItem(IDEAS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveVotes(votes: Record<string, number>) {
  try {
    localStorage.setItem(IDEAS_STORAGE_KEY, JSON.stringify(votes));
  } catch {
    // ignore
  }
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function ChangelogPage() {
  const [activeFilter, setActiveFilter] = useState<ChangelogCategory>('All');
  const [votes, setVotes] = useState<Record<string, number>>(loadVotes);
  const [votedIds, setVotedIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(`${IDEAS_STORAGE_KEY}_voted`);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Changelog | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        'content',
        'See the latest Nagriva product updates, new features, bug fixes, improvements, and platform releases.',
      );
  }, []);

  const filteredEntries = useMemo(() => {
    if (activeFilter === 'All') return changelogEntries;
    return changelogEntries.filter((e) => e.category === activeFilter);
  }, [activeFilter]);

  const handleVote = useCallback(
    (ideaId: string) => {
      if (votedIds.has(ideaId)) return;

      const idea = communityIdeas.find((i) => i.id === ideaId);
      if (!idea) return;

      const newVotes = { ...votes, [ideaId]: (votes[ideaId] ?? idea.votes) + 1 };
      setVotes(newVotes);
      saveVotes(newVotes);

      const newVoted = new Set(votedIds);
      newVoted.add(ideaId);
      setVotedIds(newVoted);
      try {
        localStorage.setItem(`${IDEAS_STORAGE_KEY}_voted`, JSON.stringify([...newVoted]));
      } catch {
        // ignore
      }
    },
    [votes, votedIds],
  );

  return (
    <>
      <main>
        <HeroSection />
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <TimelineSection filteredEntries={filteredEntries} />
        <ComingNextSection />
        <WallOfIdeasSection votes={votes} votedIds={votedIds} onVote={handleVote} />
        <FeatureRequestSection onSuccess={() => setToast('Your idea has been submitted for review!')} />
        <FeedbackSection onSuccess={() => setToast('Thank you for your feedback!')} />
        <CommunityImpactSection />
        <CommunityStatsSection />
        <SubscribeSection />
      </main>

      <Footer />

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </>
  );
}

/* ─── Hero Section ────────────────────────────────────────────────────── */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-royal-blue-light/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div
          className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
            Changelog
          </span>
        </div>

        <div
          className={`text-center max-w-4xl mx-auto mb-8 transition-all duration-700 ease-out delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="heading-xl text-deep-black mb-6">
            Building Nagriva,{' '}
            <span className="text-royal-blue">together.</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Every improvement, every fix and every new feature is shared openly with our community.
            Your feedback helps shape the future of Nagriva.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Filter Bar ──────────────────────────────────────────────────────── */

function FilterBar({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: ChangelogCategory;
  onFilterChange: (v: ChangelogCategory) => void;
}) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`px-6 pb-12 md:px-12 lg:px-24 transition-all duration-700 ease-out delay-[400ms] ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap justify-center gap-2">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-royal-blue text-white shadow-sm shadow-royal-blue/20'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-royal-blue/20 hover:text-royal-blue'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Timeline Section ────────────────────────────────────────────────── */

function TimelineSection({ filteredEntries }: { filteredEntries: ChangelogEntry[] }) {
  return (
    <section className="section-padding pt-0 md:pt-0">
      <div className="container-max max-w-4xl">
        {filteredEntries.length > 0 ? (
          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-royal-blue/20 via-gray-200 to-transparent" />

            <div className="space-y-8">
              {filteredEntries.map((entry, i) => (
                <TimelineEntry key={entry.id} entry={entry} index={i} />
              ))}
            </div>
          </div>
        ) : (
          <RevealBlock>
            <div className="text-center py-20">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100">
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-deep-black mb-2">No updates found</h3>
              <p className="text-gray-500">No changelog entries in this category yet.</p>
            </div>
          </RevealBlock>
        )}
      </div>
    </section>
  );
}

/* ─── Timeline Entry ──────────────────────────────────────────────────── */

function TimelineEntry({ entry, index }: { entry: ChangelogEntry; index: number }) {
  const { ref, isInView } = useInView(0.1);
  const [expanded, setExpanded] = useState(false);
  const Icon = categoryIcon(entry.category);

  return (
    <div
      ref={ref}
      className={`relative pl-16 md:pl-20 transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-6 top-8 flex h-5 w-5 items-center justify-center">
        <div className="h-3.5 w-3.5 rounded-full border-[3px] border-royal-blue bg-white shadow-sm" />
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)]">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-blue/[0.06]">
              <Icon className="h-5 w-5 text-royal-blue" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-deep-black font-mono">
                  {entry.version}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryBadgeStyle(entry.category)}`}
                >
                  {entry.category}
                </span>
              </div>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-sm text-gray-400 ml-auto">
            <Clock className="h-3.5 w-3.5" />
            {entry.date}
          </span>
        </div>

        {/* Title + Summary */}
        <h3 className="text-xl font-semibold text-deep-black mb-2">{entry.title}</h3>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">{entry.summary}</p>

        {/* Expandable Details */}
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-medium text-royal-blue hover:text-royal-blue-dark transition-colors duration-200"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                View details
              </>
            )}
          </button>

          <div
            className={`transition-all duration-400 ease-out overflow-hidden ${
              expanded ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <ul className="space-y-2.5 pl-1">
              {entry.details.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Coming Next Section ─────────────────────────────────────────────── */

function ComingNextSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Roadmap
            </span>
            <h2 className="heading-lg text-deep-black mb-4">Coming Next</h2>
            <p className="text-body max-w-xl mx-auto">
              Exciting features and improvements we're working on next.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {upcomingFeatures.map((feature, i) => (
            <ComingNextCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComingNextCard({ feature, index }: { feature: UpcomingFeature; index: number }) {
  const Icon = upcomingIcon(feature.icon);
  const StatusIcon = statusIcon(feature.status);

  return (
    <RevealBlock key={feature.title} delay={index * 60}>
      <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-blue/[0.06] text-royal-blue transition-all duration-300 group-hover:bg-royal-blue group-hover:text-white group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeStyle(feature.status)}`}
          >
            <StatusIcon className="h-3 w-3" />
            {feature.status}
          </span>
        </div>
        <h3 className="text-base font-semibold text-deep-black mb-1.5">{feature.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
      </div>
    </RevealBlock>
  );
}

/* ─── Wall of Ideas Section ───────────────────────────────────────────── */

function WallOfIdeasSection({
  votes,
  votedIds,
  onVote,
}: {
  votes: Record<string, number>;
  votedIds: Set<string>;
  onVote: (id: string) => void;
}) {
  const released = communityIdeas.filter((i) => i.status === 'Released');
  const inProgress = communityIdeas.filter((i) => i.status === 'In Progress');
  const underReview = communityIdeas.filter((i) => i.status === 'Under Review');

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
              <Lightbulb className="h-3.5 w-3.5" />
              Community Driven
            </span>
            <h2 className="heading-lg text-deep-black mb-4">Ideas That Shape Nagriva</h2>
            <p className="text-body max-w-2xl mx-auto">
              Many of the best improvements come directly from our users. Every suggestion is
              reviewed by our team. The best ideas become part of the Nagriva roadmap.
            </p>
          </div>
        </RevealBlock>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Released Column */}
          <IdeaColumn
            title="Released"
            icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            ideas={released}
            votes={votes}
            votedIds={votedIds}
            onVote={onVote}
            delay={0}
          />

          {/* In Progress Column */}
          <IdeaColumn
            title="In Progress"
            icon={<Target className="h-4 w-4 text-blue-500" />}
            ideas={inProgress}
            votes={votes}
            votedIds={votedIds}
            onVote={onVote}
            delay={80}
          />

          {/* Under Review Column */}
          <IdeaColumn
            title="Under Review"
            icon={<FlaskConical className="h-4 w-4 text-gray-400" />}
            ideas={underReview}
            votes={votes}
            votedIds={votedIds}
            onVote={onVote}
            delay={160}
          />
        </div>
      </div>
    </section>
  );
}

function IdeaColumn({
  title,
  icon,
  ideas,
  votes,
  votedIds,
  onVote,
  delay,
}: {
  title: string;
  icon: React.ReactNode;
  ideas: CommunityIdea[];
  votes: Record<string, number>;
  votedIds: Set<string>;
  onVote: (id: string) => void;
  delay: number;
}) {
  return (
    <RevealBlock delay={delay}>
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1 mb-4">
          {icon}
          <h3 className="text-sm font-semibold text-deep-black">{title}</h3>
          <span className="text-xs text-gray-400 font-medium">({ideas.length})</span>
        </div>

        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            voteCount={votes[idea.id] ?? idea.votes}
            hasVoted={votedIds.has(idea.id)}
            onVote={onVote}
          />
        ))}
      </div>
    </RevealBlock>
  );
}

function IdeaCard({
  idea,
  voteCount,
  hasVoted,
  onVote,
}: {
  idea: CommunityIdea;
  voteCount: number;
  hasVoted: boolean;
  onVote: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
      <div className="flex items-start gap-3">
        <button
          onClick={() => onVote(idea.id)}
          disabled={hasVoted}
          className={`flex flex-col items-center gap-1 min-w-[44px] pt-0.5 transition-all duration-200 ${
            hasVoted
              ? 'text-royal-blue cursor-default'
              : 'text-gray-400 hover:text-royal-blue cursor-pointer'
          }`}
        >
          <ThumbsUp
            className={`h-4 w-4 transition-transform duration-200 ${
              hasVoted ? 'scale-110' : 'hover:scale-110'
            }`}
          />
          <span className="text-xs font-semibold">{voteCount}</span>
        </button>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-deep-black mb-0.5">{idea.title}</h4>
          <p className="text-xs text-gray-500 leading-relaxed">{idea.description}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature Request Section ─────────────────────────────────────────── */

function FeatureRequestSection({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(featureCategories[0]);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTitle('');
    setCategory(featureCategories[0]);
    setDescription('');
    setEmail('');
    setOpen(false);
    onSuccess();
  };

  return (
    <>
      <section className="section-padding bg-gray-50/50">
        <div className="container-max">
          <RevealBlock>
            <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
              <div className="relative">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06]">
                  <Lightbulb className="h-6 w-6 text-royal-blue" />
                </div>
                <h2 className="heading-md text-deep-black mb-3">Have an idea for Nagriva?</h2>
                <p className="text-body-sm max-w-lg mx-auto mb-8">
                  We build Nagriva together with our community. If you have an idea that could
                  improve the platform we'd love to hear it.
                </p>
                <button onClick={() => setOpen(true)} className="btn-primary text-base px-8 py-3.5 gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Suggest a Feature
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-fade-up">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-semibold text-deep-black mb-1">Suggest a Feature</h3>
            <p className="text-sm text-gray-500 mb-6">Share your idea with the Nagriva team.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">Feature Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dark mode for dashboard"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-deep-black placeholder-gray-400 transition-all duration-300 focus:border-royal-blue/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-deep-black transition-all duration-300 focus:border-royal-blue/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none appearance-none"
                >
                  {featureCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">Description</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your idea in detail..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-deep-black placeholder-gray-400 transition-all duration-300 focus:border-royal-blue/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">
                  Email <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-deep-black placeholder-gray-400 transition-all duration-300 focus:border-royal-blue/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-secondary flex-1 py-3"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 py-3 gap-2">
                  <Send className="h-4 w-4" />
                  Submit Idea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Feedback Section ────────────────────────────────────────────────── */

function FeedbackSection({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(featureCategories[0]);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTitle('');
    setCategory(featureCategories[0]);
    setDescription('');
    setEmail('');
    setOpen(false);
    onSuccess();
  };

  return (
    <>
      <section className="section-padding">
        <div className="container-max">
          <RevealBlock>
            <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
              <div className="relative">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06]">
                  <Heart className="h-6 w-6 text-royal-blue" />
                </div>
                <h2 className="heading-md text-deep-black mb-3">Help Shape Nagriva</h2>
                <p className="text-body-sm max-w-lg mx-auto mb-8">
                  Every feature begins with an idea. Many of our improvements come directly from
                  user feedback.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button onClick={() => setOpen(true)} className="btn-primary text-base px-8 py-3.5 gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Share Feedback
                  </button>
                  <a href="#/contact" className="btn-secondary text-base px-8 py-3.5 gap-2">
                    <BookOpen className="h-4 w-4" />
                    Book a Call
                  </a>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-fade-up">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-semibold text-deep-black mb-1">Share Feedback</h3>
            <p className="text-sm text-gray-500 mb-6">Tell us what you think about Nagriva.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief summary of your feedback"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-deep-black placeholder-gray-400 transition-all duration-300 focus:border-royal-blue/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-deep-black transition-all duration-300 focus:border-royal-blue/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none appearance-none"
                >
                  {featureCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">Description</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or issues..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-deep-black placeholder-gray-400 transition-all duration-300 focus:border-royal-blue/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-black mb-1.5">
                  Email <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-deep-black placeholder-gray-400 transition-all duration-300 focus:border-royal-blue/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-secondary flex-1 py-3"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 py-3 gap-2">
                  <Send className="h-4 w-4" />
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Community Impact Section ────────────────────────────────────────── */

function CommunityImpactSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold text-royal-blue tracking-[0.2em] uppercase mb-5 px-4 py-1.5 bg-royal-blue/[0.04] rounded-full">
              Community
            </span>
            <h2 className="heading-lg text-deep-black mb-4">Built with Our Community</h2>
            <p className="text-body max-w-xl mx-auto">
              Nagriva evolves thanks to customer feedback. Here are some achievements made possible by our community.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {achievements.map((a, i) => (
            <RevealBlock key={a.title} delay={i * 80}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:border-emerald-200 hover:shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-1">{a.title}</h3>
                <p className="text-xs text-gray-500">{a.source}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Community Stats Section ─────────────────────────────────────────── */

function CommunityStatsSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {communityStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-royal-blue mb-1 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── Subscribe Section ───────────────────────────────────────────────── */

function SubscribeSection() {
  const { subscribe, loading } = useNewsletter();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email, 'changelog');
    setToast({ message: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) {
      setEmail('');
      setSubmitted(true);
    }
  };

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue/[0.06]">
                <Mail className="h-6 w-6 text-royal-blue" />
              </div>

              <h2 className="heading-md text-deep-black mb-3">Never Miss an Update</h2>
              <p className="text-body-sm max-w-lg mx-auto mb-8">
                Receive product updates directly in your inbox.
              </p>

              {submitted ? (
                <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  You're subscribed! We'll keep you updated.
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-5 py-3.5 text-sm text-deep-black placeholder-gray-400 transition-all duration-300 focus:border-royal-blue/30 focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,64,175,0.06)] focus:outline-none"
                  />
                  <button type="submit" disabled={loading} className="btn-primary px-6 py-3.5 whitespace-nowrap disabled:opacity-60">
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </RevealBlock>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}
