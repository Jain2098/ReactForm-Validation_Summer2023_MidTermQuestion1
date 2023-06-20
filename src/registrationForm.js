import React, { useState } from "react";

export default function RegistrationForm() {
  // State hooks for storing form values, errors, and validation status
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValidated, setIsValidated] = useState(false);

  // Event handler for input changes
  const changeHandler = (events) => {
    // Update form values state
    setValues({ ...values, ...{ [events.target.name]: events.target.value } });

    // Validation all fields one by one & show Error of Whats Wrong in it.
    if (events.target.name === "name") {
      if (events.target.value.length < 1) {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "Name is Required" }
        });
      } else {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "" }
        });
      }
    }

    if (events.target.name === "email") {
      if (events.target.value.length < 1) {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "Email is Required" }
        });

        // Using Regex to verifying email is entered or not
      } else if (!/\S+@\S+\.\S+/.test(events.target.value)) {
        setErrors({
          ...errors,
          [events.target.name]: "Invalid Email"
        });
      } else {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "" }
        });
      }
    }

    if (events.target.name === "age") {
      if (events.target.value.length < 1) {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "Age is Required" }
        });
      } else if (events.target.value < 18) {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "You Required to atleast 18 Year Old" }
        });
      } else if (isNaN(events.target.value) || events.target.value > 120) {
        setErrors({
          ...errors,
          [events.target.name]: "Invalid Age"
        });
      } else {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "" }
        });
      }
    }

    if (events.target.name === "postalCode") {
      // Regex to remove spaces or dashes
      const finalPostalCode = events.target.value.replace(/[\s-]/g, "");
      if (finalPostalCode.length === 6) {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "" }
        });
      } else {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "Postal Code is InValid" }
        });
      }
    }
    if (events.target.name === "phoneNumber") {
      // Regex to remove spaces or dashes
      const finalNumber = events.target.value.replace(/[\s-]/g, "");
      if (finalNumber.length === 10) {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "" }
        });
      } else {
        setErrors({
          ...errors,
          ...{ [events.target.name]: "PhoneNumber is InValid" }
        });
      }
    }
  };
  // Event handler for clearing form fields
  const clearFieldsHandler = () => {
    // Clear form values, errors, and validation status
    setValues({});
    setErrors({});
    setIsValidated(false);
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          // Prevent form submission if there are errors
          if (
            errors.name === "" &&
            errors.email === "" &&
            errors.age === "" &&
            errors.postalCode === "" &&
            errors.phoneNumber === ""
          ) {
            setIsValidated(true);
            event.preventDefault();
            // Alert Checking Info
            alert(
              `Name: ${values["name"]}\nEmail: ${values["email"]}\nAge: ${values["age"]}\nPhone Number: ${values["phoneNumber"]}\nPostal Code: ${values["postalCode"]}`
            );
          } else {
            setIsValidated(false);
            event.preventDefault();
          }
        }}
      >
        <h2 className="my-3" style={{ textAlign: "center", padding: "5px" }}>
          Registration Form:{" "}
        </h2>
        {/* Form inputs */}
        <div className="d-flex flex-column justify-content-evenly m-2 text-black">
          <div className="row align-items-center my-2">
            <div className="col-sm-2">
              <label className="form-label">Name: </label>
            </div>
            <div className="col-sm-4">
              <input
                name="name"
                className="form-control"
                onChange={changeHandler}
                placeholder="Enter Your Name"
                value={values["name"] || ""}
                required
              />
            </div>
          </div>
          <div className="row align-items-center my-2">
            <div className="col-sm-2">
              <label className="form-label">Email: </label>
            </div>
            <div className="col-sm-4">
              <input
                className="form-control"
                name="email"
                onChange={changeHandler}
                placeholder="email@example.com"
                value={values["email"] || ""}
                required
              />
            </div>
          </div>
          <div className="row align-items-center my-2">
            <div className="col-sm-2">
              <label className="form-label">Age: </label>
            </div>
            <div className="col-sm-4">
              <input
                className="form-control"
                name="age"
                placeholder="example: 24"
                onChange={changeHandler}
                value={values["age"] || ""}
                required
              />
            </div>
          </div>
          <div className="row align-items-center my-2">
            <div className="col-sm-2">
              <label className="form-label">Phone Number: </label>
            </div>
            <div className="col-sm-4">
              <input
                className="form-control"
                name="phoneNumber"
                placeholder="999-999-9999"
                value={values["phoneNumber"] || ""}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="row align-items-center my-2">
            <div className="col-sm-2">
              <label className="form-label">Postal Code: </label>
            </div>
            <div className="col-sm-4">
              <input
                className="form-control"
                name="postalCode"
                onChange={changeHandler}
                placeholder="M9V-4K8"
                value={values["postalCode"] || ""}
                required
              />
            </div>
          </div>
        </div>
        {/* Submit and Clear buttons */}
        <button
          className="btn btn-primary"
          style={{ marginLeft: "20%" }}
          type="submit"
        >
          Submit
        </button>
        <button className="btn btn-primary ms-2" onClick={clearFieldsHandler}>
          Clear
        </button>
      </form>
      {/* Display errors with some CSS */}
      <div style={{ color: "red", marginTop: "10px", paddingLeft: "10px" }}>
        {errors.name && <p style={{ margin: "10px 0" }}>{errors.name}</p>}
        {errors.email && <p style={{ margin: "10px 0" }}>{errors.email}</p>}
        {errors.age && <p style={{ margin: "10px 0" }}>{errors.age}</p>}
        {errors.phoneNumber && (
          <p style={{ margin: "10px 0" }}>{errors.phoneNumber}</p>
        )}
        {errors.postalCode && (
          <p style={{ margin: "10px 0" }}>{errors.postalCode}</p>
        )}
      </div>

      {/* Display registration overview if validated as if isValidated is True then only show Results */}

      {isValidated && (
        <div
          className="conatainer mt-5 text-white text-center py-5"
          style={{ backgroundColor: "black" }}
        >
          <h4 className="" style={{}}>
            User Registration Overview:
          </h4>
          <div
            className="d-flex justify-content-center container custom-width "
            style={{}}
          >
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Name: </li>
              <li className="list-group-item">Email: </li>
              <li className="list-group-item">Age: </li>
              <li className="list-group-item">Phone Number: </li>
              <li className="list-group-item">Postal Code:</li>
            </ul>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{values["name"]}</li>
              <li className="list-group-item">{values["email"]}</li>
              <li className="list-group-item">{values["age"]}</li>
              <li className="list-group-item">{values["phoneNumber"]}</li>
              <li className="list-group-item">{values["postalCode"]}</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
