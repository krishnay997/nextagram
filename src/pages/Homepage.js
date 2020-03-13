import React, {useState, useEffect} from 'react'
import axios from "axios";
import UserPics from "../container/UserPics";
import LoadingIndicator from "../components/LoadingIndicator";
import {Button}  from 'reactstrap';
import { Route, Link } from "react-router-dom";
import loading from '../loading.gif'

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
    axios.get("https://insta.nextacademy.com/api/v1/users/")
    .then(data => {
      setIsLoading(false)
      setUsers(data.data)
      
    
    })
    }, [])
    return (
        <div>
            {isLoading
                ? <LoadingIndicator center={true} src={loading}/>
                : users.map((user)=>{
                return <div className="userCard">
                            <div className="profilepic">
                                
                                <Link to={"/users/" + user.id}><a className="userName" href="#">{user.username}</a></Link>
                                <img height="200px" width="200px" className="userImage" src={user.profileImage}/>
                                <Link to={"/users/" + user.id}><Button color="primary" size="lg">See More</Button></Link>
                                
                            </div>
                            <UserPics userId={user.id}/> 
                       
                        </div>  
                    })
            }
            
        </div>
    )
}

export default HomePage