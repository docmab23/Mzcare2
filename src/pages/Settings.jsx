import { IonContent, IonPage, IonButton, IonText } from "@ionic/react";

import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "../toast";
// import { setUserState } from "../redux/actions";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";

function Settings() {
  const { logout } = useAuth();
  const history = useHistory();
  const { currentUser } = useAuth();

  async function logout_user() {
    await logout();
    toast("You have been logged out!");
    history.replace("/login");
  }

  if (currentUser === null) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      
    <IonContent className="ion-padding">
    <div className = "bar bar-header bar-positive">
      <FormTopBar />
      </div>
      <h2>
      {"\u00a0\u00a0\u00a0"}
      </h2>
      <div className="ion-padding container">
        <IonText>
          <h2>
            {" "}
            {"\u00a0\u00a0\u00a0"}
            {"\u00a0\u00a0\u00a0"}
            {"\u00a0\u00a0\u00a0"}{" "}
          </h2>
        </IonText>

        <IonButton className="rbutton" routerLink="/changeEmail">
          {" "}
          Change Email{" "}
        </IonButton>

        <IonButton className="rbutton" routerLink="/changePassword">
          {" "}
          Change Password{" "}
        </IonButton>

        <IonButton className="rbutton" onClick={logout_user}>
          {" "}
          Logout{" "}
        </IonButton>
      </div>
    </IonContent>
   
  </IonPage>
  );
}

export default Settings;
