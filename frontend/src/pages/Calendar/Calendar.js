import React, { useState } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaPlus,
  FaCalendarAlt,
  FaTimes
} from 'react-icons/fa';
import './Calendar.css';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', date: new Date(), color: '#FF7A45' },
    { id: 2, title: 'Project Deadline', date: new Date(Date.now() + 86400000 * 3), color: '#E56A36' },
    { id: 3, title: 'Client Call', date: new Date(Date.now() + 86400000 * 7), color: '#FFB08F' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    color: '#FF7A45'
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth() + 1, 
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth(), 
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    ));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    ));
  };

  const handleAddEvent = () => {
    if (newEvent.title.trim() === '') return;
    
    const event = {
      id: Date.now(),
      title: newEvent.title,
      date: new Date(selectedDate),
      color: newEvent.color
    };
    
    setEvents([...events, event]);
    setShowModal(false);
    setNewEvent({
      title: '',
      date: new Date(),
      color: '#FF7A45'
    });
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-title">
          <FaCalendarAlt className="calendar-icon" />
          <h2>Task Calendar</h2>
        </div>
        <div className="calendar-controls">
          <button onClick={prevMonth} className="nav-btn">
            <FaChevronLeft />
          </button>
          <span className="month-display">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={nextMonth} className="nav-btn">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="calendar-weekdays">
        {weekdays.map(day => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          const isToday = date.toDateString() === new Date().toDateString();
          const dayEvents = events.filter(
            e => e.date.toDateString() === date.toDateString()
          );

          return (
            <div 
              key={day} 
              className={`calendar-day ${isToday ? 'current-day' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              <div className="day-number">{day}</div>
              <div className="day-events">
                {dayEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="calendar-event"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.title}
                    <button 
                      className="delete-event-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(event.id);
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button 
        className="add-event-btn"
        onClick={() => setShowModal(true)}
      >
        <FaPlus /> Add New Event
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="event-modal">
            <div className="modal-header">
              <h3>Add New Event</h3>
              <button 
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => {
                    setSelectedDate(new Date(e.target.value));
                    setNewEvent({...newEvent, date: new Date(e.target.value)});
                  }}
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <div className="color-options">
                  {['#FF7A45', '#E56A36', '#FFB08F'].map(color => (
                    <div 
                      key={color}
                      className={`color-option ${newEvent.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewEvent({...newEvent, color})}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleAddEvent}
              >
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}