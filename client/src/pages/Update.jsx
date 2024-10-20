import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [pontos,setPontos] = useState({
        pontoname: "",
        pontoid: "",
    });
    const navigate = useNavigate()
    const location = useLocation()

    const pontoId = location.pathname.split("/")[2];

    const handleChange = (e) =>{
        setPontos(prev=>({...prev,[e.target.name]: e.target.value}));
    };
    
const handleClick = async e =>{
    e.preventDefault()
    try{
        await axios.put("http://localhost:8000/ponto/" + pontoId, pontos)
        navigate("/")
    }catch(err){
        console.log(err)
    }
}

    console.log(pontos)
    return (
        <div className='form'>
            <h1>Update New Ponto</h1>
            <input type="text" placeholder='pontoname' onChange={handleChange} name="pontoname"/>
            <input type="text" placeholder='pontoid' onChange={handleChange} name="pontoid"/>
            <button onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update