
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Search, Pencil, Trash2, X } from 'lucide-react';

const initialStudents = [
  {
    id: 1,
    name: 'Rahul Sharma',
    roll: 'GR001',
    className: '10th',
    phone: '9876543210',
    gender: 'Male'
  },
  {
    id: 2,
    name: 'Priya Verma',
    roll: 'GR002',
    className: '9th',
    phone: '9876543211',
    gender: 'Female'
  }
];

export default function Students({ onBack }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('gramerp_students');
      return saved ? JSON.parse(saved) : initialStudents;
    } catch {
      return initialStudents;
    }
  });

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    name: '',
    roll: '',
    className: '',
    phone: '',
    gender: 'Male'
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem('gramerp_students', JSON.stringify(students));
  }, [students]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setStudents(prev =>
        prev.map(student =>
          student.id === editId
            ? { ...student, ...form }
            : student
        )
      );
    } else {
      setStudents(prev => [
        ...prev,
        { id: Date.now(), ...form }
      ]);
    }

    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      roll: student.roll,
      className: student.className,
      phone: student.phone,
      gender: student.gender
    });
    setEditId(student.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(student => student.id !== id));
    }
  };

  const filteredStudents = students.filter(student =>
    `${student.name} ${student.roll} ${student.className}`
      .toLowerCase()
      .includes(search.toLowerCase())
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <div>
          <h1>Students Management</h1>
          <p>Total Students: {students.length}</p>
        </div>

        <button
          onClick={() => {
            setForm(emptyForm);
            setEditId(null);
            setShowForm(true);
          }}
          style={{ padding: '12px 18px', background: '#2563eb', color: 'white', border: 0, borderRadius: '7px', cursor: 'pointer' }}
        >
          <Plus size={16} /> Add Student
        </button>
      </div>

      <div style={{ margin: '25px 0', background: 'white', padding: '12px', borderRadius: '8px' }}>
        <Search size={17} />
        <input
          placeholder="Search by name, roll number or class..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, marginTop: '5px' }}
        />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '22px', borderRadius: '10px', marginBottom: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{editId ? 'Edit Student' : 'Add New Student'}</h2>
            <button type="button" onClick={() => setShowForm(false)}>
              <X />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <label>Student Name
              <input required style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </label>

            <label>Admission / Roll Number
              <input required style={inputStyle} value={form.roll} onChange={e => setForm({ ...form, roll: e.target.value })} />
            </label>

            <label>Class
              <input required style={inputStyle} value={form.className} onChange={e => setForm({ ...form, className: e.target.value })} />
            </label>

            <label>Mobile Number
              <input required type="tel" style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </label>

            <label>Gender
              <select style={inputStyle} value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <button type="submit" style={{ marginTop: '20px', padding: '12px 20px', background: '#2563eb', color: 'white', border: 0, borderRadius: '7px', cursor: 'pointer' }}>
            {editId ? 'Update Student' : 'Save Student'}
          </button>
        </form>
      )}

      <div style={{ background: 'white', borderRadius: '10px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
          <thead>
            <tr style={{ background: '#eef2ff' }}>
              <th style={{ padding: '14px' }}>Name</th>
              <th>Roll No.</th>
              <th>Class</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: '14px' }}>{student.name}</td>
                <td>{student.roll}</td>
                <td>{student.className}</td>
                <td>{student.phone}</td>
                <td>{student.gender}</td>
                <td>
                  <button onClick={() => handleEdit(student)} title="Edit">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(student.id)} title="Delete" style={{ marginLeft: '10px' }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '25px', textAlign: 'center' }}>
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
