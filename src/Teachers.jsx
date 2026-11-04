
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Search, Pencil, Trash2, X } from 'lucide-react';

const initialTeachers = [
  { id: 1, name: 'Amit Kumar', subject: 'Mathematics', phone: '9876543210', email: 'amit@gmail.com' },
  { id: 2, name: 'Neha Sharma', subject: 'English', phone: '9876543211', email: 'neha@gmail.com' }
];

export default function Teachers({ onBack }) {
  const [teachers, setTeachers] = useState(() => {
    try {
      const saved = localStorage.getItem('gramerp_teachers');
      return saved ? JSON.parse(saved) : initialTeachers;
    } catch {
      return initialTeachers;
    }
  });

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = { name: '', subject: '', phone: '', email: '' };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem('gramerp_teachers', JSON.stringify(teachers));
  }, [teachers]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setTeachers(prev =>
        prev.map(t => t.id === editId ? { ...t, ...form } : t)
      );
    } else {
      setTeachers(prev => [...prev, { id: Date.now(), ...form }]);
    }

    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (teacher) => {
    setForm({
      name: teacher.name,
      subject: teacher.subject,
      phone: teacher.phone,
      email: teacher.email
    });
    setEditId(teacher.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(prev => prev.filter(t => t.id !== id));
    }
  };

  const filtered = teachers.filter(t =>
    `${t.name} ${t.subject} ${t.phone}`
      .toLowerCase().includes(search.toLowerCase())
  );

  const inputStyle = {
    width: '100%',
    padding: '11px',
    border: '1px solid #ddd',
    borderRadius: '7px',
    marginTop: '6px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ padding: '30px', background: '#f5f7fb', minHeight: '100vh' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', cursor: 'pointer' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <h1>Teachers Management</h1>
          <p>Total Teachers: {teachers.length}</p>
        </div>

        <button
          onClick={() => {
            setForm(emptyForm);
            setEditId(null);
            setShowForm(true);
          }}
          style={{ padding: '12px 18px', background: '#2563eb', color: 'white', border: 0, borderRadius: '7px', cursor: 'pointer' }}
        >
          <Plus size={16} /> Add Teacher
        </button>
      </div>

      <div style={{ margin: '25px 0', background: 'white', padding: '12px', borderRadius: '8px' }}>
        <Search size={17} />
        <input
          placeholder="Search by name, subject or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={inputStyle}
        />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '22px', borderRadius: '10px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{editId ? 'Edit Teacher' : 'Add New Teacher'}</h2>
            <button type="button" onClick={() => setShowForm(false)}>
              <X />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <label>Teacher Name
              <input required style={inputStyle} value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />
            </label>

            <label>Subject
              <input required style={inputStyle} value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })} />
            </label>

            <label>Mobile Number
              <input required type="tel" style={inputStyle} value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} />
            </label>

            <label>Email
              <input required type="email" style={inputStyle} value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} />
            </label>
          </div>

          <button type="submit" style={{ marginTop: '20px', padding: '12px 20px', background: '#2563eb', color: 'white', border: 0, borderRadius: '7px', cursor: 'pointer' }}>
            {editId ? 'Update Teacher' : 'Save Teacher'}
          </button>
        </form>
      )}

      <div style={{ background: 'white', borderRadius: '10px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ background: '#eef2ff' }}>
              <th style={{ padding: '14px' }}>Name</th>
              <th>Subject</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(teacher => (
              <tr key={teacher.id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: '14px' }}>{teacher.name}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.email}</td>
                <td>
                  <button onClick={() => handleEdit(teacher)} title="Edit">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(teacher.id)} title="Delete" style={{ marginLeft: '10px' }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '25px', textAlign: 'center' }}>
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
