
import React from 'react';
import {
  Users,
  GraduationCap,
  Wallet,
  CalendarCheck,
  MessageSquare,
  FileBarChart
} from 'lucide-react';

function getData(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function Reports() {
  const students = getData('gramerp_students');
  const teachers = getData('gramerp_teachers');
  const fees = getData('gramerp_fees');
  const attendance = getData('gramerp_attendance');
  const notices = getData('gramerp_notices');

  const totalFees = fees.reduce(
    (sum, item) => sum + Number(item.totalFees || item.total || 0),
    0
  );

  const collectedFees = fees.reduce(
    (sum, item) => sum + Number(item.amountPaid || item.paid || 0),
    0
  );

  const pendingFees = Math.max(0, totalFees - collectedFees);

  const presentCount = attendance.filter(
    (item) => item.status === 'Present' || item.present === true
  ).length;

  const absentCount = attendance.filter(
    (item) => item.status === 'Absent' || item.present === false
  ).length;

  const reportCards = [
    {
      title: 'Total Students',
      value: students.length,
      icon: GraduationCap,
      color: '#2563eb',
      bg: '#dbeafe'
    },
    {
      title: 'Total Teachers',
      value: teachers.length,
      icon: Users,
      color: '#7c3aed',
      bg: '#ede9fe'
    },
    {
      title: 'Fees Collected',
      value: `₹${collectedFees.toLocaleString('en-IN')}`,
      icon: Wallet,
      color: '#059669',
      bg: '#d1fae5'
    },
    {
      title: 'Pending Fees',
      value: `₹${pendingFees.toLocaleString('en-IN')}`,
      icon: Wallet,
      color: '#ea580c',
      bg: '#ffedd5'
    },
    {
      title: 'Present Records',
      value: presentCount,
      icon: CalendarCheck,
      color: '#0891b2',
      bg: '#cffafe'
    },
    {
      title: 'Published Notices',
      value: notices.length,
      icon: MessageSquare,
      color: '#db2777',
      bg: '#fce7f3'
    }
  ];

  const downloadReport = () => {
    const rows = [
      ['GramERP School Report'],
      ['Generated On', new Date().toLocaleDateString('en-IN')],
      [],
      ['Report', 'Value'],
      ['Total Students', students.length],
      ['Total Teachers', teachers.length],
      ['Total Fee Records', fees.length],
      ['Total Fees', totalFees],
      ['Fees Collected', collectedFees],
      ['Pending Fees', pendingFees],
      ['Present Records', presentCount],
      ['Absent Records', absentCount],
      ['Published Notices', notices.length]
    ];

    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gramerp-school-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '25px', color: '#172033' }}>
      <div style={styles.heading}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>Reports</h1>
          <p style={{ color: '#64748b', margin: 0 }}>
            View your school's performance and records.
          </p>
        </div>

        <button onClick={downloadReport} style={styles.button}>
          <FileBarChart size={18} /> Download CSV
        </button>
      </div>

      <div style={styles.grid}>
        {reportCards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.title} style={styles.card}>
              <div style={{
                ...styles.icon,
                background: card.bg,
                color: card.color
              }}>
                <Icon size={23} />
              </div>

              <div>
                <p style={styles.label}>{card.title}</p>
                <h2 style={styles.value}>{card.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.section}>
        <h2>Attendance Summary</h2>

        <div style={styles.summaryRow}>
          <div>
            <span style={{ color: '#059669' }}>Present</span>
            <h2>{presentCount}</h2>
          </div>

          <div>
            <span style={{ color: '#dc2626' }}>Absent</span>
            <h2>{absentCount}</h2>
          </div>

          <div>
            <span style={{ color: '#2563eb' }}>Total Records</span>
            <h2>{attendance.length}</h2>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Fee Summary</h2>

        <div style={styles.feeRow}>
          <span>Total Fees</span>
          <strong>₹{totalFees.toLocaleString('en-IN')}</strong>
        </div>

        <div style={styles.feeRow}>
          <span>Collected Fees</span>
          <strong style={{ color: '#059669' }}>
            ₹{collectedFees.toLocaleString('en-IN')}
          </strong>
        </div>

        <div style={styles.feeRow}>
          <span>Pending Fees</span>
          <strong style={{ color: '#dc2626' }}>
            ₹{pendingFees.toLocaleString('en-IN')}
          </strong>
        </div>
      </div>

      <p style={styles.note}>
        Reports are calculated from the records saved in this browser.
      </p>
    </div>
  );
}

const styles = {
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '25px'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px 17px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
    gap: '16px'
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 2px 10px #00000008'
  },
  icon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0
  },
  label: {
    color: '#64748b',
    fontSize: '13px',
    margin: '0 0 7px'
  },
  value: {
    fontSize: '22px',
    margin: 0
  },
  section: {
    background: 'white',
    padding: '22px',
    borderRadius: '12px',
    marginTop: '22px',
    boxShadow: '0 2px 10px #00000008'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '20px',
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  feeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '13px 0',
    borderBottom: '1px solid #e2e8f0'
  },
  note: {
    color: '#64748b',
    fontSize: '12px',
    marginTop: '18px'
  }
};

export default Reports;
