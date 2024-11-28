import { Button, Row, Col } from 'react-bootstrap';

export default function Banner(){
    return(
        <Row>
            <Col className="text-center py-5">
                <h1>Welcome to FitnessPal</h1>
                <p>Every journey begins with a single step. Start yours today and achieve your fitness goals!</p>
                <Button variant="danger">Start Your Fitness Journey</Button>
            </Col>
        </Row>
    )
}