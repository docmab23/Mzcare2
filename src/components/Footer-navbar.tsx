import React from 'react';
import './FormTopBar.css';
import hicon from "../images/home-icon.png";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonLoading,
    IonItem,
    IonLabel,
    IonText,
    IonFooter,
    IonItemDivider,
    IonIcon,
    IonNav
  } from "@ionic/react";

import em from "../images/em.png";

import sett from "../images/settings-icon.png"

const Footerbar: React.FC = () => {
  return (
    <IonItem className="footer-navbar2">
            <IonItemDivider>
            <img className="image-icons" src={em} ></img>
            <img className="image-icons" src={hicon}></img>
            <img className="image-icons" src={sett}></img>
            </IonItemDivider>
        </IonItem>
  );
};

export default Footerbar;
