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
  IonCardSubtitle,
} from "@ionic/react";

import React, { useState } from "react";
import FormTopBarW from "../components/FormTopBarW";
import { toast } from "../toast";
import { useDatabase } from "../contexts/DatabaseContext";

import "./Em.css";
import General from "./resource-pages/General";

function Em() {
  var show_ = false;

  const {genJson, genList, iceList, iceJson, allergyJson, allergyList, immunizationJson, immunizationList , conditionJson, 
	conditionList} = useDatabase();
  if (genList.length != 0) {
    return (
      <IonPage>
        <IonContent className="ion-padding" color="primary">
			
          <FormTopBarW />
		
		  <IonGrid align="center" color="primary">
			<IonRow>
            <IonText>MzCare Emergency Profile{" "}</IonText>
			</IonRow>
          </IonGrid>
          {"\u00a0\u00a0\u00a0"}
          <h1> {"\u00a0\u00a0\u00a0"}</h1>
          <h1> {"\u00a0\u00a0\u00a0"}</h1>
          
          <IonCard>
            <IonCardContent>
              {genList.map((item, pos) => {
                return (
              
                      <>
                       <IonRow><IonText color="primary">
                          Name {"\u00a0\u00a0"}
                        </IonText>
						<IonText >{genJson[item]["Name"]}</IonText></IonRow>
						<IonRow>
						<IonText color="primary">
                          Age {"\u00a0\u00a0"}
                        </IonText>
						<IonText >{genJson[item]["Age"]}</IonText>
						</IonRow>
						<IonRow>
						<IonText color="primary">
                          Blood Group {"\u00a0\u00a0"}
                        </IonText>
						<IonText >{genJson[item]["Bloodgroup"]}</IonText>
						</IonRow>
						<IonRow>
						<IonText color="primary">
                          Full Address {"\u00a0\u00a0"}
                        </IonText>
						<IonText> {genJson[item]["Str_address"] +
                          ", " +
                          genJson[item]["City"] +
                          ", " +
                          genJson[item]["State"] +
                          ", " +
                          genJson[item]["Zip"]}</IonText>
						  </IonRow>
				
                 </>
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
                          Name  {"\u00a0\u00a0"}
                        </IonText>
                        <div>{iceJson[item]["name"]}</div>
                      </IonCol>
                      <IonCol>
                        <IonText color="primary" font="bold">
                         Contact No {"\u00a0\u00a0"}
                        </IonText>
                        <div>{iceJson[item]["number"]}</div>
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
                      <IonText color="primary">Source {"\u00a0\u00a0"}</IonText>
                      {allergyJson[item]["allergyName"]}
                    </IonRow>
                  </IonGrid>
                );
              })}
            </IonCardContent>
          </IonCard>

          <h2>Immunizations</h2>
          <IonCard>
            <IonCardContent>
              {immunizationList.map((item, pos) => {
                return (
                  <IonGrid key={pos}>
                    <IonRow>
                      {immunizationJson[item]["vaccineName"]}
                    </IonRow>
                  </IonGrid>
                );
              })}
            </IonCardContent>
          </IonCard>

          <h2>Conditions</h2>
          <IonCard>
            <IonCardContent>
              {conditionList.map((item, pos) => {
                return (
                  <IonGrid key={pos}>
                    <IonRow>
                      {conditionJson[item]["conditionName"]}
                    </IonRow>
                  </IonGrid>
                );
              })}
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  } else {
    toast(
      "Please fill your General info first to make your Emergency profile!"
    );

    return <General />;
  }
}

export default Em;
