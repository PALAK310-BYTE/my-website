
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Pencil, Trash2, BookOpen, GraduationCap } from 'lucide-react';

export default function Academics({ onBack }) {
  const [classes, setClasses] = useState(() =>
    JSON.parse(localStorage.getItem('gramerp_classes') || '[]')
  );
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('A');
  const [subject, setSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('gramerp_classes', JSON.stringify(classes));
  }, [classes]);

  function saveClass(e) {
    e.preventDefault();
    if (!className.trim() || !subject.trim()) {
      alert('Please enter class name and subject');
      return;
    }

    if (editingId) {
      setClasses(classes.map(item =>
        item.id === editingId
          ? { ...item, className, section, subject }
          : item
      ));
      setEditingId(null);
    } else {
      setClasses([...classes, {
        id: Date.now(),
        className,
        section,
        subject
      }]);
    }

    setClassName('');
    setSection('A');
    setSubject('');
  }

  function editClass(item) {
    setClassName(item.className);
    setSection(item.section);
    setSubject(item.subject);
    setEditingId(item.id);
  }

  function deleteClass(id) {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setClasses(classes.filter(item => item.id !== id));
    }
  }

  const filteredClasses = selectedClass
    ? classes.filter(item => item.className === selectedClass)
    : classes;

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #dbe3ee',
    borderRadius: '8px',
    marginTop: '7px',
    boxSizing: 'border-box',
    outlineColor: '#2563eb'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', padding: '28px', fontFamily: 'Arial' }}>
      <button onClick={onBack} style={{ border: 0, background: 'white', padding: '10px 15px', borderRadius: 8, cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center', marginBottom: 22 }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, color: '#172033' }}>Academics Management</h1>
          <p style={{ color: '#718096' }}>Manage classes, sections and subjects</p>
        </div>
        <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: 15, borderRadius: 12 }}>
          <GraduationCap size={28} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 18, marginTop: 20 }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 12 }}>
          <BookOpen color="#2563eb" size={25} />
          <p style={{ color: '#718096' }}>Total Class Records</p>
          <h2>{classes.length}</h2>
        </div>
        <div style={{ background: 'white', padding: 20, borderRadius: 12 }}>
          <GraduationCap color="#059669" size={25} />
          <p style={{ color: '#718096' }}>Different Classes</p>
          <h2>{new Set(classes.map(item => item.className)).size}</h2>
        </div>
      </div>

      <div style={{ background: 'white', padding: 22, borderRadius: 12, marginTop: 22 }}>
        <h3>{editingId ? 'Edit Class & Subject' : 'Add Class & Subject'}</h3>
        <form onSubmit={saveClass} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 15 }}>
          <label>
            Class Name
            <input
              style={inputStyle}
              placeholder="Example: Class 1"
              value={className}
              onChange={e => setClassName(e.target.value)}
            />
          </label>

          <label>
            Section
            <select style={inputStyle} value={section} onChange={e => setSection(e.target.value)}>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>
          </label>

          <label>
            Subject
            <input
              style={inputStyle}
              placeholder="Example: Mathematics"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </label>

          <button type="submit" style={{ alignSelf: 'end', padding: 12, background: '#2563eb', color: 'white', border: 0, borderRadius: 8, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <Plus size={18} /> {editingId ? 'Update Record' : 'Add Record'}
          </button>
        </form>
      </div>

      <div style={{ background: 'white', padding: 22, borderRadius: 12, marginTop: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h3>Classes & Subjects List</h3>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ padding: 10, border: '1px solid #dbe3ee', borderRadius: 8 }}>
            <option value="">All Classes</option>
            {[...new Set(classes.map(item => item.className))].map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12, textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={{ padding: 13 }}>Class</th>
                <th style={{ padding: 13 }}>Section</th>
                <th style={{ padding: 13 }}>Subject</th>
                <th style={{ padding: 13 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e5eaf1' }}>
                  <td style={{ padding: 13 }}>{item.className}</td>
                  <td style={{ padding: 13 }}>{item.section}</td>
                  <td style={{ padding: 13 }}>{item.subject}</td>
                  <td style={{ padding: 13 }}>
                    <button onClick={() => editClass(item)} style={{ border: 0, background: '#dbeafe', color: '#1d4ed8', padding: 8, borderRadius: 6, cursor: 'pointer', marginRight: 7 }}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => deleteClass(item.id)} style={{ border: 0, background: '#fee2e2', color: '#dc2626', padding: 8, borderRadius: 6, cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClasses.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: 25, textAlign: 'center', color: '#718096' }}>
                    No class records yet. Add your first class above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
