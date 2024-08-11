import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  axios.defaults.withCredentials = true;
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/login", values)
      .then(res => {
        if (res.data.status === "success") {
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
                  onChange={e =>
                    setValues({ ...values, email: e.target.value })
                  }
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
                  onChange={e =>
                    setValues({ ...values, password: e.target.value })
                  }
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
              <p>You are agree to our terms and policies</p>
              <button className="btn btn-secondary btn-lg w-100">
                Create Account
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
