import React, { useState, useEffect } from 'react';
import { 
  BarChart2, Settings, Plus, Activity, AlertCircle, 
  Globe, Wrench, Users, Zap, MoreVertical, LogOut, Sun, Moon, 
  ArrowRight, Search, Menu, CheckCircle2, ChevronRight
} from 'lucide-react';
import CreateMonitor from './CreateMonitor';
import AccountSettings from './AccountSettings';
import webwatchLogo from '../assets/webwatch-logo.png';

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('monitoring');
  const [showCreateMonitor, setShowCreateMonitor] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dashboardTheme') || 'dark';
  });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    localStorage.setItem('dashboardTheme', theme);
  }, [theme]);

  const isDark = theme === 'dark';

  const colors = {
    dark: {
      bg: '#0a0e27',
      sidebarBg: '#0a0e27',
      mainBg: 'rgba(10, 14, 39, 0.7)',
      cardBg: '#141829',
      border: '#2a3050',
      sideBorder: '#1a1f3a',
      text: '#ffffff',
      textMuted: '#9ca3af',
      hover: '#2a3050',
    },
    light: {
      bg: '#f8fafc',
      sidebarBg: '#ffffff',
      mainBg: '#f1f5f9',
      cardBg: '#ffffff',
      border: '#e2e8f0',
      sideBorder: '#e2e8f0',
      text: '#1e293b',
      textMuted: '#64748b',
      hover: '#f1f5f9',
    }
  };

  const currentColors = colors[isDark ? 'dark' : 'light'];

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
    <div className="flex h-screen" style={{backgroundColor: currentColors.bg}}>
      {showSettings && <AccountSettings onClose={() => setShowSettings(false)} theme={theme} />}

      <aside className="w-64 flex flex-col" style={{backgroundColor: currentColors.sidebarBg, borderRightColor: currentColors.sideBorder, borderRightWidth: '1px'}}>
        <div className="p-6">
          <img src={webwatchLogo} alt="Webwatch Logo" className="h-12 w-auto" />
        </div>

        <nav className="flex-1 px-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(244, 128, 36, 0.2), rgba(0, 119, 145, 0.1))',
                  borderLeftWidth: '3px',
                  borderLeftColor: '#F48024',
                  paddingLeft: '13px',
                  color: currentColors.text
                } : {
                  color: currentColors.textMuted,
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => !isActive && (e.currentTarget.style.backgroundColor = currentColors.hover)}
                onMouseLeave={(e) => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Icon size={20} style={isActive ? {color: '#F48024'} : {}} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4" style={{borderTopColor: currentColors.sideBorder, borderTopWidth: '1px'}}>
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
              style={{color: currentColors.text}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.hover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white" style={{background: 'linear-gradient(to right, #F48024, #007791)'}}>
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold" style={{color: currentColors.text}}>{user.name || 'User'}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                }}
              >
                <MoreVertical size={18} style={{color: currentColors.textMuted}} />
              </button>
            </button>

            {showProfileMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 rounded-lg border shadow-lg z-50" style={{backgroundColor: currentColors.cardBg, borderColor: currentColors.border}}>
                <button
                  onClick={() => {
                    setShowSettings(true);
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm transition-all"
                  style={{color: currentColors.text}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = currentColors.hover}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Account Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm transition-all flex items-center gap-2"
                  style={{color: '#f87171', borderTopWidth: '1px', borderTopColor: currentColors.border}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = currentColors.hover}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto" style={{backgroundColor: currentColors.mainBg}}>
        {showCreateMonitor ? (
          <CreateMonitor onClose={() => setShowCreateMonitor(false)} theme={theme} />
        ) : (
          <div className="p-8">
            <div className="max-w-7xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold capitalize" style={{color: currentColors.text}}>
                  {navItems.find(item => item.id === activeNav)?.label}
                </h2>
                <button
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className="p-2 rounded-lg transition-all"
                  style={{backgroundColor: currentColors.border, color: currentColors.text}}
                  title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </div>

              {activeNav === 'monitoring' && (
                <div className="rounded-lg border p-8 text-center" style={{backgroundColor: currentColors.cardBg, borderColor: currentColors.border}}>
                  <Activity size={48} className="mx-auto mb-4" style={{color: '#F48024'}} />
                  <h3 className="text-xl font-bold mb-2" style={{color: currentColors.text}}>No monitors yet</h3>
                  <p className="mb-6" style={{color: currentColors.textMuted}}>Create your first monitor to start tracking uptime</p>
                  <button 
                    onClick={() => setShowCreateMonitor(true)}
                    className="text-white font-semibold py-2 px-6 rounded-lg transition-all glow-btn glow-btn-primary"
                  >
                    + Create Monitor
                  </button>
                </div>
              )}

              {activeNav === 'incidents' && (
                <div className="rounded-lg border p-8 text-center" style={{backgroundColor: currentColors.cardBg, borderColor: currentColors.border}}>
                  <AlertCircle size={48} className="mx-auto mb-4" style={{color: currentColors.textMuted}} />
                  <h3 className="text-xl font-bold mb-2" style={{color: currentColors.text}}>No incidents</h3>
                  <p style={{color: currentColors.textMuted}}>All systems operational</p>
                </div>
              )}

              {activeNav === 'status' && (
                <div className="rounded-lg border p-8 text-center" style={{backgroundColor: currentColors.cardBg, borderColor: currentColors.border}}>
                  <Globe size={48} className="mx-auto mb-4" style={{color: currentColors.textMuted}} />
                  <h3 className="text-xl font-bold mb-2" style={{color: currentColors.text}}>No status pages</h3>
                  <p style={{color: currentColors.textMuted}}>Create a status page to share with your users</p>
                </div>
              )}

              {['maintenance', 'team', 'integrations'].includes(activeNav) && (
                <div className="rounded-lg border p-8 text-center" style={{backgroundColor: currentColors.cardBg, borderColor: currentColors.border}}>
                  <div className="mx-auto mb-4 text-4xl">📋</div>
                  <h3 className="text-xl font-bold mb-2" style={{color: currentColors.text}}>Coming soon</h3>
                  <p style={{color: currentColors.textMuted}}>This section is under development</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
