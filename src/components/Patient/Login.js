import React, { useState } from "react";

function PatientLogin() {

    const [egn, setEgn] = useState("");
    const [password, setPassword] = useState("");

    async function loginForm(event) {
        event.preventDefault();
        
        const result = await fetch('http://localhost:8080/api/v1/patient/auth', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              egn: egn,
              password: password  
            })
        });
    }

    return (
        <React.Fragment>
            <p>Already have an account?</p>
            <form>
            <div className="mb-3">
                <label className="form-label">EGN</label>
                <input type="text" className="form-control" onChange={(event) => setEgn(event.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary" onClick={loginForm}>Login</button>
            </div>
            </form>
        </React.Fragment>
    )    
}

export default PatientLogin;