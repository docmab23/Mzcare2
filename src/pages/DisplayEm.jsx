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
  useIonViewDidEnter,
} from "@ionic/react";

import React, { useState } from "react";
import FormTopBar from "../components/FormTopBar";
import { toast } from "../toast";
import { useDatabase } from "../contexts/DatabaseContext";
import { errors, hideTabBar } from "../utils/Utils";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import Geocode from "react-geocode";

// import "./Em.css";
import General from "./resource-pages/General";

function DisplayEm() {
  var show_ = false;
  useIonViewDidEnter(() => {
    hideTabBar();
  });

  const {
    genJson,
    genList,
    iceList,
    iceJson,
    allergyJson,
    allergyList,
    immunizationJson,
    immunizationList,
    conditionJson,
    conditionList,
  } = useDatabase();

  const [address, setAddress] = useState([]);

  const getLocation = async () => {
    // setLoading(true);

    try {
      const position = await Geolocation.getCurrentPosition();
      // setPosition(position);
      // setLoading(false);
      // setError({ showError: false });
      const lat = position.coords.latitude.toString();
      const long = position.coords.longitude.toString();
      setAddress([lat, long]);
      // alert(typeof lat);
      /* await Geocode.fromLatLng("48.", "2.2922926").then(
                (response) => {
                  const address = response.results[0].formatted_address;
                  alert(address);
                  setAddress(address);
                  
                },
                (error) => {
                  console.error(error);
                }
              );*/
    } catch (e) {
      //setError({ showError: true, message: e.message });
      // setLoading(false);
      toast(e);
    }
  };

  // const pos_ = getLocation();

  async function Send_Sms(number, pos_) {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `http://mzcare2.herokuapp.com/api/messages?to="${number}"&body="There's an emergency at:"${pos_}""`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async function Sms_Ice() {
    iceList.map((item, pos) => {
      const phone_no = iceJson[item]["number"];
      // getLocation();
      getLocation().then(Send_Sms(phone_no, address));
      // alert(address);

      // console.log(position);
    });
  }

  if (iceList.length != 0) {
    Sms_Ice();
  }

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
                        Contact Name:
                      </IonText>
                      <div>{iceJson[item]["name"]}</div>
                    </IonCol>
                    <IonCol>
                      <IonText color="primary" font="bold">
                        Contact No:
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
                    <IonText color="primary">Source:</IonText>
                    {allergyJson[item]["allergyName"]}
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
}

export default DisplayEm;
