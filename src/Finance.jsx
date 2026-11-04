
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Wallet, IndianRupee, Trash2 } from 'lucide-react';

export default function Finance({ onBack }) {
  const [students] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gramerp_students')) || [];
    } catch {
      return [];
    }
  });

  const [fees, setFees] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gramerp_fees')) || [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({
    studentId: '',
    total: '',
    paid: ''
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('gramerp_fees', JSON.stringify(fees));
  }, [fees]);

  const addFee = (e) => {
    e.preventDefault();

    const student = students.find(s => String(s.id) === String(form.studentId));

    if (!student) {
      alert('Please select a student.');
      return;
    }

    const total = Number(form.total);
    const paid = Number(form.paid);

    if (total <= 0 || paid < 0 || paid > total) {
      alert('Please enter valid fee amounts.');
      return;
    }

    setFees(prev => [
      ...prev,
      {
        id: Date.now(),
        studentId: student.id,
        name: student.name,
        roll: student.roll,
        total,
        paid,
        date: new Date().toLocaleDateString()
      }
    ]);

    setForm({ studentId: '', total: '', paid: '' });
    setShowForm(false);
  };

  const totalFees = fees.reduce((sum, f) => sum + Number(f.total), 0);
  const paidFees = fees.reduce((sum, f) => sum + Number(f.paid), 0);
  const pendingFees = totalFees - paidFees;

  const cardStyle = {
    background: 'white',
    padding: '22px',
    borderRadius: '12px',
    border: '1px solid #e5eaf2'
  };

  return (
    <div style={{ padding: '30px', background: '#f0f4fc', minHeight: '100vh' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', cursor: 'pointer' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h1>Finance Management</h1>
          <p style={{ color: '#64748b' }}>Manage student fees and payments.</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '12px 18px',
            background: '#2563eb',
            color: 'white',
            border: 0,
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} /> Add Fee Record
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
        gap: '15px',
        margin: '25px 0'
      }}>
        <div style={cardStyle}>
          <Wallet color="#2563eb" />
          <p>Total Fees</p>
          <h2>₹{totalFees.toLocaleString('en-IN')}</h2>
        </div>

        <div style={cardStyle}>
          <IndianRupee color="#159477" />
          <p>Fees Collected</p>
          <h2 style={{ color: '#159477' }}>₹{paidFees.toLocaleString('en-IN')}</h2>
        </div>

        <div style={cardStyle}>
          <Wallet color="#dc5555" />
          <p>Pending Fees</p>
          <h2 style={{ color: '#dc5555' }}>₹{pendingFees.toLocaleString('en-IN')}</h2>
        </div>
      </div>

      {showForm && (
        <form onSubmit={addFee} style={{
          ...cardStyle,
          marginBottom: '25px'
        }}>
          <h2>Add Fee Record</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
            gap: '15px'
          }}>
            <label>
              Select Student
              <select
                required
                value={form.studentId}
                onChange={e => setForm({ ...form, studentId: e.target.value })}
                style={inputStyle}
              >
                <option value="">Choose Student</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.roll})
                  </option>
                ))}
              </select>
            </label>

            <label>
              Total Fees (₹)
              <input
                required
                type="number"
                min="1"
                value={form.total}
                onChange={e => setForm({ ...form, total: e.target.value })}
                style={inputStyle}
              />
            </label>

            <label>
              Amount Paid (₹)
              <input
                required
                type="number"
                min="0"
                value={form.paid}
                onChange={e => setForm({ ...form, paid: e.target.value })}
                style={inputStyle}
              />
            </label>
          </div>

          <button type="submit" style={saveButton}>
            Save Fee Record
          </button>
        </form>
      )}

      <div style={{ ...cardStyle, overflowX: 'auto' }}>
        <h2>Fee Records</h2>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          minWidth: '650px'
        }}>
          <thead>
            <tr style={{ background: '#edf3fc' }}>
              <th style={{ padding: '14px' }}>Student</th>
              <th>Roll No.</th>
              <th>Total Fees</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {fees.map(f => {
              const pending = Number(f.total) - Number(f.paid);

              return (
                <tr key={f.id} style={{ borderTop: '1px solid #eee' }}>
                  <td style={{ padding: '14px' }}>{f.name}</td>
                  <td>{f.roll}</td>
                  <td>₹{Number(f.total).toLocaleString('en-IN')}</td>
                  <td>₹{Number(f.paid).toLocaleString('en-IN')}</td>
                  <td>₹{pending.toLocaleString('en-IN')}</td>
                  <td>
                    <strong style={{ color: pending === 0 ? '#159477' : '#dc8b25' }}>
                      {pending === 0 ? 'Paid' : 'Pending'}
                    </strong>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this fee record?')) {
                          setFees(prev => prev.filter(x => x.id !== f.id));
                        }
                      }}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#dc5555' }}
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {fees.length === 0 && (
              <tr>
                <td colSpan="7" style={{ padding: '25px', textAlign: 'center' }}>
                  No fee records yet. Click Add Fee Record to begin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '11px',
  marginTop: '7px',
  border: '1px solid #ddd',
  borderRadius: '7px',
  boxSizing: 'border-box'
};

const saveButton = {
  marginTop: '20px',
  padding: '12px 20px',
  background: '#2563eb',
  color: 'white',
  border: 0,
  borderRadius: '7px',
  cursor: 'pointer'
};
