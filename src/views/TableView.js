import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from 'react-bootstrap';


const TableView = (props) => {

    let navigate = useNavigate();

    const showDetail = (id) => {
        navigate(`/detail/${id}`);
    }

    return(
        <>
        {
            <>
            <small style={{color:'#a8a8a8'}}>Click on any of the item below to see more details...</small>
            <Table responsive hover bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Magnitude</th>
                    <th>Is Hazardous</th>
                    <th>jpl url</th>
                    <th>Name Ltd</th>
                    <th>Is sentry</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.tableData && props.tableData?.map(x=>{
                        return (
                            <tr key={x.id} onClick={() => showDetail(x.id)} style={{borderBottom:'1px solid #333', cursor:'pointer'}}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.absolute_magnitude_h}</td>
                                <td>{x.is_potentially_hazardous_asteroid ? "True" : "False"}</td>
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
        }
        </>
    )
}

export default TableView;