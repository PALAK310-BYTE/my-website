
import React, { useEffect, useState } from 'react';
import { Save, School, User, Phone, Mail, MapPin } from 'lucide-react';

function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gramerp_settings')) || {
        schoolName: 'GramERP School',
        adminName: 'Admin',
        email: '',
        phone: '',
        address: ''
      };
    } catch {
      return {
        schoolName: 'GramERP School',
        adminName: 'Admin',
        email: '',
        phone: '',
        address: ''
      };
    }
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('gramerp_settings', JSON.stringify(settings));
  }, [settings]);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem('gramerp_settings', JSON.stringify(settings));
    setSaved(true);

    alert('Settings saved successfully!');
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    marginTop: '8px',
    marginBottom: '18px',
    fontSize: '14px'
  };

  return (
    <div style={{
      padding: '25px',
      color: '#172033',
      maxWidth: '900px'
    }}>
      <h1>Settings ⚙️</h1>

      <p style={{ color: '#64748b', marginBottom: '25px' }}>
        Manage your school information and admin profile.
      </p>

      <form onSubmit={handleSave}>
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          marginBottom: '22px',
          boxShadow: '0 2px 10px #00000008'
        }}>
          <h2 style={{ fontSize: '20px' }}>
            <School size={20} style={{ verticalAlign: 'middle' }} /> School Information
          </h2>

          <label>School Name</label>
          <input
            name="schoolName"
            value={settings.schoolName}
            onChange={handleChange}
            placeholder="Enter school name"
            style={inputStyle}
            required
          />

          <label>
            <MapPin size={15} style={{ verticalAlign: 'middle' }} /> School Address
          </label>
          <textarea
            name="address"
            value={settings.address}
            onChange={handleChange}
            placeholder="Enter school address"
            rows="3"
            style={inputStyle}
          />
        </div>

        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          marginBottom: '22px',
          boxShadow: '0 2px 10px #00000008'
        }}>
          <h2 style={{ fontSize: '20px' }}>
            <User size={20} style={{ verticalAlign: 'middle' }} /> Admin Profile
          </h2>

          <label>Admin Name</label>
          <input
            name="adminName"
            value={settings.adminName}
            onChange={handleChange}
            placeholder="Enter admin name"
            style={inputStyle}
            required
          />

          <label>
            <Mail size={15} style={{ verticalAlign: 'middle' }} /> Email Address
          </label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            placeholder="Enter email address"
            style={inputStyle}
          />

          <label>
            <Phone size={15} style={{ verticalAlign: 'middle' }} /> Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '13px 20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          <Save size={18} /> Save Settings
        </button>

        {saved && (
          <p style={{ color: '#059669', marginTop: '15px' }}>
            Settings saved successfully!
          </p>
        )}
      </form>
    </div>
  );
}

export default Settings;
