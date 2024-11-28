import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function UpdateWorkout({ show, handleClose, workout, onWorkoutUpdated }) {
  const [name, setName] = useState(workout?.name || '');
  const [duration, setDuration] = useState(workout?.duration || '');
  const [status, setStatus] = useState(workout?.status || 'pending');
  const [loading, setLoading] = useState(false);

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

    fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/${workout._id}`, {
      method: 'PUT',
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
          handleClose(); // Close the modal
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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="updateWorkoutName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workout name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="updateWorkoutDuration" className="mb-3">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="updateWorkoutStatus" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Workout'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
