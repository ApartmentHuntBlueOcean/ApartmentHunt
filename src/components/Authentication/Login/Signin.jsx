import React, { useState } from 'react';
import { Card, Form, Input } from '../styles/AuthForm.jsx';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { FcGoogle } from 'react-icons/fc';
import { GrUserAdmin } from 'react-icons/gr';
import axios from 'axios';
import '../styles/signin.css';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const Signin = ({ handleSignUp, openModal, getUserInfo, getAdminInfo }) => {
  const [adminClicked, setAdminClicked] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [notValid, setNotValid] = useState(false);

  const login = (email, password) => {
    axios
      .post('/login', {
        email,
        password,
      })
      .then((res) => {
        if (res.data === 'verified') {
          openModal(false);
          let token = jwtDecode(Cookies.get('jwt'));
          getUserInfo(token.payload.username, token.payload.email);
        } else {
          openModal(false);
          setNotValid(true);
        }
      })
      .catch((err) => {
        console.log('is there error in promise', err);
      });
  };

  const loginAdmin = (email, password) => {
    axios
      .post('/login-admin', {
        email,
        password,
      })
      .then((res) => {
        if (res.data === 'verified') {
          openModal(false);
          let token = jwtDecode(Cookies.get('jwt'));
          getAdminInfo(token.payload.username, token.payload.email);
        } else {
          openModal(false);
          setNotValid(true);
        }
      })
      .catch((err) => {
        console.log('is there error in promise', err);
      });
  };

  if (notValid) {
    return <Redirect to='/' />;
  }

  return (
    <Card className='login-group'>
      <div className='title'>Sign In</div>
      <Form>
        <span className='input-label'>Email</span>
        <Input
          type='email'
          placeholder='Email'
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <span className='input-label'>Password</span>
        <Input
          type='password'
          placeholder='Password'
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Router>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button
              className='login-btn'
              variant='contained'
              onClick={() => login(userEmail, userPassword)}>
              Sign In
            </Button>
          </Link>
        </Router>
      </Form>
      <div className='or-group'>OR</div>
      <div className={adminClicked ? 'flip-container-signin' : ''}>
        <div className='flipper-signin'>
          <div className='front-signin'>
            <Button
              className='login-btn'
              variant='contained'
              startIcon={<FcGoogle className='google-icon' />}>
              <a
                href='/auth/google'
                style={{ textDecoration: 'none', color: '#fff' }}>
                Login with Google
              </a>
            </Button>
          </div>
          <div className='back-signin'>
            <Router>
              <Link to='/' style={{ textDecoration: 'none' }}>
                <Button
                  className='admin-link-btn'
                  variant='contained'
                  onClick={() => loginAdmin(userEmail, userPassword)}
                  startIcon={<GrUserAdmin className='admin-icon' />}>
                  Admin Sign in
                </Button>
              </Link>
            </Router>
          </div>
        </div>
      </div>
      <div className='sign-up-link'>
        <div className='link'>Don't have an account?</div>
      </div>
      <div className='sign-up-account'>
        <div onClick={() => handleSignUp()} className='create-account'>
          Create account
        </div>
      </div>
      <div className='admin-icon-group'>
        <GrUserAdmin
          onClick={() => setAdminClicked(!adminClicked)}
          className='admin-icon-two'
        />
      </div>
    </Card>
  );
};

export default Signin;
