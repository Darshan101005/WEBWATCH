import { useState, useMemo } from 'react';
import { 
  X, ChevronDown, Plus, Trash2, Globe, Server, 
  Mail, Lock, Code, Clock, Shield, Zap, Edit2, Smartphone
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function CreateMonitor({ 
  onClose, 
  theme = 'dark',
  // Mocking profile data coming from database
  userProfile = { email: 'user@example.com', phone: '' } 
}) {
  const isDark = theme === 'dark';

  const colors = {
    dark: {
      bg: '#141829',
      border: '#2a3050',
      text: '#ffffff',
      textMuted: '#9ca3af',
      input: '#1a1f3a',
      inputBorder: '#2a3050',
      hover: '#2a3050',
      divider: '#1f2937',
    },
    light: {
      bg: '#ffffff',
      border: '#e2e8f0',
      text: '#1e293b',
      textMuted: '#64748b',
      input: '#f8fafc',
      inputBorder: '#e2e8f0',
      hover: '#f1f5f9',
      divider: '#e2e8f0',
    }
  };

  const currentColors = colors[isDark ? 'dark' : 'light'];

  // --- INTERVAL LOGIC ---
  // Generate the specific allowed intervals according to requirements:
  // 1 to 30 minutes (step 1), 30 to 60 minutes (step 10), 60 to 1440 minutes (step 60)
  const intervalMarks = useMemo(() => {
    const arr =[];
    for (let i = 1; i <= 30; i++) arr.push(i); // 1, 2, ..., 30
    for (let i = 40; i <= 60; i += 10) arr.push(i); // 40, 50, 60
    for (let i = 120; i <= 1440; i += 60) arr.push(i); // 120, 180, ..., 1440 (2h to 24h)
    return arr;
  },[]);

  // Specific labels we want to display beneath the slider and their exact index position
  const intervalLabelsToDisplay =[
    { value: 1, label: '1m' },
    { value: 15, label: '15m' },
    { value: 30, label: '30m' },
    { value: 60, label: '1h' },
    { value: 720, label: '12h' },
    { value: 1440, label: '24h' }
  ].map(item => ({ ...item, index: intervalMarks.indexOf(item.value) }));

  // --- TIMEOUT LOGIC ---
  const timeoutMin = 5;
  const timeoutMax = 120;
  const timeoutLabels =[5, 30, 60, 120];

  const [formData, setFormData] = useState({
    name: '',
    type: 'HTTP',
    url: '',
    notifications: {
      email: { enabled: false, address: userProfile?.email || '' },
      sms: { enabled: false, number: userProfile?.phone || '' }
    },
    intervalIndex: intervalMarks.indexOf(5), // Default to 5 minutes
    ssl: { enabled: false, alertDays: 30 },
    domain: { enabled: false, alertDays: 30 },
    advanced: {
      timeout: 30,
      slowResponseAlert: 0,
      ipVersion: 'IPv4',
      followRedirects: true,
      acceptableStatusCodes: '200-299',
      method: 'GET',
      requestBody: '',
      sendAsJson: false,
      headers:[]
    },
    metadata:[]
  });

  // Track whether input is in edit mode for user details
  const [editMode, setEditMode] = useState({
    email: !userProfile?.email,
    sms: !userProfile?.phone
  });

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    notifications: true,
    interval: true,
    ssl: false,
    advanced: false,
    metadata: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateArrayField = (field, index, key, value) => {
    const newArr = [...formData[field]];
    newArr[index] = { ...newArr[index], [key]: value };
    if (field === 'metadata') {
      setFormData(prev => ({ ...prev, metadata: newArr }));
    } else {
      setFormData(prev => ({ ...prev, advanced: { ...prev.advanced, headers: newArr } }));
    }
  };

  const addArrayField = (field) => {
    const defaultObj = { key: '', value: '' };
    if (field === 'metadata') {
      setFormData(prev => ({ ...prev, metadata: [...prev.metadata, defaultObj] }));
    } else {
      setFormData(prev => ({ ...prev, advanced: { ...prev.advanced, headers: [...prev.advanced.headers, defaultObj] } }));
    }
  };

  const removeArrayField = (field, index) => {
    if (field === 'metadata') {
      setFormData(prev => ({ ...prev, metadata: prev.metadata.filter((_, i) => i !== index) }));
    } else {
      setFormData(prev => ({ ...prev, advanced: { ...prev.advanced, headers: prev.advanced.headers.filter((_, i) => i !== index) } }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      interval: intervalMarks[formData.intervalIndex] // Convert index to actual minute value
    };
    toast.info('Feature coming soon! Backend integration in Phase 2.');
    console.log('Monitor Payload:', payload);
  };

  // Format display for selected interval minutes
  const currentIntervalMins = intervalMarks[formData.intervalIndex];
  const formatDuration = (mins) => {
    if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''}`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    let str = `${h} hour${h !== 1 ? 's' : ''}`;
    if (m > 0) str += ` ${m} minute${m !== 1 ? 's' : ''}`;
    return str;
  };
  const intervalDisplay = formatDuration(currentIntervalMins);

  const SectionHeader = ({ title, icon: Icon, section }) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="w-full flex items-center gap-3 py-3 px-4 transition-all"
      style={{
        backgroundColor: expandedSections[section] ? currentColors.divider : 'transparent',
        borderBottomColor: currentColors.divider,
        borderBottomWidth: expandedSections[section] ? '1px' : '0px'
      }}
    >
      <Icon size={18} style={{ color: '#F48024' }} />
      <h3 className="font-semibold flex-1 text-left" style={{ color: currentColors.text }}>{title}</h3>
      <ChevronDown
        size={18}
        style={{
          color: currentColors.textMuted,
          transform: expandedSections[section] ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'transform 0.2s ease-in-out'
        }}
      />
    </button>
  );

  const TextInput = ({ label, name, value, onChange, placeholder, type = 'text', icon: Icon, disabled = false }) => (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon size={18} style={{ color: '#F48024' }} />}
        <label className="text-sm font-semibold" style={{ color: currentColors.text }}>{label}</label>
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-2.5 rounded-lg transition-colors outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
        style={{
          backgroundColor: currentColors.input,
          borderColor: disabled ? currentColors.inputBorder : currentColors.border,
          borderWidth: '1px',
          color: currentColors.text
        }}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="flex-1 w-full h-full border-l flex flex-col" style={{ backgroundColor: currentColors.bg, borderColor: currentColors.border }}>
      
      {/* CSS Injection for custom styling, hiding scrollbars and animating slider thumb */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .modern-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #F48024;
          cursor: pointer;
          transition: transform 0.15s ease-in-out, box-shadow 0.15s;
          box-shadow: 0 0 10px rgba(244, 128, 36, 0.4);
        }
        .modern-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 14px rgba(244, 128, 36, 0.6);
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between p-6 shrink-0 border-b" style={{ borderColor: currentColors.border }}>
        <h2 className="text-2xl font-bold" style={{ color: currentColors.text }}>Add Single Monitor</h2>
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:bg-opacity-80 border"
          style={{ backgroundColor: 'transparent', borderColor: currentColors.border, color: currentColors.text }}
        >
          Cancel
        </button>
      </div>

      {/* Scrollable Form Content */}
      <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto hide-scrollbar relative">
        <div className="max-w-4xl mx-auto space-y-5 pb-10">

          {/* BASIC INFORMATION */}
          <div className="border rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="Basic Information" icon={Globe} section="basic" />
            <div className={`transition-all duration-300 overflow-hidden ${expandedSections.basic ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 space-y-4" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                <TextInput
                  label="Monitor Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., My API Server"
                  icon={Server}
                />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={18} style={{ color: '#F48024' }} />
                    <label className="text-sm font-semibold" style={{ color: currentColors.text }}>Monitor Type</label>
                  </div>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg transition-colors outline-none focus:ring-1 focus:ring-orange-500"
                    style={{
                      backgroundColor: currentColors.input,
                      borderColor: currentColors.border,
                      borderWidth: '1px',
                      color: currentColors.text
                    }}
                  >
                    <option value="HTTP">HTTP</option>
                    <option value="TCP">TCP</option>
                    <option value="Keyword">Keyword</option>
                    <option value="Ping">Ping</option>
                    <option value="Heartbeat">Heartbeat</option>
                  </select>
                </div>

                <TextInput
                  label="URL / Hostname"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  icon={Globe}
                />
              </div>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="border rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="Notification Settings" icon={Mail} section="notifications" />
            <div className={`transition-all duration-300 overflow-hidden ${expandedSections.notifications ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-5 space-y-6" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                
                {/* Email Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.notifications.email.enabled}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, notifications: { ...prev.notifications, email: { ...prev.notifications.email, enabled: e.target.checked } }
                      }))}
                      className="w-4 h-4 rounded cursor-pointer transition-transform hover:scale-110"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold cursor-pointer">Email Notification</label>
                  </div>

                  {formData.notifications.email.enabled && (
                    <div className="pl-6 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                      {editMode.email ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="email"
                            value={formData.notifications.email.address}
                            onChange={(e) => setFormData(prev => ({
                              ...prev, notifications: { ...prev.notifications, email: { ...prev.notifications.email, address: e.target.value } }
                            }))}
                            className="flex-1 px-4 py-2.5 rounded-lg border outline-none focus:border-orange-500 transition-colors"
                            style={{ backgroundColor: currentColors.input, borderColor: currentColors.border, color: currentColors.text }}
                            placeholder="Enter email address (e.g. your@email.com)"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if(formData.notifications.email.address.trim() !== '') setEditMode(prev => ({ ...prev, email: false }));
                            }}
                            className="p-2.5 rounded-lg flex items-center justify-center transition-colors bg-orange-500 hover:bg-orange-600 text-white"
                            title="Confirm Email"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border" style={{ backgroundColor: currentColors.input, borderColor: currentColors.border }}>
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-400" />
                            <span className="text-sm font-medium" style={{ color: currentColors.text }}>{formData.notifications.email.address}</span>
                          </div>
                          <button type="button" onClick={() => setEditMode(prev => ({ ...prev, email: true }))} className="text-gray-400 hover:text-orange-500 transition-colors" title="Edit Email">
                            <Edit2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* SMS Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.notifications.sms.enabled}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, notifications: { ...prev.notifications, sms: { ...prev.notifications.sms, enabled: e.target.checked } }
                      }))}
                      className="w-4 h-4 rounded cursor-pointer transition-transform hover:scale-110"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold cursor-pointer">SMS Notification</label>
                  </div>

                  {formData.notifications.sms.enabled && (
                    <div className="pl-6 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                      {editMode.sms ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="tel"
                            value={formData.notifications.sms.number}
                            onChange={(e) => setFormData(prev => ({
                              ...prev, notifications: { ...prev.notifications, sms: { ...prev.notifications.sms, number: e.target.value } }
                            }))}
                            className="flex-1 px-4 py-2.5 rounded-lg border outline-none focus:border-orange-500 transition-colors"
                            style={{ backgroundColor: currentColors.input, borderColor: currentColors.border, color: currentColors.text }}
                            placeholder="Enter mobile number (e.g. +1 555-000-0000)"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if(formData.notifications.sms.number.trim() !== '') setEditMode(prev => ({ ...prev, sms: false }));
                            }}
                            className="p-2.5 rounded-lg flex items-center justify-center transition-colors bg-orange-500 hover:bg-orange-600 text-white"
                            title="Confirm Number"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border" style={{ backgroundColor: currentColors.input, borderColor: currentColors.border }}>
                          <div className="flex items-center gap-2">
                            <Smartphone size={16} className="text-gray-400" />
                            <span className="text-sm font-medium" style={{ color: currentColors.text }}>{formData.notifications.sms.number}</span>
                          </div>
                          <button type="button" onClick={() => setEditMode(prev => ({ ...prev, sms: true }))} className="text-gray-400 hover:text-orange-500 transition-colors" title="Edit Number">
                            <Edit2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* MONITORING INTERVAL */}
          <div className="border rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="Monitoring Interval" icon={Clock} section="interval" />
            <div className={`transition-all duration-300 overflow-hidden ${expandedSections.interval ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold" style={{ color: currentColors.text }}>Check frequency</label>
                  <span className="text-sm px-4 py-1.5 rounded-full font-bold shadow-sm transition-all duration-300" 
                        style={{ backgroundColor: 'rgba(244, 128, 36, 0.1)', color: '#F48024' }}>
                    {intervalDisplay}
                  </span>
                </div>
                
                <div className="relative pt-6 pb-4">
                  {/* The step array index determines the value allowing fine granularity on the lower end and big jumps at the high end */}
                  <input
                    type="range"
                    min="0"
                    max={intervalMarks.length - 1} 
                    step="1"
                    value={formData.intervalIndex}
                    onChange={(e) => setFormData(prev => ({ ...prev, intervalIndex: parseInt(e.target.value) }))}
                    className="w-full h-2.5 rounded-lg appearance-none cursor-pointer modern-slider outline-none"
                    style={{ 
                      background: `linear-gradient(to right, #F48024 ${(formData.intervalIndex / (intervalMarks.length - 1)) * 100}%, ${currentColors.divider} ${(formData.intervalIndex / (intervalMarks.length - 1)) * 100}%)`,
                      transition: 'background 0.2s ease'
                    }}
                  />
                  
                  {/* Dynamic Custom Labels positioned perfectly matching their indices */}
                  <div className="absolute w-full mt-3 h-6" style={{ color: currentColors.textMuted }}>
                    {intervalLabelsToDisplay.map((item) => {
                      const percent = (item.index / (intervalMarks.length - 1)) * 100;
                      return (
                        <span 
                          key={item.value} 
                          className={`absolute text-xs font-medium cursor-pointer transition-all duration-300 
                            ${formData.intervalIndex === item.index ? 'text-orange-500 font-bold scale-110 drop-shadow-md' : 'hover:text-gray-300'}`}
                          style={{ 
                            left: `${percent}%`, 
                            // Transform perfectly handles edge collision so text doesn't flow out of bounds
                            transform: percent === 0 ? 'translateX(0)' : percent === 100 ? 'translateX(-100%)' : 'translateX(-50%)' 
                          }}
                          onClick={() => setFormData(prev => ({ ...prev, intervalIndex: item.index }))}
                        >
                          {item.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SSL & DOMAIN CHECKS */}
          <div className="border rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="SSL & Domain Checks" icon={Lock} section="ssl" />
            <div className={`transition-all duration-300 overflow-hidden ${expandedSections.ssl ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 space-y-4" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.ssl.enabled}
                      onChange={(e) => setFormData(prev => ({ ...prev, ssl: { ...prev.ssl, enabled: e.target.checked } }))}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold cursor-pointer">Check SSL Certificate</label>
                  </div>
                  {formData.ssl.enabled && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                      <TextInput
                        label="Alert Days Before Expiry"
                        name="sslAlertDays"
                        type="number"
                        value={formData.ssl.alertDays}
                        onChange={(e) => setFormData(prev => ({ ...prev, ssl: { ...prev.ssl, alertDays: parseInt(e.target.value) || 0 } }))}
                        placeholder="30"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.domain.enabled}
                      onChange={(e) => setFormData(prev => ({ ...prev, domain: { ...prev.domain, enabled: e.target.checked } }))}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold cursor-pointer">Check Domain Expiry</label>
                  </div>
                  {formData.domain.enabled && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                      <TextInput
                        label="Alert Days Before Expiry"
                        name="domainAlertDays"
                        type="number"
                        value={formData.domain.alertDays}
                        onChange={(e) => setFormData(prev => ({ ...prev, domain: { ...prev.domain, alertDays: parseInt(e.target.value) || 0 } }))}
                        placeholder="30"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ADVANCED HTTP SETTINGS */}
          <div className="border rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="Advanced Settings" icon={Code} section="advanced" />
            <div className={`transition-all duration-300 overflow-hidden ${expandedSections.advanced ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 space-y-8" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                
                {/* Request Timeout Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold" style={{ color: currentColors.text }}>Request timeout</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        min="5" 
                        max="120"
                        value={formData.advanced.timeout}
                        onChange={(e) => setFormData(prev => ({
                          ...prev, advanced: { ...prev.advanced, timeout: Math.max(5, Math.min(120, parseInt(e.target.value) || 5)) }
                        }))}
                        className="w-16 px-2 py-1 text-sm font-bold text-center rounded bg-transparent border outline-none focus:border-orange-500"
                        style={{ borderColor: currentColors.border, color: '#F48024' }}
                      />
                      <span className="text-sm font-bold px-2 py-1 rounded" style={{ backgroundColor: 'rgba(244, 128, 36, 0.1)', color: '#F48024' }}>
                        seconds
                      </span>
                    </div>
                  </div>
                  <p className="text-xs mb-3" style={{color: currentColors.textMuted}}>The shorter the timeout the earlier we mark website as down.</p>
                  
                  <div className="relative pt-4 pb-4">
                    <input
                      type="range"
                      min={timeoutMin}
                      max={timeoutMax}
                      step="1"
                      value={formData.advanced.timeout}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, advanced: { ...prev.advanced, timeout: parseInt(e.target.value) || 5 }
                      }))}
                      className="w-full h-2.5 rounded-lg appearance-none cursor-pointer outline-none modern-slider"
                      style={{ 
                        background: `linear-gradient(to right, #F48024 ${((formData.advanced.timeout - timeoutMin) / (timeoutMax - timeoutMin)) * 100}%, ${currentColors.divider} ${((formData.advanced.timeout - timeoutMin) / (timeoutMax - timeoutMin)) * 100}%)`,
                        transition: 'background 0.2s ease'
                      }}
                    />
                    
                    {/* Fixed Timeout Range Labels properly mapped visually */}
                    <div className="absolute w-full mt-3 h-6" style={{ color: currentColors.textMuted }}>
                      {timeoutLabels.map((val) => {
                        const percent = ((val - timeoutMin) / (timeoutMax - timeoutMin)) * 100;
                        return (
                          <span 
                            key={val} 
                            className={`absolute text-xs font-medium transition-all duration-300 
                              ${formData.advanced.timeout === val ? 'text-orange-500 font-bold scale-110' : ''}`}
                            style={{ 
                              left: `${percent}%`,
                              // Smart translation to prevent cutoff at 0% and 100%
                              transform: percent === 0 ? 'translateX(0)' : percent === 100 ? 'translateX(-100%)' : 'translateX(-50%)'
                            }}
                          >
                            {val}s
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Slow response alert block */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-sm font-semibold" style={{color: currentColors.text}}>Slow response time alert</span>
                     <div 
                       className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${formData.advanced.slowResponseAlert > 0 ? 'bg-orange-500' : 'bg-gray-600'}`}
                       onClick={() => setFormData(prev => ({
                          ...prev, advanced: { ...prev.advanced, slowResponseAlert: prev.advanced.slowResponseAlert > 0 ? 0 : 2000 }
                       }))}
                     >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform duration-300 ${formData.advanced.slowResponseAlert > 0 ? 'translate-x-5' : 'translate-x-0.5'}`} />
                     </div>
                  </div>
                  <p className="text-xs mb-3" style={{color: currentColors.textMuted}}>
                    You'll receive a notification if the response time exceeds your set threshold.
                  </p>
                  {formData.advanced.slowResponseAlert > 0 && (
                     <div className="flex items-center animate-in fade-in" style={{backgroundColor: currentColors.input, borderColor: currentColors.border, borderWidth: '1px', borderRadius: '0.5rem'}}>
                        <input
                          type="number"
                          value={formData.advanced.slowResponseAlert}
                          onChange={(e) => setFormData(prev => ({
                             ...prev, advanced: { ...prev.advanced, slowResponseAlert: parseInt(e.target.value) || 0 }
                          }))}
                          className="flex-1 bg-transparent px-4 py-2 border-none outline-none"
                          style={{color: currentColors.text}}
                        />
                        <span className="px-4 border-l" style={{borderColor: currentColors.border, color: currentColors.textMuted}}>milliseconds</span>
                     </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: currentColors.text }}>Internet Protocol version</label>
                  <select
                    value={formData.advanced.ipVersion}
                    onChange={(e) => setFormData(prev => ({
                      ...prev, advanced: { ...prev.advanced, ipVersion: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-lg transition-colors border outline-none focus:ring-1 focus:ring-orange-500"
                    style={{ backgroundColor: currentColors.input, borderColor: currentColors.border, color: currentColors.text }}
                  >
                    <option value="IPv4 / IPv6 (IPv4 Priority)">IPv4 / IPv6 (IPv4 Priority)</option>
                    <option value="IPv4">IPv4 Only</option>
                    <option value="IPv6">IPv6 Only</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-sm font-semibold" style={{color: currentColors.text}}>Follow redirections</span>
                     <div 
                       className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${formData.advanced.followRedirects ? 'bg-orange-500' : 'bg-gray-600'}`}
                       onClick={() => setFormData(prev => ({
                          ...prev, advanced: { ...prev.advanced, followRedirects: !prev.advanced.followRedirects }
                       }))}
                     >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform duration-300 ${formData.advanced.followRedirects ? 'translate-x-5' : 'translate-x-0.5'}`} />
                     </div>
                  </div>
                  <p className="text-xs mb-3" style={{color: currentColors.textMuted}}>
                    If disabled, we return redirections HTTP codes (3xx).
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: currentColors.text }}>Up HTTP status codes</label>
                  <p className="text-xs mb-3" style={{color: currentColors.textMuted}}>We will create incident when we receive HTTP status code other than defined below.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                     {formData.advanced.acceptableStatusCodes.split(',').filter(Boolean).map((code, idx) => (
                        <div key={idx} className="flex items-center gap-1 px-3 py-1 rounded-md" style={{backgroundColor: '#2d3348', color: '#a3b1c6'}}>
                           <span className="text-sm">{code.trim()}</span>
                           <button type="button" onClick={() => {
                              const codes = formData.advanced.acceptableStatusCodes.split(',').map(c => c.trim()).filter(Boolean);
                              codes.splice(idx, 1);
                              setFormData(prev => ({ ...prev, advanced: { ...prev.advanced, acceptableStatusCodes: codes.join(', ') } }));
                           }}>
                              <X size={14} className="hover:text-white transition-colors" />
                           </button>
                        </div>
                     ))}
                     <div className="relative inline-block dropdown-status-codes">
                        <button type="button" className="flex items-center justify-center p-1.5 rounded-md border border-dashed hover:border-orange-500 hover:text-orange-500 transition-colors" style={{borderColor: '#6c7a9c', color: '#6c7a9c'}} onClick={(e) => {
                           const newCode = prompt("Enter HTTP Status (e.g. 2xx, 3xx, 404):");
                           if(newCode) {
                              const codes = formData.advanced.acceptableStatusCodes.split(',').map(c => c.trim()).filter(Boolean);
                              if(!codes.includes(newCode)) {
                                 codes.push(newCode);
                                 setFormData(prev => ({ ...prev, advanced: { ...prev.advanced, acceptableStatusCodes: codes.join(', ') } }));
                              }
                           }
                        }}>
                           <Plus size={16} />
                        </button>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block" style={{ color: currentColors.text }}>Auth. type</label>
                    <select className="w-full px-4 py-2.5 rounded-lg transition-colors border outline-none focus:ring-1 focus:ring-orange-500" style={{ backgroundColor: currentColors.input, borderColor: currentColors.border, color: currentColors.text}}>
                       <option value="None">None</option>
                       <option value="Basic">Basic Auth</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block" style={{ color: currentColors.text }}>HTTP method</label>
                    <select
                      value={formData.advanced.method}
                      onChange={(e) => setFormData(prev => ({
                        ...prev, advanced: { ...prev.advanced, method: e.target.value }
                      }))}
                      className="w-full px-4 py-2.5 rounded-lg transition-colors border outline-none focus:ring-1 focus:ring-orange-500"
                      style={{ backgroundColor: currentColors.input, borderColor: currentColors.border, color: currentColors.text }}
                    >
                      <option value="HEAD">HEAD</option>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                      <option value="DELETE">DELETE</option>
                      <option value="OPTIONS">OPTIONS</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: currentColors.text }}>Request body</label>
                  <textarea
                    value={formData.advanced.requestBody}
                    onChange={(e) => setFormData(prev => ({
                      ...prev, advanced: { ...prev.advanced, requestBody: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-lg transition-colors resize-none font-mono text-sm border outline-none focus:ring-1 focus:ring-orange-500"
                    style={{ backgroundColor: currentColors.input, borderColor: currentColors.border, color: currentColors.text, minHeight: '100px' }}
                    placeholder={`{ "key": "value" }`}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                     <div 
                       className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${formData.advanced.sendAsJson ? 'bg-orange-500' : 'bg-gray-600'}`}
                       onClick={() => setFormData(prev => ({
                          ...prev, advanced: { ...prev.advanced, sendAsJson: !prev.advanced.sendAsJson }
                       }))}
                     >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform duration-300 ${formData.advanced.sendAsJson ? 'translate-x-5' : 'translate-x-0.5'}`} />
                     </div>
                     <span className="text-sm font-semibold" style={{color: currentColors.text}}>Send as JSON (application/json)</span>
                  </div>
                  <p className="text-xs mb-3" style={{color: currentColors.textMuted}}>
                    Data will be sent as a standard POST (application/x-www-form-urlencoded) unless you check the JSON option.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold block mb-3" style={{ color: currentColors.text }}>Request headers</label>
                  <div className="space-y-2 mb-2">
                    {formData.advanced.headers.map((header, index) => (
                      <div key={index} className="flex gap-2 animate-in fade-in">
                        <input
                          type="text"
                          value={header.key}
                          onChange={(e) => updateArrayField('advanced', index, 'key', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg transition-colors border outline-none focus:border-orange-500"
                          style={{ backgroundColor: currentColors.input, borderColor: currentColors.border, color: currentColors.text }}
                          placeholder="X-Header-Name"
                        />
                        <input
                          type="text"
                          value={header.value}
                          onChange={(e) => updateArrayField('advanced', index, 'value', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg transition-colors border outline-none focus:border-orange-500"
                          style={{ backgroundColor: currentColors.input, borderColor: currentColors.border, color: currentColors.text }}
                          placeholder="Value"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField('advanced', index)}
                          className="p-2 rounded-lg transition-all hover:bg-red-500/10"
                          style={{ color: '#f87171' }}
                          title="Remove header"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayField('advanced')}
                    className="text-sm font-semibold flex items-center gap-1 py-1 hover:opacity-80 transition-opacity"
                    style={{ color: '#F48024' }}
                  >
                    <Plus size={16} /> Add header
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* METADATA */}
          <div className="border rounded-lg overflow-hidden transition-all duration-300" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="Meta fields" icon={Zap} section="metadata" />
            <div className={`transition-all duration-300 overflow-hidden ${expandedSections.metadata ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 space-y-4" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                <div>
                  <p className="text-xs mb-3" style={{color: currentColors.textMuted}}>Custom key-value metadata for organizing, filtering, and routing alerts.</p>
                  <div className="space-y-2 mb-2">
                    {formData.metadata.map((item, index) => (
                      <div key={index} className="flex gap-2 animate-in fade-in">
                        <input
                          type="text"
                          value={item.key}
                          onChange={(e) => updateArrayField('metadata', index, 'key', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg transition-colors border outline-none focus:border-orange-500"
                          style={{ backgroundColor: currentColors.input, borderColor: currentColors.border, color: currentColors.text }}
                          placeholder="Meta-key"
                        />
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => updateArrayField('metadata', index, 'value', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg transition-colors border outline-none focus:border-orange-500"
                          style={{ backgroundColor: currentColors.input, borderColor: currentColors.border, color: currentColors.text }}
                          placeholder="Value"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField('metadata', index)}
                          className="px-3 py-2 rounded-lg transition-all flex items-center gap-1 text-sm font-semibold hover:bg-gray-500/20"
                          style={{ color: currentColors.textMuted }}
                          title="Clear"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayField('metadata')}
                    className="text-sm font-semibold flex items-center gap-1 py-2 px-3 rounded-lg mt-2 transition-all hover:bg-opacity-80 border"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: currentColors.border, color: currentColors.textMuted }}
                  >
                    <Plus size={16} /> Add meta field
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM FIXED ACTION BAR */}
        <div 
          className="sticky bottom-0 mt-4 p-4 rounded-t-lg flex justify-end gap-3 border-t backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.2)]" 
          style={{ backgroundColor: `${currentColors.bg}E6`, borderColor: currentColors.divider }}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 font-semibold rounded-lg transition-all border"
            style={{ backgroundColor: 'transparent', borderColor: currentColors.border, color: currentColors.text }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.hover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-white font-semibold rounded-lg transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange-500/20"
            style={{ background: 'linear-gradient(135deg, #F48024 0%, #ea580c 100%)' }}
          >
            Add Monitor
          </button>
        </div>
      </form>
    </div>
  );
}