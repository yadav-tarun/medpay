import React, {useState, useEffect} from "react";
import { API_KEY, BASE_URL } from "../constants/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Card, Table, Form } from 'react-bootstrap';

const formatDate = (dateObj) => {
	let date = new Date(dateObj);
    let month = date.getMonth() + 1;
    let monthDate = date.getDate();
    if(month < 10) {
        month = '0' + month;
    }
    if(monthDate < 10) {
        monthDate = '0' + monthDate;
    }
	return date.getFullYear() + '-' + month + '-' + monthDate;
}

const AsteroidList = () => {

    let navigate = useNavigate();

    const [asteroids, setAsteroids] = useState([]);
    const [asteroidsByDate, setAsteroidsByDate] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isDefault, setIsDefault] = useState(true);
    const [isFilterEnabled, setIsFilterEnabled] = useState(false);

    const getAllData = async() => {
        const response = await fetch(`${BASE_URL}/neo/browse?api_key=${API_KEY}&size=10`);
        const result = await response.json();
        console.log("asdata", result);
        setAsteroids(result?.near_earth_objects);
    }

    const getDataByDate = async() => {
        const response = await fetch(`${BASE_URL}/feed?&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&api_key=${API_KEY}&size=10`);
        const result = await response.json();
        setIsDefault(false);
        setAsteroidsByDate(result.near_earth_objects);
        console.log("asdatabydate", result.near_earth_objects);
    }

    const showDetail = (id) => {
        navigate(`/detail/${id}`);
    }

    useEffect(()=>{
        getAllData();
    },[]);

    return(
        <>
        {
            isDefault ? (
                <>
                    <Row xs={12} className="m-3">
                    <Card className="shadow">
                        <Card.Body>
                            <div className="d-flex" style={{justifyContent:'space-between', alignItems:'baseline'}}>
                                <h3 className="mb-5">List of Asteroids</h3>
                                <Button style={{outline:'none',boxShadow:'none'}} variant={isFilterEnabled ? "success" : "primary"} onClick={()=>setIsFilterEnabled(!isFilterEnabled)}>Filter by Date</Button>
                            </div>

                            {
                                isFilterEnabled &&
                                <div className="mt-2 mb-5">
                                    <Row className="mx-1 mx-md-5">
                                    <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="fw-bold">Start Date</Form.Label>
                                        <DatePicker className="form-control" selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => setStartDate(date)} />
                                    </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="fw-bold">End Date</Form.Label>
                                        <DatePicker className="form-control" selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setEndDate(date)} />
                                    </Form.Group>
                                    </Col>
                                    </Row>       
                                    <div className="text-center">
                                        <Button variant="primary" onClick={getDataByDate}>Submit</Button>
                                    </div>
                                </div>
                            }

                            <Table responsive hover bordered>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Magnitude</th>
                                    <th>Designation</th>
                                    <th>jpl url</th>
                                    <th>Name Ltd</th>
                                    <th>Is sentry</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    asteroids && asteroids?.map(x=>{
                                        return (
                                            <tr key={x.id} style={{borderBottom:'1px solid #333'}}>
                                                <td>{x.id}</td>
                                                <td style={{cursor:'pointer'}} onClick={() => showDetail(x.id)}>{x.name}</td>
                                                <td>{x.absolute_magnitude_h}</td>
                                                <td>{x.designation}</td>
                                                <td>{x.nasa_jpl_url}</td>
                                                <td>{x.name_limited}</td>
                                                <td>{x.is_sentry_object ? "True" : "False"}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    </Row>
                </>
            ) :
            (
                <>
                <Row className="m-2">
                <div className="d-flex" style={{justifyContent:'space-between', alignItems:'baseline'}}>
                        <h3 className="mb-5">List of Asteroids for {formatDate(startDate)} to {formatDate(endDate)}</h3>
                        <Button style={{outline:'none',boxShadow:'none'}} variant="secondary" onClick={()=>setIsDefault(!isDefault)}>Load Default Data</Button>
                </div>

                {asteroidsByDate &&
                    Object.keys(asteroidsByDate).map(item => {
                        return (
                            <>
                            <p className="fw-bold">{item}</p>
                            <Table responsive hover bordered>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Magnitude</th>
                                    <th>Designation</th>
                                    <th>jpl url</th>
                                    <th>Name Ltd</th>
                                    <th>Is sentry</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    asteroidsByDate[item]?.map(x=>{
                                        return (
                                            <tr key={x.id} style={{borderBottom:'1px solid #333'}}>
                                                <td>{x.id}</td>
                                                <td style={{cursor:'pointer'}} onClick={() => showDetail(x.id)}>{x.name}</td>
                                                <td>{x.absolute_magnitude_h}</td>
                                                <td>{x.designation}</td>
                                                <td>{x.nasa_jpl_url}</td>
                                                <td>{x.name_limited}</td>
                                                <td>{x.is_sentry_object ? "True" : "False"}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                            </>
                        )
                    })
                }
                </Row>
                </>
            )
        }
        </>
    )
}

export default AsteroidList;