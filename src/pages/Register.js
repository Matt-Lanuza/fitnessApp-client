import { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Notyf } from 'notyf';

export default function Register() {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [mobileNo,setMobileNo] = useState(0);
    const [password,setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const notyf = new Notyf();


    useEffect(() => {
      if (
        firstName !== "" &&
        lastName !== "" &&
        email !== "" &&
        mobileNo !== "" &&
        password !== "" &&
        verifyPassword !== "" &&
        password === verifyPassword &&
        mobileNo.length === 11
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }, [firstName, lastName, mobileNo, email, password, verifyPassword]);


    function registerUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password:password
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Data", data)

            if(data.message === 'Registered successfully') {
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('');
                setPassword('');
                setVerifyPassword('');

                notyf.success("You are now registered! Please log in.");
            } else if (data.error === 'Email invalid') {
                notyf.error("Please double-check your email and make sure it follows the format (e.g., juandelacruz@mail.com).");
            } else if (data.error === 'Mobile number invalid') {
                notyf.error("Please ensure your mobile number contains exactly 11 digits.")
            } else if (data.error === 'Password must be at least 8 characters long') {
                notyf.error("Your password must be at least 8 characters long. Please try again.");
            } else {
                notyf.error("Please try again!");
            }
        })
        .catch((error) => {
          console.error("Registration error:", error);
          notyf.error("There was a problem with the registration. Please try again later.");
        });
    }

    return (
      <Container className="mt-5">
        <h2 className="text-center mb-4">Registration</h2>
        <Form onSubmit={(e) => registerUser(e)}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formMobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your mobile number"
              name="mobileNumber"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formVerifyPassword">
            <Form.Label>Verify Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Verify your password"
              name="verifyPassword"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              required
            />
          </Form.Group>
          {isActive ? (
            <Button variant="primary" type="submit" id="submitBtn" className="my-3">
              Submit
            </Button>
          ) : (
            <Button variant="danger" type="submit" id="submitBtn" className="my-3" disabled>
              Please fill in all required fields to register
            </Button>
          )}
        </Form>
        <div className="mt-3 text-center">
          <p>Already have an account? <Link to="/login">Log in here</Link></p>
        </div>
      </Container>
    );


}