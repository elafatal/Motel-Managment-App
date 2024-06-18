import React, { useEffect, useState } from "react";
import axios from 'axios';
import './adminRooms.css';

const AdminAllRoomsPage = ({ result=0 }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null); 
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/room/get_all_rooms'); 
        setRooms(response.data);
        setLoading(false);
        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);


  useEffect(() => {
    const fetchRoomById = async (result) => {
      setSelectedRoom(rooms[result-1]); // Set the selected room
    };
    if (result !== 0) {
      fetchRoomById(result);
    } 
  }, [result]); 
  
  const handleRowClick = () => {
    setSelectedRoom(rooms[result-1]); // Set the selected room
  };

  const handleViewAllClick = () => {
    setSelectedRoom(null); // Reset to show all rooms
  };

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm round-5">
        <div className="card-header bg-light text-dark">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Rooms</h5>
            {selectedRoom && (
              <button className="btn btn-outline-success" onClick={handleViewAllClick}>
                View All
              </button>
            )}
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="bg-light">
                <tr>
                  <th className="text-white" scope="col">Room ID</th>
                  <th className="text-white" scope="col">Room Type</th>
                  <th className="text-white" scope="col">Bed Count</th>
                  <th className="text-white" scope="col">Price</th>
                  <th className="text-white" scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedRoom ? (
                  <tr className="bg-white">
                    <td className="align-middle">{selectedRoom.id}</td>
                    <td className="align-middle">VIP</td>
                    <td className="align-middle">{selectedRoom.bed_number}</td>
                    <td className="align-middle">{Number(selectedRoom.price).toLocaleString()} IRR</td>
                    <td className="align-middle">{selectedRoom.is_taken === false ? "not taken" : "taken"}</td>
                  </tr>
                ) : (
                  rooms.map((room, index) => (
                    <tr key={index} className="bg-white" onClick={() => handleRowClick()}>
                      <td className="align-middle">{room.id}</td>
                      <td className="align-middle">VIP</td>
                      <td className="align-middle">{room.bed_number}</td>
                      <td className="align-middle">{Number(room.price).toLocaleString()} IRR</td>
                      <td className="align-middle">{room.is_taken === false ? "not taken" : "taken"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllRoomsPage;
