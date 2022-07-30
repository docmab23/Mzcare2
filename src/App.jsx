import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { square, triangle, images } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Details from './pages/Details';
import Login from "./pages/Login";
import Register from './pages/Register';
import { Provider } from 'react-redux';
import store from './pages/storage';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Global CSS */
import './global.css';
import ChangeEmail from './pages/ChangeEmail';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Allergy from './pages/resource-pages/Allergy';
import Immunizations from './pages/resource-pages/Immunizations';
import ImmunizationsForm from './pages/resource-pages/ImmunizationsForm';
import Ice from './pages/resource-pages/Ice';
import General from './pages/resource-pages/General';
import { AuthProvider } from './contexts/AuthContext';
import FootNavbar from './components/Foot-Navbar';
import Em from './pages/Em';


function App() {
  return (
  <IonApp>
    <AuthProvider>
     <Provider store={store}>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/login" component={Login} />
         
          <Route path="/tab1" component={Tab1} />
          <Route path="/register" component={Register} />
          <Route path="/tabs" component={FootNavbar}/>
          <Route path="/em" component={Em} />
          <Route path="/changeEmail" component={ChangeEmail} />
          <Route path="/changePassword" component={ChangePassword} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/immune-form" component={ImmunizationsForm}></Route>
          <Route path="/allergy" component={Allergy} />
          <Route path="/immune" component={Immunizations} />
          <Route path="/ice" component={Ice} />
          <Route path="/general" component={General} />
          <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
  
        </IonTabBar>
      </IonTabs>
    </IonReactRouter> 
</Provider>
</AuthProvider>
  </IonApp>
  )
};

export default App;
