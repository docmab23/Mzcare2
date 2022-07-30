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

  import Em from "../pages/Em" ;
  import hicon from "../images/home-icon.svg";
  import sett from "../images/settings-icon.svg";
  import { IonReactRouter } from "@ionic/react-router";
  import em from "../images/em.svg"; 
  import Home from "../pages/Home";
  import {Redirect} from 'react-router-dom';

function FootNavbar() {

return (
<IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home"component={Home} exact />
              <Route path="/em_tab" component={Em} exact />
             <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
            </IonRouterOutlet> 

            <IonTabBar slot="bottom">
              <IonTabButton tab="EM Profile" href="/em_tab">
                <IonIcon src={em}>EM</IonIcon>
              </IonTabButton>
              <IonTabButton tab="Home" href="/home">
                <IonIcon src={hicon}>Home</IonIcon>
              </IonTabButton>
              <IonTabButton tab="Settings" href="/home">
                <IonIcon src={sett}>Settings</IonIcon>
              </IonTabButton>
            </IonTabBar>
          </IonTabs> 
        </IonReactRouter>
);

}

export default FootNavbar;