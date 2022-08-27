import { IonButton, IonText, IonContent, IonPage } from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import FormTopBar from "../components/FormTopBar";
import { db } from "../firebase";


function QRRoute() {
  const location = useLocation();
  const history = useHistory();
  var uid = location.pathname;
  uid = uid.split("/").pop();
  var [user_id, setuserid] = useState();

  async function getcardobj(uid) {
    const cardObject = {}
    const cardRef = doc(db, "qrCode/" + uid);

    await getDoc(cardRef).then((docSnap) => {
        if (docSnap.exists()) {
          //cardObject["state"] = docSnap["state"];
          const data = docSnap.data();
          setuserid(data["user_uid"]);
          cardObject["user_uid"] = data["user_uid"];
          if (data["state"] !== false) history.push(`/id/${data["user_uid"]}`);
        }
      });
  }

  useEffect(() => {
    getcardobj(uid);
  }, []);

  return (
    <IonPage>
    <IonContent className="ion-padding">
      <FormTopBar />
      <div className="ion-padding container">
        <IonText>
          <h2>
            {" "}
            {"\u00a0\u00a0\u00a0"}
            {"\u00a0\u00a0\u00a0"}{" "}
          </h2>
        </IonText>

        <IonButton className="rbutton" onClick={() => history.push("/login", { card_id: uid })}>
          {" "} 
          Login{" "}
        </IonButton>

        <IonButton className="rbutton" routerLink="/register">
          {" "}
          Sign Up{" "}
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
  )
}

export default QRRoute;
