import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function CompleteWorkoutStatus({ workoutId, initialStatus, onStatusUpdated }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus); // Use initial status passed as prop

  const handleToggleStatus = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    if (token) {
      // Send PATCH request to update the workout status
      fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/completeWorkoutStatus/${workoutId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: status === 'pending' ? 'completed' : 'pending', // Toggle between 'pending' and 'completed'
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
          setStatus(newStatus); // Update local state with new status
          if (onStatusUpdated) {
            onStatusUpdated(); // Trigger parent component to update UI
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
      variant={status === 'pending' ? 'success' : 'warning'}
      onClick={handleToggleStatus}
      disabled={loading}
      size="sm"
    >
      Complete
    </Button>
  );
}
