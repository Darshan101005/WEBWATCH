import { useState } from 'react';
import { X, User, Mail, Phone, Cake, Users } from 'lucide-react';
import { toast } from 'react-toastify';
import { updateProfile } from '../services/api';

export default function AccountSettings({ onClose, theme = 'dark' }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
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
    },
    light: {
      bg: '#ffffff',
      border: '#e2e8f0',
      text: '#1e293b',
      textMuted: '#64748b',
      input: '#f8fafc',
      inputBorder: '#e2e8f0',
      hover: '#f1f5f9',
    }
  };

  const currentColors = colors[isDark ? 'dark' : 'light'];

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    age: user.age || '',
    gender: user.gender || 'male'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateProfile(formData);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="rounded-lg border w-full max-w-md max-h-screen overflow-y-auto" style={{backgroundColor: currentColors.bg, borderColor: currentColors.border}}>
        <div className="flex items-center justify-between p-6 border-b sticky top-0" style={{backgroundColor: currentColors.bg, borderBottomColor: currentColors.border}}>
          <h2 className="text-xl font-bold" style={{color: currentColors.text}}>Account Settings</h2>
          <button
            onClick={onClose}
            style={{color: currentColors.textMuted}}
            onMouseEnter={(e) => e.currentTarget.style.color = currentColors.text}
            onMouseLeave={(e) => e.currentTarget.style.color = currentColors.textMuted}
            className="transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User size={18} style={{color: '#F48024'}} />
              <label className="text-sm font-semibold" style={{color: currentColors.text}}>Full Name</label>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg transition-colors"
              style={{
                backgroundColor: currentColors.input,
                borderColor: '#F48024',
                borderWidth: '1px',
                color: currentColors.text
              }}
              placeholder="Enter full name"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail size={18} style={{color: '#F48024'}} />
              <label className="text-sm font-semibold" style={{color: currentColors.text}}>Email</label>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg transition-colors"
              style={{
                backgroundColor: currentColors.input,
                borderColor: '#F48024',
                borderWidth: '1px',
                color: currentColors.text
              }}
              placeholder="Enter email"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Phone size={18} style={{color: '#F48024'}} />
              <label className="text-sm font-semibold" style={{color: currentColors.text}}>Phone Number</label>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg transition-colors"
              style={{
                backgroundColor: currentColors.input,
                borderColor: '#F48024',
                borderWidth: '1px',
                color: currentColors.text
              }}
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Cake size={18} style={{color: '#F48024'}} />
              <label className="text-sm font-semibold" style={{color: currentColors.text}}>Age</label>
            </div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg transition-colors"
              style={{
                backgroundColor: currentColors.input,
                borderColor: '#F48024',
                borderWidth: '1px',
                color: currentColors.text
              }}
              placeholder="Enter age"
              min="0"
              max="150"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} style={{color: '#F48024'}} />
              <label className="text-sm font-semibold" style={{color: currentColors.text}}>Gender</label>
            </div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg transition-colors"
              style={{
                backgroundColor: currentColors.input,
                borderColor: '#F48024',
                borderWidth: '1px',
                color: currentColors.text
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
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
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              style={{background: 'linear-gradient(to right, #F48024, #007791)'}}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
