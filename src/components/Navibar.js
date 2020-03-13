import React, { useState } from 'react';
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
import MyProfilePage from "../pages/MyProfilePage";



const Navibar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, changeModalState] = useState(false)
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [cpassInput, setCpassInput] = useState("");
  const [myProfpic,setMyProfpic]=useState()

  const modalStyle = {
    display: modalOpen ? "block" : "none",
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'fixed',
    top: 200,
    bottom: 200,
    margin:"auto",
    left: -50,
    right: -50,
    color: 'black',
    zIndex: 99,
    
  }
  const buttonClick = () => {
    changeModalState(!modalOpen)
    
  }



  // When both not opened
  // When Sign In open
    //  toggle Sign In Close
    //  toggle Sign up open
  // When Sign up open
    //  toggle sign up close
    //  toggle sign in open

  // --------------------------------------------------------------------------------------------

  const [modalOpen2, changeModalState2] = useState(false)

  
  const modalStyle2 = {
    display: modalOpen2 ? "block" : "none",
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'fixed',
    top: 200,
    bottom: 200,
    margin:"auto",
    left: -50,
    right: -50,
    color: 'black',
    zIndex: 99
  }
  const buttonClick2 = () => {
    changeModalState2(!modalOpen2)
    
  }

  const switchMod =() =>{
    changeModalState(!modalOpen)
    changeModalState2(!modalOpen2)
    
  }

  const modStyle={
    backgroundColor: "white",
    width: "30vw",
    position:"fixed",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    padding:"35px",
    borderRadius:"5%"
  }
//--------------------------------------------Sign Up request------------------------------------------
  const signUp=(e)=>{
    e.preventDefault()
    if(passInput!==cpassInput ){
      toast.warning("Passwords do not match")
    } else if(emailInput =="" || usernameInput =="" || passInput =="" || cpassInput ==""){
      toast.warning("Please complete every field.")

    }else{
      axios({
        method: 'POST',
        url: 'https://insta.nextacademy.com/api/v1/users/',
        data: {
          username: usernameInput,
          email: emailInput,
          password: cpassInput
        }
      })
      .then(response => {
        console.log(response)
        changeModalState(!modalOpen)
        toast.success("Great Success")
        
      })
      .catch(error => {
        toast.error(error.response.data.message.join(","))// .join thing joins everything in the array into a single string
        // changeModalState(!modalOpen)
        
      })
      console.log(emailInput)
      console.log(usernameInput)
      console.log(passInput)
      console.log(cpassInput)
    }
    
  }
//--------------------------------------------Sign In request--------------------------------------------------
  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(true);
  

   //USERNAME VALIDITY


  const checkUsername = newUsername => {
    // this should only trigger after you stop typing for 500ms
    console.log("Making API call to check username!");
    axios({
      method: 'GET',
      url: `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`,
      headers:{"Content-Type":"application/json"}
    })
      
      .then(response => {
        console.log(response);
        if (response.data.valid) {
          setUsernameValid(true);
          
        } else {
          setUsernameValid(false);
          
        }
      });
  };

  const handleUsernameInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    e.preventDefault()
    clearTimeout(delay);
    const newUsername = e.target.value;
    console.log(newUsername)
    setUsernameInput(newUsername);

    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 500);

    setDelay(newDelay);
  };

  //END USERNAME VALIDITY


