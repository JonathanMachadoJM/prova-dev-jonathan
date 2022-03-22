import React, { useEffect, useState } from 'react';
import { Route, Routes, Outlet, useNavigate, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Home from './components/Home';
import Ticket from './components/Ticket';
import { getAuth } from '@firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from './components/Loading';

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        setIsLoading(false);
      } else {
        // User is signed out
        navigate('/login');
      }
    });
  }, []);

  if (isLoading) return <Loading />;

  return <Outlet />;
};

const Router = () => (
  <Routes>
    <Route exact path="/" element={<PrivateRoute />}>
      <Route exact path="/" element={<Navigate to="/home" />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/ticket" element={<Ticket />} />
    </Route>
    <Route path="*" element={<h1>Page not found 404</h1>} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/cadastro" element={<Cadastro />} />
  </Routes>
);

export default Router;
