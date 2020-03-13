import React,{useState,useEffect} from "react";
import { Route, Link, withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Col, Form, FormGroup, Label, Input, FormText,Button,FormFeedback,FormFeedbackProps,getFormFeedback} from 'reactstrap';
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import LoadingIndicator from "../components/LoadingIndicator"


const UploadPage=()=>{
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const uploadFile=()=>{
         let formData = new FormData();
         formData.append("image", imageFile);
        axios({
            method: 'POST',
            url: `https://insta.nextacademy.com/api/v1/images/`,
            headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`},
            data: formData
            })
            .then(response => {
            console.log(response);
            toast.success("You uploaded an image.")
            setPreviewImage(null)
            setMessage("You uploaded an image!")
            
            })
            .catch(err => {
            console.log(err.response);
            toast.error("Try again big boy.")
            setPreviewImage(null)
        })
    }
    
    const history = useHistory()
    const previewStyle ={border:"solid black 2px"}

    if(!localStorage.getItem("token")){
        history.push("/")
        toast.warning("Please sign in to upload pictures")
      }    
        return(
            <div className="preview">
                { <Form onSubmit={(e)=>{e.preventDefault() ;uploadFile()}}> 
                    <FormGroup>
                        <Input
                        type="file"
                        name="image-file"
                         onChange={(e)=>{setImageFile(e.target.files[0]);setPreviewImage(URL.createObjectURL(e.target.files[0])) }
                           }
                        />
                        <FormText color="muted">
                        We only support "jpeg" format.
                        </FormText>
                    
                    </FormGroup>
                    
                    <Button type="submit" color="primary">
                        Upload
                    </Button>
                    <div className="previewCard">
                            {previewImage ? (
                                <img style={previewStyle}src={previewImage}  width="400px"  height="400px"
                                />) : (
                                <h3  className="text-center">
                                {message ? message : "Your Preview"}
                                </h3>
                            )}
                    </div>
                
                </Form>}
            </div>

            
        )
    }


export default UploadPage