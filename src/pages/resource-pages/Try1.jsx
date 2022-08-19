import React from 'react';
import { IonContent } from '@ionic/react';

function Try1 (){

return (
  <IonContent
    scrollEvents={true}
    onIonScrollStart={() => {}}
    onIonScroll={() => {}}
    onIonScrollEnd={() => {}}>
      <h1>Main Content</h1>

      <div slot="fixed">
        <h1>Fixed Content</h1>
      </div>
  </IonContent>
);
}


export default Try1;