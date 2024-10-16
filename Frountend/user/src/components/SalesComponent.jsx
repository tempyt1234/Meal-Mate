import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Button, ButtonGroup } from 'react-bootstrap';
import './SalesComponent.css';
const SalesComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('all');

    const fetchData = (category) => {
        setLoading(true);
        setError(null);
        axios.get(`http://localhost:9090/mealmate-user/user-sales?category=${category}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('There was an error fetching the data!');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData(category);
    }, [category]);

    if (loading) {
        return <Spinner animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
        </Spinner>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div className="sales-component">
            <h2>User Sales Report</h2>
            <ButtonGroup className="mb-3">
                <Button variant="primary" onClick={() => setCategory('active')}>Active</Button>
                <Button variant="primary" onClick={() => setCategory('expired')}>Expired</Button>
                <Button variant="primary" onClick={() => setCategory('all')}>All</Button>
            </ButtonGroup>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Total Sales</th>
                        <th>Diet Type</th>
                        <th>Plan Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.userId}>
                            <td>{row.userId}</td>
                            <td>{row.userName}</td>
                            <td>{row.userEmail}</td>
                            <td>{row.totalSales}</td>
                            <td>{row.dietType}</td>
                            <td>{row.planDuration}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default SalesComponent;
