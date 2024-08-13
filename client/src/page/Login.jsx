import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Container, Row, Col } from "react-bootstrap";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/login", values)
      .then(res => {
        if (res.data.message === "success") {
          navigate("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login">
      <Container className="justify-content-center align-items-center d-flex">
        <Row className="w-50 mt-5">
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  size="lg"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  size="lg"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                />
              </Form.Group>
              <button className="btn btn-primary btn-lg w-100 mb-2">
                Login
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
