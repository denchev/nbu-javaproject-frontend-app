import './App.css';

import DoctorLogin from './components/DoctorLogin';
import PatientBook from './components/PatientBook';
import Patient from './pages/Patient';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <div className="row">
        <div className="col-6">
        <Link to="/patient/book" className="btn btn-info">Book an appointment</Link>
        <Link to="/patient/register" className="btn btn-info">Register as patient</Link>
        </div>
        <div className="col-6">
        <Link to="/doctor/login" className="btn btn-primary">Login as doctor</Link>
        </div>
      </div>
    </div>

    <Switch>
      <Route path="/patient/book">
        <PatientBook />
      </Route>
      <Route path="/patient/register">
        <Patient />
      </Route>
      <Route path="/doctor/login">
        <DoctorLogin />
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
