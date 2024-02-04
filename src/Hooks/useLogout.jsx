// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

function useLogout() {
    let navigate = useNavigate();
  return ()=>{
    sessionStorage.clear()
    toast.success("User Logged Out Successfully")
    navigate('/')
  }
}

export default useLogout