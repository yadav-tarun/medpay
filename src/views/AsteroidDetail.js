import React, {useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { API_KEY, BASE_URL } from "../constants/constant";
import { Button, Row, Col, Card} from 'react-bootstrap';

const AsteroidDetail = () => {
    let { id } = useParams();
    let navigate = useNavigate();

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
        <Row className="m-3">
            <Card className="shadow p-3">
                <div className="d-flex" style={{justifyContent:'space-between', alignItems:'baseline'}}>
                        <h3 className="text-center mb-4">Asteroid Detail: {id}</h3>
                        <Button style={{outline:'none',boxShadow:'none'}} variant="light" onClick={()=>navigate('/')}>Go Back</Button>
                </div>
                <p>Name: {asteroidData.name}</p>
                <p>Name Ltd: {asteroidData.name_limited}</p>
                <p>Absolute Magnitude H: {asteroidData.absolute_magnitude_h}</p>
                <p>Designation: {asteroidData.designation}</p>
                <p>Hazardous: {asteroidData.is_potentially_hazardous_asteroid ? "True" : "False"}</p>
                <p>Sentry: {asteroidData.is_sentry_object ? "True" : "False"}</p>
                <p>jpl_url: {asteroidData.nasa_jpl_url}</p>
                <p>RefId: {asteroidData.neo_reference_id}</p>
                <h2>Close Approach Data : Only first 5</h2>
                {
                    asteroidData.close_approach_data?.map((x,i)=>{
                        if(i >= 5) {
                            return;
                        }
                        return (
                            <p key={x.id}>Approach Date: {x.close_approach_date} | Orbiting Body: {x.orbiting_body} | Relative Velocity(km): {x.relative_velocity.kilometers_per_hour} | Miss Distance(km): {x.miss_distance.kilometers}</p>
                        )
                    })
                }
                <h2>Estimated Diameter (km)</h2>
                <p>Min. {asteroidData.estimated_diameter?.kilometers?.estimated_diameter_min}</p>
                <p>Max. {asteroidData.estimated_diameter?.kilometers?.estimated_diameter_max}</p>
                <h2>Orbital Data</h2>
                <p>Description: {asteroidData.orbital_data?.orbit_class?.orbit_class_description}</p>
                <p>Range: {asteroidData.orbital_data?.orbit_class?.orbit_class_range}</p>
                <p>Type: {asteroidData.orbital_data?.orbit_class?.orbit_class_type}</p>
            </Card>
        </Row>
        </>
    )
}

export default AsteroidDetail;