/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
             <AppRoutes />
       </BrowserRouter>
    </>
  )
}

export default App