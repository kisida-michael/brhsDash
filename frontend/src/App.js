import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const inputRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    eventName: '',
    Prelim: '',
    dayTimeOfEvent: '',
    top12: '',
    qualifierForNationals: '',
    finals: '',
    dayTimeOfInterview: '',
    pred: '',
    finalResults: '',
  });
  const [editEvent, setEditEvent] = useState({
    id: null,
    eventName: '',
    Prelim: '',
    dayTimeOfEvent: '',
    top12: '',
    qualifierForNationals: '',
    finals: '',
    dayTimeOfInterview: '',
    pred: '',
    finalResults: '',
  });

  useEffect(() => {
    axios
      .get('https://brhsdash.michaelkisida.com/events')
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleNewEventChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditEventChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditEvent((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNewEventSubmit = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    axios
      .post('https://brhsdash.michaelkisida.com/events', newEvent)
      .then((res) => {
        setEvents((prev) => [...prev, { ...newEvent, id: res.data.id }]);
        setNewEvent({
          eventName: '',
          Prelim: '',
          dayTimeOfEvent: '',
          top12: '',
          qualifierForNationals: '',
          finals: '',
          dayTimeOfInterview: '',
          pred: '',
          finalResults: '',
        });
      })
      .catch((err) => console.log(err));
  };

  const handleEditEventSubmit = (e) => {
    e.preventDefault();
    console.log('Before', editEvent.id);
    axios
      .put(
        `https://brhsdash.michaelkisida.com/events/${editEvent.id}`,
        editEvent
      )
      .then((res) => {
        // console.log('Before', editEvent.id);
        setEvents((prev) =>
          prev.map((event) => (event.id === editEvent.id ? editEvent : event))
        );
        // console.log('After', editEvent.id);
        console.log(events);
        setEditEvent({
          id: null,
          eventName: '',
          Prelim: '',
          dayTimeOfEvent: '',
          top12: '',
          qualifierForNationals: '',
          finals: '',
          dayTimeOfInterview: '',
          pred: '',
          finalResults: '',
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteEvent = (id) => {
    axios
      .delete(`https://brhsdash.michaelkisida.com/events/${id}`)
      .then((res) =>
        setEvents((prev) => prev.filter((event) => event.id !== id))
      )
      .catch((err) => console.log(err));
  };

  const handleEditButtonClick = (event) => {
    setEditEvent(event);
  };

  return (
    <div className='py-6 px-12 bg-gray-900 text-white'>
      <h1 className='text-3xl font-bold mb-6'>Events</h1>
      <table className='w-full border-collapse'>
        <thead>
          <tr>
            <th className='border p-2'>Event Name</th>
            <th className='border p-2'>Prelim</th>
            <th className='border p-2'>Day/Time of Event</th>
            <th className='border p-2'>Top 12</th>
            <th className='border p-2'>Qualifier for Nationals</th>
            <th className='border p-2'>Finals</th>
            <th className='border p-2'>Day/Time of Interview</th>
            <th className='border p-2'>Prediction</th>
            <th className='border p-2'>Final Results</th>
            <th className='border p-2'>Edit</th>
            <th className='border p-2'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className='border p-1'>{event.eventName}</td>
              <td className='border p-1'>{event.Prelim}</td>
              <td className='border p-1'>{event.dayTimeOfEvent}</td>
              <td className='border p-1'>{event.top12}</td>
              <td className='border p-1'>{event.qualifierForNationals}</td>
              <td className='border p-1'>{event.finals}</td>
              <td className='border p-1'>{event.dayTimeOfInterview}</td>
              <td className='border p-1'>{event.pred}</td>
              <td className='border p-1'>{event.finalResults}</td>
              <td className='border p-1'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded'
                  onClick={() => handleEditButtonClick(event)}
                >
                  Edit
                </button>
              </td>
              <td className='border p-1'>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded'
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <h2>New Event</h2> */}
      {/* <form onSubmit={handleNewEventSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            className='bg-gray-800 text-white'
            type='text'
            name='eventName'
            value={newEvent.eventName}
            onChange={handleNewEventChange}
            ref={inputRef}
          />
        </div>
        <div>
          <label>Prelim:</label>
          <input
            type='checkbox'
            name='Prelim'
            checked={newEvent.Prelim}
            onChange={handleNewEventChange}
          />
        </div>
        <div>
          <label>Day/Time of Event:</label>
          <input
            type='text'
            name='dayTimeOfEvent'
            value={newEvent.dayTimeOfEvent}
            onChange={handleNewEventChange}
          />
        </div>
        <div>
          <label>Top 12:</label>
          <input
            type='checkbox'
            name='top12'
            checked={newEvent.top12}
            onChange={handleNewEventChange}
          />
        </div>
        <div>
          <label>Qualifier for Nationals:</label>
          <input
            type='checkbox'
            name='qualifierForNationals'
            checked={newEvent.qualifierForNationals}
            onChange={handleNewEventChange}
          />
        </div>
        <div>
          <label>Finals:</label>
          <input
            type='checkbox'
            name='finals'
            checked={newEvent.finals}
            onChange={handleNewEventChange}
          />
        </div>
        <div>
          <label>Day/Time of Interview:</label>
          <input
            type='text'
            name='dayTimeOfInterview'
            value={newEvent.dayTimeOfInterview}
            onChange={handleNewEventChange}
          />
        </div>
        <div>
          <label>Prediction:</label>
          <input
            type='text'
            name='pred'
            value={newEvent.pred}
            onChange={handleNewEventChange}
          />
        </div>
        <div>
          <label>Final Results:</label>
          <input
            type='text'
            name='finalResults'
            value={newEvent.finalResults}
            onChange={handleNewEventChange}
          />
        </div>
        <button type='submit'>Create Event</button>
      </form> */}
      {editEvent.id !== null ? (
        <>
          <div className='mx-auto mt-8 bg-gray-800 w-2/3 rounded-lg'>
            <form
              onSubmit={handleEditEventSubmit}
              className='p-10 flex flex-col flex-wrap gap-4 text-white'
            >
              {/* <div className='flex flex-col gap-2'>
              <label className='font-medium'>Event Name:</label>
              <input
                type='text'
                name='eventName'
                value={editEvent.eventName}
                onChange={handleEditEventChange}
                className='w-1/4 p-2 bg-gray-700 rounded-md border-none'
              />
            </div> */}
              <h2 className='mt-4 mb-2 font-bold text-2xl'>Edit Event</h2>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>
                  Prelim:
                  <input
                    type='checkbox'
                    name='Prelim'
                    checked={editEvent.Prelim}
                    onChange={handleEditEventChange}
                    className='ml-2 w-4 h-4'
                  />
                </label>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>Day/Time of Event:</label>
                <input
                  type='datetime-local'
                  name='dayTimeOfEvent'
                  value={editEvent.dayTimeOfEvent}
                  onChange={handleEditEventChange}
                  className=' p-2 bg-gray-700 rounded-md border-none'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>
                  Top 12:
                  <input
                    type='checkbox'
                    name='top12'
                    checked={editEvent.top12}
                    onChange={handleEditEventChange}
                    className='ml-2'
                  />
                </label>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>
                  Qualifier for Nationals:
                  <input
                    type='checkbox'
                    name='qualifierForNationals'
                    checked={editEvent.qualifierForNationals}
                    onChange={handleEditEventChange}
                    className='ml-2'
                  />
                </label>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>
                  Finals:
                  <input
                    type='checkbox'
                    name='finals'
                    checked={editEvent.finals}
                    onChange={handleEditEventChange}
                    className='ml-2'
                  />
                </label>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>Day/Time of Interview:</label>
                <input
                  type='datetime-local'
                  name='dayTimeOfInterview'
                  value={editEvent.dayTimeOfInterview}
                  onChange={handleEditEventChange}
                  className='p-2 bg-gray-700 rounded-md border-none'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>Prediction:</label>
                <select
                  type='text'
                  name='pred'
                  value={editEvent.pred}
                  onChange={handleEditEventChange}
                  className='w-1/4 p-2 bg-gray-700 rounded-md border-none'
                >
                  <option value=''>Select</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium'>Final Results:</label>
                <select
                  type='text'
                  name='pred'
                  value={editEvent.pred}
                  onChange={handleEditEventChange}
                  className='w-1/4 p-2 bg-gray-700 rounded-md border-none'
                >
                  <option value=''>Select</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              </div>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md'
              >
                Save
              </button>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
