import React, {useState, useEffect} from "react";
import { API_KEY, BASE_URL } from "../constants/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import TableView from "./TableView";
import { fetchGET } from "../helper";

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

    const [asteroids, setAsteroids] = useState([]);
    const [asteroidsByDate, setAsteroidsByDate] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isDefault, setIsDefault] = useState(true);
    const [isFilterEnabled, setIsFilterEnabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [dateError, setDateError] = useState("");

    const getAllData = async() => {
        const allAsteroidData =  await fetchGET(`${BASE_URL}/neo/browse?api_key=${API_KEY}&size=10`);
        if(allAsteroidData) setAsteroids(allAsteroidData?.near_earth_objects);
    }

    const getDataByDate = async() => {
        setErrorMessage("");
        setDateError("");
        if(startDate >= endDate){
            setDateError("end date should be greater than start date");
            return;
        }
        const allAsteroidDataByDate = await fetchGET(`${BASE_URL}/feed?&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}&api_key=${API_KEY}&size=10`);
        setIsDefault(false);
        setIsFilterEnabled(false);
        if(allAsteroidDataByDate) setAsteroidsByDate(allAsteroidDataByDate.near_earth_objects);
        if(allAsteroidDataByDate.hasOwnProperty("http_error")) setErrorMessage(allAsteroidDataByDate.error_message)
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
                                <Button style={{outline:'none',boxShadow:'none'}} variant={isFilterEnabled ? "success" : "primary"} onClick={()=>setIsFilterEnabled(!isFilterEnabled)}>
                                    {isFilterEnabled ? "Remove Filter" : "Filter by Date"}
                                </Button>
                            </div>

                            {
                                isFilterEnabled &&
                                <div className="mt-2 mb-5">
                                    <Row className="mx-1 mx-md-5">
                                    <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="fw-bold">Start Date</Form.Label>
                                        <DatePicker className="form-control" selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => {setStartDate(date); setDateError("")}} />
                                    </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="fw-bold">End Date</Form.Label>
                                        <DatePicker className="form-control" selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => {setEndDate(date); setDateError("")}} />
                                    </Form.Group>
                                    </Col>
                                    </Row>
                                    {
                                        dateError &&
                                        <p style={{color:'red', textAlign:'center'}}>{dateError}</p>
                                    }       
                                    <div className="text-center">
                                        <Button variant="primary" onClick={getDataByDate}>Submit</Button>
                                    </div>
                                </div>
                            }
                            <TableView tableData={asteroids} isFilterEnabled={isFilterEnabled} />
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
                        <Button style={{outline:'none',boxShadow:'none'}} variant="outline-primary" onClick={()=> {setIsDefault(!isDefault); setIsFilterEnabled(false)}}>Load Default Data</Button>
                </div>
                { errorMessage &&
                    <Alert variant="danger">
                        {errorMessage}
                    </Alert>
                }

                {asteroidsByDate &&
                    Object.keys(asteroidsByDate).map(item => {
                        //console.log("date", item);
                        return (
                            <div key={item}>
                            <p className="fw-bold mt-3">{item}</p>
                            <TableView tableData={asteroidsByDate[item]} isFilterEnabled={isFilterEnabled} />
                            </div>
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