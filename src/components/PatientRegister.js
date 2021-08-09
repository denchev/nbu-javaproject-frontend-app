import { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimePicker from 'react-time-picker';

class PatientRegister extends Component {

    state = {
        doctors: [],
        bookingDate: new Date(),
        bookingTime: null
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
                                <option key={doctor.id} value={doctor.id}>{doctor.firstName} {doctor.lastName} - {doctor.speciality.name}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Date</label>
                    <DatePicker selected={this.state.bookingDate} onChange={(date) => this.setState({
                        bookingDate: date
                    })} />
                </div>

                <div className="mb-3">
                    <label>Time</label>
                    <TimePicker onChange={(time) => this.setState({
                        bookingTime: time
                    })} />
                </div>

                <button type="submit" className="btn btn-primary">Book an appointment</button>
            </form>
        )
    }
}

export default PatientRegister;