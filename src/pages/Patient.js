import React from "react";

import PatientRegister from '../components/Patient/Registration';
import PatientLogin from "../components/Patient/Login";

function Patient() {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-6">
                    <PatientRegister />
                </div>
                <div className="col-6">
                    <PatientLogin />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Patient;