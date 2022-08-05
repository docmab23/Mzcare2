import {
  IonContent,
  IonPage,
  IonButton,
  IonLoading,
  IonItem,
  IonText,
  IonIcon,
  IonTabButton,
  IonTabBar,
  IonTabs,
  IonRouterOutlet,
} from "@ionic/react";
import { Route, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { toast } from "../toast";
import { registerUser } from "../firebase";
import "./Register.css";

import FormTopBar from "../components/FormTopBar";
import "./Home.css";
import hicon from "../images/home-icon.svg";
import sett from "../images/settings-icon.svg";
import { IonReactRouter } from "@ionic/react-router";
import em from "../images/em.svg";
import Tab1 from "./Tab1";
import Allergy from "./resource-pages/Allergy";
import Ice from "./resource-pages/Ice";
import Immunizations from "./resource-pages/Immunizations";
import { useDispatch, useSelector } from "react-redux";
import FootNavbar from "../components/Foot-Navbar";


function Home() {
  const [user, setUser] = useState({ loggedIn: false });
  const [error, setError] = useState([]);
  const [busy, setBusy] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch()

  async function goImmunization() {
    history.replace("/immune");
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        <IonLoading message="Registering..." duration={0} isOpen={busy} />
        <div className="ion-padding container">
          <IonText>
            <h2></h2>
          </IonText>
          <IonItem></IonItem>
         
            <IonButton className="rbutton" routerLink="/general">
              {" "}
              General Info{" "}
            </IonButton>
         

        
            <IonButton className="rbutton" routerLink="/allergy">
              {" "}
              Allergies{" "}
            </IonButton>
         

          
            <IonButton className="rbutton" onClick={goImmunization}>
              {" "}
              Immunizations{" "}
            </IonButton>
       

          
            <IonButton className="rbutton" routerLink="/ice">
              {" "}
              ICE details{" "}
            </IonButton>

            <IonButton className="rbutton" routerLink="/condition">
              {" "}
              Conditions{" "}
            </IonButton>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
