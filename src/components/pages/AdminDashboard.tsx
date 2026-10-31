import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminRole, BlogPost, ProductItem, CommunityResource, TrainingSession } from '../../types';
import {
  LayoutDashboard,
  Inbox,
  FileText,
  ShoppingBag,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  ShieldCheck,
  LogOut,
  RefreshCw
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    loginAsAdmin,
    logout,
    navigateTo,
    enquiries,
    updateEnquiryStatus,
    contactMessages,
    blogPosts,
    saveBlogPost,
    deleteBlogPost,
    products,
    saveProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    resources,
    saveResource,
    deleteResource,
    trainings,
    showToast
  } = useApp();

  const [activeModule, setActiveModule] = useState<'overview' | 'enquiries' | 'blog' | 'marketplace' | 'community' | 'settings'>('overview');

  // Blog creation/edit state
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  // Product creation/edit state
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);

  // Resource creation/edit state
  const [editingResource, setEditingResource] = useState<Partial<CommunityResource> | null>(null);

  // If not signed in as admin, show an authorized access gate with 1-click administrative login
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="w-full bg-[#F6F8FA] py-24 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md mx-auto px-4 w-full bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-6 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#051449]">BTMT Staff Access</h1>
            <p className="text-xs text-slate-600">
              Authorized administrative privileges are required to view client enquiries, manage
              marketplace products, and edit publications.
            </p>
          </div>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => loginAsAdmin('Super Admin')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors"
            >
              Authorize as Super Admin
            </button>
            <button
              onClick={() => loginAsAdmin('Content Editor')}
              className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Authorize as Content Editor
            </button>
          </div>
        </div>
      </div>
    );
  }

  const adminRole = currentUser.adminRole || 'Super Admin';

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;

  return (
    <div className="w-full bg-[#F6F8FA] min-h-screen">
      {/* Top Admin Bar */}
      <div className="bg-[#051449] text-white border-b border-[#051449]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-tight text-sm">BTMT Administrative Console</span>
            <span className="text-[10px] bg-[#12A9DB] text-[#051449] font-bold px-2 py-0.5 rounded uppercase">
              {adminRole}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-slate-300">{currentUser.fullName}</span>
            {/* Quick Role Switcher for testing */}
            <select
              value={adminRole}
              onChange={(e) => loginAsAdmin(e.target.value as AdminRole)}
              className="bg-white/10 text-white text-[11px] px-2 py-1 rounded border border-white/20 focus:outline-hidden"
              title="Switch Staff Role"
            >
              <option value="Super Admin" className="text-slate-900">Role: Super Admin</option>
              <option value="Content Editor" className="text-slate-900">Role: Content Editor</option>
              <option value="Marketplace Manager" className="text-slate-900">Role: Marketplace Manager</option>
              <option value="Community Manager" className="text-slate-900">Role: Community Manager</option>
            </select>

            <button
              onClick={() => {
                logout();
                navigateTo('/');
              }}
              className="text-slate-300 hover:text-white flex items-center gap-1"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-1">
            <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-xs space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'enquiries', label: `Client Enquiries (${newEnquiriesCount} New)`, icon: Inbox },
                { id: 'blog', label: `Blog Articles (${blogPosts.length})`, icon: FileText },
                { id: 'marketplace', label: `Marketplace & Orders (${orders.length})`, icon: ShoppingBag },
                { id: 'community', label: 'Community & Resources', icon: Users },
                { id: 'settings', label: 'Website Settings', icon: Settings }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveModule(item.id as any);
                      setEditingPost(null);
                      setEditingProduct(null);
                      setEditingResource(null);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                      activeModule === item.id
                        ? 'bg-[#051449] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 space-y-2">
              <div className="font-bold text-[#051449]">Operational Notice</div>
              <p className="leading-relaxed">
                Changes made here persist immediately to local application storage. Public pages
                reflect updates dynamically.
              </p>
            </div>
          </div>

          {/* Main Module Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* OVERVIEW MODULE */}
            {activeModule === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">New Enquiries</div>
                    <div className="text-2xl font-bold text-[#051449] font-mono">{newEnquiriesCount}</div>
                    <div className="text-[11px] text-slate-500">{enquiries.length} total logged</div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">Published Articles</div>
                    <div className="text-2xl font-bold text-[#051449] font-mono">
                      {blogPosts.filter((b) => b.isPublished).length}
                    </div>
                    <div className="text-[11px] text-slate-500">{blogPosts.length} total drafts</div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">Catalog Products</div>
                    <div className="text-2xl font-bold text-[#051449] font-mono">{products.length}</div>
                    <div className="text-[11px] text-emerald-700">All live in store</div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">Orders Placed</div>
                    <div className="text-2xl font-bold text-[#051449] font-mono">{orders.length}</div>
                    <div className="text-[11px] text-[#12A9DB]">₦{orders.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString()} volume</div>
                  </div>
                </div>

                {/* Recent Enquiries Preview */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-[#051449]">Recent Service Enquiries</h2>
                    <button
                      onClick={() => setActiveModule('enquiries')}
                      className="text-xs font-semibold text-[#12A9DB] hover:underline"
                    >
                      View All ({enquiries.length})
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {enquiries.slice(0, 4).map((enq) => (
                      <div key={enq.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="font-bold text-[#051449]">{enq.fullName} · {enq.serviceTitle}</div>
                          <div className="text-slate-500">{enq.email} · {enq.phone} {enq.companyName ? `(${enq.companyName})` : ''}</div>
                          <div className="text-slate-600 line-clamp-1 mt-0.5">{enq.projectDescription}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            enq.status === 'New'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : enq.status === 'Won'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {enq.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ENQUIRIES MODULE */}
            {activeModule === 'enquiries' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[#051449]">Service Enquiries & Leads</h2>
                    <p className="text-xs text-slate-500">
                      Manage client consultation requests and track sales pipeline progress.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 rounded-xl border border-slate-200 bg-[#F6F8FA] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                        <div>
                          <span className="font-mono text-[11px] text-slate-400 font-semibold">{enq.id}</span>
                          <h3 className="text-sm font-bold text-[#051449]">{enq.fullName}</h3>
                          <div className="text-xs text-slate-600">
                            Service: <strong className="text-slate-800">{enq.serviceTitle}</strong>
                            {enq.companyName && ` · Brand: ${enq.companyName}`}
                          </div>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-slate-500">Status:</span>
                          <select
                            value={enq.status}
                            onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                            className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-300 rounded-lg focus:outline-hidden"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Won">Won</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                        {enq.projectDescription}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
                        <div>
                          Email: <a href={`mailto:${enq.email}`} className="text-[#12A9DB] underline">{enq.email}</a> · Phone: {enq.phone}
                        </div>
                        <div>
                          Budget: {enq.estimatedBudget || 'Not specified'} · Preferred: {enq.preferredContactMethod}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOG MODULE */}
            {activeModule === 'blog' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[#051449]">Editorial Articles & Posts</h2>
                    <p className="text-xs text-slate-500">
                      Create, edit, publish, and manage corporate thought leadership articles.
                    </p>
                  </div>
                  {!editingPost && (
                    <button
                      onClick={() =>
                        setEditingPost({
                          id: `blog_${Date.now()}`,
                          slug: `new-article-${Date.now().toString().slice(-4)}`,
                          title: '',
                          category: 'Technology',
                          excerpt: '',
                          content: '',
                          author: currentUser.fullName,
                          authorRole: 'Editorial Desk',
                          publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                          readTime: '4 min read',
                          isPublished: true
                        })
                      }
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Article</span>
                    </button>
                  )}
                </div>

                {editingPost ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!editingPost.title || !editingPost.content) {
                        showToast('Please provide a title and content.', 'error');
                        return;
                      }
                      saveBlogPost(editingPost as BlogPost);
                      setEditingPost(null);
                    }}
                    className="p-6 bg-[#F6F8FA] rounded-xl border border-slate-200 space-y-4 text-xs"
                  >
                    <div className="font-bold text-[#051449] text-sm">
                      {editingPost.id?.startsWith('blog_') ? 'Create New Article' : 'Edit Article'}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={editingPost.title || ''}
                          onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Category</label>
                        <select
                          value={editingPost.category || 'Technology'}
                          onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Business Growth">Business Growth</option>
                          <option value="Branding">Branding</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                          <option value="Media">Media</option>
                          <option value="Entertainment">Entertainment</option>
                          <option value="Company News">Company News</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Summary / Excerpt</label>
                      <textarea
                        rows={2}
                        value={editingPost.excerpt || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Full Article Content</label>
                      <textarea
                        rows={6}
                        required
                        value={editingPost.content || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer font-semibold">
                        <input
                          type="checkbox"
                          checked={editingPost.isPublished}
                          onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.checked })}
                          className="text-[#051449] rounded"
                        />
                        <span>Published on Live Blog</span>
                      </label>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#051449] rounded-lg"
                      >
                        Save Article
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPost(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="py-4 flex items-center justify-between gap-4 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#051449] text-sm">{post.title}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              post.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {post.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <div className="text-slate-500">
                            {post.category} · By {post.author} · {post.publishedAt}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingPost(post)}
                            className="p-1.5 text-slate-600 hover:text-[#051449] hover:bg-slate-100 rounded"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBlogPost(post.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* MARKETPLACE & ORDERS MODULE */}
            {activeModule === 'marketplace' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-[#051449]">Marketplace Products</h2>
                      <p className="text-xs text-slate-500">
                        Administer catalogue products, brand attributions, and prices.
                      </p>
                    </div>
                    {!editingProduct && (
                      <button
                        onClick={() =>
                          setEditingProduct({
                            id: `prod_${Date.now()}`,
                            slug: `new-product-${Date.now().toString().slice(-4)}`,
                            name: '',
                            brand: 'BTMT Media',
                            category: 'Branding & Print',
                            price: 25000,
                            description: '',
                            specifications: ['High quality packaging', 'Inspected by BTMT Quality Team'],
                            inStock: true,
                            stockCount: 20,
                            deliveryInfo: 'Ships within 3 business days nationwide.'
                          })
                        }
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-[#051449] hover:bg-[#081e6a] rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Product</span>
                      </button>
                    )}
                  </div>

                  {editingProduct ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!editingProduct.name || !editingProduct.price) {
                          showToast('Please provide a name and price.', 'error');
                          return;
                        }
                        saveProduct(editingProduct as ProductItem);
                        setEditingProduct(null);
                      }}
                      className="p-6 bg-[#F6F8FA] rounded-xl border border-slate-200 space-y-4 text-xs"
                    >
                      <div className="font-bold text-[#051449] text-sm">Product Information</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Product Name</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.name || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Brand / Vendor</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.brand || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Price (NGN ₦)</label>
                          <input
                            type="number"
                            required
                            value={editingProduct.price || 0}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Available Units</label>
                          <input
                            type="number"
                            required
                            value={editingProduct.stockCount || 0}
                            onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingProduct.description || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button type="submit" className="px-4 py-2 text-xs font-semibold text-white bg-[#051449] rounded-lg">
                          Save Product
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {products.map((prod) => (
                        <div key={prod.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                          <div>
                            <div className="font-bold text-[#051449]">{prod.name}</div>
                            <div className="text-slate-500">
                              Brand: {prod.brand} · ₦{prod.price.toLocaleString()} · Stock: {prod.stockCount} units
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingProduct(prod)}
                              className="p-1.5 text-slate-600 hover:text-[#051449] hover:bg-slate-100 rounded"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Orders Overview */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <h3 className="text-base font-bold text-[#051449]">Customer Orders</h3>
                  {orders.length === 0 ? (
                    <div className="text-xs text-slate-500 py-4 text-center">
                      No customer orders have been completed yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div key={ord.id} className="p-4 rounded-lg border border-slate-200 bg-[#F6F8FA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="font-bold text-[#051449] font-mono">{ord.reference}</div>
                            <div className="text-slate-600">
                              Customer: {ord.customer.fullName} ({ord.customer.phone})
                            </div>
                            <div className="text-slate-500">
                              {ord.items.length} item(s) · Total: ₦{ord.totalAmount.toLocaleString()} · Channel: {ord.paymentMethod}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                              className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-semibold"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Paid">Paid</option>
                              <option value="Processing">Processing</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* COMMUNITY MODULE */}
            {activeModule === 'community' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[#051449]">Community Resources & Access Levels</h2>
                    <p className="text-xs text-slate-500">
                      Upload and manage educational documents and downloadable templates.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {resources.map((res) => (
                    <div key={res.id} className="p-4 rounded-lg border border-slate-200 bg-[#F6F8FA] flex items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="font-bold text-[#051449]">{res.title}</div>
                        <div className="text-slate-500">
                          {res.category} · {res.fileFormat} · Level: <strong className="text-[#12A9DB]">{res.accessLevel}</strong>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={res.accessLevel}
                          onChange={(e) =>
                            saveResource({ ...res, accessLevel: e.target.value as any })
                          }
                          className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-semibold"
                        >
                          <option value="Public">Public</option>
                          <option value="Registered Members">Registered Members</option>
                          <option value="Admin Only">Admin Only</option>
                        </select>
                        <button
                          onClick={() => deleteResource(res.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS MODULE */}
            {activeModule === 'settings' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-xs text-xs">
                <div>
                  <h2 className="text-lg font-bold text-[#051449]">BTMT Global Configuration</h2>
                  <p className="text-slate-500">
                    Official company identifiers, verified addresses, and operational contact values.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Company Registered Name</label>
                    <input
                      type="text"
                      readOnly
                      value="Blissful Touch Media & Technology (BTMT)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Official Slogan</label>
                    <input
                      type="text"
                      readOnly
                      value="Building Authentic Visibility and Promoting Moral and Ethical Excellence"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Head Office Address</label>
                    <input
                      type="text"
                      readOnly
                      value="17 Ajoku Street, By UBA, Wetheral Road, Owerri, Imo State, Nigeria"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                      <input
                        type="text"
                        readOnly
                        value="+234 706 088 2645"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email</label>
                      <input
                        type="text"
                        readOnly
                        value="blissfultouchmedia@gmail.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
