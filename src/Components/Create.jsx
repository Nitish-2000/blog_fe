/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import BlogTile from './Common/BlogTile';
// import { Button } from 'bootstrap';
import Button from 'react-bootstrap/Button';
import AxiosService from '../utils/AxiosService';
import {toast} from 'react-toastify'
import useLogout from '../Hooks/useLogout';
import { useNavigate } from 'react-router-dom';


function Create() {
  let logout = useLogout()
  let navigate = useNavigate()
  let[title,setTitle] = useState("");
  let[imageUrl,setUrl] = useState("");
  let[description,setDescription] = useState("");

  let handlesubmit = async ()=>{
    try {
     let res =await  AxiosService.post('/blog/create',{title,imageUrl,description})
     if(res.status==201){
      toast.success(res.data.message)
      navigate('/dashboard')
     }
    } catch (error) {
      toast.error(error.response.data.message)
      if(error.response.status==401){
        logout();
      }
    }
  }
  return (
    <div>
    <div style={{backgroundColor:'lightblue', margin:'10px'}}>
    <h1 style={{alignItems:'center',marginLeft:'25%', marginRight:'25%'}}>Share Your Thoughts Here!</h1>
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label style={{fontWeight:555, fontSize:25}}>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter your title"  onChange={(e)=>setTitle(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label style={{fontWeight:555, fontSize:25}}>Image URL</Form.Label>
        <Form.Control type='url' placeholder="Enter your Image URL" onChange={(e)=>setUrl(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
      <Form.Label style={{fontWeight:555, fontSize:25}}>Image Description</Form.Label>
      <FloatingLabel controlId="floatingTextarea2" >
          <Form.Control
            onChange={(e)=>setDescription(e.target.value)}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
          />
      </FloatingLabel>
       </Form.Group>
    </Form>
    </div>
    <div>
         <h2 style={{textAlign:'center'}}>Preview</h2>
         <BlogTile blog={{title,imageUrl,description}} />
    </div>
    <div style={{textAlign:'center'}}>
    <Button variant = "primary"
    onClick={()=>handlesubmit()}>
      Submit for Approval
    </Button>
     </div>
     </div>
  );
}

export default Create;