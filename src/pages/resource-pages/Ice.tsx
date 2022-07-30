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
    IonCard,
    IonCardSubtitle,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
	IonButtons,
	IonModal
	
} from "@ionic/react";

import React, { useState , useRef } from "react";
import { Link, useHistory } from "react-router-dom";
// import { loginUser, reAuthenticate, updateUserPassword } from ".../firebase"
// import { toast } from ".../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
import FormTopBar from "../../components/FormTopBar";
import {IoIosAddCircleOutline} from "react-icons/io" ;
import {setAllergy, setICE} from "../database" ;


const Ice: React.FC = () => {

	const modal = useRef<HTMLIonModalElement>(null);
	const input = useRef<HTMLIonInputElement>(null);
	const [status,setStatus] = useState(false)
	const [IceName, setIceName] = useState("");
	const [phno_, setPhno] = useState("");
	const [busy, setBusy] = useState<boolean>(false);
	const history = useHistory();
  
	async function createIce() {
	  console.log("okkk")
	  setBusy(true);
	  const submitIceData: any = {}
	  const IceData = {
		  Name: IceName,
		  phone_no: phno_,
		  
	  }
	  submitIceData[IceName] = IceData;
	  console.log("ok");
	  await setICE(submitIceData);
	  setBusy(false);
	  setStatus(!status);
	}
  
	function confirm() {
	  modal.current?.dismiss(input.current?.value, 'confirm');
	}

	function changestatus() {
		setStatus(!status);
	}

	return (
		<IonPage>
      <IonContent className="ion-padding">
      <FormTopBar/>
      <p>      </p>
     <h1>Allergies</h1>
     <IonCard>
          <IonCardHeader>
            <IonCardTitle>Tom Cruise</IonCardTitle>
           
          </IonCardHeader>
         
          <IonCardContent>
          <IonCardSubtitle>+1 419-304-9069</IonCardSubtitle>
          
      </IonCardContent>
        </IonCard>
		<IonButton id="open-modal" expand="block" onClick={changestatus}>
          Add ICE
        </IonButton>

        <IonModal isOpen={status}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={changestatus}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Add ICE</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={createIce}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter Name</IonLabel>
              <IonInput ref={input} type="text" onIonChange={(e: any) => setIceName(e.target.value)} placeholder="Name" />
            </IonItem>
			<IonItem>
              <IonLabel position="stacked">Enter Contact No.</IonLabel>
              <IonInput ref={input} type="tel"  onIonChange={(e: any) => setPhno(e.target.value)}placeholder="Contact no." />
            </IonItem>
		</IonContent>
        
        </IonModal>
	
	
      </IonContent>
	  <IonFooter>
	


	  </IonFooter>
    </IonPage>

	);
};

export default Ice;