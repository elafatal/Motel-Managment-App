import React, { useState } from "react";
import TextInput from "./TextInput";
import axios from 'axios';

const INPUTS = [
  { label: "first name", placeholder: "first name", name: "first_name", className: "col-12 col-md-12" },
  { label: "last name", placeholder: "last name", name: "last_name", className: "col-12 col-md-12" },
  { label: "check in", placeholder: "check in", name: "check_in", className: "col-12 col-md-12" ,type: "date" },
  { label: "check out", placeholder: "check out", name: "check_out", className: "col-12 col-md-12",type: "date" },
  { label: "phone number", placeholder: "phone number", name: "email", className: "col-12 col-md-12" },
  { label: "National Code", placeholder: "National Code", name: "meli_code", className: "col-12 col-md-12" },
];

const ReserveForm = ({id}) => {
  const [showform, setShowform] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    room_id: id,
    check_in: "2024-06-15T23:05:26.078Z",
    check_out: "2024-06-15T23:05:26.078Z",
    first_name: "",
    last_name: "",
    email: "",
    meli_code: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear errors when input is corrected
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) {
      newErrors.first_name = "First name is required.";
    }
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required.";
    }
    if (!formData.check_in) {
      newErrors.check_in = "check in is required.";
    }
    if (!formData.check_out) {
      newErrors.check_out = "check out is required.";
    }
    if (!/^\d{11}$/.test(formData.email)) {
      newErrors.email = "Phone number must be a 10-digit number.";
    }
    return newErrors;
  };

  const handleClick = async () => {

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop if there are validation errors
    }
    setShowform(false);
    try {
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/reservations/',
        data: formData
      });
      if (response.status === 200) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      } else {
        setShowAlert(false);
      }
    } catch (error) {
      console.log('Reservation failed:', error);
    }
  };

  return (
    <div className="container py-4 col-md-8">
      {showAlert ? (
        <div className="alert alert-success" role="alert">
          Room reserved
        </div>
      ) : null}

      {showform ? (
        <>
          <h1 className="text-center mb-4">Reserve Form</h1>
          <div className="card round-5">
            <form className="card-body row g-3">
              {INPUTS.map((input) => (
                <div key={input.name} className={input.className}>
                  <TextInput {...input} value={formData[input.name]} onChange={handleChange} />
                  {errors[input.name] && (
                    <div className="text-danger">{errors[input.name]}</div>
                  )}
                </div>
              ))}
              <div className="col-12 text-center mt-3">
                <button type="button" className="btn b w-50 w-md-auto" onClick={handleClick}>
                  Reserve Room
                </button>
              </div>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ReserveForm;
