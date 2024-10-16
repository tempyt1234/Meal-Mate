// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './UserTable.css';
// const UserTable = () => {
//   const [users, setUsers] = useState([]);
//   const [category, setCategory] = useState('all');
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9090/mealmate-user/usersList?category=${category}`);
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, [category]);
//   const handleCategoryChange = (category) => {
//     setCategory(category);
//   };
//   return (
//     <div>
//       <h1>User's Table</h1>
//       <div>
//         <button onClick={() => handleCategoryChange('all')} className={category === 'all' ? 'active' : ''}>All Users</button>
//         <button onClick={() => handleCategoryChange('subscribed')} className={category === 'subscribed' ? 'active' : ''}>Active Users</button>
//         <button onClick={() => handleCategoryChange('unsubscribed')} className={category === 'unsubscribed' ? 'active' : ''}>Guest Users</button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Name</th>
//             <th>Email ID</th>
//             <th>Delivery Address</th>
//             <th>Phone</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.userId}>
//               <td>{user.userId}</td>
//               <td>{user.name}</td>
//               <td>{user.emailId}</td>
//               <td>{user.deliveryAddress}</td>
//               <td>{user.phone}</td>
              
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default UserTable;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserTable.css';
import { Form, FormControl,Button } from 'react-bootstrap';
const UserTable = () => {
  const [allUsers, setAllUsers] = useState([]);  // Store all users fetched from the backend
  const [currentPage, setCurrentPage] = useState(1);  // Tracks the current page
  const [category, setCategory] = useState('all');  // Tracks the user category
  const [searchTerm, setSearchTerm] = useState('');  // Search term for filtering
  const usersPerPage = 10;  // Number of users to display per page
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/mealmate-admin/usersList?category=${category}`);
        setAllUsers(response.data);  // Fetch all users at once
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [category]);
  const handleCategoryChange = (category) => {
    setCategory(category);
    setCurrentPage(1);  // Reset to the first page when category changes
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);  // Reset to the first page when searching
  };
  // Filter users based on the search term (by username or email)
  const filteredUsers = allUsers.filter(user => 
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.emailId?.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  // Logic for displaying users based on the current page and filtered results
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <h1>User's Table</h1>
      
      {/* Search Bar */}
      {/* <input
        type="text"
        placeholder="Search by username or email"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      /> */}
<Form className="d-flex mb-3" style={{ width: '500px', float:'right' }}>
  <FormControl
    type="search"
    placeholder="Search by username or email"
    className="me-2"
    value={searchTerm}
    onChange={handleSearchChange}
    size="sm"  
  />
  <Button >Search</Button>  {/* Makes the button smaller */}
</Form>
      {/* Category Buttons */}
      <div>
        <button onClick={() => handleCategoryChange('all')} className={category === 'all' ? 'active' : ''}>All Users</button>
        <button onClick={() => handleCategoryChange('subscribed')} className={category === 'subscribed' ? 'active' : ''}>Active Users</button>
        <button onClick={() => handleCategoryChange('unsubscribed')} className={category === 'unsubscribed' ? 'active' : ''}>Guest Users</button>
      </div>
      
      {/* Users Table */}
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email ID</th>
            <th>Delivery Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.emailId}</td>
              <td>{user.deliveryAddress}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
export default UserTable;