import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './adminUsers.css';
import Card from "./Usercard/Card";


const AdminAllCustomersPage = ({result}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); 
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user/users'); 
        setUsers(response.data);
        setLoading(false);
        console.log(response);
        
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchusers();
  }, []);

  useEffect(() => {
    const fetchUserByMeliCode = () => {
      const foundUser = users.find(user => user.meli_code === result);
      if (foundUser) {
        console.log(foundUser);
        setSelectedUser(foundUser);
      } else {
        console.log('No user found with the specified Meli Code');
        setSelectedUser(null); 
      }
    };
  
    if (result !== 0) {
      fetchUserByMeliCode();
    }
  }, [result]); 
  

  const handleViewAllClick = () => {
    setSelectedUser(null); // Reset to show all rooms
  };


  return (
    <div className="container mt-5">
      <div className="card shadow-sm round-5">
        <div className="card-header bg-light text-dark">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Customers</h5>
            {selectedUser && (
              <button className="btn btn-outline-success" onClick={handleViewAllClick}>
                View All
              </button>
            )}
          </div>
        </div>
        <div className="card-body " >
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="text-white">
                <tr >

                  <th className="text-white" scope="col">Customer ID</th>
                  <th className="text-white" scope="col">Name</th>
                  <th className="text-white" scope="col">Last Name</th>
                  <th className="text-white" scope="col">National Code</th>
                  <th className="text-white" scope="col">Phone Number</th>
                </tr>
              </thead>
              <tbody>
              {selectedUser ? (
                  <tr className="bg-white">
                    <td className="align-middle">{selectedUser.id}</td>
                    <td className="align-middle">{selectedUser.first_name}</td>
                    <td className="align-middle">{selectedUser.last_name}</td>
                    <td className="align-middle">{selectedUser.meli_code}</td>
                    <td className="align-middle">{selectedUser.email}</td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={index} className="bg-white" >
                      <td className="align-middle">{user.id}</td>
                      <td className="align-middle">{user.first_name}</td>
                      <td className="align-middle">{user.last_name}</td>
                      <td className="align-middle">{user.meli_code}</td>
                      <td className="align-middle">{user.email}</td>
                    </tr>
                  ))
                )}
                {  }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllCustomersPage;
