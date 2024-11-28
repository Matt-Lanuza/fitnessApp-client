import { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function AddWorkout({ onWorkoutAdded }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const addWorkout = (e) => {
    e.preventDefault();

    console.log("Workout status before submission:", status); 

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

    setLoading(true);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/addWorkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workoutData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          notyf.error(data.error || 'Failed to add workout');
        }

        notyf.success('Workout added successfully');
        setName('');
        setDuration('');
        setStatus('pending');
        onWorkoutAdded();
      })
      .catch((error) => {
        notyf.error(error.message || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={addWorkout}>
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

                <Form.Group controlId="workoutDuration" className="mb-3">
                  <Form.Label>Duration:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
