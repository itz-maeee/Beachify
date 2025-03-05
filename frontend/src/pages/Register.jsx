import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config'

const Register = () => {
   const [credentials, setCredentials] = useState({
      username: '', // FIXED: Username should be lowercase
      email: '',
      password: ''
   });

   const { dispatch } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
   }

   const handleClick = async (e) => {
      e.preventDefault();
      console.log("Sending request with:", credentials); // Debugging step
    
      try {
          const res = await fetch(`${BASE_URL}/auth/register`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials),
          });

          const result = await res.json();
          console.log("Server response:", result); // Debugging step

          if (!res.ok) {
              alert(result.message);
              return;
          }

          dispatch({ type: 'REGISTER_SUCCESS' });
          navigate('/login');

      } catch (err) {
          console.error("Registration error:", err);
          alert("Network error: " + err.message);
      }
   };

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="Register Illustration" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="User Icon" />
                        </div>
                        <h2>Register</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                           <input 
                              type="text" 
                              placeholder='Username' 
                              id='username'  
                              onChange={handleChange} 
                              value={credentials.username} // FIXED
                              required 
                           />
                           </FormGroup>
                           <FormGroup>
                              <input 
                                 type="email" 
                                 placeholder='Email' 
                                 id='email' 
                                 onChange={handleChange} 
                                 value={credentials.email}
                                 required 
                              />
                           </FormGroup>
                           <FormGroup>
                              <input 
                                 type="password" 
                                 placeholder='Password' 
                                 id='password' 
                                 onChange={handleChange} 
                                 value={credentials.password}
                                 required 
                              />
                           </FormGroup>
                           <Button className='btn secondary_btn auth_btn' type='submit'>Create Account</Button>
                        </Form>

                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Register;
