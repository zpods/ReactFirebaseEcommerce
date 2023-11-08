import React from 'react';
import { createStore } from 'redux';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Header from './components/nav/Header';
import Footer from './components/footer/Footer';
import User from './pages/user/User';
import CompleteRegistration from './pages/auth/CompleteRegistration';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


function App() {

  const Layout = ({children}) => (
    (
      <div>
        <Header />
        {children}
        <Footer />
      </div>  
    )
  )

  const router = createBrowserRouter(
    createRoutesFromElements(
      <React.Fragment>
        <Route path="/" element={<Layout><Home /></Layout>}/>
        <Route path="/user" element={<Layout><User /></Layout>}/>
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/register/complete" element={<Layout><CompleteRegistration /></Layout>} />
      </React.Fragment>
    )
  );
  
  return (
    <React.Fragment>    
      <RouterProvider  router={router} />
    </React.Fragment>   
  );
}

export default App;
