import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, 
  FiCalendar, 
  FiUsers, 
  FiDatabase, 
  FiSearch, 
  FiFilter, 
  FiBell,
  FiPlus,
  FiUser,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiChevronDown,
  FiArrowLeft,
  FiLogOut
} from 'react-icons/fi';
import { api } from '../../api';

const THEME = {
  ink: '#120e0a',
  gold: '#F4C430',
  goldLight: '#ffe3a1',
  glass: 'rgba(23, 19, 14, 0.4)',
  border: 'rgba(244, 196, 48, 0.2)',
  glow: 'rgba(244, 196, 48, 0.08)'
};

function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [curations, setCurations] = useState([]);
  const [hampers, setHampers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Add Item State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState('product'); // product, curation, hamper
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: 10,
    image_url: '',
    category: '', // for product
    origin: '',   // for product
    occasion: '', // for hamper
    contents: '', // for hamper
    badge_text: '',
    tagline: '',  // for curation
    features: '', // for curation (comma separated)
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [userOrders, setUserOrders] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('All');

  useEffect(() => {
    fetchData();
    fetchStats();
    if (activeTab === 'vault') {
      fetchCategories();
    }
    setCurrentFilter('All');
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const res = await api.get('auth/admin/stats/');
      setStatsData(res);
    } catch (err) {
      console.error('Failed to fetch imperial metrics:', err.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('catalog/categories/');
      setCategories(res);
      if (res.length > 0 && !newItem.category) {
        setNewItem(prev => ({ ...prev, category: res[0].id }));
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err.message);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let endpoint = '';
      const formData = new FormData();

      // Basic fields
      formData.append('name', newItem.name);
      formData.append('description', newItem.description);
      formData.append('price', newItem.price);
      formData.append('stock_quantity', newItem.stock_quantity);
      formData.append('image_url', newItem.image_url);
      formData.append('badge_text', newItem.badge_text);

      if (addType === 'product') {
        endpoint = 'catalog/admin/products/create/';
        formData.append('category', newItem.category);
        formData.append('origin', newItem.origin);
      } else if (addType === 'curation') {
        endpoint = 'catalog/admin/curations/create/';
        formData.append('tagline', newItem.tagline);
        const features = newItem.features ? newItem.features.split(',').map(f => f.trim()) : [];
        formData.append('features', JSON.stringify(features));
      } else if (addType === 'hamper') {
        endpoint = 'catalog/admin/gifts/create/';
        formData.append('occasion', newItem.occasion);
        formData.append('contents', newItem.contents);
      }

      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      await api.post(endpoint, formData);
      setShowAddModal(false);
      setSelectedFile(null);
      setNewItem({
        name: '', description: '', price: '', stock_quantity: 10,
        image_url: '', category: categories[0]?.id || '', origin: '',
        occasion: '', contents: '', badge_text: '', tagline: '', features: ''
      });
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to inscribe the new item into the vault.');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'orders') {
        const res = await api.get('orders/admin/all/');
        setOrders(res?.results || res || []);
      } else if (activeTab === 'reservations') {
        const res = await api.get('reservations/admin/all/');
        setReservations(res?.results || res || []);
      } else if (activeTab === 'patrons') {
        const res = await api.get('auth/admin/users/');
        setUsers(res?.results || res || []);
      } else if (activeTab === 'vault') {
        const [prodRes, curRes, hamRes] = await Promise.all([
          api.get('catalog/admin/products/'),
          api.get('catalog/admin/curations/'),
          api.get('catalog/admin/gifts/')
        ]);
        setProducts(prodRes?.results || prodRes || []);
        setCurations(curRes?.results || curRes || []);
        setHampers(hamRes?.results || hamRes || []);
      }
    } catch (err) {
      setError(err.message || 'The decree retrieval spell failed. Check your imperial credentials.');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderNumber, field, value) => {
    try {
      await api.put(`orders/admin/${orderNumber}/`, { [field]: value });
      fetchData();
      fetchStats(); // Update stats if payment status changed
    } catch (err) {
      console.error(`Error updating order: ${err.message}`);
    }
  };

  const updateReservationStatus = async (code, value) => {
    try {
      await api.put(`reservations/admin/${code}/`, { status: value });
      fetchData();
      fetchStats();
    } catch (err) {
      console.error(`Error updating reservation: ${err.message}`);
    }
  };

  const [saveStatus, setSaveStatus] = useState({ type: '', message: '', id: null });
  const [pendingChanges, setPendingChanges] = useState({});

  const handleFieldChange = (type, id, field, value) => {
    const key = `${type}-${id}`;
    setPendingChanges(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        type,
        id,
        [field]: value
      }
    }));
  };

  const handleBulkUpdate = async () => {
    setLoading(true);
    try {
      const updates = Object.values(pendingChanges);
      for (const change of updates) {
        let endpoint = '';
        const { type, id, ...data } = change;
        if (type === 'product') endpoint = `catalog/admin/products/${id}/`;
        else if (type === 'curation') endpoint = `catalog/admin/curations/${id}/`;
        else if (type === 'hamper') endpoint = `catalog/admin/gifts/${id}/`;
        
        await api.patch(endpoint, data);
      }
      setPendingChanges({});
      setSaveStatus({ type: 'success', message: 'All Changes Saved', id: 'bulk' });
      setTimeout(() => setSaveStatus({ type: '', message: '', id: null }), 3000);
      fetchData();
    } catch (err) {
      setError('Bulk update failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateVaultItem = async (type, id, field, value) => {
    const itemId = `${type}-${id}`;
    try {
      setSaveStatus({ type: 'saving', message: 'Saving...', id: itemId });
      let endpoint = '';
      if (type === 'product') endpoint = `catalog/admin/products/${id}/`;
      else if (type === 'curation') endpoint = `catalog/admin/curations/${id}/`;
      else if (type === 'hamper') endpoint = `catalog/admin/gifts/${id}/`;
      
      await api.patch(endpoint, { [field]: value });
      setSaveStatus({ type: 'success', message: 'Saved', id: itemId });
      setTimeout(() => setSaveStatus(prev => prev.id === itemId ? { type: '', message: '', id: null } : prev), 2000);
      fetchData();
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Failed', id: itemId });
      setTimeout(() => setSaveStatus(prev => prev.id === itemId ? { type: '', message: '', id: null } : prev), 3000);
      console.error(`Error updating vault item: ${err.message}`);
    }
  };

  const allVaultItems = [
    ...products.map(p => ({ ...p, type: 'product' })),
    ...curations.map(c => ({ ...c, type: 'curation', category_name: 'Curation' })),
    ...hampers.map(h => ({ ...h, type: 'hamper', category_name: 'Gift Hamper' }))
  ];

  const filteredItems = allVaultItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category_name?.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (currentFilter === 'All') return matchesSearch;
    
    if (currentFilter === 'Royal Menu') {
      const royalCategories = ['Heritage Teas', 'Coffee Roasts', 'Savory Snacks', 'Royal Sweets'];
      return matchesSearch && royalCategories.includes(item.category_name);
    }
    
    if (currentFilter === 'Curations') {
      return matchesSearch && item.type === 'curation';
    }
    
    if (currentFilter === 'Estate Vault') {
      return matchesSearch && item.category_name === 'The Estate Vault';
    }
    
    if (currentFilter === 'Gift Hamper') {
      return matchesSearch && item.type === 'hamper';
    }

    return matchesSearch && item.category_name === currentFilter;
  });

  const stats = [
    { 
      label: 'Royal Revenue', 
      value: statsData?.total_revenue || '₹0', 
      icon: <FiTrendingUp />, 
      delta: statsData?.revenue_delta || '---' 
    },
    { 
      label: 'Active Decrees', 
      value: statsData?.active_decrees || 0, 
      icon: <FiPackage />, 
      delta: 'Live' 
    },
    { 
      label: 'Haveli Occupancy', 
      value: statsData?.haveli_occupancy || '0%', 
      icon: <FiCalendar />, 
      delta: statsData?.occupancy_delta || '---' 
    },
    { 
      label: 'Vault Reserves', 
      value: statsData?.vault_reserves || '0 items', 
      icon: <FiDatabase />, 
      delta: 'Stable' 
    },
    {
      label: 'Royal Patrons',
      value: statsData?.total_patrons ?? '0',
      icon: <FiUsers />,
      delta: 'Verified Only'
    },
  ];

  const SidebarItem = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-4 w-full px-6 py-4 transition-all duration-300 group ${
        activeTab === id ? 'text-[#F4C430]' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      <div className={`text-xl transition-transform duration-300 ${activeTab === id ? 'scale-110' : 'group-hover:scale-105'}`}>
        {icon}
      </div>
      <span className={`font-medium tracking-wide ${activeTab === id ? 'opacity-100' : 'opacity-80'}`}>
        {label}
      </span>
      {activeTab === id && (
        <motion.div 
          layoutId="activeGlow"
          className="absolute left-0 w-1 h-8 bg-[#F4C430] rounded-r-full shadow-[0_0_15px_#F4C430]"
        />
      )}
    </button>
  );

  const fetchUserOrders = async (userId) => {
    try {
      const res = await api.get(`orders/admin/user/${userId}/`);
      setUserOrders(prev => ({ ...prev, [userId]: res?.results || res || [] }));
    } catch (err) {
      console.error("Failed to fetch patron history", err);
    }
  };

  const toggleUserOrders = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
      if (!userOrders[userId]) {
        fetchUserOrders(userId);
      }
    }
  };
  const filteredOrders = (Array.isArray(orders) ? orders : []).filter(o => {
    const matchesSearch = o.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) || o.patron_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = currentFilter === 'All' || o.status?.toLowerCase() === currentFilter.toLowerCase() || (currentFilter === 'Completed' && ['delivered', 'shipped'].includes(o.status));
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = (Array.isArray(users) ? users : []).filter(u => 
    u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReservations = (Array.isArray(reservations) ? reservations : []).filter(r => {
    const matchesSearch = r.confirmation_code?.toLowerCase().includes(searchQuery.toLowerCase()) || r.patron_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = currentFilter === 'All' || r.status?.toLowerCase() === currentFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const filteredProducts = (Array.isArray(products) ? products : []).filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.category_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = currentFilter === 'All' || p.category_name === currentFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#0a0806] text-amber-50 selection:bg-[#F4C430] selection:text-black font-space">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #120e0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #F4C43033;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #F4C43066;
        }

        .amber-glow {
          box-shadow: 0 0 40px rgba(244, 196, 48, 0.05);
        }
        
        .parchment-row:hover {
          box-shadow: inset 0 0 20px rgba(244, 196, 48, 0.03), 0 10px 30px -10px rgba(0,0,0,0.5);
        }
      `}</style>
      
      {/* Sidebar: The Gallery Navigation */}
      <aside className="w-72 bg-[#0c0a08] border-r border-[#F4C430]/10 flex flex-col fixed h-screen z-30">
        <div className="p-8 pb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#F4C430] rounded-sm transform rotate-45 flex items-center justify-center">
              <span className="transform -rotate-45 text-black font-bold text-xs">HB</span>
            </div>
            <h2 className="text-xl font-bold tracking-widest text-[#F4C430] uppercase">Heritage</h2>
          </div>
          <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase ml-11">Royal Registry</p>
        </div>

        <nav className="flex-1 relative">
          <SidebarItem id="orders" label="Patron Orders" icon={<FiPackage />} />
          <SidebarItem id="reservations" label="Reservations" icon={<FiCalendar />} />
          <SidebarItem id="patrons" label="Royal Patrons" icon={<FiUsers />} />
          <SidebarItem id="vault" label="Vault Catalog" icon={<FiDatabase />} />
        </nav>

        <div className="p-6 border-t border-[#F4C430]/10">
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-3 text-gray-500 hover:text-[#F4C430] transition-colors text-sm font-medium w-full group mb-6 px-2"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Estate</span>
          </button>

          <button 
            onClick={logout}
            className="flex items-center gap-3 text-red-500/70 hover:text-red-500 transition-colors text-sm font-medium w-full group mb-6 px-2"
          >
            <FiLogOut className="group-hover:translate-x-1 transition-transform" />
            <span>Sign Out Registry</span>
          </button>

          <div className="flex items-center gap-4 bg-[#17130e] p-4 rounded-xl border border-[#F4C430]/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4C430] to-[#b58e1d] flex items-center justify-center text-black">
              <FiUser />
            </div>
            <div>
              <p className="text-sm font-bold">The Archivist</p>
              <p className="text-[10px] text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content: The Digital Haveli */}
      <main className="flex-1 ml-72 p-8 pt-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-[2.5rem] font-bold text-white mb-2 tracking-tight">
              {activeTab === 'orders' ? 'Patron Orders' : 
               activeTab === 'reservations' ? 'Haveli Reservations' : 
               activeTab === 'patrons' ? 'Royal Patrons' : 'Vault Inventory'}
            </h1>
            <p className="text-gray-500 text-sm italic">"The digital echoes of heritage, managed with precision."</p>
          </div>
          
          <div className="flex gap-4">
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#F4C430] transition-colors" />
              <input 
                type="text" 
                placeholder="Search the registry..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#120e0a] border border-[#F4C430]/10 rounded-full py-2.5 pl-12 pr-6 text-sm outline-none focus:border-[#F4C430]/30 transition-all w-64"
              />
            </div>
            <button className="p-3 bg-[#120e0a] border border-[#F4C430]/10 rounded-full text-gray-400 hover:text-[#F4C430] transition-colors">
              <FiBell />
            </button>
          </div>
        </header>

        {/* Stats Row: Royal Parchment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#17130e]/40 backdrop-blur-2xl border border-[#F4C430]/10 p-6 rounded-2xl relative overflow-hidden group hover:border-[#F4C430]/30 transition-colors"
            >
              <div className="absolute top-0 right-0 p-4 text-[#F4C430]/20 group-hover:text-[#F4C430]/40 transition-colors text-4xl">
                {stat.icon}
              </div>
              <p className="text-gray-500 text-xs font-medium tracking-widest uppercase mb-4">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <span className="text-[10px] bg-[#F4C430]/10 text-[#F4C430] px-2 py-1 rounded-md font-bold">
                  {stat.delta}
                </span>
              </div>
              <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  className="h-full bg-gradient-to-r from-[#b58e1d] to-[#F4C430]"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Feed: Parchment Strips */}
        <div className="bg-[#120e0a] rounded-3xl p-8 border border-[#F4C430]/5 relative">
          {error && (
            <div className="bg-red-950/30 border border-red-500/30 p-6 rounded-2xl text-red-200 mb-8 flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-full text-red-500">!</div>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              {(activeTab === 'orders' ? ['All', 'Pending', 'Completed', 'Cancelled'] :
                activeTab === 'reservations' ? ['All', 'Pending', 'Confirmed', 'Cancelled'] :
                activeTab === 'patrons' ? ['All'] :
                ['All', 'Royal Menu', 'Curations', 'Estate Vault', 'Gift Hamper']
              ).map(filter => (
                <button 
                  key={filter} 
                  onClick={() => setCurrentFilter(filter)}
                  className={`px-4 py-1.5 text-xs rounded-full border transition-colors ${
                    currentFilter === filter 
                      ? 'border-[#F4C430] bg-[#F4C430]/10 text-[#F4C430]' 
                      : 'border-white/5 bg-white/5 hover:bg-white/10 text-gray-400'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            {activeTab === 'vault' ? (
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 text-xs px-6 py-2 rounded-full border border-[#F4C430]/30 text-[#F4C430] hover:bg-[#F4C430]/10 transition-all"
                >
                  <FiPlus /> Add New Item
                </button>
                <button 
                  onClick={handleBulkUpdate}
                  disabled={Object.keys(pendingChanges).length === 0}
                  className={`flex items-center gap-2 text-xs px-6 py-2 rounded-full border transition-all ${
                    Object.keys(pendingChanges).length > 0
                      ? 'bg-[#F4C430] text-black border-[#F4C430] shadow-[0_0_20px_rgba(244,196,48,0.3)]'
                      : 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FiCheckCircle /> Save Changes {Object.keys(pendingChanges).length > 0 && `(${Object.keys(pendingChanges).length})`}
                </button>
              </div>
            ) : (
              <button className="flex items-center gap-2 text-xs text-[#F4C430] hover:underline">
                <FiFilter /> Filter Ledger
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-12 h-12 border-2 border-[#F4C430]/20 border-t-[#F4C430] rounded-full animate-spin" />
              <p className="text-gray-500 text-sm font-medium animate-pulse tracking-widest uppercase">Consulting the Archives...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeTab === 'orders' ? (
                <>
                  {filteredOrders.length > 0 ? filteredOrders.map((order, idx) => (
                    <div key={order.order_number} className="group flex flex-col bg-[#17130e]/30 border border-transparent hover:border-[#F4C430]/20 hover:bg-[#1c1813] rounded-2xl transition-all overflow-hidden">
                      <div 
                        className="grid grid-cols-[1fr_2fr_1fr_1.5fr_1.5fr_0.5fr] items-center gap-6 p-5 cursor-pointer"
                        onClick={() => setExpandedRow(expandedRow === order.order_number ? null : order.order_number)}
                      >
                        <div className="font-mono text-xs text-[#F4C430] tracking-tighter">#{order.order_number}</div>
                        <div>
                          <p className="text-sm font-bold text-white mb-0.5">{order.patron_name}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Patron ID: 89{idx+1}-X</p>
                        </div>
                        <div className="font-bold text-sm">₹{order.total}</div>
                        <div>
                          <select
                            value={order.payment_status}
                            onChange={(e) => updateOrderStatus(order.order_number, 'payment_status', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-transparent border-none text-[11px] font-bold uppercase tracking-widest text-[#F4C430] outline-none cursor-pointer hover:bg-white/5 p-1 rounded transition-colors"
                          >
                            <option className="bg-[#120e0a]" value="pending">Pending</option>
                            <option className="bg-[#120e0a]" value="paid">Paid</option>
                            <option className="bg-[#120e0a]" value="failed">Failed</option>
                          </select>
                        </div>
                        <div className="flex justify-end">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.order_number, 'status', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all cursor-pointer ${
                              order.status === 'delivered' ? 'bg-green-500/10 border-green-500/30 text-green-500' :
                              order.status === 'cancelled' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                              'bg-[#F4C430]/10 border-[#F4C430]/30 text-[#F4C430]'
                            }`}
                          >
                            <option className="bg-[#120e0a]" value="placed">Placed</option>
                            <option className="bg-[#120e0a]" value="confirmed">Confirmed</option>
                            <option className="bg-[#120e0a]" value="preparing">Preparing</option>
                            <option className="bg-[#120e0a]" value="shipped">Shipped</option>
                            <option className="bg-[#120e0a]" value="delivered">Delivered</option>
                            <option className="bg-[#120e0a]" value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div className="text-gray-500 flex justify-center">
                          <FiChevronDown className={`transition-transform duration-300 ${expandedRow === order.order_number ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedRow === order.order_number && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-[#F4C430]/5 bg-black/20"
                          >
                            <div className="p-6 grid grid-cols-2 gap-12">
                              <div className="space-y-4">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#F4C430] font-bold opacity-60">Imperial Provisions</p>
                                <div className="space-y-3">
                                  {order.items?.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center bg-white/[0.02] p-3 border border-white/[0.05]">
                                      <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded bg-[#F4C430]/10 flex items-center justify-center text-[10px] font-bold text-[#F4C430]">
                                          {item.quantity}x
                                        </div>
                                        <p className="text-sm font-medium text-white/80">{item.product_name}</p>
                                      </div>
                                      <p className="text-sm font-mono text-[#F4C430]">₹{item.product_price}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-6">
                                <div className="space-y-3">
                                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#F4C430] font-bold opacity-60">Archive Metadata</p>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-[10px] text-gray-500 uppercase mb-1">Contact</p>
                                      <p className="text-sm border-l-2 border-[#F4C430]/30 pl-3">{order.phone}</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-gray-500 uppercase mb-1">Method</p>
                                      <p className="text-sm border-l-2 border-[#F4C430]/30 pl-3 uppercase">{order.payment_method}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <p className="text-[10px] text-gray-500 uppercase">Sanctuary Address</p>
                                  <p className="text-sm text-white/70 italic leading-relaxed">
                                    {order.address}, {order.city} - {order.pincode}
                                  </p>
                                </div>
                                {order.special_instructions && (
                                  <div className="space-y-3">
                                    <p className="text-[10px] text-gray-500 uppercase">Scribe Notes</p>
                                    <p className="text-xs bg-[#F4C430]/5 p-3 border-l-2 border-[#F4C430] italic">
                                      "{order.special_instructions}"
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )) : (
                    <div className="text-center py-20 text-gray-600">No orders currently inscribed in the registry.</div>
                  )}
                </>
              ) : activeTab === 'reservations' ? (
                <>
                  {filteredReservations.length > 0 ? filteredReservations.map((res, idx) => (
                    <motion.div
                      key={res.confirmation_code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group grid grid-cols-[1fr_2fr_2fr_1.5fr_1.5fr] items-center gap-6 p-5 bg-[#17130e]/30 border border-transparent hover:border-[#F4C430]/20 hover:bg-[#1c1813] rounded-2xl transition-all"
                    >
                      <div className="font-mono text-xs text-[#F4C430] tracking-tighter">{res.confirmation_code}</div>
                      <div>
                        <p className="text-sm font-bold text-white mb-0.5">{res.patron_name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">VVIP Patron</p>
                      </div>
                      <div className="text-xs">
                        <p className="text-gray-300 font-medium mb-1 flex items-center gap-2">
                          <FiCalendar className="text-[#F4C430]" /> {res.date}
                        </p>
                        <p className="text-gray-500 flex items-center gap-2">
                          <FiClock className="text-[#F4C430]/50" /> {res.time_or_duration}
                        </p>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-white/5 py-1.5 px-3 rounded-md w-fit">
                        {res.scope} Haveli
                      </div>
                      <div className="flex justify-end pr-4">
                        <select
                          value={res.status}
                          onChange={(e) => updateReservationStatus(res.confirmation_code, e.target.value)}
                          className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all cursor-pointer ${
                            res.status === 'completed' ? 'bg-green-500/10 border-green-500/30 text-green-500' :
                            res.status === 'cancelled' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                            'bg-[#F4C430]/10 border-[#F4C430]/30 text-[#F4C430]'
                          }`}
                        >
                          <option className="bg-[#120e0a]" value="pending">Pending</option>
                          <option className="bg-[#120e0a]" value="confirmed">Confirmed</option>
                          <option className="bg-[#120e0a]" value="completed">Completed</option>
                          <option className="bg-[#120e0a]" value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-20 text-gray-600">No reservations currently held in the haveli chambers.</div>
                  )}
                </>
              ) : activeTab === 'patrons' ? (
                <>
                  <div className="flex justify-between items-center mb-6 px-4">
                    <div>
                      <h2 className="text-xl font-headline font-bold text-white tracking-wide">Royal Registry</h2>
                      <p className="text-[10px] text-[#F4C430]/60 uppercase tracking-[0.2em] mt-1">
                        Displaying {filteredUsers.length} of {users.length} total patrons
                      </p>
                    </div>
                  </div>

                  {filteredUsers.length > 0 ? filteredUsers.map((user, idx) => (
                    <div key={user.id} className="group flex flex-col bg-[#17130e]/30 border border-transparent hover:border-[#F4C430]/20 hover:bg-[#1c1813] rounded-2xl transition-all overflow-hidden">
                      <div 
                        className="grid grid-cols-[0.5fr_2fr_1.5fr_1fr_1fr_0.5fr] items-center gap-6 p-5 cursor-pointer"
                        onClick={() => toggleUserOrders(user.id)}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#F4C430]/10 flex items-center justify-center text-[#F4C430]">
                          <FiUser />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white mb-0.5">{user.first_name} {user.last_name} ({user.username})</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user.email}</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          Joined: <span className="text-white/70">{user.date_joined}</span>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 uppercase mb-1">Orders</p>
                          <p className="font-mono text-[#F4C430]">{user.order_count}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-500 uppercase mb-1">Treasury</p>
                          <p className="font-mono text-white font-bold">₹{user.total_spent}</p>
                        </div>
                        <div className="text-gray-500 flex justify-center">
                          <FiChevronDown className={`transition-transform duration-300 ${expandedUser === user.id ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedUser === user.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-[#F4C430]/5 bg-black/20"
                          >
                            <div className="p-6">
                              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#F4C430] font-bold opacity-60 mb-4">Official Purchase Ledger</h4>
                              {userOrders[user.id] ? (
                                <div className="space-y-3">
                                  {userOrders[user.id].length > 0 ? userOrders[user.id].map((order) => (
                                    <div key={order.order_number} className="flex justify-between items-center bg-white/[0.02] p-4 border border-white/[0.05] rounded-xl hover:bg-white/[0.04] transition-colors">
                                      <div className="flex items-center gap-6">
                                        <div className="text-[10px] font-mono text-[#F4C430] opacity-60">{order.order_number}</div>
                                        <div>
                                          <p className="text-[10px] text-gray-500 uppercase mb-0.5">{order.created_at?.split('T')[0]}</p>
                                          <p className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'delivered' ? 'text-green-500' : 'text-[#F4C430]'}`}>
                                            {order.status}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-8">
                                        <div className="text-right">
                                          <p className="text-[10px] text-gray-500 uppercase mb-0.5">Payment</p>
                                          <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">{order.payment_status}</p>
                                        </div>
                                        <p className="font-mono text-white font-bold">₹{order.total}</p>
                                      </div>
                                    </div>
                                  )) : (
                                    <p className="text-xs text-gray-600 italic">No purchase history found for this patron.</p>
                                  )}
                                </div>
                              ) : (
                                <div className="flex justify-center py-8">
                                  <div className="w-8 h-8 border-2 border-[#F4C430]/20 border-t-[#F4C430] rounded-full animate-spin" />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )) : (
                    <div className="text-center py-20 text-gray-600">The royal guest list is currently empty.</div>
                  )}
                </>
              ) : activeTab === 'vault' ? (
                <>
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#F4C430]/10 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-4 sticky top-0 bg-[#0a0806]/95 backdrop-blur-md z-10">
                    <div className="col-span-1">SR. NO.</div>
                    <div className="col-span-4">Heritage Item</div>
                    <div className="col-span-2">Collection</div>
                    <div className="col-span-1 text-center">Stock</div>
                    <div className="col-span-2 text-right">Brahmi Value</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>

                   {filteredItems.length > 0 ? filteredItems.map((item, idx) => (
                    <div 
                      key={`${item.type}-${item.id}`}
                      className="group parchment-row relative grid grid-cols-12 gap-4 px-6 py-5 mb-2 bg-[#17130e] border border-white/[0.05] rounded-xl items-center transition-all duration-300"
                    >
                      <div className="col-span-1 font-mono text-xs text-[#F4C430] opacity-50">{idx + 1}</div>
                      
                      <div className="col-span-4 flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg overflow-hidden border relative group-hover:border-[#F4C430]/50 transition-colors bg-black/40 ${
                          item.stock_quantity === 0 ? 'border-red-500/40' : 'border-[#F4C430]/20'
                        }`}>
                          <img 
                            src={item.display_image || item.image || item.image_url || 'https://images.unsplash.com/photo-1548839140-29a74aa9670d?auto=format&fit=crop&q=80&w=400'} 
                            alt={item.name} 
                            className={`w-full h-full object-cover ${item.stock_quantity === 0 ? 'grayscale brightness-50' : ''}`} 
                          />
                          {item.stock_quantity === 0 && (
                            <div className="absolute inset-0 bg-red-950/20 mix-blend-overlay" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-white tracking-wide">{item.name}</p>
                            {item.stock_quantity === 0 && (
                              <span className="text-[8px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Empty</span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500 line-clamp-1 pr-6">{item.description || item.tagline}</p>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <span className={`px-2 py-1 bg-white/[0.03] rounded text-[10px] uppercase font-bold tracking-widest ${
                          item.type === 'curation' ? 'text-purple-400' : 
                          item.type === 'hamper' ? 'text-pink-400' : 'text-gray-400'
                        }`}>
                          {item.category_name}
                        </span>
                      </div>

                      <div className="col-span-1 text-center relative group/status">
                          <input 
                            type="number"
                            value={pendingChanges[`${item.type}-${item.id}`]?.stock_quantity ?? item.stock_quantity ?? 10}
                            onChange={(e) => handleFieldChange(item.type, item.id, 'stock_quantity', parseInt(e.target.value) || 0)}
                            className={`bg-transparent font-mono font-bold w-[60px] outline-none border-b transition-colors text-center hover:border-white/20 [&::-webkit-inner-spin-button]:appearance-none ${
                              pendingChanges[`${item.type}-${item.id}`]?.stock_quantity !== undefined ? 'text-[#F4C430] border-[#F4C430]/50' : 'text-white border-transparent'
                            }`}
                          />
                      </div>

                      <div className="col-span-2 flex justify-end">
                        <div className="flex items-center gap-1 group-hover:bg-[#1a1510] px-3 py-1 rounded transition-colors pr-0">
                          <span className={`text-sm ${pendingChanges[`${item.type}-${item.id}`]?.price !== undefined ? 'text-[#F4C430]' : 'text-gray-500'}`}>₹</span>
                          <input 
                            type="number"
                            value={pendingChanges[`${item.type}-${item.id}`]?.price ?? item.price}
                            onChange={(e) => handleFieldChange(item.type, item.id, 'price', e.target.value)}
                            className={`bg-transparent font-mono font-bold w-[100px] outline-none border-b transition-colors text-right hover:border-white/20 [&::-webkit-inner-spin-button]:appearance-none ${
                              pendingChanges[`${item.type}-${item.id}`]?.price !== undefined ? 'text-[#F4C430] border-[#F4C430]/50' : 'text-white border-transparent'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-end">
                        <button
                          onClick={() => updateVaultItem(item.type, item.id, item.type === 'product' ? 'is_available' : 'is_active', !(item.is_available ?? item.is_active))}
                          className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all flex items-center gap-2 ${
                            (item.is_available ?? item.is_active) 
                              ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                              : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                          }`}
                        >
                          {(item.is_available ?? item.is_active) ? 'Live' : 'Hidden'}
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-20 text-gray-600">The Vault is currently empty or no items match your search.</div>
                  )}
                </>
              ) : null}
            </div>
          )}
        </div>

        {/* Cinematic Lighting Effect */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#F4C430]/5 blur-[150px] -z-10 rounded-full" />
        <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-[#F4C430]/5 blur-[100px] -z-10 rounded-full" />

        {/* Global Success Notification */}
        <AnimatePresence>
          {saveStatus.message && saveStatus.id === 'bulk' && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 50, x: '-50%' }}
              className="fixed bottom-12 left-1/2 z-[100] px-8 py-4 bg-[#F4C430] text-black font-bold rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 border border-white/20"
            >
              <FiCheckCircle className="text-xl" />
              <div className="flex flex-col">
                <span className="uppercase tracking-[0.2em] text-[10px] leading-none mb-1">Imperial Update</span>
                <span className="text-sm tracking-wide">{saveStatus.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Item Modal */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-[#1a1510] border border-[#F4C430]/20 rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
              >
                <div className="p-8 border-b border-[#F4C430]/10 bg-gradient-to-r from-[#F4C430]/5 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-headline font-bold text-white mb-1">Inscribe New Heritage</h2>
                      <p className="text-xs text-[#F4C430]/60 uppercase tracking-widest">Adding to the Digital Vault</p>
                    </div>
                    <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-400">
                      <FiLogOut className="rotate-180" />
                    </button>
                  </div>

                  <div className="flex gap-2 mt-8">
                    {['product', 'curation', 'hamper'].map(type => (
                      <button
                        key={type}
                        onClick={() => setAddType(type)}
                        className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                          addType === type 
                            ? 'bg-[#F4C430] text-black border-[#F4C430]' 
                            : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleAddItem} className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Item Name</label>
                      <input 
                        required
                        value={newItem.name}
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                        placeholder="e.g. Imperial Darjeeling"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Price (₹)</label>
                      <input 
                        required
                        type="number"
                        value={newItem.price}
                        onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                        placeholder="1200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Description</label>
                    <textarea 
                      required
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                      placeholder="Describe the lineage and flavor profile..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Image Source</label>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={newItem.image_url}
                          onChange={(e) => setNewItem({...newItem, image_url: e.target.value})}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                          placeholder="Archival URL (Optional)..."
                        />
                        <label className="cursor-pointer bg-[#F4C430]/10 border border-[#F4C430]/20 rounded-xl px-4 py-3 flex items-center justify-center hover:bg-[#F4C430]/20 transition-all group relative">
                          <FiPlus className="text-[#F4C430]" />
                          <input 
                            type="file"
                            className="hidden"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            accept="image/*"
                          />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-[8px] text-[#F4C430] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Upload from Desktop</span>
                        </label>
                      </div>
                      {selectedFile && <p className="text-[8px] text-[#F4C430] italic font-bold tracking-widest">Digital Manuscript Attached: {selectedFile.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Initial Stock</label>
                      <input 
                        required
                        type="number"
                        value={newItem.stock_quantity}
                        onChange={(e) => setNewItem({...newItem, stock_quantity: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {addType === 'product' && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Category</label>
                        <select 
                          value={newItem.category}
                          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                        >
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id} className="bg-[#120e0a]">{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Origin Estate</label>
                        <input 
                          value={newItem.origin}
                          onChange={(e) => setNewItem({...newItem, origin: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                          placeholder="e.g. Assam, Munnar"
                        />
                      </div>
                    </div>
                  )}

                  {addType === 'curation' && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Tagline</label>
                        <input 
                          value={newItem.tagline}
                          onChange={(e) => setNewItem({...newItem, tagline: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                          placeholder="Short hook text..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Features (Comma Separated)</label>
                        <input 
                          value={newItem.features}
                          onChange={(e) => setNewItem({...newItem, features: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                          placeholder="Rare Teas, Exclusive Access..."
                        />
                      </div>
                    </div>
                  )}

                  {addType === 'hamper' && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Occasion</label>
                        <input 
                          value={newItem.occasion}
                          onChange={(e) => setNewItem({...newItem, occasion: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                          placeholder="e.g. Diwali, Anniversary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#F4C430]/60 font-bold">Badge Text</label>
                        <input 
                          value={newItem.badge_text}
                          onChange={(e) => setNewItem({...newItem, badge_text: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F4C430]/40 outline-none transition-all"
                          placeholder="e.g. Limited Edition"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#F4C430] text-black py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs shadow-[0_10px_30px_rgba(244,196,48,0.2)] hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {loading ? 'Consulting the Archives...' : 'Inscribe into Registry'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}

export default AdminDashboard;
