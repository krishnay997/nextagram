import React from 'react';
import loading from '../loading.gif'

const LoadingIndicator=(props)=>{
    const {center,src} = props
    return(
        <img className={center ? "loading": ""} src={src}></img>
    )
}

export default LoadingIndicator