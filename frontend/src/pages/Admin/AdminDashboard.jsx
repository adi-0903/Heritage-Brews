import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, 
  FiCalendar, 
  FiUsers, 
  FiDatabase, 
  FiSearch, 
  FiFilter, 
  FiBell,
  FiUser,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiChevronDown,
  FiArrowLeft
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
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [userOrders, setUserOrders] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
    fetchStats();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const res = await api.get('auth/admin/stats/');
      setStatsData(res);
    } catch (err) {
      console.error('Failed to fetch imperial metrics:', err.message);
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
      icon: <FiUsers />, 
      delta: statsData?.occupancy_delta || '---' 
    },
    { 
      label: 'Vault Reserves', 
      value: statsData?.vault_reserves || '0 items', 
      icon: <FiDatabase />, 
      delta: 'Stable' 
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
  const filteredOrders = (Array.isArray(orders) ? orders : []).filter(o => 
    o.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.patron_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = (Array.isArray(users) ? users : []).filter(u => 
    u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReservations = (Array.isArray(reservations) ? reservations : []).filter(r => 
    r.confirmation_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.patron_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="grid grid-cols-4 gap-6 mb-12">
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
              {['All', 'Pending', 'Completed', 'Cancelled'].map(filter => (
                <button key={filter} className="px-4 py-1.5 text-xs rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                  {filter}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 text-xs text-[#F4C430] hover:underline">
              <FiFilter /> Filter Ledger
            </button>
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
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-gray-600">
                  <div className="text-4xl mb-6 opacity-20">
                    <FiDatabase />
                  </div>
                  <p className="text-sm font-medium uppercase tracking-[0.3em]">Vault Archive</p>
                  <p className="text-xs mt-2 text-gray-700">Detailed views for inventory management are being restored.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cinematic Lighting Effect */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#F4C430]/5 blur-[150px] -z-10 rounded-full" />
        <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-[#F4C430]/5 blur-[100px] -z-10 rounded-full" />
      </main>
    </div>
  );
}

export default AdminDashboard;
