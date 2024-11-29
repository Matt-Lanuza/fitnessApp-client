import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function CompleteWorkoutStatus({ workoutId, initialStatus, onStatusUpdated }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  const handleToggleStatus = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/completeWorkoutStatus/${workoutId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: status === 'pending' ? 'completed' : 'pending',
        }),
      })
        .then((response) => {
          if (!response.ok) {
            notyf.error('Failed to update workout status.');
            setLoading(false);
            return;
          }
          const newStatus = status === 'pending' ? 'completed' : 'pending';
          notyf.success(`Workout status updated to ${newStatus}.`);
          setStatus(newStatus);
          if (onStatusUpdated) {
            onStatusUpdated();
          }
        })
        .catch((error) => {
          console.error('Error updating workout status:', error);
          notyf.error('Error updating workout status.');
          setLoading(false);
        });
    } else {
      notyf.error('No token found. Please log in first.');
    }
  };

  return (
    <Button
      variant={status === 'pending' ? 'success' : 'success'}
      onClick={handleToggleStatus}
      disabled={loading || status === 'completed'}
      size="sm"
    >
      {status === 'completed' ? 'Completed' : 'Complete'}
    </Button>
  );
}
