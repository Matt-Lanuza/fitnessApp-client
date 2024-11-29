import { useState, useEffect } from 'react';
import { Form, Button, Modal, Spinner } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function UpdateWorkout({ workoutId, onWorkoutUpdated }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (workoutId) {
      setShowModal(true);

      const token = localStorage.getItem('token');
      if (token) {
        fetch('https://fitnessapi-lanuza.onrender.com/workouts/getMyWorkouts', {
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
    };

    setLoading(true);

    fetch(`https://fitnessapi-lanuza.onrender.com/workouts/updateWorkout/${workoutId}`, {
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
          onWorkoutUpdated(); // Call to fetch updated workouts
          setShowModal(false); // Close modal after successful update
        }
      })
      .catch((error) => {
        notyf.error(error.message || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              'Update'
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
