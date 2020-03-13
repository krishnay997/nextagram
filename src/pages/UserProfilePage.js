import React,{useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const UserProfilePage = () => {
    const [userImages, setUserImages] = useState([]);
    const [Profile, setProfile] = useState([]);
    let {id} = useParams();
    useEffect(() => {
        fetch(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            setUserImages(data)
        });
        fetch(`https://insta.nextacademy.com/api/v1/users/${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            setProfile(data)
        });
    }, [])

    return (
        <div>
             {<h1>{Profile.username}</h1>}
             <br/>
             {<img height="300px" width="300px" className="userImage" src={Profile.profileImage}></img>}
             <br/>
            <div>
            {userImages.map((uimg) =>{
                    return <img src={uimg} width={100} height={100}/>})}
            </div>
                
        
        </div>  
      

    )
}
  
export default UserProfilePage