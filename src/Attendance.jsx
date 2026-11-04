
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CalendarCheck, CheckCircle, XCircle } from 'lucide-react';

export default function Attendance({ onBack }) {
  const [students] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gramerp_students')) || [];
    } catch {
      return [];
    }
  });

  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const [records, setRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gramerp_attendance')) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('gramerp_attendance', JSON.stringify(records));
  }, [records]);

  const attendance = records[date] || {};

  const markAttendance = (id, status) => {
    setRecords(prev => ({
      ...prev,
      [date]: {
        ...(prev[date] || {}),
        [id]: status
      }
    }));
  };

  const present = Object.values(attendance).filter(x => x === 'Present').length;
  const absent = Object.values(attendance).filter(x => x === 'Absent').length;

  const cardStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #e5eaf2'
  };

  return (
    <div style={{ padding: '30px', background: '#f0f4fc', minHeight: '100vh' }}>
      <button onClick={onBack} style={{ marginBottom: '20px', cursor: 'pointer' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <h1>Attendance Management</h1>
      <p style={{ color: '#64748b' }}>Mark and manage student attendance.</p>

      <div style={{ margin: '20px 0', ...cardStyle }}>
        <label><strong>Select Date</strong></label>
        <br />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ padding: '10px', marginTop: '10px', border: '1px solid #ddd', borderRadius: '7px' }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={cardStyle}>
          <p>Total Students</p>
          <h2>{students.length}</h2>
        </div>
        <div style={cardStyle}>
          <p style={{ color: '#159477' }}>Present</p>
          <h2>{present}</h2>
        </div>
        <div style={cardStyle}>
          <p style={{ color: '#dc5555' }}>Absent</p>
          <h2>{absent}</h2>
        </div>
      </div>

      <div style={{ ...cardStyle, overflowX: 'auto' }}>
        <h2>Student Attendance</h2>

        {students.length === 0 ? (
          <p>No students found. Please add students first.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '550px' }}>
            <thead>
              <tr style={{ background: '#edf3fc', textAlign: 'left' }}>
                <th style={{ padding: '14px' }}>Student Name</th>
                <th>Roll Number</th>
                <th>Status</th>
                <th>Mark Attendance</th>
              </tr>
            </thead>

            <tbody>
              {students.map(student => (
                <tr key={student.id} style={{ borderTop: '1px solid #eee' }}>
                  <td style={{ padding: '14px' }}>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>
                    <strong style={{
                      color: attendance[student.id] === 'Present'
                        ? '#159477'
                        : attendance[student.id] === 'Absent'
                          ? '#dc5555'
                          : '#8993a3'
                    }}>
                      {attendance[student.id] || 'Not Marked'}
                    </strong>
                  </td>
                  <td>
                    <button
                      onClick={() => markAttendance(student.id, 'Present')}
                      title="Present"
                      style={{
                        padding: '8px',
                        marginRight: '7px',
                        background: '#e4f7ef',
                        color: '#159477',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <CheckCircle size={18} />
                    </button>

                    <button
                      onClick={() => markAttendance(student.id, 'Absent')}
                      title="Absent"
                      style={{
                        padding: '8px',
                        background: '#fff0f0',
                        color: '#dc5555',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <XCircle size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
