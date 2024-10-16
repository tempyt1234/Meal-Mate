import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Button, ButtonGroup, Pagination } from 'react-bootstrap';
import './MealPlansales.css';
import MealPlansForm from './MealPlansForm';
const MealPlansales = () => {
    const [data, setData] = useState([]);  // All data
    const [currentPageData, setCurrentPageData] = useState([]);  // Data for the current page
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;  // Show 10 users per page
    const fetchData = (category) => {
        setLoading(true);
        setError(null);
        axios.get(`http://localhost:9090/mealmate-admin/user-sales?category=${category}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
                setCurrentPage(1); // Reset to page 1 when new category is selected
            })
            .catch(error => {
                setError('There was an error fetching the data!');
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchData(category);
    }, [category]);
    useEffect(() => {
        if (data.length > 0) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const currentPageData = data.slice(startIndex, startIndex + itemsPerPage);
            setCurrentPageData(currentPageData);
        }
    }, [currentPage, data]);
    if (loading) {
        return <Spinner animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
        </Spinner>;
    }
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="sales-component">
            <h2>User Sales Report</h2>
            <ButtonGroup className="mb-3">
                <Button variant="primary" onClick={() => { setCategory('active'); }}>Active</Button>
                <Button variant="primary" onClick={() => { setCategory('expired'); }}>Expired</Button>
                <Button variant="primary" onClick={() => { setCategory('all'); }}>All</Button>
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
                    {currentPageData.map((row) => (
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
            {/* Pagination Controls */}
            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / itemsPerPage)} />
                <Pagination.Last onClick={() => handlePageChange(Math.ceil(data.length / itemsPerPage))} disabled={currentPage === Math.ceil(data.length / itemsPerPage)} />
            </Pagination>
        </div>
    );
};
export default MealPlansales;