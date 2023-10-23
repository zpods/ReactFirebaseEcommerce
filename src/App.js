import logo from './logo.svg';
import React from 'react';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <React.Fragment>
        <Route path="/" element={<Home />}/>
        <Route path="login" element={<Login />} />
        <Route path="Register" element={<Register />} />
      </React.Fragment>
    )
  );
  


  return (
    <RouterProvider  router={router} />
  );
}

export default App;
