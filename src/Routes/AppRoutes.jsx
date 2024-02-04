/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import SignUp from '../Components/SignUp'
import SignIn from '../Components/SignIn'
import Home from '../Components/Home'
import Dashboard from '../Components/Dashboard'
import Create from '../Components/Create'
import Blog from '../Components/Blog'
import Headers from '../Components/Headers'

function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<SignIn />}/>
        <Route path='/create' element={<><Headers /><Create /></>}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/dashboard' element={<><Headers /><Dashboard /></>}/>
        <Route path='/home' element={<><Headers /><Home /></>}/>
        <Route path='/blog/:id' element={<><Headers /><Blog /></>}/>
        <Route path='/*' element={<Navigate to ='/' />}/>
     </Routes>
  )

}

export default AppRoutes
