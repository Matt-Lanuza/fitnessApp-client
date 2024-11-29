import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function DeleteWorkout({ workoutId, onWorkoutDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {

    const confirmDelete = window.confirm('Are you sure you want to delete this workout?');

    if (confirmDelete) {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (token) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/deleteWorkout/${workoutId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              notyf.error('Failed to delete workout.');
              setLoading(false);
              return;
            }
            notyf.success('Workout deleted successfully.');
            onWorkoutDeleted();
          })
          .catch((error) => {
            console.error('Error deleting workout:', error);
            notyf.error('Error deleting workout.');
            setLoading(false);
          });
      } else {
        notyf.error('No token found. Please log in first.');
      }
    }
  };

  return (
    <Button
      variant="danger"
      onClick={handleDelete}
      disabled={loading}
      size="sm"
      className="mx-1"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
