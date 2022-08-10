import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import store from "./pages/storage";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Global CSS */
import "./global.css";
import ChangeEmail from "./pages/ChangeEmail";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Allergy from "./pages/resource-pages/Allergy";
import Immunizations from "./pages/resource-pages/Immunizations";
import Ice from "./pages/resource-pages/Ice";
import General from "./pages/resource-pages/General";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import FootNavbar from "./components/Foot-Navbar";

import { DatabaseProvider } from "./contexts/DatabaseContext";

import hicon from "./images/home-icon.svg";
import sett from "./images/settings-icon.svg";
// import { IonReactRouter } from "@ionic/react-router";
import em from "./images/em.svg";
import Try1 from "./pages/resource-pages/Try1";
import Em from "./pages/Em";
import { connectStorageEmulator } from "firebase/storage";
import Condition from "./pages/resource-pages/Conditions";
import "./App.css";
import Settings from "./pages/Settings";
import { ok } from "assert";
import { home, medkitSharp, settings } from "ionicons/icons";

// import Home from "../pages/Home";
// import {Redirect} from 'react-router-dom';

function App() {
  // const {currentUser} = useAuth();
  // console.log(currentUser);
  
  return (
    <IonApp>
      <AuthProvider>
        <DatabaseProvider>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/login" component={Login} />
                <Route path="/try" component={Try1} />
                <Route path="/home" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/tabs" component={FootNavbar} />
                <Route path="/em_tab" component={Em} />
                <Route path="/changeEmail" component={ChangeEmail} />
                <Route path="/changePassword" component={ChangePassword} />
                <Route path="/forgotPassword" component={ForgotPassword} />
                <Route path="/allergy" component={Allergy} />
                <Route path="/immune" component={Immunizations} />
                <Route path="/settings" component={Settings} />
                <Route path="/ice" component={Ice} />
                <Route path="/condition" component={Condition} />
                <Route
                  path="/general"
                  render={(props) => <General {...props} tell={true} />}
                />
                <Route
                  path="/"
                  render={() => <Redirect to="/login" />}
                  exact={true}
                />
              </IonRouterOutlet>

              <IonTabBar slot="bottom" className="footer-tab" id="app-tab-bar">
                <IonTabButton tab="EM Profile" href="/em_tab">
                  <IonIcon src={medkitSharp}>EM</IonIcon>
                </IonTabButton>
                <IonTabButton tab="Home" href="/home">
                  <IonIcon src={home}>Home</IonIcon>
                </IonTabButton>
                <IonTabButton tab="Settings" href="/settings">
                  <IonIcon icon={settings}>Settings</IonIcon>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </DatabaseProvider>
      </AuthProvider>
    </IonApp>
  );
}

export default App;
