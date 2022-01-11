import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { API_KEY, BASE_URL } from "../constants/constant";

const AsteroidDetail = () => {
    let { id } = useParams();

    const [asteroidData, setAsteroidData] = useState({});

    useEffect(()=>{
        getAsteroidDataById(id);
    },[id]);

    const getAsteroidDataById = async(id) => {
        const response = await fetch(`${BASE_URL}/neo/${id}?api_key=${API_KEY}`);
        const result = await response.json();
        console.log("asdatasingle", result);
        setAsteroidData(result);
    }

    return(
        <>
        <p>Detail for asteroid id: {id}</p>
        <p>Asteroid name: {asteroidData?.name}</p>
        </>
    )
}

export default AsteroidDetail;