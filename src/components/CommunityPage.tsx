import { useEffect, useState, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import {
  ArrowRight,
  MessageCircle,
  Lightbulb,
  Rocket,
  Heart,
  Star,
  BookOpen,
  Megaphone,
  Globe,
  Users,
  Code2,
  Send,
  ThumbsUp,
  Eye,
  Bookmark,
  Share2,
  CheckCircle2,
  Clock,
  Award,
  Trophy,
  GraduationCap,
  Bug,
  Bot,
  Calendar,
  ArrowDown,
  Shield,
  Target,
  Sparkles,
  Zap,
  Search,
  ChevronRight,
  Flame,
  Medal,
  Handshake,
} from 'lucide-react';
import Footer from './Footer';

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function RevealBlock({ children, className = '', delay = 0 }: {
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

function RevealScale({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function CommunityPage() {
  useEffect(() => {
    document.title = 'Community | Nagriva';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Join the Nagriva community — a place for developers, creators, businesses, and AI enthusiasts to learn, collaborate, and build the future together.');
  }, []);

  return (
    <>
      <main>
        <HeroSection />
        <HubSection />
        <FeedSection />
        <QASection />
        <ShowcaseSection />
        <FeatureRequestsSection />
        <LeaderboardSection />
        <AchievementsSection />
        <EventsSection />
        <ContributorSection />
        <FoundingMembersSection />
        <WallOfFameSection />
        <GuidelinesSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

/* ─── 1 — Hero ────────────────────────────────────────────────────────── */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-royal-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-royal-blue-light/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className={`text-center mb-8 transition-all duration-700 ease-out delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-sm font-medium text-royal-blue">
            <span className="h-2 w-2 rounded-full bg-royal-blue animate-pulse" />
            Community
          </span>
        </div>

        <div className={`text-center max-w-4xl mx-auto mb-12 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h1 className="heading-xl text-deep-black mb-6">
            You're Not Just Using Nagriva.
            <br />
            <span className="text-royal-blue">You're Helping Build It.</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Meet founders, developers, AI enthusiasts, creators, and businesses building the future of AI together.
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a href="#hub" className="btn-primary text-base px-8 py-3.5 gap-2">
            Join Community
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#feed" className="btn-secondary text-base px-8 py-3.5">
            Start a Discussion
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── 2 — Community Hub ───────────────────────────────────────────────── */

const hubCategories = [
  { icon: MessageCircle, title: 'Discussions', description: 'Ask questions. Help others. Share ideas.', color: 'text-blue-500' },
  { icon: Lightbulb, title: 'Ideas & Feedback', description: 'Suggest features. Vote on community ideas.', color: 'text-amber-500' },
  { icon: Rocket, title: 'Showcase', description: 'Share AI Employees, automations, and success stories.', color: 'text-emerald-500' },
  { icon: BookOpen, title: 'Tutorials', description: 'Community-written guides and walkthroughs.', color: 'text-violet-500' },
  { icon: Calendar, title: 'Events', description: 'Live Nagriva Live sessions, meetups, and product demos.', color: 'text-rose-500' },
  { icon: Megaphone, title: 'Announcements', description: 'Official updates from the Nagriva team.', color: 'text-sky-500' },
];

function HubSection() {
  return (
    <section id="hub" className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Globe className="h-3.5 w-3.5" />
              Hub
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Community Hub</h2>
            <p className="text-body max-w-2xl mx-auto">
              Everything you need to learn, connect, and grow — all in one place.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {hubCategories.map((cat, i) => (
            <RevealBlock key={cat.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-royal-blue/20 hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.1)] cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 ${cat.color} transition-all duration-300 group-hover:scale-110 flex-shrink-0`}>
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-deep-black mb-1">{cat.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <ChevronRight className="h-4 w-4 text-gray-300 transition-all duration-300 group-hover:text-royal-blue group-hover:translate-x-1" />
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3 — Community Feed ──────────────────────────────────────────────── */

const feedPosts = [
  { id: 1, name: 'Sarah Chen', time: '2 hours ago', category: 'Tutorial', categoryColor: 'bg-violet-50 text-violet-600', title: 'How I automated my entire customer support with Nagriva AI', likes: 42, comments: 12 },
  { id: 2, name: 'Marcus Weber', time: '5 hours ago', category: 'Showcase', categoryColor: 'bg-emerald-50 text-emerald-600', title: 'Just launched my 3rd AI Employee — this one handles bookings!', likes: 38, comments: 8 },
  { id: 3, name: 'Amina Osei', time: '1 day ago', category: 'Achievement', categoryColor: 'bg-amber-50 text-amber-600', title: 'Reached Top Contributor status after helping 50+ members!', likes: 95, comments: 24 },
  { id: 4, name: 'David Park', time: '1 day ago', category: 'Feature Request', categoryColor: 'bg-blue-50 text-blue-600', title: 'Suggestion: Add webhook support for custom integrations', likes: 27, comments: 6 },
  { id: 5, name: 'Elena Rossi', time: '2 days ago', category: 'Discussion', categoryColor: 'bg-gray-100 text-gray-600', title: 'Best practices for training AI Employees on industry-specific knowledge', likes: 31, comments: 15 },
];

function FeedSection() {
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});

  const toggleLike = useCallback((id: number) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <section id="feed" className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Flame className="h-3.5 w-3.5" />
              Feed
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Community Feed</h2>
            <p className="text-body max-w-2xl mx-auto">
              See what the community is sharing, building, and discussing.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-2xl mx-auto space-y-4">
          {feedPosts.map((post, i) => (
            <RevealBlock key={post.id} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_4px_20px_-4px_rgba(30,64,175,0.06)]">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-royal-blue/20 to-royal-blue-light/20 flex items-center justify-center text-xs font-bold text-royal-blue flex-shrink-0">
                    {post.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-deep-black truncate">{post.name}</p>
                    <p className="text-xs text-gray-400">{post.time}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex-shrink-0 ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <p className="text-[15px] font-medium text-deep-black leading-snug mb-4">{post.title}</p>

                {/* Actions */}
                <div className="flex items-center gap-5 text-gray-400">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-200 ${likedPosts[post.id] ? 'text-royal-blue' : 'hover:text-royal-blue'}`}
                  >
                    <Heart className={`h-4 w-4 ${likedPosts[post.id] ? 'fill-royal-blue' : ''}`} />
                    {post.likes + (likedPosts[post.id] ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium hover:text-royal-blue transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium hover:text-royal-blue transition-colors">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium hover:text-royal-blue transition-colors ml-auto">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4 — Questions & Answers ─────────────────────────────────────────── */

const questions = [
  { title: 'How do I train my AI Employee on my own documents?', replies: 8, views: 234, solved: true, lastActivity: '3 hours ago' },
  { title: 'How do I connect WhatsApp to my AI Employee?', replies: 12, views: 567, solved: true, lastActivity: '1 day ago' },
  { title: 'Is there an API for custom integrations?', replies: 5, views: 189, solved: false, lastActivity: '6 hours ago' },
  { title: 'Can I use Nagriva for multi-language support?', replies: 3, views: 98, solved: false, lastActivity: '2 days ago' },
  { title: 'How do I set up automatic handoff to a human agent?', replies: 7, views: 312, solved: true, lastActivity: '12 hours ago' },
];

function QASection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Search className="h-3.5 w-3.5" />
              Q&A
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Questions & Answers</h2>
            <p className="text-body max-w-2xl mx-auto">
              Get help from the community. Find answers to common questions.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-3xl mx-auto space-y-3">
          {questions.map((q, i) => (
            <RevealBlock key={q.title} delay={i * 50}>
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-sm cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-[15px] font-semibold text-deep-black leading-snug mb-2 group-hover:text-royal-blue transition-colors">{q.title}</h3>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <MessageCircle className="h-3 w-3" />
                        {q.replies} replies
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Eye className="h-3 w-3" />
                        {q.views} views
                      </span>
                      <span className="text-xs text-gray-400">Last activity: {q.lastActivity}</span>
                    </div>
                  </div>
                  {q.solved && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-600 tracking-wider uppercase flex-shrink-0">
                      <CheckCircle2 className="h-3 w-3" />
                      Solved
                    </span>
                  )}
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5 — Showcase ────────────────────────────────────────────────────── */

const showcaseProjects = [
  { name: 'Customer Support Bot', creator: 'Sarah Chen', type: 'AI Employee', likes: 42, views: 312, color: 'from-blue-500/10 to-violet-500/10' },
  { name: 'Booking Automation', creator: 'Marcus Weber', type: 'Automation', likes: 38, views: 267, color: 'from-emerald-500/10 to-teal-500/10' },
  { name: 'Sales Lead Qualifier', creator: 'David Park', type: 'AI Employee', likes: 31, views: 198, color: 'from-amber-500/10 to-orange-500/10' },
  { name: 'Multi-Language Support', creator: 'Elena Rossi', type: 'Integration', likes: 27, views: 156, color: 'from-rose-500/10 to-pink-500/10' },
  { name: 'Restaurant Order Handler', creator: 'Amina Osei', type: 'AI Employee', likes: 45, views: 423, color: 'from-sky-500/10 to-cyan-500/10' },
  { name: 'Real Estate Inquiry Bot', creator: 'Tom Müller', type: 'AI Employee', likes: 22, views: 134, color: 'from-violet-500/10 to-purple-500/10' },
];

function ShowcaseSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Rocket className="h-3.5 w-3.5" />
              Showcase
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Community Showcase</h2>
            <p className="text-body max-w-2xl mx-auto">
              See what the community has built with Nagriva.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {showcaseProjects.map((project, i) => (
            <RevealBlock key={project.name} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:border-royal-blue/15 hover:shadow-[0_8px_32px_-8px_rgba(30,64,175,0.06)] cursor-pointer h-full flex flex-col">
                {/* Cover */}
                <div className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                  <Rocket className="h-8 w-8 text-gray-300 group-hover:text-royal-blue transition-colors" />
                </div>
                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 tracking-wider uppercase">{project.type}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-deep-black mb-1">{project.name}</h3>
                  <p className="text-xs text-gray-400 mb-4 flex-1">by {project.creator}</p>
                  <div className="flex items-center gap-4 text-gray-400 pt-3 border-t border-gray-50">
                    <span className="flex items-center gap-1 text-xs"><Heart className="h-3 w-3" />{project.likes}</span>
                    <span className="flex items-center gap-1 text-xs"><Eye className="h-3 w-3" />{project.views}</span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6 — Feature Requests ────────────────────────────────────────────── */

const featureRequests = [
  { id: 1, title: 'Webhook support for custom integrations', category: 'Integration', votes: 47, comments: 12, status: 'planned' },
  { id: 2, title: 'Multi-language AI Employee training', category: 'AI', votes: 35, comments: 8, status: 'in-progress' },
  { id: 3, title: 'Custom branding for chat widgets', category: 'Design', votes: 28, comments: 5, status: 'under-review' },
  { id: 4, title: 'API rate limit increase for enterprise', category: 'API', votes: 22, comments: 3, status: 'released' },
  { id: 5, title: 'Team collaboration workspace', category: 'Product', votes: 41, comments: 14, status: 'planned' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  'under-review': { label: 'Under Review', color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200' },
  'planned': { label: 'Planned', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  'in-progress': { label: 'In Progress', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  'released': { label: 'Released', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
};

function FeatureRequestsSection() {
  const [votedFeatures, setVotedFeatures] = useState<Record<number, boolean>>({});

  const toggleVote = useCallback((id: number) => {
    setVotedFeatures(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Lightbulb className="h-3.5 w-3.5" />
              Features
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Feature Requests</h2>
            <p className="text-body max-w-2xl mx-auto">
              Vote on ideas. Help us prioritize what matters most.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-3xl mx-auto space-y-3">
          {featureRequests.map((feat, i) => {
            const status = statusConfig[feat.status];
            const isVoted = votedFeatures[feat.id];
            return (
              <RevealBlock key={feat.id} delay={i * 50}>
                <div className="group rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    {/* Vote button */}
                    <button
                      onClick={() => toggleVote(feat.id)}
                      className={`flex flex-col items-center justify-center min-w-[52px] h-14 rounded-xl border transition-all duration-200 flex-shrink-0 ${
                        isVoted
                          ? 'bg-royal-blue text-white border-royal-blue shadow-sm shadow-royal-blue/20'
                          : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-royal-blue/30 hover:text-royal-blue'
                      }`}
                    >
                      <ThumbsUp className="h-3.5 w-3.5 mb-0.5" />
                      <span className="text-xs font-bold">{feat.votes + (isVoted ? 1 : 0)}</span>
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="text-sm sm:text-[15px] font-semibold text-deep-black leading-snug">{feat.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${status.color} ${status.bg} ${status.border} flex-shrink-0`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-400">{feat.category}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MessageCircle className="h-3 w-3" />
                          {feat.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── 7 — Leaderboard ─────────────────────────────────────────────────── */

const topContributors = [
  { rank: 1, name: 'Amina Osei', country: 'Ghana', points: 1240, answers: 45, tutorials: 8, ideas: 12, badge: '🏆' },
  { rank: 2, name: 'Sarah Chen', country: 'Singapore', points: 980, answers: 38, tutorials: 12, ideas: 6, badge: '🥈' },
  { rank: 3, name: 'Marcus Weber', country: 'Germany', points: 870, answers: 29, tutorials: 6, ideas: 15, badge: '🥉' },
  { rank: 4, name: 'David Park', country: 'South Korea', points: 650, answers: 22, tutorials: 4, ideas: 8, badge: '' },
  { rank: 5, name: 'Elena Rossi', country: 'Italy', points: 540, answers: 18, tutorials: 3, ideas: 11, badge: '' },
  { rank: 6, name: 'Tom Müller', country: 'Austria', points: 420, answers: 15, tutorials: 2, ideas: 7, badge: '' },
];

function LeaderboardSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Trophy className="h-3.5 w-3.5" />
              Leaderboard
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Top Contributors</h2>
            <p className="text-body max-w-2xl mx-auto">
              The people making the Nagriva community better every day.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl md:rounded-3xl border border-gray-100 bg-white overflow-hidden">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-[60px_1fr_80px_80px_80px] gap-4 px-6 py-3 bg-gray-50/80 border-b border-gray-50">
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Rank</span>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Member</span>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase text-right">Points</span>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase text-right">Answers</span>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase text-right">Tutorials</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-50">
              {topContributors.map((user, i) => (
                <RevealBlock key={user.rank} delay={i * 50}>
                  <div className="grid grid-cols-[40px_1fr] sm:grid-cols-[60px_1fr_80px_80px_80px] gap-4 items-center px-6 py-4 hover:bg-gray-50/30 transition-colors">
                    <span className={`text-sm font-bold ${user.rank <= 3 ? 'text-royal-blue' : 'text-gray-400'}`}>
                      {user.badge ? <span className="text-lg">{user.badge}</span> : `#${user.rank}`}
                    </span>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal-blue/15 to-royal-blue-light/15 flex items-center justify-center text-[10px] font-bold text-royal-blue flex-shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-deep-black truncate">{user.name}</p>
                        <p className="text-[11px] text-gray-400">{user.country}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-deep-black text-right">{user.points.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 text-right hidden sm:block">{user.answers}</span>
                    <span className="text-sm text-gray-500 text-right hidden sm:block">{user.tutorials}</span>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 8 — Achievements ────────────────────────────────────────────────── */

const badges = [
  { icon: Medal, title: 'Early Member', description: 'Joined during the founding phase', progress: 100, color: 'text-amber-500' },
  { icon: Trophy, title: 'Top Contributor', description: 'Answered 50+ community questions', progress: 72, color: 'text-royal-blue' },
  { icon: GraduationCap, title: 'Tutorial Master', description: 'Published 5+ community tutorials', progress: 40, color: 'text-violet-500' },
  { icon: MessageCircle, title: 'Community Helper', description: 'Received 100+ helpful votes', progress: 85, color: 'text-emerald-500' },
  { icon: Bug, title: 'Bug Hunter', description: 'Reported 10+ verified bugs', progress: 30, color: 'text-rose-500' },
  { icon: Lightbulb, title: 'Idea Creator', description: 'Submitted 20+ feature ideas', progress: 55, color: 'text-amber-500' },
  { icon: Bot, title: 'AI Builder', description: 'Created 3+ AI Employees', progress: 67, color: 'text-sky-500' },
];

function AchievementsSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Award className="h-3.5 w-3.5" />
              Achievements
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Community Badges</h2>
            <p className="text-body max-w-2xl mx-auto">
              Earn badges as you contribute and grow within the community.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {badges.map((badge, i) => (
            <RevealBlock key={badge.title} delay={i * 50}>
              <div className="group rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-sm h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 ${badge.color} transition-all duration-300 group-hover:scale-110`}>
                    <badge.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-deep-black">{badge.title}</h3>
                    <p className="text-[11px] text-gray-400 leading-snug">{badge.description}</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-gray-400">{badge.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-royal-blue rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 9 — Events ──────────────────────────────────────────────────────── */

const events = [
  { title: 'Getting Started with Nagriva AI', type: 'Nagriva Live', date: 'July 24, 2026', time: '2:00 PM UTC', spots: '120 spots' },
  { title: 'Community Q&A with the Founder', type: 'Live Q&A', date: 'August 1, 2026', time: '5:00 PM UTC', spots: '80 spots' },
  { title: 'AI Employee Builder Workshop', type: 'Workshop', date: 'August 8, 2026', time: '3:00 PM UTC', spots: '50 spots' },
  { title: 'Nagriva v2 Feature Preview', type: 'Product Launch', date: 'August 15, 2026', time: '4:00 PM UTC', spots: '200 spots' },
];

function EventsSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Calendar className="h-3.5 w-3.5" />
              Events
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Upcoming Events</h2>
            <p className="text-body max-w-2xl mx-auto">
              Join live Nagriva Live sessions, workshops, and community meetups.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {events.map((event, i) => (
            <RevealBlock key={event.title} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-royal-blue/15 hover:shadow-sm cursor-pointer h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-royal-blue/[0.06] text-[10px] font-bold text-royal-blue tracking-wider uppercase">{event.type}</span>
                </div>
                <h3 className="text-base font-semibold text-deep-black mb-3 leading-snug">{event.title}</h3>
                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                  <span>{event.date} · {event.time}</span>
                  <span className="text-emerald-600 font-medium">{event.spots}</span>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 10 — Become a Contributor ───────────────────────────────────────── */

function ContributorSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div ref={ref} className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
                  <Handshake className="h-3.5 w-3.5" />
                  Contribute
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-black tracking-tight leading-tight mb-5">
                  Help Shape the Future of Nagriva
                </h2>
                <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
                  Whether you write tutorials, answer questions, report bugs, organize events, or simply help another member — every contribution helps build a stronger community.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-royal-blue rounded-lg transition-all duration-200 hover:bg-royal-blue-dark hover:shadow-lg hover:shadow-royal-blue/20 active:scale-[0.98]">
                    <Handshake className="h-4 w-4" />
                    Become a Contributor
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]">
                    <BookOpen className="h-4 w-4" />
                    Write Your First Tutorial
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-royal-blue/8 to-royal-blue-light/8 rounded-3xl blur-xl" />
                <div className="relative rounded-2xl border border-gray-100 bg-white p-8 space-y-4">
                  {[
                    { icon: MessageCircle, text: 'Answer community questions' },
                    { icon: BookOpen, text: 'Write helpful tutorials' },
                    { icon: Bug, text: 'Report and verify bugs' },
                    { icon: Lightbulb, text: 'Submit feature ideas' },
                    { icon: Calendar, text: 'Organize community events' },
                    { icon: Heart, text: 'Welcome new members' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-blue/[0.06] text-royal-blue flex-shrink-0">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-gray-600">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── 11 — Founding Members ───────────────────────────────────────────── */

function FoundingMembersSection() {
  const slots = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Star className="h-3.5 w-3.5" />
              Founding Community
            </span>
            <h2 className="heading-lg text-deep-black mb-5">
              Become One of the First 100 Community Members
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              The first 100 members will forever receive the Founding Member badge. They will always be recognized as the people who helped shape the Nagriva community from the beginning.
            </p>
          </div>
        </RevealBlock>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 sm:gap-2.5">
            {slots.map((num) => (
              <RevealBlock key={num} delay={Math.min(num * 8, 600)}>
                <div className="group relative aspect-square rounded-xl border border-gray-200 bg-white flex flex-col items-center justify-center transition-all duration-300 hover:border-royal-blue/30 hover:bg-royal-blue/[0.03] hover:shadow-[0_4px_20px_-4px_rgba(30,64,175,0.12)] cursor-default overflow-hidden">
                  <div className="group-hover:opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center px-1">
                    <span className="text-[10px] sm:text-xs font-bold text-gray-200">{num}</span>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-royal-blue/[0.04] px-1">
                    <span className="text-[8px] sm:text-[9px] font-bold text-royal-blue leading-tight text-center">Reserved</span>
                    <span className="text-[6px] sm:text-[7px] text-gray-400 text-center leading-tight mt-0.5 hidden sm:block">Future Member</span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 12 — Wall of Fame ───────────────────────────────────────────────── */

const hallMembers = [
  { name: 'Amina Osei', country: 'Ghana', badge: '🏆 Top Contributor', since: 'Jan 2026', highlight: '1240 points · 45 answers · 8 tutorials' },
  { name: 'Sarah Chen', country: 'Singapore', badge: '🎓 Tutorial Master', since: 'Feb 2026', highlight: '980 points · 38 answers · 12 tutorials' },
  { name: 'Marcus Weber', country: 'Germany', badge: '💡 Idea Creator', since: 'Jan 2026', highlight: '870 points · 29 answers · 15 ideas' },
  { name: 'David Park', country: 'South Korea', badge: '🐞 Bug Hunter', since: 'Mar 2026', highlight: '650 points · 22 answers · 4 tutorials' },
];

function WallOfFameSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              Hall of Fame
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Community Hall of Fame</h2>
            <p className="text-body max-w-2xl mx-auto">
              Recognizing the members who go above and beyond.
            </p>
          </div>
        </RevealBlock>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {hallMembers.map((member, i) => (
            <RevealBlock key={member.name} delay={i * 60}>
              <div className="group rounded-2xl border border-gray-100 bg-white p-6 text-center transition-all duration-300 hover:border-royal-blue/15 hover:shadow-sm h-full">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-royal-blue/15 to-royal-blue-light/15 flex items-center justify-center text-sm font-bold text-royal-blue mx-auto mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-sm font-semibold text-deep-black mb-0.5">{member.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{member.country}</p>
                <span className="inline-block px-2.5 py-1 rounded-full bg-royal-blue/[0.06] text-[10px] font-bold text-royal-blue tracking-wider mb-3">{member.badge}</span>
                <p className="text-[11px] text-gray-400 mb-1">Member since {member.since}</p>
                <p className="text-[11px] text-gray-500 leading-snug">{member.highlight}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 13 — Community Guidelines ───────────────────────────────────────── */

function GuidelinesSection() {
  const guidelines = [
    'Respect everyone.',
    'Help others.',
    'Share knowledge.',
    'Stay constructive.',
    'Celebrate great work.',
    'Build together.',
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Shield className="h-3.5 w-3.5" />
              Guidelines
            </span>
            <h2 className="heading-lg text-deep-black mb-8">Community Guidelines</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {guidelines.map((g, i) => (
                <RevealBlock key={g} delay={i * 50}>
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-royal-blue flex-shrink-0" />
                    <span className="text-sm font-medium text-deep-black">{g}</span>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ─── 14 — Community Stats ────────────────────────────────────────────── */

const communityStats = [
  { label: 'Members', value: '1,240' },
  { label: 'Discussions', value: '3,890' },
  { label: 'Questions Answered', value: '2,156' },
  { label: 'Tutorials', value: '87' },
  { label: 'Projects Shared', value: '124' },
  { label: 'Events', value: '18' },
  { label: 'Ideas Submitted', value: '312' },
];

function StatsSection() {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <RevealBlock>
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-royal-blue/[0.04] border border-royal-blue/10 rounded-full text-xs font-semibold text-royal-blue tracking-[0.15em] uppercase mb-5">
              <Zap className="h-3.5 w-3.5" />
              Stats
            </span>
            <h2 className="heading-lg text-deep-black mb-5">Community Stats</h2>
            <p className="text-body max-w-2xl mx-auto">
              The numbers behind our growing community.
            </p>
          </div>
        </RevealBlock>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {communityStats.map((stat, i) => (
            <RevealBlock key={stat.label} delay={i * 50}>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center transition-all duration-300 hover:border-royal-blue/15 hover:shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-deep-black tracking-tight mb-1">{stat.value}</p>
                <p className="text-xs font-medium text-gray-400">{stat.label}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 15 — Final CTA ──────────────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <RevealBlock>
          <div className="relative rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royal-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="relative">
              <h2 className="heading-lg text-deep-black mb-4">
                Together We Build{' '}
                <span className="text-royal-blue">Better AI.</span>
              </h2>
              <p className="text-body max-w-xl mx-auto mb-4">
                Nagriva grows because of its community. Every tutorial. Every answer. Every idea. Every discussion.
              </p>
              <p className="text-[15px] text-gray-400 mb-8">Every contribution matters.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#hub" className="btn-primary text-base px-8 py-3.5 gap-2">
                  Join Community
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#feed" className="btn-secondary text-base px-8 py-3.5">
                  Start Your First Discussion
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
