import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TaskPane from './TaskPane';



const localizer = momentLocalizer(moment);

function App() {
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.log(error));
  }, []);

  const handleViewChange = useCallback(view => {
    setView(view);
  }, []);

  const handleEventDrop = useCallback((event, start, end) => {
    const updatedEvent = { ...event, start, end };
    setEvents(events =>
      events.map(e => (e.id === updatedEvent.id ? updatedEvent : e))
    );
    fetch(`/events/${updatedEvent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    }).catch(error => console.log(error));
  }, []);

  const handleEventResize = useCallback((event, start, end) => {
    const updatedEvent = { ...event, start, end };
    setEvents(events =>
      events.map(e => (e.id === updatedEvent.id ? updatedEvent : e))
    );
    fetch(`/events/${updatedEvent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    }).catch(error => console.log(error));
  }, []);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('Enter event title:');
      if (title) {
        const newEvent = { title, start, end };
        setEvents(events => [...events, newEvent]);
        fetch('/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEvent),
        }).catch(error => console.log(error));
      }
    },
    []
  );

  const handleTaskDrop = useCallback((task, date) => {
    const newEvent = {
      title: task.title,
      start: date,
      end: moment(date).add(1, 'hour').toDate(),
    };
    setEvents(events => [...events, newEvent]);
    fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    }).catch(error => console.log(error));
  }, []);

  const handleNewTask = useCallback(task => {
    setTasks(tasks => [...tasks, task]);
  }, []);

  const views = {
    month: true,
    week: true,
  };

  return (
    <div className='mainContainer'>
      <div className='calendarContainer'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          views={views}
          onView={handleViewChange}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          selectable
          onSelectSlot={handleSelectSlot}
        />
      </div>
      <div className='taskPaneContainer'>
        <TaskPane tasks={tasks} onTaskDrop={handleTaskDrop} onNewTask={handleNewTask} />
      </div>
    </div>  
  );
}

export default App;
