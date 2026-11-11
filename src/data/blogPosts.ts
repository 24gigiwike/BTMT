import { posts } from 'virtual:btmt-blog';
import type { BlogPost } from '../types';

/** Published articles compiled from content/blog. Drafts are omitted. */
export const BLOG_POSTS: BlogPost[] = posts;
