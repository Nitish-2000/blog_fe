/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react'
import AxiosService from '../utils/AxiosService'
import {toast} from 'react-toastify'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Hooks/useLogout'

function Dashboard() {
  let[blog,setBlog] = useState([])
  let navigate  = useNavigate()
  let logout = useLogout()
  let userData = JSON.parse(sessionStorage.getItem('userData'))

  // let date =  blog.createdAt
  // console.log(date)

  let createdBlogs = async ()=>{
    try {
      let url = userData.role==='admin'?'/blog':'blog/user'
      let res = await AxiosService.get(url)
      toast.success(res.data.message)
      if(res.status===200){
      setBlog(res.data.userBlogs)
      // let date = (res.data.userBlogs[0].createdAt).getFullYear()
      // // let date1 = date.parse()
      // console.log(date)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      if(error.status===401){
        logout()
      }
    }
  }

  
  useEffect(()=>{
      createdBlogs()
  },[])
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>CreatedAt</th>
          <th>Image</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {
        blog.map((e,i)=>{
        return  <tr key = {e._id} onClick={()=>navigate(`/blog/${e._id}`)}>
          <td>{i+1}</td>
          <td>{e.title}</td>
          <td>{e.createdAt}</td>
          <td> <img src = {e.imageUrl} style={{height:50, width:80}}/></td>
          <td>{e.status}</td>
          <td><Button variant='primary'>Edit</Button></td>
          <td><Button variant='danger'>Delete</Button></td>
        </tr>
        })

        
      }
        
      </tbody>
    </Table>
  );
  
}

export default Dashboard