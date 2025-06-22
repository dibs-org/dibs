// pool-reservation-frontend/src/App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Slot {
  id: number;
  startTime: string;
  endTime: string;
  capacity: number;
}

interface Reservation {
  userEmail: string;
  slot: Slot;
}

function App() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/slots')
      .then(res => setSlots(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleReservation = () => {
    if (!email || !selectedSlotId) return;

    const selectedSlot = slots.find(slot => slot.id === selectedSlotId);
    if (!selectedSlot) return;

    const reservation: Reservation = {
      userEmail: email,
      slot: selectedSlot
    };

    axios.post('http://localhost:8080/api/reservations', reservation)
      .then(() => alert('Reservation successful'))
      .catch(() => alert('Error submitting reservation'));
  };

  return (
    <div className="App">
      <h1>Pool Reservation System</h1>
      <label>
      Your Name:
      <input value={name} onChange={e => setName(e.target.value)} type="text" />
      </label>
      <label>
      Your Email:
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
      </label>
      <h2>Select a Date</h2>
      <input
      type="date"
      value={selectedDate}
      onChange={e => setSelectedDate(e.target.value)}
      />
      <h2>Available Slots</h2>
      <ul>
      {slots
        .filter(slot => new Date(slot.startTime).toISOString().split('T')[0] === selectedDate)
        .map(slot => (
        <li key={slot.id}>
          <label>
          <input
            type="radio"
            name="slot"
            value={slot.id}
            onChange={() => setSelectedSlotId(slot.id)}
          />
          {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()} (Capacity: {slot.capacity})
          </label>
        </li>
        ))}
      </ul>
      <button onClick={handleReservation} disabled={!name || !email || !selectedSlotId || !selectedDate}>
      Reserve Slot
      </button>
    </div>
  );
}

export default App;

