import React, { useEffect, useState } from "react";
import axios from 'axios';
import OneRoom from "./OneRoom";

const ReservedRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [showButton,setShowButton]=useState(false)
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/reservations');
        console.log(response.data);
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleRowClick = (roomId) => {
    setShowButton(true)
    setRoom(roomId)
    console.log(room)
    setIsActive(true)
  };

  const renderContent = () => {
    return (
      <OneRoom
        spanTag={room.id}
        first_name={room.first_name}
        last_name={room.last_name}
        check_in={formatDate(room.check_in)}
        check_out={formatDate(room.check_out)}
        email={room.email}
        code={room.meli_code}
        roomid={room.room_id}
      />
    )
  }

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleClick =() =>{
  setIsActive(false)
  setShowButton(false)
  }
  return (
    <div className="container mt-5">
      {showButton === true ?  <button className="btn btn-outline-success mb-5" onClick={handleClick}>
                View All
              </button> :null}
      {isActive === true ? renderContent() : <div className="card shadow-sm round-5">
        
        <div className="card-header bg-light text-dark">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Rooms</h5>
            <button className="btn btn-outline-success">View All</button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <div className="text-center">
                <p>Loading...</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <p>Error: {error}</p>
              </div>
            ) : (
              <table className="table table-striped table-hover">
                <thead className="bg-light">
                  <tr>
                    <th className="text-white" scope="col">Room ID</th>
                    <th className="text-white" scope="col">Check in</th>
                    <th className="text-white" scope="col">Check out</th>
                    <th className="text-white" scope="col">Room Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => (
                    <tr key={index} className="bg-white" onClick={() => handleRowClick(room)}>
                      <td className="align-middle">{room.room_id}</td>
                      <td className="align-middle">{formatDate(room.check_in)}</td>
                      <td className="align-middle">{formatDate(room.check_out)}</td>
                      <td className="align-middle">{room.last_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
};

export default ReservedRoom;
