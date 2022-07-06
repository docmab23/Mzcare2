
import React from 'react';
import FHIR from "fhirclient";



export const Home = () => {
    var myApp = {}

    FHIR.oauth2.ready()
    .then(function(client){ 
      myApp.smart = client
      doRequests()
    })

    async function doRequests(){
        var loincs = [ encodeURIComponent("http://loinc.org|4548-4") ]
        var obs = await fetch(myApp.smart.state.serverUrl+"/Observation?patient="+myApp.smart.patient.id+"&limit=50&code="+loincs.join(","),{
            headers:{  
              "Accept":"application/json+fhir",
              "Authorization":"Bearer "+myApp.smart.state.tokenResponse.access_token
            }
            }).then(function(data){
              return data
          })
    
          var response = await obs.json()
    
          console.log(response)
    }

  return (
    <div>Home</div>
  )
}

export default Home;



