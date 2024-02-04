/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import BlogTile from "./Common/BlogTile";
import { useParams } from "react-router-dom";
import useLogout from "../Hooks/useLogout";
import { toast } from "react-toastify";
import AxiosService from "../utils/AxiosService";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Blog() {
  let params = useParams();
  let [blog, setblog] = useState({});
  let logout = useLogout();
  let userData = JSON.parse(sessionStorage.getItem("userData"));

  let getBlog = async () => {
    try {
      let res = await AxiosService.get(`/blog/${params.id}`);
      if (res.status === 200) {
        setblog(res.data.blog);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getBlog();
    } else {
      logout();
    }
  }, []);

  return (
    <div>
      {userData.role === "admin" ? <UpdateBlog blog={blog} /> : <></>}

      {userData.role === "user" ? <EditBlog /> : <></>}
    </div>
  );
}

function EditBlog() {
  let params = useParams();
  let [title, setTitle] = useState();
  let [imageUrl, setUrl] = useState();
  let [description, setDescription] = useState();

  let getBlog = async () => {
    let res = await AxiosService.get(`/blog/${params.id}`);
    if (res.status === 200) {
      setTitle(res.data.blog.title);
      setUrl(res.data.blog.imageUrl);
      setDescription(res.data.blog.description);
    }
  };

  let handlesubmit = async () => {
    try {
      let res = await AxiosService.put(`blog/edit/${params.id}`, {
        title,
        imageUrl,
        description,
      });

      navigate("/dashboard");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.status == 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  let navigate = useNavigate();
  let logout = useLogout();

  return (
    <>
      <div>
        <div style={{ backgroundColor: "lightblue", margin: "10px" }}>
          <h1
            style={{
              alignItems: "center",
              marginLeft: "25%",
              marginRight: "25%",
            }}
          >
            Edit Your Blog!
          </h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 555, fontSize: 25 }}>
                Title
              </Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 555, fontSize: 25 }}>
                Image URL
              </Form.Label>
              <Form.Control
                type="url"
                value={imageUrl}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 555, fontSize: 25 }}>
                Image Description
              </Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                  onChange={(e) => setDescription(e.target.value)}
                  as="textarea"
                  value={description}
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </div>
        <div>
          <h2 style={{ textAlign: "center" }}>Preview</h2>
          <BlogTile blog={{ title, imageUrl, description }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button variant="primary" onClick={() => handlesubmit()}>
            Submit
          </Button>
          <Button variant="info" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

function UpdateBlog({ blog }) {
  let logout = useLogout();
  let navigate = useNavigate()

  let changeStatus = async (status) => {
    try {
      let res = await AxiosService.put(`blog/status/${blog._id}/${status}`, {});
      if(res.status==200){
        navigate('/dashboard')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
      if (error.status == 401) {
        logout();
      }
    }
  };
  return (
    <>
      <div>
        <div>
          <BlogTile blog={blog} />
        </div>
        <div style={{textAlign:"center"}}>
          {
            blog.status!=="approved"?(
              <Button
                variant="success"
                onClick={() => changeStatus("approved")}
              >Approve</Button>
            ):<></>
          }
<></>
           { blog.status!=="pending"?(
            
                <Button variant="warning" onClick={() => changeStatus("pending")}>
                Pending
              </Button>):<></>
              
            }
<></>         
            {
              blog.status!=="rejected"?(
              <Button variant="danger" onClick={() => changeStatus("rejected")}>
                Reject
              </Button>):
              <></>
            }
        </div>
      </div>
    </>
  );
}
export default Blog;

                
              
              