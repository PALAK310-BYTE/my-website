
import React from 'react';

import {
  createRoot
} from 'react-dom/client';

import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  IndianRupee,
  Menu,
  MessageCircle,
  ShieldCheck,
  WifiOff
} from 'lucide-react';

import Dashboard from './Dashboard';
import './style.css';

/* FEATURES */

const features = [
  {
    icon: IndianRupee,
    title: 'Easy Fee Management',
    text: 'Record payments, track pending fees and create clear receipts in seconds.'
  },
  {
    icon: ClipboardCheck,
    title: 'One-Tap Attendance',
    text: 'Teachers can mark a whole class present, absent or on leave quickly.'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Receipts',
    text: 'Share fee receipts and reminders with parents using WhatsApp.'
  },
  {
    icon: WifiOff,
    title: 'Works Offline',
    text: 'Keep attendance moving when the internet is weak. Sync when you reconnect.'
  }
];

/* FAQ */

const faqs = [
  [
    'Does GramERP work offline?',
    'Core tasks such as viewing saved student details and marking attendance are planned to work offline, with sync when internet returns.'
  ],
  [
    'Is technical training required?',
    'GramERP is designed around simple screens and clear actions for school staff.'
  ],
  [
    'Can parents receive fee receipts on WhatsApp?',
    'Yes. Live delivery requires WhatsApp Business Cloud API credentials; without them, the app can prepare a click-to-chat message.'
  ],
  [
    'Can teachers mark attendance?',
    'Yes. Teachers can access their assigned classes and mark attendance.'
  ],
  [
    'Is there a setup fee?',
    'No setup fee. Both plans include a 30-day free trial.'
  ]
];

/* MAIN APP */

