export type BlogCategory =
  | 'All'
  | 'AI'
  | 'Automation'
  | 'Business'
  | 'Marketing'
  | 'Product'
  | 'Engineering'
  | 'News';

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: Exclude<BlogCategory, 'All'>;
  tags: string[];
  coverImage: string;
  author: BlogAuthor;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
}

export const authors: Record<string, BlogAuthor> = {
  sarah: {
    name: 'Sarah Chen',
    role: 'Head of AI Research',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah',
  },
  marcus: {
    name: 'Marcus Williams',
    role: 'Product Lead',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Marcus',
  },
  elena: {
    name: 'Elena Rodriguez',
    role: 'Marketing Director',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Elena',
  },
  james: {
    name: 'James O\'Brien',
    role: 'Senior Engineer',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=James',
  },
  priya: {
    name: 'Priya Sharma',
    role: 'AI Solutions Architect',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya',
  },
};

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How AI Employees Are Reshaping Customer Support in 2026',
    slug: 'ai-employees-reshaping-customer-support',
    description:
      'Explore how autonomous AI Employees are transforming the customer support landscape — reducing response times by 90% while improving satisfaction scores across industries.',
    category: 'AI',
    tags: ['AI', 'Customer Support', 'Automation'],
    coverImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    author: authors.sarah,
    publishedAt: '2026-07-10',
    readingTime: '8 min read',
    featured: true,
  },
  {
    id: '2',
    title: 'The Complete Guide to Building Your First AI-Powered Workflow',
    slug: 'building-first-ai-workflow',
    description:
      'A step-by-step guide to creating automated workflows with AI Employees — from onboarding to deployment, with real-world examples and best practices.',
    category: 'Automation',
    tags: ['Automation', 'Productivity', 'Getting Started'],
    coverImage:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    author: authors.marcus,
    publishedAt: '2026-07-05',
    readingTime: '12 min read',
  },
  {
    id: '3',
    title: '5 Ways AI Can Supercharge Your Marketing Strategy',
    slug: 'ai-marketing-strategy',
    description:
      'From personalized campaigns to predictive analytics — discover how AI Employees can 10x your marketing output without expanding your team.',
    category: 'Marketing',
    tags: ['Marketing', 'AI', 'Growth'],
    coverImage:
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
    author: authors.elena,
    publishedAt: '2026-06-28',
    readingTime: '6 min read',
  },
  {
    id: '4',
    title: 'Introducing Nagriva API v1: Build with Our AI Platform',
    slug: 'nagriva-api-v1-launch',
    description:
      'We\'re excited to launch the Nagriva API. Programmatically create AI Employees, manage Knowledge Bases, send messages, and build custom integrations.',
    category: 'Product',
    tags: ['Product', 'API', 'Engineering'],
    coverImage:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    author: authors.james,
    publishedAt: '2026-07-14',
    readingTime: '5 min read',
  },
  {
    id: '5',
    title: 'Understanding RAG: How AI Employees Use Your Knowledge Base',
    slug: 'understanding-rag-knowledge-base',
    description:
      'A deep dive into Retrieval-Augmented Generation and how Nagriva uses it to make your AI Employees experts on your business, products, and policies.',
    category: 'Engineering',
    tags: ['AI', 'Engineering', 'Technology'],
    coverImage:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    author: authors.priya,
    publishedAt: '2026-06-20',
    readingTime: '10 min read',
  },
  {
    id: '6',
    title: 'Nagriva Raises Series A to Accelerate AI Employee Platform',
    slug: 'nagriva-series-a',
    description:
      'We\'re thrilled to announce our Series A funding round. This investment will fuel product development, expand our team, and accelerate customer growth globally.',
    category: 'News',
    tags: ['News', 'Startups', 'AI'],
    coverImage:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    author: authors.marcus,
    publishedAt: '2026-07-01',
    readingTime: '3 min read',
  },
  {
    id: '7',
    title: 'Automating Sales Outreach: From Lead to Close with AI',
    slug: 'automating-sales-outreach',
    description:
      'Learn how AI Employees can qualify leads, personalize outreach, schedule meetings, and follow up — turning your sales pipeline into an automated engine.',
    category: 'Automation',
    tags: ['Automation', 'Business', 'Sales'],
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    author: authors.elena,
    publishedAt: '2026-06-15',
    readingTime: '7 min read',
  },
  {
    id: '8',
    title: 'Best Practices for Training AI on Your Company Data',
    slug: 'training-ai-company-data',
    description:
      'Ensure your AI Employees deliver accurate, brand-aligned responses by following these data preparation and knowledge base optimization best practices.',
    category: 'AI',
    tags: ['AI', 'Productivity', 'Getting Started'],
    coverImage:
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
    author: authors.sarah,
    publishedAt: '2026-06-10',
    readingTime: '9 min read',
  },
  {
    id: '9',
    title: 'The ROI of AI Employees: A Data-Driven Analysis',
    slug: 'roi-ai-employees',
    description:
      'We analyzed data from 500+ Nagriva customers. Here\'s how AI Employees impact response times, cost savings, and customer satisfaction across industries.',
    category: 'Business',
    tags: ['Business', 'AI', 'Growth'],
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    author: authors.marcus,
    publishedAt: '2026-06-05',
    readingTime: '11 min read',
  },
];

export const categories: BlogCategory[] = [
  'All',
  'AI',
  'Automation',
  'Business',
  'Marketing',
  'Product',
  'Engineering',
  'News',
];

export const trendingTopics = [
  'Artificial Intelligence',
  'AI Employees',
  'Automation',
  'Customer Support',
  'Marketing',
  'Productivity',
  'SEO',
  'Startups',
];

export const popularTags = [
  'AI',
  'Business',
  'Automation',
  'SaaS',
  'Productivity',
  'Marketing',
  'Growth',
  'API',
  'OpenAI',
  'Technology',
];