//SIGN IN METHOD-------------------------------------------------------------------------------

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") !== null
  )  

  let history = useHistory()
  const signIn=(e)=>{
    e.preventDefault()
    if(usernameInput=="" || passInput==""){
      toast.warning("Please Complete Every Field")
    }else{
      axios({
        method: 'POST',
        url: `https://insta.nextacademy.com/api/v1/login`,
        headers:{"Content-Type":"application/json"},
        data:{
          "username":usernameInput,
          "password":passInput
  
        }
      })
      .then(response => {
        console.log(response);
        localStorage.setItem("token",response.data.auth_token)
        toast.success("Welcome back")
        changeModalState2(!modalOpen2)
        history.push('/')
        setLoggedIn(true)
      })
      .catch(err => {
        toast.error("Something wrong my guy")
      })
      



    }
    


    
  }

  
  // --------------------------------------------Sign Up Forms------------------------------------------------


  const toggle = () => setIsOpen(!isOpen);
  const [username, setUsername] = useState("")
  const getInputProp = () => {
    if (!usernameInput.length) {
      return null;
    }

    if (usernameInput.length <= 6) {
      return { invalid: true };
    }

    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getFormFeedback = () => {
    if (!usernameInput.length) {
      return null;
    }

    if (usernameInput.length <= 6) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }

    if (usernameValid) {
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
    } else {
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
    }
  };
  return (
    <div>
      <div style={modalStyle} onClick={buttonClick} >
        <div style={modStyle} onClick={(e)=>{e.stopPropagation()}}>
                  <h3>Sign Up</h3>
                  <hr/>
                  <Form onSubmit={signUp}>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input onChange={(e)=>setEmailInput(e.target.value)} value={emailInput} type="email" name="email" id="exampleEmail" placeholder="Enter email" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                          type="text"
                          value={usernameInput}
                          onChange={handleUsernameInput}
                          {...getInputProp()}
                        />
                        {getFormFeedback()}
                        <FormText>Enter a username between 6 and 20 characters</FormText>
                    </FormGroup>
                    {/* <FormGroup>
                      <Label for="exampleEmail">Username</Label>
                      <Input onChange={(e)=>setUsernameInput(e.target.value)} value={usernameInput} type="text" name="username" id="exampleEmail" placeholder="Enter Username" />
                    </FormGroup> */}

                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input onChange={(e)=>setPassInput(e.target.value)} value={passInput} type="password" name="password" id="examplePassword" placeholder="Enter Password" />
                    </FormGroup>

                    <FormGroup>
                      <Label for="examplePassword">Confirm Password</Label>
                      <Input onChange={(e)=>setCpassInput(e.target.value)} value={cpassInput} type="password" name="password" id="examplePassword" placeholder="Confirm Password" />
                    </FormGroup>
                    <p>Already a member?<Link onClick={switchMod} > Sign in here.</Link></p>
                    <hr/>
                    <div className="buttonz">
                      <Button  color="primary" className="leftbtn">Sign Up</Button>
                      <Button  color="danger" className="rightbtn" onClick={buttonClick}>Cancel</Button>
                    </div>
                    
                  </Form>
        </div>
                  
      </div>

{/* ----------------------------------------------------Sign In Form---------------------------------------------------------*/}

      <div style={modalStyle2} onClick={buttonClick2} >
        <div style={modStyle} onClick={(e)=>{e.stopPropagation()}}>
                  <h3>Sign In</h3>
                  <hr/>
                  <Form onSubmit={signIn} >
                    <FormGroup>
                      <Label for="exampleEmail">Username</Label>
                      <Input onChange={(e)=> setUsernameInput(e.target.value)} value={usernameInput} type="text" name="username" id="exampleEmail" placeholder="Enter Username" />
                    </FormGroup>
              
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input onChange={(e)=>setPassInput(e.target.value)} value={passInput} type="password" name="password" id="examplePassword" placeholder="Enter Password" />
                    </FormGroup>

                    
                    <p>Not a member?<Link onClick={switchMod} > Sign Up here.</Link></p>
                    <hr/>
                    <div className="buttonz">
                      <Button color="primary" className="leftbtn">Sign In</Button>
                      <Button color="danger" className="rightbtn" onClick={buttonClick2}>Cancel</Button>
                    </div>
                    
                    
                  </Form>
        </div>
                  
      </div>



{/*--------------------------------------------------- Top Right Nav Links------------------------------------------------- */}


      <Navbar color="light" light expand="md">
        <Link to="/"><img width="28px" height="28px"  src="https://insta.nextacademy.com/static/favicon.png"></img></Link>

          <NavbarBrand href="/"><Link  style={{ textDecoration: 'none', color:"black",marginLeft:"5px"}} to="/">Nextagram</Link></NavbarBrand>
          <br/>
          <Nav  navbar className="ml-auto">
            <Form className="form">
              <FormGroup row>
                <Label for="exampleEmail" sm={2}></Label>
                <Col sm={10}>
                  <Input type="text"  placeholder="Search User" />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col>
                  <Button>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
            <NavItem style={{color:"blue"}}>
              <NavLink href="/components/" target="_blank">Users</NavLink>
            </NavItem>
            {
              loggedIn
              ? <div>
                  
                  <NavItem>
            <NavLink className="navLink"  onClick={(e) => {e.preventDefault(); window.location.href = '/';setLoggedIn(null); localStorage.removeItem("token")}}>Sign Out</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="navLink" href="/profile" ><img src={myProfpic} width="40px" height="40px"></img>My Profile</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="navLink" href="/upload" >Upload</NavLink>
                  </NavItem>

               </div>
              : <div>
                <NavItem>
                  <NavLink className="navLink" onClick={buttonClick} >Sign Up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="navLink" onClick={buttonClick2}>Sign In</NavLink>
                </NavItem>
              </div>
            }
            
          </Nav>

       
      </Navbar>
      
    </div>
  );
}

export default Navibar;