import React, { useState } from "react";

function PatientRegister() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [egn, setEgn] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(false);

    async function submitForm(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:8080/api/v1/patient/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                egn: egn,
                firstName: firstName,
                lastName: lastName,
                password: password
            })
        });

        const json = await response.json();

        if (json.Status === 'OK') {
            setStatus(true);
        }
    }

    return (
        <React.Fragment>
           <p>Please fill this form to register before booking an appointmenet</p>
            <div className={(status? 'd-block' : 'd-none') + ' alert alert-success'}>Your registration was successfull.</div>
                <form>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" onChange={(event) => {setFirstName(event.target.value)}} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" onChange={(event) => {setLastName(event.target.value)}} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">EGN</label>
                        <input type="text" className="form-control" onChange={(event) => setEgn(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary" onClick={submitForm}>Register</button>
                    </div>
                </form>
        </React.Fragment>
    )    
}

export default PatientRegister;