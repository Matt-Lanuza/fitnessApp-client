import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  

  useEffect(() => {
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
          console.log("Workout's of user", data)
          setWorkouts(data.workouts);
        })
        .catch((error) => {
          console.error('Error fetching workouts:', error);
        });
    } else {
      notyf.error('No token found. Please log in first.');
    }
  }, []);

  return (
    <Container className="mt-5 text-center">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">Your Workouts</h1>

          {workouts.length > 0 ? (
            <div className="workout-list">
              {workouts.map((workout) => (
                <Card key={workout._id} className="mb-4 shadow-sm">
                  <Card.Body>
                    <Row>
                      <Col>
                        <h5>{workout.name}</h5>
                        <p>
                          {workout.duration} |{' '}
                          <span
                            className={`status-badge ${workout.status === 'completed' ? 'completed' : 'pending'}`}
                          >
                            {workout.status}
                          </span>
                        </p>
                        <Button variant="primary" size="sm">View Details</Button>
                      </Col>
                        
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center">No workouts found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );


}
