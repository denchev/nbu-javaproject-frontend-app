import React, { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PatientRegister extends Component {

    state = {
        showConfirmationAlert: false,
        showErrorAlert: false,
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
                date: JSON.stringify(this.state.bookingDate).split('T')[0].replace('"', '') + ' ' + this.state.bookingTime + ':00',
                doctor: this.state.doctorId
            }
        });

        try {
            const result = await fetch('http://localhost:8080/api/v1/appointments/book', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: body
            }).catch(error => {
                console.log(error);
            });

            const json = await result.json();

            if (json.id) {
                this.setState({
                    showConfirmationAlert: true,
                    showErrorAlert: false
                })
            }
        } catch(e) {
            this.setState({
                showErrorAlert: true,
                showConfirmationAlert: false
            })
        }
    }

    render() {
        return (
            <form method="post">
                <div className={(this.state.showConfirmationAlert === false ? 'd-none' : '' ) + ' alert alert-success'}>Your reservation is confirmed.</div>
                <div className={(this.state.showErrorAlert === false ? 'd-none' : '' ) + ' alert alert-danger'}>There is an issue with your appointmenet. Please try again later.</div>
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
                    <DatePicker dateFormat="dd/MM/yyyy" selected={this.state.bookingDate} onChange={(date) => this.setState({
                        bookingDate: date
                    })} />
                </div>

                <div className="mb-3">
                    <label>Time</label>
                    <select className="form-select" onChange={(event) => {
                        this.setState({
                            bookingTime: event.target.value
                        })
                    }}>
                        <option>---</option>
                        {(function () {
                            const timeSlots = [];
                            for(let i = 8; i <= 19; i++) {
                                timeSlots.push(i);
                            }
                            return timeSlots;
                        })().map(availableTime => {
                            return (
                                <React.Fragment key={availableTime}>
                                    <option value={availableTime + ":00"}>{availableTime + ":00"}</option>
                                    <option value={availableTime + ":30"}>{availableTime + ":30"}</option>
                                </React.Fragment>
                            )
                        })};
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" onClick={this.bookAppointment}>Book an appointment</button>
            </form>
        )
    }
}

export default PatientRegister;