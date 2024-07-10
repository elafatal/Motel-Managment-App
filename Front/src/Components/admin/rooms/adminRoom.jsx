import React, { useEffect, useState } from "react";
import axios from 'axios';
import './adminRooms.css';

const AdminAllRoomsPage = ({ result=0  , token}) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [showAlert, setShowAlert] = useState(false)
  
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
    const fetchRoomById = (result) => {
      const roomIdAsNumber = Number(result); 
      const room = rooms.find((room) => String(room.id) === String(roomIdAsNumber));
      if (room) {
        console.log(room);
        setSelectedRoom(room);
      } else {
        console.log("Room not found");
        setSelectedRoom(null); 
      }
      
    };

    if (result !== 0 && rooms.length > 0) {
      fetchRoomById(result);
      
    }
  }, [result, rooms]);
  
  const handleRowClick = (room) => {
    setSelectedRoom(room); // Set the selected room
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

  const handleDelete = async (room) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/admin/room/delete_room/${room.id}`, {
        headers: {  
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status===200) {
        setSelectedRoom(null)
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
        try {
          const response = await axios.get('http://127.0.0.1:8000/room/get_all_rooms'); 
          setRooms(response.data);
          setLoading(false);
          
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }else {
        setShowAlert(false);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="container mt-5">
      {showAlert?
            (<div className="alert alert-danger" role="alert" >
                Selected Room Deleted !
              </div>) 
              : null}
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
                  <th className="text-white" scope="col">Bed Count</th>
                  <th className="text-white" scope="col">Price</th>
                  <th className="text-white" scope="col">Status</th>
                  <th className="text-white" scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {selectedRoom ? (
                  <tr className="bg-white">
                    <td className="align-middle">{selectedRoom.id}</td>
                    <td className="align-middle">{selectedRoom.bed_number}</td>
                    <td className="align-middle">{Number(selectedRoom.price).toLocaleString()} IRR</td>
                    <td className="align-middle">{selectedRoom.is_taken === false ? "not taken" : "taken"}</td>
                    <td className="align-middle"> <button className="btn btn-outline-danger" onClick={()=>handleDelete(selectedRoom)}>  Delete Room</button>  </td>

                  </tr>
                ) : (
                  rooms.map((room, index) => (
                    <tr key={index} className="bg-white" onClick={() => handleRowClick(room)}>
                      <td className="align-middle">{room.id}</td>
                      <td className="align-middle">{room.bed_number}</td>
                      <td className="align-middle">{Number(room.price).toLocaleString()} IRR</td>
                      <td className="align-middle">{room.is_taken === false ? "not taken" : "taken"}</td>
                      <td className="align-middle"> <button className="btn btn-outline-danger" onClick={()=>handleDelete(room)}>  Delete Room</button>  </td>
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
