import './App.css';

import PatientLogin from './components/PatientLogin';
import DoctorLogin from './components/DoctorLogin';

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
      <Link to="/patient-login">Login as patient</Link>
      <Link to="/doctor-login">Login as doctor</Link>
    </div>

    <Switch>
      <Route path="/patient-login">
        <PatientLogin />
      </Route>
      <Route path="/doctor-login">
        <DoctorLogin />
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
