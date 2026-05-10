import { useState } from 'react';
import { Activity, AlertCircle, Globe, Wrench, Users, Zap, MoreVertical, LogOut } from 'lucide-react';
import AccountSettings from './AccountSettings';

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('monitoring');
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const navItems = [
    { id: 'monitoring', label: 'Monitoring', icon: Activity },
    { id: 'incidents', label: 'Incidents', icon: AlertCircle },
    { id: 'status', label: 'Status pages', icon: Globe },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'team', label: 'Team members', icon: Users },
    { id: 'integrations', label: 'Integrations & API', icon: Zap },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {showSettings && <AccountSettings onClose={() => setShowSettings(false)} />}

      <aside className="w-64 border-r border-slate-700 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-black text-white">Webwatch</h1>
        </div>

        <nav className="flex-1 px-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center font-bold text-white">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-white">{user.name || 'User'}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                }}
              >
                <MoreVertical size={18} className="text-slate-400" />
              </button>
            </button>

            {showProfileMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 rounded-lg border border-slate-700 shadow-lg z-50">
                <button
                  onClick={() => {
                    setShowSettings(true);
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                >
                  Account Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-all flex items-center gap-2 border-t border-slate-700"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl">
            <h2 className="text-3xl font-bold text-white mb-8 capitalize">
              {navItems.find(item => item.id === activeNav)?.label}
            </h2>

            {activeNav === 'monitoring' && (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 text-center">
                <Activity size={48} className="text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No monitors yet</h3>
                <p className="text-slate-400 mb-6">Create your first monitor to start tracking uptime</p>
                <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-all">
                  + Create Monitor
                </button>
              </div>
            )}

            {activeNav === 'incidents' && (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 text-center">
                <AlertCircle size={48} className="text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No incidents</h3>
                <p className="text-slate-400">All systems operational</p>
              </div>
            )}

            {activeNav === 'status' && (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 text-center">
                <Globe size={48} className="text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No status pages</h3>
                <p className="text-slate-400">Create a status page to share with your users</p>
              </div>
            )}

            {['maintenance', 'team', 'integrations'].includes(activeNav) && (
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 text-center">
                <div className="text-slate-500 mx-auto mb-4 text-4xl">📋</div>
                <h3 className="text-xl font-bold text-white mb-2">Coming soon</h3>
                <p className="text-slate-400">This section is under development</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
