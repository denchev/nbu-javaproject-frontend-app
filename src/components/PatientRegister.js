import { Component } from "react";

class PatientRegister extends Component {

    state = {
        doctors: []
    }

    constructor() {
        super();
    }

    async componentDidMount() {
        const result = await fetch('http://localhost:8080/api/v1/doctors', {
            headers: {
                'content-type': 'application/json'
            }
        });
        const json = await result.json();
        this.setState({
            doctors: json
        })
    }

    render() {
        return (
            <form method="post">
                <div className="mb-3">
                    <label className="form-label">First name</label>
                    <input type="text" className="form-control" name="firstName" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Last name</label>
                    <input type="text" className="form-control" name="lastName" />
                </div>

                <div className="mb-3">
                    <label className="form-label">EGN</label>
                    <input type="text" className="form-control" name="egn" />
                </div>

                <div className="form-check">
                    <label className="form-check-label" htmlFor="patient-isInsured">Are you insured?</label>
                    <input type="checkbox" className="form-check-input" name="isInsured" id="patient-isInsured" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Doctor</label>
                    <select className="form-select">
                        <option>Select an available doctor</option>
                        {this.state.doctors.map(doctor => {
                            return (
                                <option value={doctor.id}>{doctor.firstName} {doctor.lastName} - {doctor.speciality.name}</option>
                            )
                        })}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Book an appointment</button>
            </form>
        )
    }
}

export default PatientRegister;