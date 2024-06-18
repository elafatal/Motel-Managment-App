import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route,Routes, Navigate} from 'react-router-dom'
import AdminDashboard from './Components/admin/Dashboard/Dashboard'
import SignIn from './Components/SignIn/SignIn'
import { Card } from 'react-bootstrap'
import ReserveForm from './Components/admin/emptyRooms/reserve/reserve'
function App() {


  return (
    <>
       <BrowserRouter>
        <Routes>
        
            <Route path='/admin/*' element={< AdminDashboard />} />
            <Route path='/' element={< SignIn/>} />
            <Route path='/shosho' element={< ReserveForm />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} />  */}
        </Routes>
      </BrowserRouter>
  
    </>
  )
}

export default App
