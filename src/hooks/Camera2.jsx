import { useEffect, useState } from "react";
import {
  IonContent,
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonText,
  IonCheckbox,
  IonInput,
  IonItem,
  IonLabel
 
} from "@ionic/react";
import back from "../images/back.svg";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import React from "react";
import { IonPage, IonButton } from "@ionic/react";
import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import { auth } from "../firebase";
import AddFileName from "../modals/AddFileName";
import ShowImage from "../modals/ShowImage";
import FormTopBar from "../components/FormTopBar";
import { useHistory } from "react-router";

function Camera2(props) {
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let time = newDate.getTime()
  var default_filename = `${date}${month}${year}${time}.png"`
  const history = useHistory();
  const [images, setImageList] = useState([]);
  const [url, setUrl] = useState([]);
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [imageclicked, setImageclicked] = useState(false);
  const [filename, setFilename] = useState(default_filename);
  const [photo, setPhoto] = useState("");
  const [fax_on , setFaxStatus] = useState(false);
  const [items_selected, setSelectedItems] = useState([]);


  function change_fax_status(){
    setFaxStatus(!fax_on);
  }

  const hiddenFileInput = React.useRef(null);
  const uid = auth.currentUser.uid;

  function changestatus() {
    setStatus(!status);
  }

  function changestatus2() {
    setStatus2(!status2);
  }

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      setPhoto(photo);
      var imageUrl = photo.webPath;
      console.log(imageUrl);
      setStatus(!status);
      // save_picture(photo);
    } catch (e) {
      console.log(e);
    }
  };

  async function save_picture(photo) {
    const storageRef = ref(storage, `${uid}/images/${filename}`);
    var b64_string = await base64FromPath(photo.webPath);
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
          setImageList((images) => images.concat(downloadURL));
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

  function changeroute() {
    history.replace("/home");
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

  

  useEffect(() => {
    get_files();
  }, []);

  function show_image_large(image_clicked) {
    setImageclicked(image_clicked);
    changestatus2();
  }
  const handleChange = (e) => {
    // Destructuring
    const { value, checked , className} = e.target;
    if (checked==true){
    setSelectedItems((items_selected) => items_selected.concat(className));}
      
  
    console.log(`${className} is ${checked}`);
    }
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="bar bar-header bar-positive">
          <FormTopBar />
        </div>
        <h2>{"\u00a0\u00a0\u00a0"}</h2>
        <IonGrid>
          <h1>
            <IonRow className="home">
              <IonCol>
                <div>
                  <IonButton onClick={changeroute} color="light">
                    <IonIcon src={back}></IonIcon>
                  </IonButton>
                </div>{" "}
              </IonCol>
              <IonText></IonText>
              <IonCol className="ion-align-self-center heading">Records</IonCol>
              <IonCol className="ion-align-self-end">
              </IonCol>
            </IonRow>
          </h1>
        </IonGrid>
      
        
        <div>
          <IonGrid columns="1fr 1fr">
            {images.map((item, pos) => {
              return (
                <div key={pos}>
                  {
                    <div
                      role="button"
                      style={{
                        marginTop: "3vh",
                        marginBottom: "3vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {
                        <div
                          key={item}
                          style={{
                            width: "45vw",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          className="image-container"
                        >
                          <img
                            style={{ width: "40vw", borderRadius: "5px" }}
                            onClick={() => show_image_large(images[pos])}
                            src={images[pos]}
                            alt="medical records"
                          />
                        { fax_on && 
                          <input type="checkbox" className={`checkbox"${item}"`}id="check2"  onChange={handleChange}/> }
                        </div>
                      }
                    </div>
                  }
                </div>
              );
            })}
          </IonGrid>
          <IonButton onClick={takePhoto}>Add</IonButton>
          <IonButton onClick={change_fax_status}>Fax your Records</IonButton>
          { fax_on && 
          <form>
             <IonItem>
              <IonLabel position="floating">Fax No. </IonLabel>
           <IonInput type="tel"></IonInput>
          <IonButton disabled>Fax it!</IonButton>
          <IonButton onClick={change_fax_status}>Cancel</IonButton></IonItem></form>

          }
          <AddFileName
            show={status}
            close={changestatus}
            name={setFilename}
            photo={photo}
            savePhoto={save_picture}
          />
          <ShowImage
            show={status2}
            close={changestatus2}
            image={imageclicked}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Camera2;