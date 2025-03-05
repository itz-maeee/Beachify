import React, { useState, useContext } from 'react';

import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';

import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Login = () => {
   const [credentials, setCredentials] = useState({
      email: '',
      password: ''
   })

   const {dispatch} = useContext(AuthContext);
   const navigate = useNavigate();

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   };

   const handleClick = async (e) => {
      e.preventDefault();
   
      dispatch({ type: 'LOGIN_START' });
   
      try {
         const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials),
         });
   
         const result = await res.json();
   
         if (!res.ok) {
            alert(result.message);
            return; // Stop execution if login fails
         }
   
         dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
         
         console.log("Login successful, redirecting...");
         navigate('/'); // Navigate after successful login
      } catch (err) {
         dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
         console.error("Login error:", err);
      }
   };
   

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={loginImg} alt="Login Illustration" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="User Icon" />
                        </div>
                        <h2>Login</h2>

                        <Form>
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
                           <Button className='btn secondary_btn auth_btn' type='submit' onClick={handleClick}>
                              Login
                           </Button>

                        </Form>
                        <p>Don't have an account? <Link to='/register'>Create</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Login
