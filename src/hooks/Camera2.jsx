import { useState, useEffect, useRef } from "react";
import {
  IonContent,
  isPlatform,
  IonIcon,
  IonCol,
  IonRow,
  IonGrid,
} from "@ionic/react";

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";
import React from "react";
import { IonPage, IonButton, IonForm, IonInput } from "@ionic/react";
import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import { type } from "os";
import { BlobUtil } from "blob-util";
import { auth } from "../firebase";

import { fileTray, home, images, medkitSharp, settings } from "ionicons/icons";
import { lstat } from "fs";
import AddFileName from "../modals/AddFileName";
import ShowImage from "../modals/ShowImage";

function Camera2(props) {
  const [photos, setPhotos] = useState([]);
  const [images, setImageList] = useState([]);
  const [url, setUrl] = useState([]);
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [data, setData] = useState([]);
  const [disable, setDisable] = useState(false);
  const fileInput = useRef(null);
  const [status, setStatus] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [imageclicked, setImageclicked] = useState(false);
  const [filename, setFilename] = useState("");
  const ls = [];

  const hiddenFileInput = React.useRef(null);
  const uid = auth.currentUser.uid;

  function changestatus() {
    setStatus(!status);
  }

  function changestatus2() {
    setStatus2(!status2);
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
  };

  function show_image() {
    changestatus2();
  }

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      var imageUrl = photo.webPath;
      console.log(imageUrl);
      save_picture(photo);
    } catch (e) {
      console.log(e);
    }
  };

  function makefilename() {
    setFilename(filename);
  }

  async function save_picture(photo) {
    setStatus(!status);
    console.log(filename);
    const storageRef = ref(storage, `${uid}/images/${filename}`);
    var b64_string = await base64FromPath(photo.webPath);
    console.log(b64_string);
    //var b64_ = decodeURIComponent(b64);
    var blob_ = b64_to_blob(b64_string);

    const uploadTask = uploadBytesResumable(storageRef, blob_);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  }

  async function base64FromPath(path) {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("method did not return a string");
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  function b64_to_blob(b64) {

    const byteCharacters = window.atob(
      b64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
    );
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    return blob;
  }
  var name_ = "hello.pdf";
  const storageRef2 = ref(storage, `${uid}/files/`);

  function upload_file() {
    uploadBytesResumable(storageRef2, file);
  }

  function get_files() {
    const dir_ref = ref(storage, `${uid}/images/`);
    if (disable === false) {
      listAll(dir_ref)
        .then((res) => {
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((url_) => {
              setImageList((images) => images.concat(url_));
              ls.push(url_);
            });
          });
          setDisable(true);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    }
  }

  get_files();
 
  function show_image_large(image_clicked) {
    setImageclicked(image_clicked);
    changestatus2();
  }

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            {images.map((item, pos) => {
              return (
                <IonCol key={pos}>
                  {" "}
                  <img
                    src={images[pos]}
                    onClick={() => show_image_large(images[pos])}
                  ></img>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>

        {/* <IonButton onClick={upload_file}>
                <input type="file" hidden onChange={handleChange}/>
                    Upload
                
              </IonButton> */}
        <IonButton onClick={takePhoto}>Upload your medical records</IonButton>

        <AddFileName show={status} close={changestatus} name={setFilename} />
        <ShowImage show={status2} close={changestatus2} image={imageclicked} />
      </IonContent>
    </IonPage>
  );
}

export default Camera2;
