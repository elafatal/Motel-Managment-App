import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./reservedRoom.css"; // Custom CSS for additional styling

export default function OneRoom({
  spanTag,
  first_name,
  last_name,
  check_in,
  check_out,
  email,
  code,
  roomid,
}) {
  return (
    <div className="card wid mb-3">
      <div className="card-body">
        <span className="badge m mb-2">{spanTag}</span>
        <h2 className="card-title">{first_name} {last_name}</h2>
        <p className="card-text">{check_in} <br/> {check_out}</p>
      </div>
      <div className="card-footer d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-3 mb-md-0 text-center text-md-start">
        <label className="form-label fw-bold">Phone Number</label>
          <p className="mb-1">{email}</p>
          
        </div>
        <div className="mb-3 mb-md-0 text-center text-md-start">
        <label className="form-label fw-bold">Room ID</label>
          <p className="mb-1">{roomid}</p>
          
        </div>
        <div className="text-center text-md-start">
          <label className="form-label fw-bold">National Code</label>
          <p className="mb-1">{code}</p>
          
        </div>
      </div>
    </div>
  );
}
