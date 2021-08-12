import React, { Component } from "react";

class DoctorLogin extends Component {
    render() {
        return (
            <React.Fragment>
                <h4>Login as doctor</h4>
                <div className="form">
                    <div className="mb-3">
                        <label for="doctorUin" className="form-label">UIN</label>
                        <input type="text" className="form-control" id="doctorUin" />
                    </div>
                    <div className="mb-3">
                        <label for="doctorPassword" className="form-label">Password</label>
                        <input type="text" className="form-control" id="doctorPassword" />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default DoctorLogin;