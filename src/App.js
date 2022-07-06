import logo from './logo.svg';
import './App.css';
import FHIR from "fhirclient";
import { BrowserRouter as Router, Switch, Route, Link } from 'react';



function App() {
  

  return (
    
    <div className="App">
     <a href={'launch?iss=https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4&aud='}>Google</a>
    </div>
    
  );
}

export default App;
