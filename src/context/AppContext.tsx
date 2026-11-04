import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceItem,
  ProductItem,
  PartnerCompany,
  TestimonialItem,
  CartItem,
  Order,
  BlogPost,
  CommunityResource,
  TrainingSession,
  ServiceEnquiry,
  ContactSubmission,
  UserAccount,
  AdminRole
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_PRODUCTS,
  INITIAL_PARTNERS,
  INITIAL_TESTIMONIALS,
  INITIAL_BLOG_POSTS,
  INITIAL_RESOURCES,
  INITIAL_TRAINING,
  INITIAL_ENQUIRIES
} from '../data/initialData';

interface AppContextType {
  currentRoute: string;
  routeParams: Record<string, string>;
  navigateTo: (path: string, params?: Record<string, string>) => void;

  services: ServiceItem[];
  products: ProductItem[];
  partners: PartnerCompany[];
  testimonials: TestimonialItem[];
  blogPosts: BlogPost[];
  resources: CommunityResource[];
  trainings: TrainingSession[];
  enquiries: ServiceEnquiry[];
  contactMessages: ContactSubmission[];
  cart: CartItem[];
  orders: Order[];

  // Cart operations
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Checkout & Bookings
  placeOrder: (
    customer: Order['customer'],
    paymentMethod: Order['paymentMethod']
  ) => Order;
  submitServiceEnquiry: (
    enquiry: Omit<ServiceEnquiry, 'id' | 'createdAt' | 'status'>
  ) => ServiceEnquiry;
  submitContactForm: (
    contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>
  ) => ContactSubmission;

  // Service pre-selection for booking
  selectedServiceForBooking: string | null;
  setSelectedServiceForBooking: (serviceId: string | null) => void;

