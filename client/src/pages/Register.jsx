import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    console.log("Form Submitted", { name, email, password, dob, gender }); // Log all values on submit


    try {
      const response = await axios.post(`${API_URL}/user/register`, {
        name,
        email,
        password,
        dob,
        gender,
      });

      if (response.data.success) {
        console.log("User registered successfully:", response.data);
      } else {
        setError(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  // return (
  //   <>
  //     <Navbar />
  //     <div className="container my-3 py-3">
  //       <h1 className="text-center">Register</h1>
  //       <hr />
  //       <div class="row my-4 h-100">
  //         <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
  //           <form onSubmit={handleSubmit}>
  //             <div class="form my-3">
  //               <label for="Name">Full Name</label>
  //               <input
  //                 type="email"
  //                 class="form-control"
  //                 id="Name"
  //                 placeholder="Enter Your Name"
  //                 value={name}
  //                 onChange={(e) => setName(e.target.value)}
  //                 required
  //               />
  //             </div>
  //             <div class="form my-3">
  //               <label for="Email">Email address</label>
  //               <input
  //                 type="email"
  //                 class="form-control"
  //                 id="Email"
  //                 placeholder="name@example.com"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 required
  //               />
  //             </div>
  //             <div class="form  my-3">
  //               <label for="Password">Password</label>
  //               <input
  //                 type="password"
  //                 class="form-control"
  //                 id="Password"
  //                 placeholder="Password"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 required
  //               />
  //             </div>
  //             {error && <div className="text-danger">{error}</div>}
  //             <div className="my-3">
  //               <p>
  //                 Already has an account?{" "}
  //                 <Link
  //                   to="/login"
  //                   className="text-decoration-underline text-info"
  //                 >
  //                   Login
  //                 </Link>{" "}
  //               </p>
  //             </div>
  //             <div className="text-center">
  //               <button class="my-2 mx-auto btn btn-dark" type="submit">
  //                 Register
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //     <Footer />
  //   </>
  // );

  const genderOptions = ["Male", "Female", "Others"];

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Dob">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="Dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Gender">Gender</label>
                <select
                  className="form-control"
                  id="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Please select your gender
                  </option>
                  {genderOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {error && <div className="text-danger">{error}</div>}
              <div className="my-3">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info"
                  >
                    Login
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
