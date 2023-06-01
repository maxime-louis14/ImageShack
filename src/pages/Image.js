import React from 'react'
import {useLocation} from 'react-router-dom';
import './style/Image.css';
function Image() {
    const location = useLocation();
    

    return ( <>
    <div className="image-container">
        <img className="image" src={"http://localhost:3000/" + location.state.name}/>
    </div>
    
    </> );
}

export default Image;