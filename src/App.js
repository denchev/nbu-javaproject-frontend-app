import './App.css';

import PatientLogin from './components/PatientLogin';
import DoctorLogin from './components/DoctorLogin';
import PatientRegister from './components/PatientRegister';

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
      <div class="row">
        <div class="col-6">
        <Link to="/patient/login" className="btn btn-primary">Login as patient</Link>
        <Link to="/patient/book" className="btn btn-info">Book an appointment</Link>
        </div>
        <div class="col-6">
        <Link to="/doctor-login" className="btn btn-primary">Login as doctor</Link>
        </div>
      </div>
      
      
    </div>

    <Switch>
      <Route path="/patient/login">
        <PatientLogin />
      </Route>
      <Route path="/patient/book">
        <PatientRegister />
      </Route>
      <Route path="/doctor-login">
        <DoctorLogin />
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
