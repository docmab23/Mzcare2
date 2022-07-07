import React from 'react' ;
import FHIR from "fhirclient";

export const Launch = () => {
    FHIR.oauth2.authorize({
        "client_id": "fb4b10fe-6867-4438-8d8d-58e474f61e57",
        "scope": "'PATIENT.READ,OBSERVATION.READ",
        'redirect_uri': 'https://localhost:3000/home'
    });
  return (
    <h1> I am launch </h1>
  )
}


export default Launch;