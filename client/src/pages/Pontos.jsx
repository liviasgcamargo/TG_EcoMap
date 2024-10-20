import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Pontos = () => {

    const [pontos,setPontos] = useState([])

    useEffect(()=>{
        const fecthAllPontos = async ()=>{
            try{
                const res = await axios.get("http://localhost:8000/ponto")
                setPontos(res.data);
                //console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fecthAllPontos()
    },[]);

    const handleDelete = async (pontoid)=>{
        try{
            await axios.delete("http://localhost:8000/ponto/"+pontoid)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <h1>Pontos de Coleta</h1>
            <div className="pontos">
                {pontos.map(pontos=>(
                    <div className="ponto" key={pontos.pontoid}>
                        <h2>{pontos.pontoname}</h2>
                        <p>{pontos.pontoid}</p>
                        <button className="delete" onClick={()=>handleDelete(pontos.pontoid)}>Delete</button>
                        <button className="update"><Link to={`/update/${pontos.pontoid}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add new Ponto</Link></button>
        </div>
    );
};

export default Pontos