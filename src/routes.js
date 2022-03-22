import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import {isAuthenticated} from './auth';
import Home from './components/Home';
import Ticket from './components/Ticket';

const PrivateRoute = () =>
{
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
};

const Router = () => (
  <Routes>
    <Route exact path="/" element={<PrivateRoute />}>
      <Route exact path="/" element={<h1>Você está logado</h1>} />
      <Route exact path='/home' element={<Home />} />
      <Route exact path='/ticket' element={<Ticket />} />
    </Route>
    <Route path="*" element={<h1>Page not found 404</h1>}/>
    <Route exact path='/login' element={<Login />} />
    <Route exact path='/cadastro' element={<Cadastro />} />

  </Routes>
);

export default Router;
