import { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function UpdateWorkout({ workoutId, onWorkoutUpdated }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all workouts and filter to get the workout to be updated
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.workouts) {
            const workoutToUpdate = data.workouts.find((workout) => workout._id === workoutId);
            if (workoutToUpdate) {
              setName(workoutToUpdate.name);
              setDuration(workoutToUpdate.duration);
              setStatus(workoutToUpdate.status);
            } else {
              notyf.error('Workout not found');
            }
          }
        })
        .catch((error) => {
          notyf.error('Error fetching workouts');
        });
    } else {
      notyf.error('No token found');
    }
  }, [workoutId]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('You need to be logged in to update a workout');
      return;
    }

    const updatedWorkoutData = {
      name,
      duration,
      status,
    };

    setLoading(true);

    // Send updated data to the backend
    fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/updateWorkout/${workoutId}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedWorkoutData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          notyf.error(data.error || 'Failed to update workout');
        } else {
          notyf.success('Workout updated successfully');
          onWorkoutUpdated();
        }
      })
      .catch((error) => {
        notyf.error(error.message || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Update Workout</h2>
      <Form onSubmit={handleUpdate}>
        {/* Name input */}
        <Form.Group controlId="workoutName" className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter workout name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        {/* Duration input */}
        <Form.Group controlId="workoutDuration" className="mb-3">
          <Form.Label>Duration:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter workout duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </Form.Group>

        {/* Update button */}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            'Update Workout'
          )}
        </Button>
      </Form>
    </div>
  );
}
