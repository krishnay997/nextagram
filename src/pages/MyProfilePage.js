import React,{useEffect,useState} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import LoadingIndicator from "../components/LoadingIndicator";
import picload from "../picload.gif";
import loading from '../loading.gif'
import { useHistory } from "react-router-dom";

//token not defined and usestate and.map to loop through pictures

const MyProfilePage =()=>{
  const [myPics, setMyPics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myUsername,setMyUsername]=useState("")
  const [myProfpic,setMyProfpic]=useState()
  const history = useHistory()

  if(!localStorage.getItem("token")){
    history.push("/")
    toast.warning("Please sign in to view your profile")
  }

    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://insta.nextacademy.com/api/v1/images/me`,
            headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
          })
          .then(response => {
            console.log(response.data);
            setMyPics(response.data)
            setIsLoading(false)
            
          })
          .catch(err => {
            console.log(err);
            toast.error("Please Login to view your profile.")
          })
    
        
    }, [])

    useEffect(() => {
      axios({
          method: 'GET',
          url: `https://insta.nextacademy.com/api/v1/users/me`,
          headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
        })
        .then(response => {
          console.log(response.data);
          setMyUsername(response.data.username)
          setMyProfpic(response.data.profile_picture)
         
          
          
        })
        .catch(err => {
          console.log(err);
          
        })
  
      
  }, [])
    
    return(
      <div>
    
            { isLoading
             ? <LoadingIndicator center={false} src={loading}/>
             :<>
                <h1>{"@"+myUsername}</h1>
                <img style={{borderRadius:"50%"}} src={myProfpic} height={400} width={400}></img>
              </>
            }
            <br/>
            {
             isLoading
             ? <LoadingIndicator center={false} src={picload}/>
             :myPics.map((img) => {
             return  <img src={img} width={300} height={200} />
           })
          }
 
      </div>
 

    )
}

export default MyProfilePage