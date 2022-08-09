import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLoading,
  IonText,
  IonLabel,
  IonItem,
  IonFooter,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonRow,
  IonCol,
  IonGrid,
  IonCardContent,
  IonSubTitle,
} from "@ionic/react";

import React, { useState } from "react";
import FormTopBar from "../components/FormTopBar";
import { toast } from "../toast";
import { useDatabase } from "../contexts/DatabaseContext";
<<<<<<< HEAD
//import General from "./resource-pages/General";

  
import "./Em.css" ;
import General from "./resource-pages/General";
=======

import "./Em.css";
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4

function Em() {
  var show_ = false;

<<<<<<< HEAD
	

=======
  const {
    allergyJson,
    allergyList,
    immunizationJson,
    immunizationList,
    genJson,
    genList,
    iceJson,
    iceList,
	conditionJson,
	conditionList,
  } = useDatabase();
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4

  if (allergyList.length != 0) {
    show_ = true;
  }

  console.log(show_);

  if (genList.length != 0) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <FormTopBar />
          {"\u00a0\u00a0\u00a0"}
          <h1> {"\u00a0\u00a0\u00a0"}</h1>
          <h1> {"\u00a0\u00a0\u00a0"}</h1>
          <IonTitle align="center" color="primary">
            MzCare Emergency Profile{" "}
          </IonTitle>
          <IonCard>
            <IonCardContent>
              {genList.map((item, pos) => {
                return (
                  <IonGrid>
                    <IonRow key={pos}>
                      <IonCol>
                        <IonText color="primary">
                          Name: {genJson[item]["Name"]}
                        </IonText>
                      </IonCol>
                      <IonCol>
                        <IonText color="primary">Age</IonText>:{" "}
                        {genJson[item]["Age"]}
                      </IonCol>
                      <IonCol>
                        <IonText color="primary">Blood Group</IonText>:{" "}
                        {genJson[item]["Bloodgroup"]}
                      </IonCol>
                      <IonCol>
                        <IonText color="primary">Full Address</IonText>:{" "}
                        {genJson[item]["Str_address"] +
                          ", " +
                          genJson[item]["City"] +
                          ", " +
                          genJson[item]["State"] +
                          ", " +
                          genJson[item]["Zip"]}
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                );
              })}
            </IonCardContent>
          </IonCard>
          <h2>ICE contacts</h2>
          <IonCard>
            <IonCardContent>
              {iceList.map((item, pos) => {
                return (
                  <IonGrid>
                    <IonRow key={pos}>
                      <IonCol>
                        <IonText color="primary" font="bold">
                         Name:
                        </IonText>
                        <div>
                        {iceJson[item]["name"]}
                        </div>
                      </IonCol>
                      <IonCol>
                        <IonText color="primary" font="bold">
                         Mobile Phone:
                        </IonText>
                        <div>
                        {iceJson[item]["number"]}
                        </div>
                        {/* {iceJson[item]["number"]} */}
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                );
              })}
            </IonCardContent>
          </IonCard>
          <h2>Allergies</h2>
          <IonCard>
            <IonCardContent>
              {allergyList.map((item, pos) => {
                return (
                  <IonGrid key={pos}>
                    <IonRow>
                      <IonText color="primary">Source:</IonText>
                      {allergyJson[item]["allergyName"]}
                    </IonRow>
                  </IonGrid>
                );
              })}
            </IonCardContent>
          </IonCard>

<<<<<<< HEAD

	  if (allergyList.length !=0 ) {

		show_ = true;
	  }


	  console.log(show_);
	

    if (genList.length != 0){
	return (
		<IonPage>
      <IonContent className="ion-padding">
       <FormTopBar/>
        {"\u00a0\u00a0\u00a0"}
		<h1> {"\u00a0\u00a0\u00a0"}</h1>
		<h1> {"\u00a0\u00a0\u00a0"}</h1>
        <IonTitle align="center" color="primary">MzCare Emergency Profile </IonTitle>
		<IonCard>
        
		<IonCardContent>
        {genList.map((item, pos) => {
          return (
            <IonGrid>
				<IonRow  key={pos}>
                 <IonCol><IonText color="primary">Name: {genJson[item]["Name"]}</IonText></IonCol> 
				 <IonCol><IonText color="primary">Age</IonText>: {genJson[item]["Age"]}</IonCol>
				 <IonCol><IonText color="primary">Blood Group</IonText>: {genJson[item]["Bloodgroup"]}</IonCol>
				 <IonCol><IonText color="primary">Full Address</IonText>: {genJson[item]["Str_address"]+", "+genJson[item]["City"]+", "+genJson[item]["State"]+", "+genJson[item]["Zip"]}</IonCol>
				</IonRow>
			</IonGrid>
);
})}
</IonCardContent>
</IonCard>
<h2>ICE contacts</h2>
<IonCard>
<IonCardContent>

{iceList.map((item, pos) => {
          return (   
            <IonGrid>
				<IonRow  key={pos}>
                 <IonCol><IonText color="primary" font="bold">ICE Contact Name</IonText>: {iceJson[item]["name"]}</IonCol> 
				 <IonCol><IonText color="primary" font="bold">Contact No:</IonText>{iceJson[item]["number"]}</IonCol>
				</IonRow>
			</IonGrid>
);
})}
</IonCardContent>
</IonCard>
<h2>Allergies</h2>
<IonCard>
<IonCardContent>
{allergyList.map((item, pos) => {
          return (   
            <IonGrid key={pos}>
				<IonRow>
                 <IonText color="primary">Source:</IonText>{allergyJson[item]["allergyName"]}
				</IonRow>
			</IonGrid>
);
})}
</IonCardContent>
</IonCard>

<h2>Immunizations/Vaccines</h2>
{immunizationList.map((item, pos) => {
          return (   
            <IonGrid>
				<IonRow key={pos}>
                 <IonCol><IonCard><IonCardContent>{immunizationJson[item]["vaccineName"]}</IonCardContent></IonCard></IonCol> 
				</IonRow>
			</IonGrid>
);
})}

</IonContent>
</IonPage>
	);
	}	
else {

	toast("Please fill your General info first to make your Emergency profile!");
	
	return (
		<General/>
	)
}
=======
          <h2>Immunizations</h2>
          {immunizationList.map((item, pos) => {
            return (
              <IonGrid>
                <IonRow key={pos}>
                  <IonCol>
                    <IonCard>
                      <IonCardContent>
                        {immunizationJson[item]["vaccineName"]}
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            );
          })}
		   <h2>Conditions</h2>
          {conditionList.map((item, pos) => {
            return (
              <IonGrid>
                <IonRow key={pos}>
                  <IonCol>
                    <IonCard>
                      <IonCardContent>
                        {conditionJson[item]["conditionName"]}
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            );
          })}
        </IonContent>
      </IonPage>
    );
  } else {
    toast(
      "Please fill your General info first to make your Emergency profile!"
    );
    return (
      <IonPage>
        <IonContent></IonContent>
      </IonPage>
    );
  }
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4
}

export default Em;
