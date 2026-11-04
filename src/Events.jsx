
import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, Trash2 } from 'lucide-react';

function Events() {
  const [events, setEvents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gramerp_events') || '[]');
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    localStorage.setItem('gramerp_events', JSON.stringify(events));
  }, [events]);

  const addEvent = (e) => {
    e.preventDefault();

    if (!title.trim() || !date) {
      alert('Please enter event name and date');
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: title.trim(),
      date
    };

    setEvents([newEvent, ...events]);
    setTitle('');
    setDate('');
  };

  const deleteEvent = (id) => {
    if (window.confirm('Delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  return (
    <div style={{ padding: '25px', color: '#172033' }}>
      <h1>School Events 📅</h1>

      <p style={{ color: '#64748b' }}>
        Manage school events and activities.
      </p>

      <div style={{
        background: 'white',
        padding: '22px',
        borderRadius: '12px',
        marginTop: '20px',
        marginBottom: '25px'
      }}>
        <h3>Add New Event</h3>

        <form onSubmit={addEvent}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Name"
            style={inputStyle}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            <Plus size={17} /> Add Event
          </button>
        </form>
      </div>

      <div style={{
        background: 'white',
        padding: '22px',
        borderRadius: '12px'
      }}>
        <h3>
          <CalendarDays size={19} /> Events List ({events.length})
        </h3>

        {events.length === 0 ? (
          <p style={{ color: '#64748b' }}>
            No events added yet.
          </p>
        ) : (
          events.map(event => (
            <div
              key={event.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                borderBottom: '1px solid #e2e8f0'
              }}
            >
              <div>
                <strong>{event.title}</strong>
                <p style={{ color: '#64748b' }}>
                  {event.date}
                </p>
              </div>

              <button
                onClick={() => deleteEvent(event.id)}
                style={deleteStyle}
                title="Delete event"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))
        )}
      </div>
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
  fontSize: '14px'
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
  cursor: 'pointer'
};

const deleteStyle = {
  border: 'none',
  background: '#fee2e2',
  color: '#dc2626',
  padding: '10px',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default Events;
