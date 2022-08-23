import React from "react";

import { Geolocation } from "@ionic-native/geolocation";
import { useState } from "react";
import { IonButton, IonToast, IonLoading } from "@ionic/react";

function Geo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ showError: false });
  const [position, setPosition] = useState();

  const getLocation = async () => {
    setLoading(true);

    try {
      const position = await Geolocation.getCurrentPosition();
      setPosition(position);
      setLoading(false);
      setError({ showError: false });
    } catch (e) {
      setError({ showError: true, message: e.message });
      setLoading(false);
    }
  };

  return (
    <>
      <IonLoading
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={"Getting Location..."}
      />
      <IonToast
        isOpen={error.showError}
        onDidDismiss={() => setError({ message: "", showError: false })}
        message={error.message}
        duration={3000}
      />
      <IonButton color="primary" onClick={getLocation}>
        {position
          ? `${position.coords.latitude} ${position.coords.longitude}`
          : "Get Location"}
      </IonButton>
    </>
  );
}

export default Geo;
