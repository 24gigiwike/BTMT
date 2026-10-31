export type ServiceCategory = 'Technology' | 'Media' | 'Entertainment';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  offerings: string[];
  benefits: string[];
  process: { step: string; title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  ctaText: string;
  featured?: boolean;
  imageUrl?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number; // in NGN
  originalPrice?: number;
  description: string;
  specifications: string[];
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  imageUrl?: string;
  deliveryInfo: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface Order {
  id: string;
  reference: string;
  items: CartItem[];
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  totalAmount: number;
  status: 'Pending' | 'Paid' | 'Processing' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Paystack' | 'Flutterwave' | 'Direct Transfer';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Technology' | 'Digital Marketing' | 'Branding' | 'Business Growth' | 'Media' | 'Entertainment' | 'Company News';
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  isPublished: boolean;
  featured?: boolean;
  imageUrl?: string;
}

export interface CommunityResource {
  id: string;
  title: string;
  description: string;
  category: 'Guides & Ebooks' | 'Templates' | 'Strategy' | 'Ethics & Standards';
  accessLevel: 'Public' | 'Registered Members' | 'Admin Only';
  fileFormat: 'PDF' | 'DOCX' | 'ZIP' | 'XLSX';
  fileSize: string;
  publishedAt: string;
  downloadCount: number;
}

export interface TrainingSession {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  instructor: string;
  format: 'Online Webinar' | 'Hands-on Workshop' | 'Hybrid Session';
  accessRequirement: 'Free for Community Members' | 'Open to Public';
  status: 'Upcoming' | 'Completed';
  registrationUrl?: string;
}

export interface ServiceEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  serviceId: string;
  serviceTitle: string;
  projectDescription: string;
  estimatedBudget?: string;
  preferredStartDate?: string;
  preferredContactMethod: 'Email' | 'Phone' | 'WhatsApp';
  status: 'New' | 'Contacted' | 'In Discussion' | 'Won' | 'Closed';
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Responded';
  createdAt: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'Technology' | 'Media & Branding' | 'Event Coverage';
  description: string;
  servicesDelivered: string[];
  imageUrl: string;
  impactMetrics: string;
}

export type AdminRole = 'Super Admin' | 'Content Editor' | 'Marketplace Manager' | 'Community Manager';

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  role: 'member' | 'admin';
  adminRole?: AdminRole;
  brandName?: string;
  areaOfInterest?: string;
  joinedDate: string;
}
