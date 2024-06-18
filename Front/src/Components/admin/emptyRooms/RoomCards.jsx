// RoomCard.js
import React ,  {useState }from 'react';
import './RoomCard.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from './images/2.jpeg';
import ReserveForm from './reserve/reserve';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const [isActive, setIsActive] = useState(false);
  
  const handleReserveClick = () => setIsActive(true)
const renderContent = ()=>{
  return ( <>
    <ReserveForm id={room.id}></ReserveForm>
    </>)
}
  return (
    <div className=" card mb-4 " >
      <div className="d-flex justify-content-center row g-0 ar">
        
        <div className="col-md-12 ">
          <div className="card-body d-flex justify-content-center align-items-center">
            <h5 className="card-title">{room.id}</h5>
            <p className="card-text">Room capacity: <i className="bi bi-people-fill"></i> {room.bed_number}</p>
            <p className="card-text">
              <strong>Price : {room.price} Tomans</strong>
            </p>
            <button className="b btn my-3" onClick={handleReserveClick}>Reserve</button>
          </div>
        </div>
      </div>
      { isActive===true? renderContent() : null}
    </div>
  );
};

export default RoomCard;
