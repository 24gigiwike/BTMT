import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatBookPrice } from '../../utils/formatBookPrice';
import { AdminRole, BlogPost, ProductItem, PartnerCompany, TestimonialItem, CommunityResource } from '../../types';
import {
  LayoutDashboard,
  Inbox,
  FileText,
  ShoppingBag,
  Briefcase,
  MessageSquare,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  ShieldCheck,
  LogOut,
  Star
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
    partners,
    savePartner,
    deletePartner,
    testimonials,
    saveTestimonial,
    deleteTestimonial,
    orders,
    updateOrderStatus,
    resources,
    saveResource,
    deleteResource,
    communityInviteUrl,
    setCommunityInviteUrl,
    showToast
  } = useApp();

  const [inviteUrlInput, setInviteUrlInput] = useState(communityInviteUrl);
  const [inviteUrlError, setInviteUrlError] = useState('');

  const [activeModule, setActiveModule] = useState<
    'overview' | 'enquiries' | 'blog' | 'marketplace' | 'partners' | 'testimonials' | 'community' | 'settings'
  >('overview');

  // Blog creation/edit state
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  // Product creation/edit state
  const [editingProduct, setEditingProduct] = useState<Partial<ProductItem> | null>(null);

  // Partner creation/edit state
  const [editingPartner, setEditingPartner] = useState<Partial<PartnerCompany> | null>(null);

  // Testimonial creation/edit state
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<TestimonialItem> | null>(null);

  // If not signed in as admin, show an authorized access gate with 1-click administrative login
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="w-full bg-[#F6F8FA] py-24 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md mx-auto px-4 w-full bg-white border border-slate-200 p-8 text-center space-y-6 shadow-sm">
          <div className="w-14 h-14 bg-blue-50 text-blue-800 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#051449]">BTMT Staff Access</h1>
            <p className="text-xs text-slate-600">
              Authorized administrative privileges are required to view client enquiries, manage
              marketplace publications, update partners, and edit testimonials.
            </p>
          </div>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => loginAsAdmin('Super Admin')}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors"
            >
              Authorize as Super Admin
            </button>
            <button
              onClick={() => loginAsAdmin('Content Editor')}
              className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
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
    <div className="w-full bg-[#F6F8FA] min-h-screen text-[#242A35]">
      {/* Top Admin Bar */}
      <div className="bg-[#051449] text-white border-b border-[#051449]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-tight text-sm">BTMT Administrative Console</span>
            <span className="text-[10px] bg-[#12A9DB] text-[#051449] font-bold px-2 py-0.5 uppercase">
              {adminRole}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-slate-300">{currentUser.fullName}</span>
            {/* Quick Role Switcher for testing */}
            <select
              value={adminRole}
              onChange={(e) => loginAsAdmin(e.target.value as AdminRole)}
              className="bg-white/10 text-white text-[11px] px-2 py-1 border border-white/20 focus:outline-hidden"
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
            <div className="bg-white border border-slate-200 p-2 shadow-xs space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'enquiries', label: `Client Enquiries (${newEnquiriesCount} New)`, icon: Inbox },
                { id: 'blog', label: `Blog Articles (${blogPosts.length})`, icon: FileText },
                { id: 'marketplace', label: `Publications & Books (${products.length})`, icon: ShoppingBag },
                { id: 'partners', label: `Partner Marquee (${partners.length})`, icon: Briefcase },
                { id: 'testimonials', label: `Client Testimonials (${testimonials.length})`, icon: MessageSquare },
                { id: 'community', label: 'Community Invitation Link', icon: Users },
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
                      setEditingPartner(null);
                      setEditingTestimonial(null);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold transition-colors text-left ${
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

            <div className="p-4 bg-white border border-slate-200 text-xs text-slate-500 space-y-2">
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
                  <div className="bg-white p-5 border border-slate-200 shadow-xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">New Enquiries</div>
                    <div className="text-2xl font-bold text-[#051449] font-mono">{newEnquiriesCount}</div>
                    <div className="text-[11px] text-slate-500">{enquiries.length} total logged</div>
                  </div>

                  <div className="bg-white p-5 border border-slate-200 shadow-xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">Published Articles</div>
                    <div className="text-2xl font-bold text-[#051449] font-mono">
                      {blogPosts.filter((b) => b.isPublished).length}
                    </div>
                    <div className="text-[11px] text-slate-500">{blogPosts.length} total drafts</div>
                  </div>

                  <div className="bg-white p-5 border border-slate-200 shadow-xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">Catalog Books</div>
                    <div className="text-2xl font-bold text-[#051449] font-mono">{products.length}</div>
                    <div className="text-[11px] text-[#12A9DB] font-medium">Selar Direct Links</div>
                  </div>

                  <div className="bg-white p-5 border border-slate-200 shadow-xs space-y-1">
                    <div className="text-xs text-slate-500 font-medium">Partner Logos</div>
                    <div className="text-2xl font-bold text-[#051449] font-mono">{partners.length}</div>
                    <div className="text-[11px] text-[#12A9DB]">{testimonials.length} testimonials</div>
                  </div>
                </div>

                {/* Recent Enquiries Preview */}
                <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-[#051449]">Recent Service Enquiries</h2>
                    <button
                      onClick={() => setActiveModule('enquiries')}
                      className="text-xs font-semibold text-[#12A9DB] hover:underline"
                    >
                      View All ({enquiries.length}) →
                    </button>
                  </div>
                  {enquiries.length === 0 ? (
                    <div className="text-xs text-slate-500 py-4 text-center">No service enquiries submitted yet.</div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {enquiries.slice(0, 4).map((enq) => (
                        <div key={enq.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                          <div>
                            <div className="font-bold text-slate-900">{enq.fullName}</div>
                            <div className="text-slate-500">{enq.serviceTitle} · {enq.email}</div>
                          </div>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                              enq.status === 'New'
                                ? 'bg-amber-100 text-amber-800'
                                : enq.status === 'Contacted' || enq.status === 'In Discussion'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {enq.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ENQUIRIES MODULE */}
            {activeModule === 'enquiries' && (
              <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#051449]">Client Project Enquiries</h2>
                  <span className="text-xs text-slate-500">{enquiries.length} submissions recorded</span>
                </div>

                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div key={enq.id} className="p-4 border border-slate-200 bg-[#F6F8FA] space-y-3 text-xs">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-bold text-sm text-[#051449]">{enq.fullName}</div>
                          <div className="text-slate-600">
                            Email: {enq.email} · Phone: {enq.phone}
                          </div>
                          {enq.companyName && <div className="text-slate-500">Company: {enq.companyName}</div>}
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={enq.status}
                            onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                            className="px-2.5 py-1 bg-white border border-slate-300 text-xs font-semibold"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Won">Won</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200/80">
                        <div className="font-semibold text-slate-800">Service: {enq.serviceTitle}</div>
                        <div className="text-slate-600 mt-1 whitespace-pre-wrap">{enq.projectDescription}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PARTNERS MODULE (Manage Logo Marquee) */}
            {activeModule === 'partners' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-[#051449]">Partner & Client Organizations</h2>
                      <p className="text-xs text-slate-500">
                        Administer logos displayed in the homepage infinite marquee ticker.
                      </p>
                    </div>
                    {!editingPartner && (
                      <button
                        onClick={() =>
                          setEditingPartner({
                            id: `partner_${Date.now()}`,
                            name: '',
                            category: 'Corporate Partner',
                            logoUrl: ''
                          })
                        }
                        className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Partner</span>
                      </button>
                    )}
                  </div>

                  {editingPartner ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!editingPartner.name) {
                          showToast('Please provide a partner name.', 'error');
                          return;
                        }
                        savePartner(editingPartner as PartnerCompany);
                        setEditingPartner(null);
                      }}
                      className="p-6 bg-[#F6F8FA] border border-slate-200 space-y-4 text-xs"
                    >
                      <div className="font-bold text-[#051449] text-sm">Partner Details</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Company / Organization Name</label>
                          <input
                            type="text"
                            required
                            value={editingPartner.name || ''}
                            onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Category / Sector</label>
                          <input
                            type="text"
                            value={editingPartner.category || ''}
                            onChange={(e) => setEditingPartner({ ...editingPartner, category: e.target.value })}
                            placeholder="e.g. Technology Partner, Creative Client"
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Logo Image URL</label>
                        <input
                          type="url"
                          value={editingPartner.logoUrl || ''}
                          onChange={(e) => setEditingPartner({ ...editingPartner, logoUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button type="submit" className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#051449]">
                          Save Partner
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPartner(null)}
                          className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {partners.map((partner) => (
                        <div key={partner.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-3">
                            {partner.logoUrl ? (
                              <img src={partner.logoUrl} alt={partner.name} className="h-6 w-auto max-w-[80px] object-contain" />
                            ) : (
                              <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                                {partner.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-[#051449]">{partner.name}</div>
                              <div className="text-slate-500">{partner.category}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingPartner(partner)}
                              className="p-1.5 text-slate-600 hover:text-[#051449] hover:bg-slate-100"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deletePartner(partner.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TESTIMONIALS MODULE */}
            {activeModule === 'testimonials' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-[#051449]">Client Testimonials</h2>
                      <p className="text-xs text-slate-500">
                        Administer the quotes featured in the Rialto editorial review section on the homepage.
                      </p>
                    </div>
                    {!editingTestimonial && (
                      <button
                        onClick={() =>
                          setEditingTestimonial({
                            id: `test_${Date.now()}`,
                            clientName: '',
                            role: 'Managing Director',
                            company: '',
                            quote: '',
                            rating: 5,
                            serviceCategory: 'Technology & Digital'
                          })
                        }
                        className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Testimonial</span>
                      </button>
                    )}
                  </div>

                  {editingTestimonial ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!editingTestimonial.clientName || !editingTestimonial.quote) {
                          showToast('Please provide a client name and quote.', 'error');
                          return;
                        }
                        saveTestimonial(editingTestimonial as TestimonialItem);
                        setEditingTestimonial(null);
                      }}
                      className="p-6 bg-[#F6F8FA] border border-slate-200 space-y-4 text-xs"
                    >
                      <div className="font-bold text-[#051449] text-sm">Testimonial Details</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Client Name</label>
                          <input
                            type="text"
                            required
                            value={editingTestimonial.clientName || ''}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Role & Title</label>
                          <input
                            type="text"
                            value={editingTestimonial.role || ''}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Company / Brand Name</label>
                          <input
                            type="text"
                            value={editingTestimonial.company || ''}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Service Delivered</label>
                          <input
                            type="text"
                            value={editingTestimonial.serviceCategory || ''}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, serviceCategory: e.target.value })}
                            placeholder="e.g. Website Development, Branding"
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Editorial Quote</label>
                        <textarea
                          rows={4}
                          required
                          value={editingTestimonial.quote || ''}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button type="submit" className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#051449]">
                          Save Testimonial
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTestimonial(null)}
                          className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {testimonials.map((item) => (
                        <div key={item.id} className="py-4 space-y-2 text-xs">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="font-bold text-[#051449] text-sm">{item.clientName}</div>
                              <div className="text-slate-500">
                                {item.role} · <span className="font-semibold text-slate-700">{item.company}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setEditingTestimonial(item)}
                                className="p-1.5 text-slate-600 hover:text-[#051449] hover:bg-slate-100"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTestimonial(item.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <blockquote className="text-slate-600 italic border-l-2 border-[#12A9DB] pl-3 py-0.5">
                            "{item.quote}"
                          </blockquote>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PUBLICATIONS & MARKETPLACE MODULE */}
            {activeModule === 'marketplace' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-[#051449]">Published Books &amp; Selar Links</h2>
                      <p className="text-xs text-slate-500">
                        Manage published book titles, authors, prices, formats, cover images, and direct Selar checkout links.
                      </p>
                    </div>
                    {!editingProduct && (
                      <button
                        onClick={() =>
                          setEditingProduct({
                            id: `book_${Date.now()}`,
                            slug: `book-${Date.now().toString().slice(-4)}`,
                            name: '',
                            author: 'Michael C. George',
                            brand: 'Michael C. George',
                            category: 'Digital Book',
                            format: 'Downloadable (Digital)',
                            price: 0,
                            currency: 'NGN',
                            currencySymbol: '₦',
                            isFree: true,
                            selarUrl: 'https://selar.com/',
                            description: '',
                            publicationDetails: 'Downloadable (Digital)',
                            specifications: ['Author: Michael C. George', 'Format: Downloadable (Digital)'],
                            inStock: true,
                            stockCount: 999,
                            isPurchasable: true,
                            imageUrl: '',
                            deliveryInfo: 'Digital checkout and fulfillment via Selar.'
                          })
                        }
                        className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Publication</span>
                      </button>
                    )}
                  </div>

                  {editingProduct ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!editingProduct.name) {
                          showToast('Please provide a book title.', 'error');
                          return;
                        }
                        const numericPrice = Number(editingProduct.price) || 0;
                        saveProduct({
                          ...editingProduct,
                          price: numericPrice,
                          isFree: numericPrice <= 0,
                          isPurchasable: true
                        } as ProductItem);
                        setEditingProduct(null);
                      }}
                      className="p-6 bg-[#F6F8FA] border border-slate-200 space-y-4 text-xs"
                    >
                      <div className="font-bold text-[#051449] text-sm">Selar Book Record</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Book Title</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.name || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Author</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.author || editingProduct.brand || ''}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                author: e.target.value,
                                brand: e.target.value
                              })
                            }
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Price (0 = Free)</label>
                          <input
                            type="number"
                            min={0}
                            step="1"
                            value={editingProduct.price ?? 0}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                price: Number(e.target.value),
                                isFree: Number(e.target.value) <= 0
                              })
                            }
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Currency Symbol</label>
                          <input
                            type="text"
                            value={editingProduct.currencySymbol || '₦'}
                            onChange={(e) => setEditingProduct({ ...editingProduct, currencySymbol: e.target.value })}
                            placeholder="₦"
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Product Format</label>
                          <input
                            type="text"
                            value={editingProduct.format || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, format: e.target.value })}
                            placeholder="Downloadable (Digital)"
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Selar Checkout URL (HTTPS)</label>
                          <input
                            type="url"
                            required
                            value={editingProduct.selarUrl || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, selarUrl: e.target.value })}
                            placeholder="https://selar.com/..."
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Cover Image Path or URL</label>
                          <input
                            type="text"
                            value={editingProduct.imageUrl || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                            placeholder="/assets/images/book-why-fake-it.jpg"
                            className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Book Description</label>
                        <textarea
                          rows={4}
                          value={editingProduct.description || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-300 text-xs"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button type="submit" className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#051449]">
                          Save Book
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {products.map((prod) => (
                        <div key={prod.id} className="py-4 flex items-center justify-between gap-4 text-xs">
                          <div>
                            <div className="font-bold text-sm text-[#051449]">{prod.name}</div>
                            <div className="text-slate-500">
                              Author: {prod.author || prod.brand} ·{' '}
                              <span className="font-semibold text-[#051449]">{formatBookPrice(prod)}</span> ·{' '}
                              <span>{prod.format || 'Downloadable (Digital)'}</span>
                            </div>
                            {prod.selarUrl && (
                              <div className="text-[11px] font-mono text-[#12A9DB] mt-0.5">
                                {prod.selarUrl}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingProduct(prod)}
                              className="p-1.5 text-slate-600 hover:text-[#051449] hover:bg-slate-100"
                              title="Edit Book"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50"
                              title="Delete Book"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* BLOG MODULE */}
            {activeModule === 'blog' && (
              <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#051449]">Blog Articles & Publications</h2>
                  <span className="text-xs text-slate-500">{blogPosts.length} articles</span>
                </div>

                <div className="space-y-3">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="p-4 border border-slate-200 bg-[#F6F8FA] flex items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="font-bold text-[#051449] text-sm">{post.title}</div>
                        <div className="text-slate-500">{post.category} · {post.publishedAt} · {post.readTime}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => deleteBlogPost(post.id)}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COMMUNITY INVITATION LINK MODULE */}
            {activeModule === 'community' && (
              <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
                <div>
                  <h2 className="text-lg font-bold text-[#051449]">Community Invitation Link</h2>
                  <p className="text-xs text-slate-500">
                    Configure the official external community invitation URL (e.g. Telegram channel, group, or community hub).
                    Visitors clicking &ldquo;Join Our Community&rdquo; on the public site will open this link in a new tab.
                  </p>
                </div>

                <div className="p-4 bg-[#F6F8FA] border border-slate-200 space-y-3">
                  <div className="text-xs font-semibold text-[#051449] uppercase tracking-wider">
                    Current Link Status
                  </div>
                  {communityInviteUrl ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 border border-emerald-200 text-xs">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-mono text-emerald-800 truncate">{communityInviteUrl}</span>
                      </div>
                      <a
                        href={communityInviteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-[#051449] text-white text-[11px] font-semibold whitespace-nowrap hover:bg-[#12A9DB] transition-colors"
                      >
                        Test Link ↗
                      </a>
                    </div>
                  ) : (
                    <div className="p-3 bg-white border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <span>No active invitation link configured. The public Community page currently displays an unavailable notice.</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      External Community URL (HTTPS Only)
                    </label>
                    <input
                      type="url"
                      value={inviteUrlInput}
                      onChange={(e) => {
                        setInviteUrlInput(e.target.value);
                        setInviteUrlError('');
                      }}
                      placeholder="https://t.me/your_telegram_group_or_channel"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#12A9DB]"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Must be a valid HTTPS URL (e.g. <code className="text-slate-700">https://t.me/your_invite_link</code>). Unsafe URL schemes are strictly blocked.
                    </p>
                    {inviteUrlError && (
                      <p className="text-xs text-red-600 mt-1 font-medium">{inviteUrlError}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const trimmed = inviteUrlInput.trim();
                        if (!trimmed) {
                          setInviteUrlError('Please enter an HTTPS link or use "Clear Link" to remove the current URL.');
                          return;
                        }
                        if (!trimmed.startsWith('https://')) {
                          setInviteUrlError('URL must use the secure https:// scheme.');
                          return;
                        }
                        try {
                          const parsed = new URL(trimmed);
                          if (parsed.protocol !== 'https:') {
                            setInviteUrlError('URL must use https:// protocol.');
                            return;
                          }
                        } catch {
                          setInviteUrlError('Please enter a valid, well-formed URL.');
                          return;
                        }

                        setCommunityInviteUrl(trimmed);
                        setInviteUrlError('');
                        showToast('Community invitation link updated successfully.', 'success');
                      }}
                      className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#051449] hover:bg-[#E32938] transition-colors"
                    >
                      Save Invitation Link
                    </button>

                    {communityInviteUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setCommunityInviteUrl('');
                          setInviteUrlInput('');
                          setInviteUrlError('');
                          showToast('Community invitation link cleared.', 'info');
                        }}
                        className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-red-600 border border-slate-300 hover:border-red-300 transition-colors"
                      >
                        Clear Link
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS MODULE */}
            {activeModule === 'settings' && (
              <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-xs text-xs">
                <div>
                  <h2 className="text-lg font-bold text-[#051449]">BTMT Global Configuration</h2>
                  <p className="text-slate-500">
                    Official company identifiers, verified office address, and operational contact values.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Company Registered Name</label>
                    <input
                      type="text"
                      readOnly
                      value="Blissful Touch Media & Technology (BTMT)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">CAC Registration</label>
                    <input
                      type="text"
                      readOnly
                      value="Registered with Corporate Affairs Commission (CAC) in 2022"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Official Slogan</label>
                    <input
                      type="text"
                      readOnly
                      value="Building Authentic Visibility and Promoting Moral and Ethical Excellence"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Office Address (Contact Page Only)</label>
                    <input
                      type="text"
                      readOnly
                      value="43/45 MCC Road by PACs Junction, Owerri, Imo State, Nigeria."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Direct Phone</label>
                      <input
                        type="text"
                        readOnly
                        value="+234 706 088 2645"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                      <input
                        type="text"
                        readOnly
                        value="blissfultouchmedia@gmail.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700"
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
