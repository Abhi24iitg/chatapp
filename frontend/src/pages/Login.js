import React, { useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../components/Navigation";
function Login() {
  const navigate = useNavigate();
  // states-->
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //  Functions-->
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data === "either email or password incorrect") {
      toast.error("either email or password incorrect!");
      setLoading(false);
    } else if (data === "user not exist") {
      toast.error("Account does not exists");
      navigate("/signup");
    } else {
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Logged in successfully");
      setLoading(false);
      navigate("/Chat");
    }
  }
  return (
    <>
      <Navigation />;
      <Container>
        <Row className="login-row">
          <Col md={5} className="login__bg"></Col>
          <Col
            md={7}
            className="d-flex align-items-center justify-content-center flex-direction-column"
          >
            <Form
              style={{ width: "80%", maxWidth: "500" }}
              onSubmit={handleLogin}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label
                  style={{ fontFamily: "Poppins", fontWeight: "600" }}
                >
                  Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <Form.Text
                  className="text-muted"
                  style={{ fontFamily: "Poppins", fontWeight: "600" }}
                >
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label
                  style={{ fontFamily: "Poppins", fontWeight: "600" }}
                >
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Form.Group>
              <Button
                style={{ fontFamily: "Poppins", fontWeight: "600" }}
                variant="primary"
                type="submit"
              >
                {loading ? "Logging you up..." : "Login"}
              </Button>
              <div className="py-4">
                <p
                  className="text-center"
                  style={{ fontFamily: "Poppins", fontWeight: "600" }}
                >
                  Don't have an account ? <Link to="/signup">Signup</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
