import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import AddWorkout from '../components/AddWorkout';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  

  const fetchWorkouts = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            notyf.error('Failed to fetch workouts.');
          }
          return response.json();
        })
        .then((data) => {
          console.log("Workouts of user", data);
          setWorkouts(data.workouts);
        })
        .catch((error) => {
          console.error('Error fetching workouts:', error);
        });
    } else {
      notyf.error('No token found. Please log in first.');
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <Container className="mt-5 text-center">
      {/* Add Workout Modal */}
      <Button
        variant="primary"
        className="mb-4 mx-3"
        onClick={() => setShowModal(true)}
      >
        Add Workout
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginBottom: '30px' }}>
          <AddWorkout
            onWorkoutAdded={() => {
              fetchWorkouts();
              setShowModal(false);
            }}
          />
        </Modal.Body>
      </Modal>



      {/* Workouts List */}
      <Row className="justify-content-center">
        <Col md={12}>
          <h1 className="text-center mb-4">Your Workouts</h1>
          {workouts.length > 0 ? (
            <Row className="gy-4 my-3">
              {workouts.map((workout) => (
                <Col md={4} key={workout._id}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h5>{workout.name}</h5>
                      <p>
                        {workout.duration} |{' '}
                        <span
                          className={`status-badge ${
                            workout.status === 'completed' ? 'completed' : 'pending'
                          }`}
                        >
                          {workout.status}
                        </span>
                      </p>
                      <Button variant="primary" size="sm">
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">No workouts found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );


}
