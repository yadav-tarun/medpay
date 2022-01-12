import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../constants/constant";
import { Button, Row, Col, Card} from 'react-bootstrap';
import { fetchGET } from "../helper";

const AsteroidDetail = () => {
    let { id } = useParams();
    let navigate = useNavigate();

    const [asteroidData, setAsteroidData] = useState({});

    useEffect(()=>{
        getAsteroidDataById(id);
    },[id]);

    const getAsteroidDataById = async(id) => {
        const dataById = await fetchGET(`${BASE_URL}/neo/${id}?api_key=${API_KEY}`);
        if(dataById) setAsteroidData(dataById);
    }

    return(
        <>
        <Row className="m-3">
                <div className="d-flex" style={{justifyContent:'space-between', alignItems:'baseline'}}>
                        <h3 className="text-center mb-4">Asteroid Detail: {id}</h3>
                        <Button style={{outline:'none',boxShadow:'none'}} variant="outline-primary" onClick={()=>navigate('/')}>Go Back</Button>
                </div>
                <Card className="shadow p-3">
                    {/* <h3 className="mb-4">Basic Details</h3> */}
                    <p><span className="fw-bold">Name:</span> {asteroidData.name}</p>
                    <p><span className="fw-bold">Name Ltd:</span> {asteroidData.name_limited ? asteroidData.name_limited : "--"}</p>
                    <p><span className="fw-bold">Absolute Magnitude H:</span> {asteroidData.absolute_magnitude_h}</p>
                    <p><span className="fw-bold">Designation:</span> {asteroidData.designation}</p>
                    <p><span className="fw-bold">Hazardous:</span> {asteroidData.is_potentially_hazardous_asteroid ? "True" : "False"}</p>
                    <p><span className="fw-bold">Sentry:</span> {asteroidData.is_sentry_object ? "True" : "False"}</p>
                    <p><span className="fw-bold">jpl_url:</span> <a href={asteroidData.nasa_jpl_url} target="_blank">{asteroidData.nasa_jpl_url}</a></p>
                    <p><span className="fw-bold">Ref Id:</span> {asteroidData.neo_reference_id}</p>
                </Card>
                <>
                    <Col xs={12} md={6} className="p-0 p-md-1">
                        <Card className="shadow mt-2 p-3">
                        <h3 className="mb-4">Close Approach Data : Only first 3</h3>
                        {
                            asteroidData.close_approach_data?.slice(0,3).map((x,i)=>{
                                return (
                                    <div key={x.id} style={{borderBottom:'1px solid #a8a8a8'}}>
                                        <p><span className="fw-bold">Approach Date:</span> {x.close_approach_date} </p>
                                        <p><span className="fw-bold">Orbiting Body:</span> {x.orbiting_body} </p>
                                        <p><span className="fw-bold">Relative Velocity(KM):</span> {x.relative_velocity.kilometers_per_hour} </p>
                                        <p><span className="fw-bold">Miss Distance(KM)</span> {x.miss_distance.kilometers} </p>
                                    </div>
                                )
                            })
                        }
                        </Card>
                    </Col>
                    <Col xs={12} md={6} className="p-0 p-md-1">
                        <Card className="shadow p-3 mt-2">
                        <div style={{borderBottom:'1px solid #a8a8a8'}}>
                        <h3 className="mb-4">Estimated Diameter (km)</h3>
                        <p><span className="fw-bold">Min.:</span> {asteroidData.estimated_diameter?.kilometers?.estimated_diameter_min}</p>
                        <p><span className="fw-bold">Max.:</span> {asteroidData.estimated_diameter?.kilometers?.estimated_diameter_max}</p>
                        </div>
                        <div style={{borderBottom:'1px solid #a8a8a8'}}>
                        <h3 className="mb-4 mt-2">Estimated Diameter (miles)</h3>
                        <p><span className="fw-bold">Min.:</span> {asteroidData.estimated_diameter?.miles?.estimated_diameter_min}</p>
                        <p><span className="fw-bold">Max.:</span> {asteroidData.estimated_diameter?.miles?.estimated_diameter_max}</p>
                        </div>
                        </Card>
                        <Card className="shadow p-3 mt-2">
                        <h3 className="mb-4">Orbital Data</h3>
                        <p><span className="fw-bold">Data arc:</span> {asteroidData?.orbital_data?.data_arc_in_days} days</p>
                        <p><span className="fw-bold">Description:</span> {asteroidData.orbital_data?.orbit_class?.orbit_class_description}</p>
                        <p><span className="fw-bold">Range:</span> {asteroidData.orbital_data?.orbit_class?.orbit_class_range}</p>
                        <p><span className="fw-bold">Type:</span> {asteroidData.orbital_data?.orbit_class?.orbit_class_type}</p>
                        </Card>
                    </Col>
                </>
        </Row>
        </>
    )
}

export default AsteroidDetail;