import {initializeApp} from "firebase/app";
import {
    getFirestore,
    doc,
    deleteDoc,
    setDoc,
    addDoc,
    collection,
    query,
    where,
    getDocs
} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
import {template} from "./html-template";


const firebaseUtils = {
    // DEV
    apiKey: "AIzaSyDf_QMnxqSep-qt2QCYuIlwqeiDMUefhLQ",
    authDomain: "sameday-d5a5b.firebaseapp.com",
    projectId: "sameday-d5a5b",
    storageBucket: "sameday-d5a5b.appspot.com",
    messagingSenderId: "1065662961907",
    appId: "1:1065662961907:web:781d5ddd4d735854793f86",
    // PROD
    /*apiKey: "AIzaSyC07ejUSgCGT0ogvXNHjt0x3oOcy-WCPqg",
    authDomain: "sameday-5007f.firebaseapp.com",
    projectId: "sameday-5007f",
    storageBucket: "sameday-5007f.appspot.com",
    messagingSenderId: "850843512181",
    appId: "1:850843512181:web:b47634485ef9a682ebf73c"*/
};

const app = initializeApp(firebaseUtils);
export const storage = getStorage();
export const db = getFirestore(app);

export const addShipment = async (form) => {
    const collectionRef = doc(db, "shipments", form.sdlId);
    return await setDoc(collectionRef, form);
};

export const getShipmentsByStatus = async () => {
    const collectionRef = collection(db, "shipments");
    const q = query(collectionRef, where('completed', '==', true));
    const snapsShot = await getDocs(q)
    const data = []
    snapsShot.forEach((doc) => {
        data.push(doc.data())
    });
    return data
}
export const updateShipment = async (form) => {
    return setDoc(doc(db, "shipments", form.sdlId), form);
};
export const deleteShipment = async (sdlId) =>
    deleteDoc(doc(db, "shipments", sdlId));

export const addNewEmailOrder = async (sdlId, wbs, emails) => {
    const collectionRef = collection(db, 'mail');
    const res = await addDoc(collectionRef, {
        to: emails,
        message: {
            subject: 'Shipment SDL#' + sdlId + ' status change',
            html: template(sdlId, wbs),
        },
    })
    console.log(res)
    return res
}

export const auth = getAuth(app);
