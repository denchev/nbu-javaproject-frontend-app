import { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimePicker from 'react-time-picker';

class PatientRegister extends Component {

    state = {
        patient: {
            firstName: "",
            lastName: "",
            egn: "",
            isInsured: false
        },
        doctorId: null,
        doctors: [],
        bookingDate: new Date(),
        bookingTime: null
    }

    constructor(props) {
        super(props);

        this.bookAppointment = this.bookAppointment.bind(this);
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

    async bookAppointment(event) {
        event.preventDefault();

        const body = JSON.stringify({
            patient: this.state.patient,
            appointment: {
                date: this.state.bookingDate,
                time: this.state.bookingTime,
                doctor: this.state.doctorId
            }
        })

        const result = await fetch('http://localhost:8080/api/v1/appointments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: body
        });
    }

    render() {
        return (
            <form method="post">
                <div className="mb-3">
                    <label className="form-label">First name</label>
                    <input type="text" className="form-control" name="firstName" onChange={(event) => {
                        const patient = {...this.state.patient};
                        patient.firstName = event.target.value;
                        this.setState({
                            patient: patient
                        })
                    }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Last name</label>
                    <input type="text" className="form-control" name="lastName" onChange={(event) => {
                        const patient = {...this.state.patient};
                        patient.lastName = event.target.value;
                        this.setState({
                            patient: patient
                        })
                    }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">EGN</label>
                    <input type="text" className="form-control" name="egn" onChange={(event) => {
                        const patient = {...this.state.patient};
                        patient.egn = event.target.value;
                        this.setState({
                            patient: patient
                        })
                    }} />
                </div>

                <div className="form-check">
                    <label className="form-check-label" htmlFor="patient-isInsured">Are you insured?</label>
                    <input type="checkbox" className="form-check-input" name="isInsured" id="patient-isInsured" onChange={(event) => {
                        const patient = {...this.state.patient};
                        patient.isInsured = event.target.checked;
                        this.setState({
                            patient: patient
                        })
                    }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Doctor</label>
                    <select className="form-select" onChange={(event) => {
                        this.setState({
                            doctorId: event.target.value
                        })
                    }}>
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

                <button type="submit" className="btn btn-primary" onClick={this.bookAppointment}>Book an appointment</button>
            </form>
        )
    }
}

export default PatientRegister;