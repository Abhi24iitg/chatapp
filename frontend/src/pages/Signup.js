import React, { useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import Navigation from "../components/Navigation";

function Signup() {
  const navigate = useNavigate();
  // UseStates-->
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [name, setName] = useState("");

  //image upload states
  const [picture, setPicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Functions-->
  // for image uploading
  const postDetails = async (picture) => {
    if (picture == undefined) {
      toast.warning("Please Upload a image");
      return;
    } else if (picture.size >= 1048576) {
      toast.warning("The size of image is greater than 1mb");
      return;
    }
    const data = new FormData();
    data.append("file", picture);
    data.append("upload_preset", "ikt6pd41");
    try {
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dfxolp6p1/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      console.log(urlData.url);
      setPicture(urlData.url.toString());
      setImagePreview(URL.createObjectURL(picture));
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };
  // signup
  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    if (password != confirmpassword) {
      toast.warning("Password do not match");
      setLoading(false);
      return;
    } else {
      const res = await fetch("http://localhost:5001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, picture }),
      });
      const data = await res.json();
      if (data === "user already exists") {
        toast.error("Id exists please login!");
        setLoading(false);
        navigate("/login");
      } else {
        // localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success("Signed Up successfully");
        setLoading(false);
        navigate("/login");
      }
    }
  }

  return (
    <>
      <Navigation />
      <Container>
        <Row className="signup-row">
          <Col
            md={7}
            className="d-flex align-items-center justify-content-center flex-direction-column"
          >
            <Form
              style={{ width: "80%", maxWidth: 500 }}
              onSubmit={handleSignUp}
            >
              <h1 className="text-center">Create account</h1>
              <div className="signup-profile-pic__container">
                <img
                  src={
                    imagePreview ||
                    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  }
                  className="signup-profile-pic"
                />
                <label htmlFor="image-upload" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input
                  type="file"
                  id="image-upload"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </div>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label
                  style={{ fontFamily: "Poppins", fontWeight: "600" }}
                >
                  Name
                </Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  placeholder="Enter your Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label
                  style={{ fontFamily: "Poppins", fontWeight: "600" }}
                >
                  Email address
                </Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="email"
                  placeholder="Enter email"
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
                  autoComplete="off"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label
                  style={{ fontFamily: "Poppins", fontWeight: "600" }}
                >
                  Confirm Password
                </Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  value={confirmpassword}
                  required
                />
              </Form.Group>
              <Button
                style={{ fontFamily: "Poppins", fontWeight: "600" }}
                variant="primary"
                type="submit"
              >
                {loading ? "Signing you up..." : "Signup"}
              </Button>
              <div className="py-4">
                <p
                  className="text-center"
                  style={{ fontFamily: "Poppins", fontWeight: "600" }}
                >
                  Already have an account ? <Link to="/login">Login</Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col md={5} className="signup__bg"></Col>
        </Row>
        <ToastContainer position="top-center" />
      </Container>
    </>
  );
}

export default Signup;
// import React, { useState } from "react";
// import { Col, Container, Form, Row, Button } from "react-bootstrap";
// // import { useSignupUserMutation } from "../services/appApi";
// import { Link, useNavigate } from "react-router-dom";
// import "./Signup.css";
// import botImg from "../assets/bot.jpeg";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   // const [signupUser, { isLoading, error }] = useSignupUserMutation();
//   const navigate = useNavigate();
//   //image upload states
//   const [image, setImage] = useState(null);
//   const [upladingImg, setUploadingImg] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);

//   function validateImg(e) {
//     const file = e.target.files[0];
//     console.log(file);
//     if (file.size >= 1048576) {
//       return alert("Max file size is 1mb");
//     } else {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   }

//   async function uploadImage() {
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "");
//     try {
//       setUploadingImg(true);
//       let res = await fetch(
//         "https://api.cloudinary.com/v1_1/dfxolp6p1/image/upload",
//         {
//           method: "post",
//           body: data,
//         }
//       );
//       const urlData = await res.json();
//       setUploadingImg(false);
//       return urlData.url;
//     } catch (error) {
//       setUploadingImg(false);
//       console.log(error);
//     }
//   }

//   async function handleSignup(e) {
//     e.preventDefault();
//     if (!image) return alert("Please upload your profile picture");
//     const url = await uploadImage(image);
//     console.log(url);
//     // signup the user
//     // signupUser({ name, email, password, picture: url }).then(({ data }) => {
//     //   if (data) {
//     //     console.log(data);
//     //     navigate("/chat");
//     //   }
//     // });
//   }

//   return (
//     <Container>
//       <Row>
//         <Col
//           md={7}
//           className="d-flex align-items-center justify-content-center flex-direction-column"
//         >
//           <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
//             <h1 className="text-center">Create account</h1>
//             <div className="signup-profile-pic__container">
//               <img
//                 src={imagePreview || botImg}
//                 className="signup-profile-pic"
//               />
//               <label htmlFor="image-upload" className="image-upload-label">
//                 <i className="fas fa-plus-circle add-picture-icon"></i>
//               </label>
//               <input
//                 type="file"
//                 id="image-upload"
//                 hidden
//                 accept="image/png, image/jpeg"
//                 onChange={validateImg}
//               />
//             </div>
//             {/* {error && <p className="alert alert-danger">{error.data}</p>} */}
//             <Form.Group className="mb-3" controlId="formBasicName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Your name"
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//               />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               {/* {upladingImg || isLoading ? "Signing you up..." : "Signup"} */}
//             </Button>
//             <div className="py-4">
//               <p className="text-center">
//                 Already have an account ? <Link to="/login">Login</Link>
//               </p>
//             </div>
//           </Form>
//         </Col>
//         <Col md={5} className="signup__bg"></Col>
//       </Row>
//     </Container>
//   );
// }

// export default Signup;
