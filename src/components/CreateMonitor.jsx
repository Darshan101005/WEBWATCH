import { useState } from 'react';
import { X, ChevronDown, Plus, Trash2, Globe, Server, Mail, Phone, Lock, Code, Clock, Shield, Zap } from 'lucide-react';
import { toast } from 'react-toastify';

export default function CreateMonitor({ onClose, theme = 'dark' }) {
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

  const [formData, setFormData] = useState({
    name: '',
    type: 'HTTP',
    url: '',
    active: true,
    notifications: {
      email: { enabled: false, address: '' },
      phone: { enabled: false, number: '' },
      sms: { enabled: false, number: '' }
    },
    interval: 5,
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
      headers: []
    },
    metadata: []
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
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNestedChange = (path, value) => {
    setFormData(prev => {
      const keys = path.split('.');
      let obj = { ...prev };
      let current = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return obj;
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const addHeaderField = () => {
    setFormData(prev => ({
      ...prev,
      advanced: {
        ...prev.advanced,
        headers: [...prev.advanced.headers, { key: '', value: '' }]
      }
    }));
  };

  const removeHeaderField = (index) => {
    setFormData(prev => ({
      ...prev,
      advanced: {
        ...prev.advanced,
        headers: prev.advanced.headers.filter((_, i) => i !== index)
      }
    }));
  };

  const updateHeaderField = (index, key, value) => {
    const newHeaders = [...formData.advanced.headers];
    newHeaders[index] = { ...newHeaders[index], [key]: value };
    setFormData(prev => ({
      ...prev,
      advanced: { ...prev.advanced, headers: newHeaders }
    }));
  };

  const addMetadataField = () => {
    setFormData(prev => ({
      ...prev,
      metadata: [...prev.metadata, { key: '', value: '' }]
    }));
  };

  const removeMetadataField = (index) => {
    setFormData(prev => ({
      ...prev,
      metadata: prev.metadata.filter((_, i) => i !== index)
    }));
  };

  const updateMetadataField = (index, key, value) => {
    const newMetadata = [...formData.metadata];
    newMetadata[index] = { ...newMetadata[index], [key]: value };
    setFormData(prev => ({
      ...prev,
      metadata: newMetadata
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info('Feature coming soon! Backend integration in Phase 2.');
    console.log('Monitor Data:', formData);
  };

  // Section Header Component
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
          transition: 'transform 0.2s'
        }}
      />
    </button>
  );

  // Text Input Component
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
        className="w-full px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
        style={{
          backgroundColor: currentColors.input,
          borderColor: disabled ? currentColors.inputBorder : '#F48024',
          borderWidth: '1px',
          color: currentColors.text
        }}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="rounded-lg border w-full max-w-2xl max-h-screen overflow-y-auto" style={{ backgroundColor: currentColors.bg, borderColor: currentColors.border }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0" style={{ backgroundColor: currentColors.bg, borderBottomColor: currentColors.border }}>
          <h2 className="text-xl font-bold" style={{ color: currentColors.text }}>Create Monitor</h2>
          <button
            onClick={onClose}
            style={{ color: currentColors.textMuted }}
            onMouseEnter={(e) => e.currentTarget.style.color = currentColors.text}
            onMouseLeave={(e) => e.currentTarget.style.color = currentColors.textMuted}
            className="transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* BASIC INFORMATION */}
          <div className="mb-2 border rounded-lg" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="Basic Information" icon={Globe} section="basic" />
            {expandedSections.basic && (
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
                    className="w-full px-4 py-2.5 rounded-lg transition-colors"
                    style={{
                      backgroundColor: currentColors.input,
                      borderColor: '#F48024',
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

                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleChange}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold">Monitor is Active</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <div className="mb-2 border rounded-lg" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="Notification Settings" icon={Mail} section="notifications" />
            {expandedSections.notifications && (
              <div className="p-4 space-y-4" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.notifications.email.enabled}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, email: { ...prev.notifications.email, enabled: e.target.checked } }
                      }))}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold">Email Notification</label>
                  </div>
                  {formData.notifications.email.enabled && (
                    <input
                      type="email"
                      value={formData.notifications.email.address}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, email: { ...prev.notifications.email, address: e.target.value } }
                      }))}
                      className="w-full px-4 py-2.5 rounded-lg transition-colors"
                      style={{
                        backgroundColor: currentColors.input,
                        borderColor: '#F48024',
                        borderWidth: '1px',
                        color: currentColors.text
                      }}
                      placeholder="your@email.com"
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.notifications.phone.enabled}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, phone: { ...prev.notifications.phone, enabled: e.target.checked } }
                      }))}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold">Phone Notification</label>
                  </div>
                  {formData.notifications.phone.enabled && (
                    <input
                      type="tel"
                      value={formData.notifications.phone.number}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, phone: { ...prev.notifications.phone, number: e.target.value } }
                      }))}
                      className="w-full px-4 py-2.5 rounded-lg transition-colors"
                      style={{
                        backgroundColor: currentColors.input,
                        borderColor: '#F48024',
                        borderWidth: '1px',
                        color: currentColors.text
                      }}
                      placeholder="+1 (555) 000-0000"
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.notifications.sms.enabled}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, sms: { ...prev.notifications.sms, enabled: e.target.checked } }
                      }))}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold">SMS Notification</label>
                  </div>
                  {formData.notifications.sms.enabled && (
                    <input
                      type="tel"
                      value={formData.notifications.sms.number}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, sms: { ...prev.notifications.sms, number: e.target.value } }
                      }))}
                      className="w-full px-4 py-2.5 rounded-lg transition-colors"
                      style={{
                        backgroundColor: currentColors.input,
                        borderColor: '#F48024',
                        borderWidth: '1px',
                        color: currentColors.text
                      }}
                      placeholder="+1 (555) 000-0000"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MONITORING INTERVAL */}
          <div className="mb-2 border rounded-lg" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="Monitoring Interval" icon={Clock} section="interval" />
            {expandedSections.interval && (
              <div className="p-4 space-y-4" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold" style={{ color: currentColors.text }}>Check every {formData.interval} minute{formData.interval !== 1 ? 's' : ''}</label>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={formData.interval}
                    onChange={(e) => setFormData(prev => ({ ...prev, interval: parseInt(e.target.value) }))}
                    className="w-full"
                    style={{ accentColor: '#F48024' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* SSL & DOMAIN CHECKS */}
          <div className="mb-2 border rounded-lg" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="SSL & Domain Checks" icon={Lock} section="ssl" />
            {expandedSections.ssl && (
              <div className="p-4 space-y-4" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.ssl.enabled}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        ssl: { ...prev.ssl, enabled: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold">Check SSL Certificate</label>
                  </div>
                  {formData.ssl.enabled && (
                    <TextInput
                      label="Alert Days Before Expiry"
                      name="sslAlertDays"
                      type="number"
                      value={formData.ssl.alertDays}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        ssl: { ...prev.ssl, alertDays: parseInt(e.target.value) || 0 }
                      }))}
                      placeholder="30"
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={formData.domain.enabled}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        domain: { ...prev.domain, enabled: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold">Check Domain Expiry</label>
                  </div>
                  {formData.domain.enabled && (
                    <TextInput
                      label="Alert Days Before Expiry"
                      name="domainAlertDays"
                      type="number"
                      value={formData.domain.alertDays}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        domain: { ...prev.domain, alertDays: parseInt(e.target.value) || 0 }
                      }))}
                      placeholder="30"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ADVANCED HTTP SETTINGS */}
          <div className="mb-2 border rounded-lg" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="Advanced HTTP Settings" icon={Code} section="advanced" />
            {expandedSections.advanced && (
              <div className="p-4 space-y-4" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                <TextInput
                  label="Request Timeout (seconds)"
                  name="timeout"
                  type="number"
                  value={formData.advanced.timeout}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    advanced: { ...prev.advanced, timeout: parseInt(e.target.value) || 0 }
                  }))}
                  placeholder="30"
                />

                <TextInput
                  label="Slow Response Alert (ms)"
                  name="slowResponseAlert"
                  type="number"
                  value={formData.advanced.slowResponseAlert}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    advanced: { ...prev.advanced, slowResponseAlert: parseInt(e.target.value) || 0 }
                  }))}
                  placeholder="0"
                />

                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: currentColors.text }}>IP Version</label>
                  <div className="flex gap-4">
                    {['IPv4', 'IPv6'].map((version) => (
                      <label key={version} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="ipVersion"
                          value={version}
                          checked={formData.advanced.ipVersion === version}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            advanced: { ...prev.advanced, ipVersion: e.target.value }
                          }))}
                          style={{ accentColor: '#F48024' }}
                        />
                        <span style={{ color: currentColors.text }} className="text-sm">{version}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.advanced.followRedirects}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, followRedirects: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold">Follow Redirections</label>
                  </div>
                </div>

                <TextInput
                  label="Acceptable HTTP Status Codes"
                  name="acceptableStatusCodes"
                  value={formData.advanced.acceptableStatusCodes}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    advanced: { ...prev.advanced, acceptableStatusCodes: e.target.value }
                  }))}
                  placeholder="200-299"
                />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code size={18} style={{ color: '#F48024' }} />
                    <label className="text-sm font-semibold" style={{ color: currentColors.text }}>Request Method</label>
                  </div>
                  <select
                    value={formData.advanced.method}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      advanced: { ...prev.advanced, method: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-lg transition-colors"
                    style={{
                      backgroundColor: currentColors.input,
                      borderColor: '#F48024',
                      borderWidth: '1px',
                      color: currentColors.text
                    }}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATCH">PATCH</option>
                    <option value="HEAD">HEAD</option>
                    <option value="OPTIONS">OPTIONS</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: currentColors.text }}>Request Body</label>
                  <textarea
                    value={formData.advanced.requestBody}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      advanced: { ...prev.advanced, requestBody: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-lg transition-colors resize-none"
                    style={{
                      backgroundColor: currentColors.input,
                      borderColor: '#F48024',
                      borderWidth: '1px',
                      color: currentColors.text,
                      minHeight: '100px'
                    }}
                    placeholder="JSON or form data..."
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.advanced.sendAsJson}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, sendAsJson: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#F48024' }}
                    />
                    <label style={{ color: currentColors.text }} className="text-sm font-semibold">Send as JSON</label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold" style={{ color: currentColors.text }}>Request Headers</label>
                    <button
                      type="button"
                      onClick={addHeaderField}
                      className="p-1 rounded transition-all"
                      style={{ backgroundColor: currentColors.hover, color: '#F48024' }}
                      title="Add header"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.advanced.headers.map((header, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={header.key}
                          onChange={(e) => updateHeaderField(index, 'key', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: currentColors.input,
                            borderColor: '#F48024',
                            borderWidth: '1px',
                            color: currentColors.text
                          }}
                          placeholder="Header key"
                        />
                        <input
                          type="text"
                          value={header.value}
                          onChange={(e) => updateHeaderField(index, 'value', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: currentColors.input,
                            borderColor: '#F48024',
                            borderWidth: '1px',
                            color: currentColors.text
                          }}
                          placeholder="Header value"
                        />
                        <button
                          type="button"
                          onClick={() => removeHeaderField(index)}
                          className="p-2 rounded transition-all"
                          style={{ backgroundColor: currentColors.hover, color: '#f87171' }}
                          title="Remove header"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* METADATA */}
          <div className="mb-2 border rounded-lg" style={{ borderColor: currentColors.border }}>
            <SectionHeader title="Metadata" icon={Zap} section="metadata" />
            {expandedSections.metadata && (
              <div className="p-4 space-y-4" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold" style={{ color: currentColors.text }}>Custom Fields</label>
                    <button
                      type="button"
                      onClick={addMetadataField}
                      className="p-1 rounded transition-all"
                      style={{ backgroundColor: currentColors.hover, color: '#F48024' }}
                      title="Add metadata field"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.metadata.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item.key}
                          onChange={(e) => updateMetadataField(index, 'key', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: currentColors.input,
                            borderColor: '#F48024',
                            borderWidth: '1px',
                            color: currentColors.text
                          }}
                          placeholder="Field name"
                        />
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => updateMetadataField(index, 'value', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: currentColors.input,
                            borderColor: '#F48024',
                            borderWidth: '1px',
                            color: currentColors.text
                          }}
                          placeholder="Field value"
                        />
                        <button
                          type="button"
                          onClick={() => removeMetadataField(index)}
                          className="p-2 rounded transition-all"
                          style={{ backgroundColor: currentColors.hover, color: '#f87171' }}
                          title="Remove field"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FORM BUTTONS */}
          <div className="flex gap-3 pt-6 mt-6" style={{ borderTopColor: currentColors.divider, borderTopWidth: '1px' }}>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 font-semibold rounded-lg transition-all"
              style={{
                backgroundColor: currentColors.border,
                color: currentColors.text
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.hover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentColors.border}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 text-white font-semibold rounded-lg transition-all"
              style={{ background: 'linear-gradient(to right, #F48024, #007791)' }}
            >
              Create Monitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