function App() {

  const [menu, setMenu] = React.useState(false);

  const [faq, setFaq] = React.useState(0);

  const [showLogin, setShowLogin] = React.useState(false);

  const [showDashboard, setShowDashboard] = React.useState(false);

  const [schoolName, setSchoolName] = React.useState('');

  const [adminName, setAdminName] = React.useState('');

  const [email, setEmail] = React.useState('');

  const [phone, setPhone] = React.useState('');

  const [password, setPassword] = React.useState('');

  const [selectedPlan, setSelectedPlan] = React.useState('Per Student');

  const [message, setMessage] = React.useState('');

  /* NAVIGATION */

  const jump = (id) => {

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });

    setMenu(false);

  };

  /* OPEN REGISTRATION */

  const openRegistration = (plan) => {

    setSelectedPlan(plan);

    setMessage('');

    setShowLogin(true);

  };

  /* REGISTRATION */

  const handleSubmit = (e) => {

    e.preventDefault();

    // Demo registration

    console.log('School Name:', schoolName);

    console.log('Admin Name:', adminName);

    console.log('Email:', email);

    console.log('Mobile:', phone);

    console.log('Selected Plan:', selectedPlan);

    // Password is not printed.

    setShowLogin(false);

    setShowDashboard(true);

  };

  /* DASHBOARD */

  if (showDashboard) {

    return (

      <Dashboard
        onLogout={() => setShowDashboard(false)}
      />

    );

  }

  /* LANDING PAGE */

  return (

    <div>

      {/* NAVBAR */}

      <header className="nav">

        <a className="brand" href="#home">

          <span className="brand-mark">
            G
          </span>

          GramERP

        </a>

        {/* MOBILE MENU */}

        <button
          className="mobile-menu"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle menu"
        >

          <Menu />

        </button>

        {/* NAV LINKS */}

        <nav className={menu ? 'open' : ''}>

          <a onClick={() => jump('home')}>
            Home
          </a>

          <a onClick={() => jump('features')}>
            Features
          </a>

          <a onClick={() => jump('how')}>
            How It Works
          </a>

          <a onClick={() => jump('pricing')}>
            Pricing
          </a>

          <a onClick={() => jump('about')}>
            About Us
          </a>

          <button
            className="nav-login"
            onClick={() => openRegistration('Per Student')}
          >

            Login

          </button>

          <button
            className="btn small"
            onClick={() => openRegistration('Per Student')}
          >

            Start Free Trial

            <ArrowRight size={15} />

          </button>

        </nav>

      </header>

      <main>

        {/* HERO SECTION */}

        <section className="hero" id="home">

          {/* LEFT CONTENT */}

          <div className="hero-copy">

            <span className="eyebrow">

              <span className="dot" />

              SCHOOL ADMINISTRATION, SIMPLIFIED

            </span>

            <h1>

              School management

              <br />

              <em>made simple.</em>

            </h1>

            <p>

              Manage school fees, attendance and parent communication
              from one simple platform—built for schools like yours.

            </p>

            {/* BUTTONS */}

            <div className="hero-actions">

              <button
                className="btn"
                onClick={() => openRegistration('Per Student')}
              >

                Start 30-Day Free Trial

                <ArrowRight size={17} />

              </button>

              <button
                className="btn ghost"
                onClick={() => jump('features')}
              >

                Explore Features

              </button>

            </div>

            {/* TRUST */}

            <div className="trust">

              <span>
                <Check /> No setup fee
              </span>

              <span>
                <Check /> Easy for teachers
              </span>

              <span>
                <Check /> Made for India
              </span>

            </div>

          </div>

          {/* RIGHT DASHBOARD PREVIEW */}

          <div className="preview">

            {/* PREVIEW HEADER */}

            <div className="preview-top">

              <div>

                <span className="mini-label">
                  SCHOOL OVERVIEW
                </span>

                <strong>
                  Good morning, Admin 👋
                </strong>

              </div>

              <span className="live">
                ● Demo preview
              </span>

            </div>

            {/* STATISTICS */}

            <div className="stats">

              {/* TOTAL STUDENTS */}

              <div>

                <span>
                  Total students
                </span>

                <b>
                  1,250
                </b>

                <small>
                  Across all classes
                </small>

              </div>

              {/* FEES */}

              <div>

                <span>
                  Fees collected
                </span>

                <b>
                  ₹8,45,000
                </b>

                <small>
                  Current session
                </small>

              </div>

              {/* TEACHERS */}

              <div>

                <span>
                  Total teachers
                </span>

                <b>
                  65
                </b>

                <small>
                  School teaching staff
                </small>

              </div>

              {/* ATTENDANCE */}

              <div>

                <span>
                  Attendance today
                </span>

                <b>
                  94%
                </b>

                <small>
                  Student attendance
                </small>

              </div>

            </div>

            {/* ATTENDANCE CHART */}

            <div className="preview-section">

              <div className="section-head">

                <b>
                  Attendance overview
                </b>

                <span>
                  This week
                </span>

              </div>

              <div className="chart">

                <div className="chart-lines" />

                {[45, 67, 58, 82, 72, 91, 64].map((v, i) => (

                  <div
                    className="bar"
                    key={i}
                    style={{
                      height: v + '%'
                    }}
                  >

                    <i />

                  </div>

                ))}

              </div>

              {/* DAYS */}

              <div className="days">

                <span>Mon</span>

                <span>Tue</span>

                <span>Wed</span>

                <span>Thu</span>

                <span>Fri</span>

                <span>Sat</span>

                <span>Sun</span>

              </div>

            </div>

            {/* PREVIEW FOOTER */}

            <div className="preview-bottom">

              <span>

                <span className="status-dot" />

                Simple. Organized. Ready.

              </span>

              <span>
                GramERP
              </span>

            </div>

          </div>

        </section>

        {/* PROBLEM SECTION */}

        <section className="problem">

          <div className="problem-inner">

            <span className="eyebrow">
              THE EVERYDAY CHALLENGE
            </span>

            <h2>

              Less paperwork.

              <br />

              More time for students.

            </h2>

            <p>

              Paper registers, scattered spreadsheets and manual reminders
              make school administration harder than it needs to be.
              GramERP brings the everyday work into one clear place.

            </p>

          </div>

          <div className="problem-note">

            <BookOpen />

            <b>
              One simple workspace
            </b>

            <span>
              Fees · Attendance · Parent updates
            </span>

          </div>

        </section>

        {/* FEATURES */}

        <section className="section" id="features">

          <div className="section-title">

            <span className="eyebrow">
              BUILT FOR YOUR SCHOOL
            </span>

            <h2>

              Everything important.

              <br />

              <em>Made easy.</em>

            </h2>

            <p>

              Practical tools that help your school run smoothly—
              without complicated software.

            </p>

          </div>

          {/* FEATURE CARDS */}

          <div className="feature-grid">

            {features.map(({ icon: Icon, title, text }, i) => (

              <article
                className="feature"
                key={title}
              >

                <div className="feature-icon">

                  <Icon />

                </div>

                <span className="feature-num">

                  0{i + 1}

                </span>

                <h3>
                  {title}
                </h3>

                <p>
                  {text}
                </p>

              </article>

            ))}

          </div>

        </section>

        {/* HOW IT WORKS */}

        <section className="how" id="how">

          <div>

            <span className="eyebrow">
              GET STARTED IN THREE STEPS
            </span>

            <h2>

              Simple from

              <br />

              <em>day one.</em>

            </h2>

            <p>

              No complicated setup. Start with the basics and grow
              at your own pace.

            </p>

          </div>

          {/* STEPS */}

          <div className="steps">

            <article>

              <span>
                01
              </span>

              <div>

                <h3>
                  Register your school
                </h3>

                <p>

                  Create your school account and add the basic school details.

                </p>

              </div>

            </article>

            <article>

              <span>
                02
              </span>

              <div>

                <h3>
                  Add students and teachers
                </h3>

                <p>

                  Organize students by class and give teachers access to their work.

                </p>

              </div>

            </article>

            <article>

              <span>
                03
              </span>

              <div>

                <h3>
                  Manage your day
                </h3>

                <p>

                  Record fees, mark attendance and keep parents informed.

                </p>

              </div>

            </article>

          </div>

        </section>

        {/* PRICING */}

        <section className="pricing section" id="pricing">

          <div className="section-title">

            <span className="eyebrow">
              CLEAR, SIMPLE PRICING
            </span>

            <h2>

              Start free. Choose

              <br />

              <em>what fits.</em>

            </h2>

            <p>

              Every plan comes with a 30-day free trial and no setup fee.

            </p>

          </div>

          {/* PRICE CARDS */}

          <div className="price-grid">

            {/* PER STUDENT */}

            <article>

              <span className="plan">
                FLEXIBLE PLAN
              </span>

              <h3>
                Per student
              </h3>

              <p className="price">

                ₹1.5

                <small>
                  / student / month
                </small>

              </p>

              <p>

                Ideal for schools that want pricing to grow with enrollment.

              </p>

              <ul>

                <li>
                  <Check /> 30-day free trial
                </li>

                <li>
                  <Check /> No setup fee
                </li>

                <li>
                  <Check /> Fee and attendance tools
                </li>

              </ul>

              <button
                className="btn full"
                onClick={() => openRegistration('Per Student')}
              >

                Start free trial

                <ArrowRight />

              </button>

            </article>

            {/* SCHOOL PLAN */}

            <article className="price-card featured">

              <span className="plan">
                SIMPLE FLAT RATE
              </span>

              <h3>
                School plan
              </h3>

              <p className="price">

                ₹1,000

                <small>
                  / month
                </small>

              </p>

              <p>

                Predictable monthly pricing for your school administration.

              </p>

              <ul>

                <li>
                  <Check /> 30-day free trial
                </li>

                <li>
                  <Check /> No setup fee
                </li>

                <li>
                  <Check /> Fee and attendance tools
                </li>

              </ul>

              <button
                className="btn full"
                onClick={() => openRegistration('School Plan')}
              >

                Start free trial

                <ArrowRight />

              </button>

            </article>

          </div>

        </section>

        {/* FAQ */}

        <section className="faq section">

          <div className="section-title">

            <span className="eyebrow">
              YOUR QUESTIONS, ANSWERED
            </span>

            <h2>
              Good to <em>know.</em>
            </h2>

          </div>

          <div className="faq-list">

            {faqs.map(([q, a], i) => (

              <article
                key={q}
                className={faq === i ? 'active' : ''}
              >

                <button
                  onClick={() => setFaq(faq === i ? -1 : i)}
                >

                  {q}

                  <ChevronDown />

                </button>

                {faq === i && (

                  <p>
                    {a}
                  </p>

                )}

              </article>

            ))}

          </div>

        </section>

        {/* CALL TO ACTION */}

        <section className="cta" id="about">

          <div>

            <span className="eyebrow">

              A SIMPLER SCHOOL DAY STARTS HERE

            </span>

            <h2>

              Ready to simplify

              <br />

              your school?

            </h2>

            <p>

              Bring fees, attendance and parent communication together
              with GramERP.

            </p>

            <button
              className="btn light"
              onClick={() => openRegistration('Per Student')}
            >

              Start 30-Day Free Trial

              <ArrowRight />

            </button>

          </div>

          <ShieldCheck className="cta-icon" />

        </section>

      </main>

      {/* FOOTER */}

      <footer>

        <a className="brand" href="#home">

          <span className="brand-mark">
            G
          </span>

          GramERP

        </a>

        <span>

          Simple School Management. Smarter Administration.

        </span>

        <div>

          <a onClick={() => jump('features')}>
            Features
          </a>

          <a onClick={() => jump('pricing')}>
            Pricing
          </a>

          <a onClick={() => openRegistration('Per Student')}>
            Login
          </a>

          <a href="mailto:hello@gramerp.in">
            Contact
          </a>

        </div>

        <small>

          © {new Date().getFullYear()} GramERP. Product preview.

        </small>

      </footer>

      {/* REGISTRATION MODAL */}

      {showLogin && (

        <div
          className="modal-back"
          onClick={() => setShowLogin(false)}
        >

          <section
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}

            <button
              className="close"
              onClick={() => setShowLogin(false)}
            >

              ×

            </button>

            <span className="eyebrow">
              GRAMERP ACCOUNT
            </span>

            <h2>

              Create your school

              <br />

              <em>account.</em>

            </h2>

            <p>

              Register your school to get started with GramERP.

            </p>

            {/* FORM */}

            <form onSubmit={handleSubmit}>

              {/* SCHOOL NAME */}

              <label htmlFor="schoolName">
                School Name
              </label>

              <input
                id="schoolName"
                type="text"
                placeholder="Enter school name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
              />

              {/* ADMIN NAME */}

              <label htmlFor="adminName">
                Admin Name
              </label>

              <input
                id="adminName"
                type="text"
                placeholder="Enter admin name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
              />

              {/* EMAIL */}

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* PHONE */}

              <label htmlFor="phone">
                Mobile Number
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              {/* PASSWORD */}

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />

              {/* PLAN */}

              <label htmlFor="plan">
                Select Plan
              </label>

              <select
                id="plan"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
              >

                <option value="Per Student">

                  Per Student - ₹1.5/student/month

                </option>

                <option value="School Plan">

                  School Plan - ₹1,000/month

                </option>

              </select>

              {/* SUBMIT */}

              <button
                className="btn full"
                type="submit"
              >

                Create School Account

                <ArrowRight />

              </button>

              {message && (

                <p className="form-message">
                  {message}
                </p>

              )}

            </form>

          </section>

        </div>

      )}

    </div>

  );

}

/* RENDER APP */

createRoot(
  document.getElementById('root')
).render(

  <App />

);
