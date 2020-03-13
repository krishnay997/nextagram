import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";
import picload from "../picload.gif"
const UserPics =(props)=>{
  const [userPics, setUserPics] = useState([]);
  const imagesStyle={
    margin:"10px"
  }
  const [isLoading, setIsLoading] = useState(true)
  const{userId}=props
    
    useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}` )
    .then(data => {
    // console.log(data.data)
    setUserPics(data.data)
    setIsLoading(false)
  
  })
  }, [])
  
  return(
  <div>
    {
      isLoading
      ? <LoadingIndicator center={false} src={picload}/>
      :userPics.map((img) => {
        return  <img style={imagesStyle} src={img.url} width={350} height={220} />
      })
      
    }
  </div>
  )
    
}




export default UserPics;