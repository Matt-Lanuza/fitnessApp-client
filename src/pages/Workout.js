import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            notyf.error('Failed to fetch workouts.');
          }
          return response.json();
        })
        .then((data) => {
          setWorkouts(data);
        })
        .catch((error) => {
          console.error('Error fetching workouts:', error);
        });
    } else {
      notyf.error('No token found. Please log in first.');
    }
  }, [token]);

  return (
    <div>
      <h1>Your Workouts</h1>
      {workouts.length > 0 ? (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>{workout.name}</li>
          ))}
        </ul>
      ) : (
        <p>No workouts found.</p>
      )}
    </div>
  );
}
