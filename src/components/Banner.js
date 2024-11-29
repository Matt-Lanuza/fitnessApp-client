import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Banner(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/workout');
    };

    return(
        <Row>
            <Col className="text-center py-5">
                <h1>Welcome to FitnessPal</h1>
                <p>Every journey begins with a single step. Start yours today and achieve your fitness goals!</p>
                <Button variant="danger" onClick={handleClick}>Start Your Fitness Journey</Button>
            </Col>
        </Row>
    )
}