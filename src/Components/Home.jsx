/* eslint-disable no-unused-vars */
import React from 'react'
import AxiosService from '../utils/AxiosService'
import {toast} from 'react-toastify'
import useLogout from '../Hooks/useLogout'
import { useEffect , useState} from 'react'
import BlogTile from './Common/BlogTile'



function Home() {

  let logout = useLogout()
  let [blog,setBlog] = useState([])

  let getApprovedBlogs = async()=>{
    try {
      let res = await AxiosService.get('/dashboard')
      if(res.status===200){
        setBlog(res.data.blogs) 
      }
    } catch (error) {
      toast.error(error.response.data.message)
        if(error.status===401){
          logout()
        }
      
      }
    
  }
useEffect(()=>{
  getApprovedBlogs()
},[])
  return <>
    {
      blog.map((e)=>{
        return <BlogTile blog={e} key ={e._id}/>
      })
    }
  </>
}
export default Home