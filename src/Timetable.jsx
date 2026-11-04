
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Pencil, Trash2, Clock, CalendarDays } from 'lucide-react';

export default function Timetable({ onBack }) {
  const [entries, setEntries] = useState(() =>
    JSON.parse(localStorage.getItem('gramerp_timetable') || '[]')
  );

  const [form, setForm] = useState({
    className: '',
    section: 'A',
    day: 'Monday',
    subject: '',
    teacher: '',
    startTime: '',
    endTime: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [filterDay, setFilterDay] = useState('All');

  useEffect(() => {
    localStorage.setItem('gramerp_timetable', JSON.stringify(entries));
  }, [entries]);

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function saveEntry(e) {
    e.preventDefault();

    if (!form.className.trim() || !form.subject.trim() ||
        !form.teacher.trim() || !form.startTime || !form.endTime) {
      alert('Please fill all fields');
      return;
    }

    if (form.startTime >= form.endTime) {
      alert('End time must be after start time');
      return;
    }

    if (editingId) {
      setEntries(entries.map(item =>
        item.id === editingId ? { ...form, id: editingId } : item
      ));
      setEditingId(null);
    } else {
      setEntries([...entries, { ...form, id: Date.now() }]);
    }

    setForm({
      className: '',
      section: 'A',
      day: 'Monday',
      subject: '',
      teacher: '',
      startTime: '',
      endTime: ''
    });
  }

  function editEntry(item) {
    setForm({
      className: item.className,
      section: item.section,
      day: item.day,
      subject: item.subject,
      teacher: item.teacher,
      startTime: item.startTime,
      endTime: item.endTime
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteEntry(id) {
    if (window.confirm('Delete this timetable entry?')) {
      setEntries(entries.filter(item => item.id !== id));
    }
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredEntries = entries
    .filter(item => filterDay === 'All' || item.day === filterDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const inputStyle = {
    width: '100%',
    padding: 11,
    marginTop: 7,
    border: '1px solid #dbe3ee',
    borderRadius: 8,
    boxSizing: 'border-box'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', padding: 28, fontFamily: 'Arial' }}>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 15px', background: 'white', border: 0, borderRadius: 8, cursor: 'pointer', marginBottom: 22 }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, color: '#172033' }}>Timetable Management</h1>
          <p style={{ color: '#718096' }}>Create and manage your school timetable</p>
        </div>
        <CalendarDays size={35} color="#2563eb" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginTop: 20 }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 12 }}>
          <CalendarDays color="#2563eb" size={24} />
          <p style={{ color: '#718096' }}>Total Periods</p>
          <h2>{entries.length}</h2>
        </div>
        <div style={{ background: 'white', padding: 20, borderRadius: 12 }}>
          <Clock color="#059669" size={24} />
          <p style={{ color: '#718096' }}>Days Scheduled</p>
          <h2>{new Set(entries.map(item => item.day)).size}</h2>
        </div>
      </div>

      <div style={{ background: 'white', padding: 22, borderRadius: 12, marginTop: 22 }}>
        <h3>{editingId ? 'Edit Timetable Entry' : 'Add New Period'}</h3>

        <form onSubmit={saveEntry} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 15 }}>
          <label>
            Class
            <input name="className" value={form.className} onChange={updateField} placeholder="Example: Class 1" style={inputStyle} />
          </label>

          <label>
            Section
            <select name="section" value={form.section} onChange={updateField} style={inputStyle}>
              <option>A</option><option>B</option><option>C</option><option>D</option>
            </select>
          </label>

          <label>
            Day
            <select name="day" value={form.day} onChange={updateField} style={inputStyle}>
              {days.map(day => <option key={day}>{day}</option>)}
            </select>
          </label>

          <label>
            Subject
            <input name="subject" value={form.subject} onChange={updateField} placeholder="Example: Maths" style={inputStyle} />
          </label>

          <label>
            Teacher Name
            <input name="teacher" value={form.teacher} onChange={updateField} placeholder="Teacher name" style={inputStyle} />
          </label>

          <label>
            Start Time
            <input type="time" name="startTime" value={form.startTime} onChange={updateField} style={inputStyle} />
          </label>

          <label>
            End Time
            <input type="time" name="endTime" value={form.endTime} onChange={updateField} style={inputStyle} />
          </label>

          <button type="submit" style={{ alignSelf: 'end', padding: 12, background: '#2563eb', color: 'white', border: 0, borderRadius: 8, cursor: 'pointer' }}>
            <Plus size={17} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            {editingId ? 'Update Period' : 'Add Period'}
          </button>
        </form>
      </div>

      <div style={{ background: 'white', padding: 22, borderRadius: 12, marginTop: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h3>Weekly Timetable</h3>
          <select value={filterDay} onChange={e => setFilterDay(e.target.value)} style={{ padding: 10, border: '1px solid #dbe3ee', borderRadius: 8 }}>
            <option value="All">All Days</option>
            {days.map(day => <option key={day}>{day}</option>)}
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: 12, minWidth: 650 }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                {['Day', 'Class', 'Subject', 'Teacher', 'Time', 'Actions'].map(label =>
                  <th key={label} style={{ padding: 13 }}>{label}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e5eaf1' }}>
                  <td style={{ padding: 13 }}>{item.day}</td>
                  <td style={{ padding: 13 }}>{item.className} - {item.section}</td>
                  <td style={{ padding: 13 }}>{item.subject}</td>
                  <td style={{ padding: 13 }}>{item.teacher}</td>
                  <td style={{ padding: 13 }}>{item.startTime} - {item.endTime}</td>
                  <td style={{ padding: 13 }}>
                    <button onClick={() => editEntry(item)} style={{ padding: 8, marginRight: 6, border: 0, borderRadius: 6, background: '#dbeafe', color: '#1d4ed8', cursor: 'pointer' }}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => deleteEntry(item.id)} style={{ padding: 8, border: 0, borderRadius: 6, background: '#fee2e2', color: '#dc2626', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEntries.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: 25, textAlign: 'center', color: '#718096' }}>
                    No timetable periods added yet.
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
