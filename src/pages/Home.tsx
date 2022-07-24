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
    IonNav,
    IonTabButton,
    IonTabBar,
    IonTabs,
    IonBadge,
    IonRouterOutlet,
    
    

  } from "@ionic/react";
  import { Redirect, Route } from 'react-router-dom';
  import React, { useState , useEffect } from "react";
 
  import { Link } from "react-router-dom";
  import { toast } from "../toast";
  import { registerUser } from "../firebase";
  import "./Register.css";
  import {auth} from "../firebase" ; 
  // import FormTopBar from "../components/FormTopBar";
  import { getCurrentUser } from "../firebase";
  // import  {onAuthStateChange} from "../firebase";
  import {logoutUser} from "../firebase";
  import FormTopBar from "../components/FormTopBar";
  import "./Home.css";
  import hicon from "../images/home-icon.png" ; 
  import sett from "../images/settings-icon.png" ;
  import { IonReactRouter } from "@ionic/react-router";
  import em from "../images/em.png" ;
  import { calendar, personCircle, map, informationCircle } from 'ionicons/icons';
import Tab1 from "./Tab1";
import Allergy from "./resource-pages/Allergy";
import Ice from "./resource-pages/Ice";
import Immunizations from "./resource-pages/Immunizations";


  const Home: React.FC = () => {
    const [user, setUser] = useState( {loggedIn: false} );
    const [error, setError] = useState("");
    const [busy, setBusy] = useState<boolean>(false);
   /* useEffect(() => {
      const unsubscribe = onAuthStateChange(setUser);
      return () => {
        unsubscribe();
      }
    }, []);  */
   


  function hello() {
    console.log("hello");
  }

    return (
        <IonPage>
        <IonContent className="ion-padding">
        <FormTopBar/>
          <IonLoading message="Registering..." duration={0} isOpen={busy} />
          <div className="ion-padding container">
          <IonText >
            <h2 >
              Home sweet home 
              </h2></IonText>
              <IonItem>

              </IonItem>
            <IonItem>
              <IonButton className="rbutton"  routerLink="/general"> General Info </IonButton>
            </IonItem>
          
            <IonItem>
            <IonButton className="rbutton" routerLink="/allergy"> Allergies </IonButton>
            </IonItem>
    
            <IonItem>
            <IonButton className="rbutton" routerLink="/immune" > Immunizations </IonButton>
            </IonItem>

            <IonItem>
            <IonButton className="rbutton" routerLink="/ice"> ICE details </IonButton>
            </IonItem>
            
          </div>
          <IonReactRouter>
      
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route path='/home/ice' component={Ice} exact />
                            <Route path='/home/immune' component={Immunizations} exact />
                            <Route path='/home' exact />
                           
                        </IonRouterOutlet>

                        <IonTabBar slot='bottom'>
                            <IonTabButton tab='EM Profile' href='/home/ice'>
                                <IonLabel>EM</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab='Home' href='/home'>
                                <IonLabel>Home</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab='Settings' href='/home/immune'>
                                <IonLabel>Settings</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
      
            </IonReactRouter>
       
        

        </IonContent>
      
      </IonPage>
    
    );
  };
  
  export default Home;
  