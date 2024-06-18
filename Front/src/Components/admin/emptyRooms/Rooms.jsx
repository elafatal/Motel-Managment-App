import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomCard from './RoomCards';
import axios from 'axios';



const Room= ({result}) => {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showButton,setShowButton]=useState(false)
  const fetchRooms = async () => {
    setShowButton(false)
    try {
      const response = await axios.get('http://127.0.0.1:8000/room/get_notreserved_rooms'); 
      setRooms(response.data); 
      setLoading(false); 
      if (response.status === 200) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false); 
    }
  };
  useEffect(() => {

    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchRoomById = async (number) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/room/get_rooms_by_bednumber/{number}?bed_num=${number}`, {
          headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
        });
        if (response.status === 200) {
          setShowButton(true);
        } 
        setRooms(response.data)
      } catch (error) {
        setError(error.message);
      }
    };

    if (result !== 0) {
      fetchRoomById(result);
    }
  }, [result]); // React to changes in result prop

  const handleClick =() =>{
    fetchRooms()
    
  }

  return (
    <div className="container col-md-10 my-4">
      {showButton === true ?  <button className="btn btn-outline-success" onClick={handleClick}>
                View All
              </button> :null}
     
      {loading==true ? (<h1 className='my-5 room-title fw-bold'>Empty Rooms</h1>) : <h1 className='my-5 room-title'>All rooms are already booked.</h1>}
      {rooms.map((room, index) => (
        <RoomCard key={index} room={room} />
      ))}
    </div>
  );
};

export default Room;