  // Admin mutation methods
  updateEnquiryStatus: (id: string, status: ServiceEnquiry['status']) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  saveBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  saveProduct: (product: ProductItem) => void;
  deleteProduct: (id: string) => void;
  savePartner: (partner: PartnerCompany) => void;
  deletePartner: (id: string) => void;
  saveTestimonial: (testimonial: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
  saveResource: (resource: CommunityResource) => void;
  deleteResource: (id: string) => void;

  // Auth & Roles
  currentUser: UserAccount | null;
  loginAsMember: (email?: string, name?: string) => void;
  loginAsAdmin: (role?: AdminRole) => void;
  registerMember: (fullName: string, email: string, brandName?: string, areaOfInterest?: string) => void;
  logout: () => void;

  // Feedback notifications
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State with URL Hash Synchronization
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | null>(null);

  // Data persistence states with versioning
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('btmt_services_v3');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('btmt_products_v3');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [partners, setPartners] = useState<PartnerCompany[]>(() => {
    const saved = localStorage.getItem('btmt_partners');
    return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('btmt_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('btmt_blog_posts');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });

  const [resources, setResources] = useState<CommunityResource[]>(() => {
    const saved = localStorage.getItem('btmt_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [trainings, setTrainings] = useState<TrainingSession[]>(() => {
    const saved = localStorage.getItem('btmt_trainings');
    return saved ? JSON.parse(saved) : INITIAL_TRAINING;
  });

  const [enquiries, setEnquiries] = useState<ServiceEnquiry[]>(() => {
    const saved = localStorage.getItem('btmt_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [contactMessages, setContactMessages] = useState<ContactSubmission[]>(() => {
    const saved = localStorage.getItem('btmt_contact_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('btmt_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('btmt_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('btmt_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('btmt_services_v3', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('btmt_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('btmt_partners', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem('btmt_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('btmt_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('btmt_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('btmt_trainings', JSON.stringify(trainings));
  }, [trainings]);

  useEffect(() => {
    localStorage.setItem('btmt_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('btmt_contact_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('btmt_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('btmt_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('btmt_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('btmt_current_user');
    }
  }, [currentUser]);

  // Handle URL hash changes
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      const [path, queryString] = hash.split('?');
      const params: Record<string, string> = {};

      if (queryString) {
        new URLSearchParams(queryString).forEach((val, key) => {
          params[key] = val;
        });
      }

      // Match dynamic routes
      if (path.startsWith('/services/') && path !== '/services/') {
        const slug = path.replace('/services/', '');
        setCurrentRoute('/services/:slug');
        setRouteParams({ ...params, slug });
      } else if (path.startsWith('/marketplace/') && path !== '/marketplace/') {
        const slug = path.replace('/marketplace/', '');
        setCurrentRoute('/marketplace/:slug');
        setRouteParams({ ...params, slug });
      } else if (path.startsWith('/blog/') && path !== '/blog/') {
        const slug = path.replace('/blog/', '');
        setCurrentRoute('/blog/:slug');
        setRouteParams({ ...params, slug });
      } else {
        setCurrentRoute(path);
        setRouteParams(params);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigateTo = (path: string, params: Record<string, string> = {}) => {
    let resolvedHash = path;
    if (path.includes(':slug') && params.slug) {
      resolvedHash = path.replace(':slug', params.slug);
    }

    const queryKeys = Object.keys(params).filter((k) => k !== 'slug');
    if (queryKeys.length > 0) {
      const qs = queryKeys.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
      resolvedHash += `?${qs}`;
    }

    window.location.hash = resolvedHash;
    setCurrentRoute(path);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Cart logic
  const addToCart = (product: ProductItem, quantity = 1) => {
    if (product.isPurchasable === false) {
      showToast('This book is currently in preview and not available for purchase.', 'info');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Order Placement
  const placeOrder = (
    customer: Order['customer'],
    paymentMethod: Order['paymentMethod']
  ): Order => {
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      reference: `BTMT-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      customer,
      totalAmount: cartTotal,
      status: paymentMethod === 'Direct Transfer' ? 'Pending' : 'Paid',
      paymentMethod,
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order ${newOrder.reference} created successfully!`, 'success');
    return newOrder;
  };

  // Service Enquiry submission
  const submitServiceEnquiry = (
    enquiryData: Omit<ServiceEnquiry, 'id' | 'createdAt' | 'status'>
  ): ServiceEnquiry => {
    const newEnquiry: ServiceEnquiry = {
      ...enquiryData,
      id: `enq_${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    showToast('Your project enquiry has been submitted successfully! We will contact you shortly.', 'success');
    return newEnquiry;
  };

  // Contact Submission
  const submitContactForm = (
    contactData: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>
  ): ContactSubmission => {
    const newMsg: ContactSubmission = {
      ...contactData,
      id: `msg_${Date.now()}`,
      status: 'Unread',
      createdAt: new Date().toISOString()
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    showToast('Thank you for contacting us. Our team has received your message.', 'success');
    return newMsg;
  };

  // Admin Actions
  const updateEnquiryStatus = (id: string, status: ServiceEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    showToast(`Enquiry updated to status: ${status}`, 'success');
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    showToast(`Order status updated to: ${status}`, 'success');
  };

  const saveBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === post.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = post;
        return updated;
      }
      return [post, ...prev];
    });
    showToast(`Article "${post.title}" saved.`, 'success');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    showToast('Article deleted.', 'info');
  };

  const saveProduct = (product: ProductItem) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = product;
        return updated;
      }
      return [product, ...prev];
    });
    showToast(`Product "${product.name}" saved.`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from marketplace.', 'info');
  };

  const savePartner = (partner: PartnerCompany) => {
    setPartners((prev) => {
      const idx = prev.findIndex((p) => p.id === partner.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = partner;
        return updated;
      }
      return [partner, ...prev];
    });
    showToast(`Partner "${partner.name}" saved.`, 'success');
  };

  const deletePartner = (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    showToast('Partner removed.', 'info');
  };

  const saveTestimonial = (testimonial: TestimonialItem) => {
    setTestimonials((prev) => {
      const idx = prev.findIndex((t) => t.id === testimonial.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = testimonial;
        return updated;
      }
      return [testimonial, ...prev];
    });
    showToast(`Testimonial from "${testimonial.clientName}" saved.`, 'success');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showToast('Testimonial removed.', 'info');
  };

  const saveResource = (resource: CommunityResource) => {
    setResources((prev) => {
      const idx = prev.findIndex((r) => r.id === resource.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = resource;
        return updated;
      }
      return [resource, ...prev];
    });
    showToast(`Resource "${resource.title}" updated.`, 'success');
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    showToast('Resource removed.', 'info');
  };

  // Auth
  const loginAsMember = (email = 'greatibewuike19@gmail.com', name = 'Registered Member') => {
    const user: UserAccount = {
      id: 'usr_mem_1',
      fullName: name,
      email,
      role: 'member',
      joinedDate: 'October 2026',
      brandName: 'Empower Digital Labs',
      areaOfInterest: 'Technology & Media Visibility'
    };
    setCurrentUser(user);
    showToast(`Welcome back, ${user.fullName}!`, 'success');
  };

  const loginAsAdmin = (adminRole: AdminRole = 'Super Admin') => {
    const adminUser: UserAccount = {
      id: 'usr_admin_1',
      fullName: 'Michael C. George (Staff Admin)',
      email: 'blissfultouchmedia@gmail.com',
      role: 'admin',
      adminRole,
      joinedDate: '2017'
    };
    setCurrentUser(adminUser);
    showToast(`Signed in as ${adminRole}. Authorized access granted.`, 'success');
  };

  const registerMember = (
    fullName: string,
    email: string,
    brandName?: string,
    areaOfInterest?: string
  ) => {
    const newMember: UserAccount = {
      id: `usr_${Date.now()}`,
      fullName,
      email,
      role: 'member',
      brandName: brandName || undefined,
      areaOfInterest: areaOfInterest || undefined,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    setCurrentUser(newMember);
    showToast(`Registration complete. Welcome to the BTMT Community, ${fullName}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been signed out.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigateTo,
        services,
        products,
        partners,
        testimonials,
        blogPosts,
        resources,
        trainings,
        enquiries,
        contactMessages,
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        placeOrder,
        submitServiceEnquiry,
        submitContactForm,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        updateEnquiryStatus,
        updateOrderStatus,
        saveBlogPost,
        deleteBlogPost,
        saveProduct,
        deleteProduct,
        savePartner,
        deletePartner,
        saveTestimonial,
        deleteTestimonial,
        saveResource,
        deleteResource,
        currentUser,
        loginAsMember,
        loginAsAdmin,
        registerMember,
        logout,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
