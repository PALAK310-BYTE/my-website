
import React, { useState } from 'react';

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  Wallet,
  CalendarDays,
  MessageSquare,
  FileBarChart,
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Calendar,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react';

import Students from './Students';
import Teachers from './Teachers';
import Attendance from './Attendance';
import Finance from './Finance';
import Academics from './Academics';
import Timetable from './Timetable';
import Communication from './Communication';
import Events from './Events';
import Reports from './Reports';
import Settings from './Settings';

function Dashboard({ onLogout }) {

  const [activePage, setActivePage] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = {
    Students,
    Teachers,
    Attendance,
    Finance,
    Academics,
    Timetable,
    Communication,
    Events,
    Reports,
    Settings
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Students', icon: GraduationCap },
    { name: 'Teachers', icon: Users },
    { name: 'Attendance', icon: CalendarCheck },
    { name: 'Academics', icon: BookOpen },
    { name: 'Finance', icon: Wallet },
    { name: 'Timetable', icon: CalendarDays },
    { name: 'Events', icon: CalendarDays },
    { name: 'Communication', icon: MessageSquare },
    { name: 'Reports', icon: FileBarChart },
    { name: 'Settings', icon: SettingsIcon }
  ];

  const openPage = (name) => {
    setActivePage(name);
  };

  const Page = pages[activePage];

  // READ LOCAL STORAGE

  const readData = (key) => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || '[]');

      return Array.isArray(data) ? data : [];

    } catch {
      return [];
    }
  };

  // COUNT DATA

  const readCount = (key) => {
    return readData(key).length;
  };

  // TODAY DATE

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');

  // UPCOMING EVENTS

  const events = readData('gramerp_events');

  const upcomingEvents = events
    .filter((event) => {
      return event.date && event.date >= todayString;
    })
    .sort((a, b) => {
      return a.date.localeCompare(b.date);
    })
    .slice(0, 5);

  // ATTENDANCE DATA

  const attendanceRecords = readData('gramerp_attendance');

  const totalStudents = readCount('gramerp_students');

  const todayAttendance = attendanceRecords.filter((record) => {

    const recordDate =
      record.date ||
      record.attendanceDate ||
      record.day;

    return recordDate === todayString;

  });

  // PRESENT COUNT

  const presentCount = todayAttendance.filter((record) => {

    const status = String(
      record.status ||
      record.attendance ||
      record.present ||
      ''
    ).toLowerCase();

    return (
      status === 'present' ||
      status === 'true' ||
      status === '1' ||
      record.present === true
    );

  }).length;

  // ABSENT COUNT

  const absentCount = todayAttendance.filter((record) => {

    const status = String(
      record.status ||
      record.attendance ||
      record.present ||
      ''
    ).toLowerCase();

    return (
      status === 'absent' ||
      status === 'false' ||
      status === '0' ||
      record.present === false
    );

  }).length;

  // ATTENDANCE PERCENTAGE

  const attendancePercentage =
    totalStudents > 0
      ? Math.round((presentCount / totalStudents) * 100)
      : 0;

  // MODULES

  const modules = [

    {
      name: 'Students',
      desc: 'Add and manage student records',
      icon: GraduationCap,
      color: '#2563eb',
      bg: '#dbeafe'
    },

    {
      name: 'Teachers',
      desc: 'Manage your teaching staff',
      icon: Users,
      color: '#7c3aed',
      bg: '#ede9fe'
    },

    {
      name: 'Attendance',
      desc: 'Track daily attendance',
      icon: CalendarCheck,
      color: '#059669',
      bg: '#d1fae5'
    },

    {
      name: 'Academics',
      desc: 'Manage classes and subjects',
      icon: BookOpen,
      color: '#ea580c',
      bg: '#ffedd5'
    },

    {
      name: 'Finance',
      desc: 'Manage school fee records',
      icon: Wallet,
      color: '#0891b2',
      bg: '#cffafe'
    },

    {
      name: 'Timetable',
      desc: 'Manage class schedules',
      icon: CalendarDays,
      color: '#db2777',
      bg: '#fce7f3'
    },

    {
      name: 'Events',
      desc: 'Manage school events and activities',
      icon: CalendarDays,
      color: '#9333ea',
      bg: '#f3e8ff'
    },

    {
      name: 'Communication',
      desc: 'Publish school announcements',
      icon: MessageSquare,
      color: '#4f46e5',
      bg: '#e0e7ff'
    },

    {
      name: 'Reports',
      desc: 'View and download school reports',
      icon: FileBarChart,
      color: '#0f766e',
      bg: '#ccfbf1'
    },

    {
      name: 'Settings',
      desc: 'Manage school and admin details',
      icon: SettingsIcon,
      color: '#64748b',
      bg: '#e2e8f0'
    }

  ];

  return (

    <div style={styles.app}>

      {/* SIDEBAR */}

      <aside
        style={{
          ...styles.sidebar,
          width: sidebarOpen ? '250px' : '75px'
        }}
      >

        {/* LOGO */}

        <div style={styles.logo}>

          <div style={styles.logoIcon}>
            G
          </div>

          {sidebarOpen && <h2>GramERP</h2>}

        </div>

        {/* MENU LABEL */}

        <p style={styles.menuLabel}>
          {sidebarOpen ? 'MAIN MENU' : ''}
        </p>

        {/* MENU */}

        <nav>

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (

              <button
                key={item.name}
                onClick={() => openPage(item.name)}
                title={!sidebarOpen ? item.name : ''}
                style={{
                  ...styles.menuItem,
                  ...(activePage === item.name
                    ? styles.activeMenuItem
                    : {})
                }}
              >

                <Icon size={19} />

                {sidebarOpen && (
                  <span>{item.name}</span>
                )}

              </button>

            );

          })}

        </nav>

        {/* LOGOUT */}

        <button
          onClick={onLogout}
          style={styles.logout}
        >

          <LogOut size={19} />

          {sidebarOpen && <span>Logout</span>}

        </button>

      </aside>

      {/* MAIN CONTENT */}

      <main style={styles.main}>

        {/* TOPBAR */}

        <header style={styles.topbar}>

          <div style={styles.topbarLeft}>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={styles.iconButton}
            >

              {sidebarOpen
                ? <X size={20} />
                : <Menu size={20} />}

            </button>

            <div>

              <h3 style={{ margin: 0 }}>
                {activePage}
              </h3>

              <small style={{ color: '#64748b' }}>
                GramERP School Management
              </small>

            </div>

          </div>

          {/* TOPBAR RIGHT */}

          <div style={styles.topbarRight}>

            <div style={styles.searchBox}>

              <Search size={17} color="#64748b" />

              <input
                placeholder="Search..."
                style={styles.searchInput}
              />

            </div>

            <button
              style={styles.iconButton}
              onClick={() => setActivePage('Communication')}
              title="Notices"
            >

              <Bell size={20} />

            </button>

            {/* PROFILE */}

            <div style={styles.profile}>

              <div style={styles.avatar}>
                A
              </div>

              <div>

                <strong>Admin</strong>

                <small
                  style={{
                    display: 'block',
                    color: '#64748b'
                  }}
                >
                  School Admin
                </small>

              </div>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <section style={styles.content}>

          {Page ? (

            <Page
              onBack={() => setActivePage('Dashboard')}
            />

          ) : (

            <>

              {/* WELCOME */}

              <div style={styles.welcome}>

                <div>

                  <h1>
                    Welcome to GramERP 👋
                  </h1>

                  <p>
                    Manage your school activities from one place.
                  </p>

                </div>

                <div style={styles.dateBox}>

                  {new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}

                </div>

              </div>

              {/* STATISTICS */}

              <div style={styles.statsGrid}>

                {[

                  {
                    title: 'Total Students',
                    value: readCount('gramerp_students'),
                    icon: GraduationCap,
                    color: '#2563eb',
                    bg: '#dbeafe'
                  },

                  {
                    title: 'Total Teachers',
                    value: readCount('gramerp_teachers'),
                    icon: Users,
                    color: '#7c3aed',
                    bg: '#ede9fe'
                  },

                  {
                    title: 'Fee Records',
                    value: readCount('gramerp_fees'),
                    icon: Wallet,
                    color: '#059669',
                    bg: '#d1fae5'
                  },

                  {
                    title: 'Notices',
                    value: readCount('gramerp_notices'),
                    icon: MessageSquare,
                    color: '#ea580c',
                    bg: '#ffedd5'
                  }

                ].map((card) => {

                  const Icon = card.icon;

                  return (

                    <div
                      key={card.title}
                      style={styles.statCard}
                    >

                      <div
                        style={{
                          ...styles.statIcon,
                          background: card.bg,
                          color: card.color
                        }}
                      >

                        <Icon size={23} />

                      </div>

                      <div>

                        <p style={styles.statTitle}>
                          {card.title}
                        </p>

                        <h2 style={styles.statValue}>
                          {card.value}
                        </h2>

                      </div>

                    </div>

                  );

                })}

              </div>

              {/* ATTENDANCE SUMMARY */}

              <div style={styles.attendanceSection}>

                <div style={styles.attendanceHeading}>

                  <div>

                    <h2>
                      <CalendarCheck
                        size={22}
                        style={{ verticalAlign: 'middle' }}
                      />{' '}
                      Today's Attendance
                    </h2>

                    <p>
                      Daily student attendance overview
                    </p>

                  </div>

                  <button
                    onClick={() => setActivePage('Attendance')}
                    style={styles.manageButton}
                  >

                    Manage Attendance →

                  </button>

                </div>

                {/* ATTENDANCE CARDS */}

                <div style={styles.attendanceGrid}>

                  {/* TOTAL STUDENTS */}

                  <div style={styles.attendanceCard}>

                    <div
                      style={{
                        ...styles.attendanceIcon,
                        background: '#dbeafe',
                        color: '#2563eb'
                      }}
                    >

                      <Users size={22} />

                    </div>

                    <p style={styles.attendanceLabel}>
                      Total Students
                    </p>

                    <h2>
                      {totalStudents}
                    </h2>

                  </div>

                  {/* PRESENT */}

                  <div style={styles.attendanceCard}>

                    <div
                      style={{
                        ...styles.attendanceIcon,
                        background: '#d1fae5',
                        color: '#059669'
                      }}
                    >

                      <CheckCircle size={22} />

                    </div>

                    <p style={styles.attendanceLabel}>
                      Present
                    </p>

                    <h2 style={{ color: '#059669' }}>
                      {presentCount}
                    </h2>

                  </div>

                  {/* ABSENT */}

                  <div style={styles.attendanceCard}>

                    <div
                      style={{
                        ...styles.attendanceIcon,
                        background: '#fee2e2',
                        color: '#dc2626'
                      }}
                    >

                      <XCircle size={22} />

                    </div>

                    <p style={styles.attendanceLabel}>
                      Absent
                    </p>

                    <h2 style={{ color: '#dc2626' }}>
                      {absentCount}
                    </h2>

                  </div>

                  {/* PERCENTAGE */}

                  <div style={styles.attendanceCard}>

                    <div
                      style={{
                        ...styles.attendanceIcon,
                        background: '#f3e8ff',
                        color: '#9333ea'
                      }}
                    >

                      <TrendingUp size={22} />

                    </div>

                    <p style={styles.attendanceLabel}>
                      Attendance %
                    </p>

                    <h2 style={{ color: '#9333ea' }}>
                      {attendancePercentage}%
                    </h2>

                  </div>

                </div>

                {/* ATTENDANCE PROGRESS */}

                <div style={styles.progressContainer}>

                  <div style={styles.progressHeader}>

                    <span>
                      Attendance Progress
                    </span>

                    <strong>
                      {attendancePercentage}%
                    </strong>

                  </div>

                  <div style={styles.progressBackground}>

                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${Math.min(attendancePercentage, 100)}%`
                      }}
                    />

                  </div>

                </div>

                {/* EMPTY MESSAGE */}

                {todayAttendance.length === 0 && (

                  <p style={styles.emptyAttendance}>

                    No attendance marked for today.

                    <button
                      onClick={() => setActivePage('Attendance')}
                      style={styles.textButton}
                    >

                      Mark Attendance

                    </button>

                  </p>

                )}

              </div>

              {/* UPCOMING EVENTS */}

              <div style={styles.eventsSection}>

                <div style={styles.eventsHeading}>

                  <div>

                    <h2>

                      <Calendar
                        size={22}
                        style={{ verticalAlign: 'middle' }}
                      />{' '}

                      Upcoming Events

                    </h2>

                    <p>
                      School events and activities
                    </p>

                  </div>

                  <button
                    onClick={() => setActivePage('Events')}
                    style={styles.manageButton}
                  >

                    Manage Events →

                  </button>

                </div>

                {/* EVENT LIST */}

                {upcomingEvents.length === 0 ? (

                  <div style={styles.emptyEvents}>

                    <CalendarDays
                      size={35}
                      color="#94a3b8"
                    />

                    <h3>
                      No Upcoming Events
                    </h3>

                    <p>
                      Add school events to see them here.
                    </p>

                    <button
                      onClick={() => setActivePage('Events')}
                      style={styles.addEventButton}
                    >

                      + Add Event

                    </button>

                  </div>

                ) : (

                  <div style={styles.eventsGrid}>

                    {upcomingEvents.map((event) => (

                      <button
                        key={event.id}
                        onClick={() => setActivePage('Events')}
                        style={styles.eventCard}
                      >

                        <div style={styles.eventIcon}>

                          <CalendarDays size={22} />

                        </div>

                        <div style={styles.eventDetails}>

                          <strong>
                            {event.title}
                          </strong>

                          <p>

                            📅{' '}

                            {new Date(
                              `${event.date}T00:00:00`
                            ).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}

                          </p>

                        </div>

                        <span style={styles.eventArrow}>
                          →
                        </span>

                      </button>

                    ))}

                  </div>

                )}

              </div>

              {/* MODULES */}

              <div style={styles.sectionHeading}>

                <h2>
                  School Management
                </h2>

                <p>
                  Quick access to your school modules
                </p>

              </div>

              <div style={styles.modulesGrid}>

                {modules.map((item) => {

                  const Icon = item.icon;

                  return (

                    <button
                      key={item.name}
                      onClick={() => openPage(item.name)}
                      style={styles.moduleCard}
                    >

                      <div
                        style={{
                          ...styles.moduleIcon,
                          color: item.color,
                          background: item.bg
                        }}
                      >

                        <Icon size={24} />

                      </div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.desc}
                      </p>

                      <span style={styles.viewLink}>
                        Open Module →
                      </span>

                    </button>

                  );

                })}

              </div>

              {/* BOTTOM MESSAGE */}

              <div style={styles.bottomCard}>

                <h3>
                  Welcome to your school dashboard!
                </h3>

                <p>

                  Use the sidebar or quick access cards to manage
                  students, teachers, attendance, fees, notices,
                  events, reports and school settings.

                </p>

              </div>

            </>

          )}

        </section>

      </main>

    </div>

  );

}

/* STYLES */

const styles = {

  app: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f1f5f9',
    fontFamily: 'Arial, sans-serif',
    color: '#172033'
  },

  sidebar: {
    background: '#111827',
    color: 'white',
    padding: '20px 12px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s',
    flexShrink: 0
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '5px 8px 25px'
  },

  logoIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: '#2563eb',
    display: 'grid',
    placeItems: 'center',
    fontSize: '22px',
    fontWeight: 'bold'
  },

  menuLabel: {
    color: '#94a3b8',
    fontSize: '11px',
    paddingLeft: '12px',
    marginBottom: '12px'
  },

  menuItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
    padding: '12px',
    marginBottom: '5px',
    border: 'none',
    borderRadius: '8px',
    background: 'transparent',
    color: '#cbd5e1',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px'
  },

  activeMenuItem: {
    background: '#2563eb',
    color: 'white'
  },

  logout: {
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
    padding: '12px',
    marginTop: 'auto',
    border: 'none',
    borderRadius: '8px',
    background: '#7f1d1d',
    color: 'white',
    cursor: 'pointer'
  },

  main: {
    flex: 1,
    minWidth: 0
  },

  topbar: {
    background: 'white',
    minHeight: '75px',
    padding: '12px 25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px',
    borderBottom: '1px solid #e2e8f0',
    flexWrap: 'wrap'
  },

  topbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },

  topbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    flexWrap: 'wrap'
  },

  iconButton: {
    border: 'none',
    background: '#f1f5f9',
    padding: '10px',
    borderRadius: '9px',
    cursor: 'pointer',
    color: '#334155'
  },

  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#f1f5f9',
    padding: '10px',
    borderRadius: '8px'
  },

  searchInput: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    width: '120px'
  },

  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px'
  },

  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    background: '#dbeafe',
    color: '#2563eb',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 'bold'
  },

  content: {
    padding: '25px',
    maxWidth: '1500px',
    margin: 'auto'
  },

  welcome: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '25px'
  },

  dateBox: {
    background: 'white',
    padding: '12px 16px',
    borderRadius: '9px',
    color: '#475569',
    fontSize: '13px'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '18px',
    marginBottom: '35px'
  },

  statCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 2px 10px #00000008'
  },

  statIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'grid',
    placeItems: 'center'
  },

  statTitle: {
    color: '#64748b',
    fontSize: '13px',
    margin: '0 0 7px'
  },

  statValue: {
    fontSize: '25px',
    margin: 0
  },

  /* ATTENDANCE */

  attendanceSection: {
    background: 'white',
    padding: '22px',
    borderRadius: '12px',
    marginBottom: '25px',
    boxShadow: '0 2px 10px #00000008'
  },

  attendanceHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '20px'
  },

  attendanceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px'
  },

  attendanceCard: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '18px'
  },

  attendanceIcon: {
    width: '45px',
    height: '45px',
    borderRadius: '10px',
    display: 'grid',
    placeItems: 'center',
    marginBottom: '12px'
  },

  attendanceLabel: {
    color: '#64748b',
    fontSize: '13px',
    margin: '0 0 8px'
  },

  progressContainer: {
    marginTop: '25px'
  },

  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    marginBottom: '10px'
  },

  progressBackground: {
    width: '100%',
    height: '10px',
    background: '#e2e8f0',
    borderRadius: '20px',
    overflow: 'hidden'
  },

  progressFill: {
    height: '100%',
    background: '#2563eb',
    borderRadius: '20px',
    transition: 'width 0.3s'
  },

  emptyAttendance: {
    color: '#64748b',
    fontSize: '13px',
    marginTop: '20px'
  },

  textButton: {
    background: 'transparent',
    border: 'none',
    color: '#2563eb',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '8px'
  },

  manageButton: {
    background: '#eff6ff',
    color: '#2563eb',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px'
  },

  /* EVENTS */

  eventsSection: {
    background: 'white',
    padding: '22px',
    borderRadius: '12px',
    marginBottom: '35px',
    boxShadow: '0 2px 10px #00000008'
  },

  eventsHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '20px'
  },

  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '15px'
  },

  eventCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    boxSizing: 'border-box',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '15px',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#172033'
  },

  eventIcon: {
    width: '45px',
    height: '45px',
    minWidth: '45px',
    borderRadius: '10px',
    background: '#f3e8ff',
    color: '#9333ea',
    display: 'grid',
    placeItems: 'center'
  },

  eventDetails: {
    flex: 1,
    minWidth: 0
  },

  eventArrow: {
    color: '#2563eb',
    fontSize: '18px'
  },

  emptyEvents: {
    textAlign: 'center',
    padding: '30px 15px',
    background: '#f8fafc',
    borderRadius: '10px',
    color: '#64748b'
  },

  addEventButton: {
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px'
  },

  /* MODULES */

  sectionHeading: {
    marginBottom: '18px'
  },

  modulesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '18px'
  },

  moduleCard: {
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px',
    textAlign: 'left',
    cursor: 'pointer',
    color: '#172033'
  },

  moduleIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'grid',
    placeItems: 'center',
    marginBottom: '15px'
  },

  viewLink: {
    color: '#2563eb',
    fontSize: '13px',
    fontWeight: 'bold'
  },

  /* BOTTOM MESSAGE */

  bottomCard: {
    background: '#dbeafe',
    borderRadius: '12px',
    padding: '22px',
    marginTop: '25px',
    color: '#1e3a8a'
  }

};

export default Dashboard;
