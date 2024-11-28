import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function AddWorkout({ onWorkoutAdded }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('You need to be logged in to add a workout');
      return;
    }

    const workoutData = {
      name,
      duration,
      status,
    };

    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/addNewWorkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workoutData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add workout');
      }

      notyf.success('Workout added successfully');
      setName('');
      setDuration('');
      setStatus('pending');
      onWorkoutAdded();
    } catch (error) {
      notyf.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4">Add New Workout</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="workoutName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter workout name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="workoutDuration" className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="workoutStatus" className="mb-3">
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
                  {loading ? 'Adding...' : 'Add Workout'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
