import React, {useState, useEffect} from "react";
import { API_KEY, BASE_URL } from "../constants/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const formatDate = (dateObj) => {
	let date = new Date(dateObj);
    let month = date.getMonth() + 1;
    if(month < 10) {
        month = '0' + month;
    }
	return date.getFullYear() + '-' + month + '-' + date.getDate();
}

const AsteroidList = () => {

    let navigate = useNavigate();

    const [asteroids, setAsteroids] = useState([]);
    const [asteroidsByDate, setAsteroidsByDate] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isDefault, setIsDefault] = useState(true);

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
                <p>Asteroids List page</p>
                <DatePicker selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date) => setStartDate(date)} />
                <DatePicker selected={endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setEndDate(date)} />
                <button onClick={getDataByDate}>ok</button>
                {
                    asteroids && asteroids?.map(x=>{
                        return (
                            <p key={x.id} style={{cursor:'pointer'}} onClick={() => showDetail(x.id)}>{x.name}</p>
                        )
                    })
                }
                </>
            ) :
            (
                <>
                <p>Asteroids List page by date</p>
                {asteroidsByDate &&
                    Object.keys(asteroidsByDate).map(item => {
                        return (
                            asteroidsByDate[item]?.map(x=>{
                                return (
                                    <p key={x.id} style={{cursor:'pointer'}} onClick={() => showDetail(x.id)}>{x.name}</p>
                                )
                            })
                        )
                    })
                }
                </>
            )
        }
        </>
    )
}

export default AsteroidList;