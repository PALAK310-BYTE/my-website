
import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Megaphone, Search } from 'lucide-react';

const STORAGE_KEY = 'gramerp_notices';

function Communication() {
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('Everyone');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
  }, [notices]);

  const addNotice = (e) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      alert('Please fill all fields');
      return;
    }

    const newNotice = {
      id: Date.now(),
      title,
      message,
      audience,
      date: new Date().toLocaleDateString()
    };

    setNotices([newNotice, ...notices]);
    setTitle('');
    setMessage('');
    setAudience('Everyone');
  };

  const deleteNotice = (id) => {
    if (window.confirm('Delete this notice?')) {
      setNotices(notices.filter((notice) => notice.id !== id));
    }
  };

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '25px', color: '#172033' }}>
      <h1 style={{ marginBottom: '8px' }}>Communication</h1>
      <p style={{ color: '#64748b', marginBottom: '25px' }}>
        Create and manage school announcements.
      </p>

      <div style={{
        background: 'white',
        padding: '22px',
        borderRadius: '12px',
        marginBottom: '25px',
        boxShadow: '0 2px 10px #0000000a'
      }}>
        <h3 style={{ marginTop: 0 }}>
          <Megaphone size={19} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Create New Notice
        </h3>

        <form onSubmit={addNotice}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notice title"
            style={inputStyle}
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your notice here..."
            rows="4"
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            style={inputStyle}
          >
            <option>Everyone</option>
            <option>Students</option>
            <option>Teachers</option>
            <option>Parents</option>
          </select>

          <button type="submit" style={buttonStyle}>
            <Plus size={17} /> Publish Notice
          </button>
        </form>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '18px'
      }}>
        <h3>Published Notices ({notices.length})</h3>

        <div style={{ position: 'relative' }}>
          <Search size={17} style={{
            position: 'absolute',
            left: '12px',
            top: '13px',
            color: '#64748b'
          }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notices"
            style={{ ...inputStyle, width: '220px', paddingLeft: '38px', margin: 0 }}
          />
        </div>
      </div>

      {filteredNotices.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '35px',
          textAlign: 'center',
          borderRadius: '12px',
          color: '#64748b'
        }}>
          No notices found. Create your first notice!
        </div>
      ) : (
        filteredNotices.map((notice) => (
          <div key={notice.id} style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '14px',
            borderLeft: '4px solid #2563eb',
            boxShadow: '0 2px 10px #0000000a'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div>
                <h3 style={{ margin: '0 0 8px' }}>{notice.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  {notice.message}
                </p>
                <small style={{ color: '#64748b' }}>
                  For: {notice.audience} • {notice.date}
                </small>
              </div>

              <button
                onClick={() => deleteNotice(notice.id)}
                title="Delete notice"
                style={{
                  border: 'none',
                  background: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '8px',
                  padding: '10px',
                  height: '40px',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  marginBottom: '14px',
  fontSize: '14px',
  fontFamily: 'inherit'
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: '#2563eb',
  color: 'white',
  border: 'none',
  padding: '12px 18px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600'
};

export default Communication;
