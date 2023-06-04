import { setDoc, doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import {v4 as uuidv4} from "uuid";
import { db } from "../utils"
import { map } from "lodash"
import Swal from 'sweetalert2'

function splitDate(date){
    let arr1 = date.toString().split(' ');
    let month= arr1[1];
    let day= parseInt(arr1[2]);
    let year= parseInt(arr1[3]);
    return {month, day, year}
  }

function months(month){
    let m;

    if(month==="Jan"){
        m=0
    }
    if(month==="Feb"){
        m=1
    }
    if(month==="Mar"){
        m=2
    }
    if(month==="Apr"){
        m=3
    }
    if(month==="May"){
        m=4
    }
    if(month==="Jun"){
        m=5
    }
    if(month==="Jul"){
        m=6
    }
    if(month==="Aug"){
        m=7
    }
    if(month==="Sep"){
        m=8
    }
    if(month==="Oct"){
        m=9
    }
    if(month==="Nov"){
        m=10
    }
    if(month==="Dec"){
        m=11
    }
    return m;
}
export class Citas{
    collectionName = "citas";

    async create (paciente, title, startDate, startTimeH, startTimeM, endTimeH, endTimeM){
            const asunto = `${paciente}. ${title}` ;
            const dateSplit = splitDate(startDate);
            const start = new Date(dateSplit.year, months(dateSplit.month), dateSplit.day, parseInt(startTimeH), parseInt(startTimeM))
            const end = new Date(dateSplit.year, months(dateSplit.month), dateSplit.day, parseInt(endTimeH), parseInt(endTimeM))
        try {
            const idCita = uuidv4();
            const data ={ id: idCita, title: asunto, start: start, end: end}
            const docRef =  doc(db, this.collectionName, idCita )
            await setDoc(docRef, data);
            Swal.fire(
                '¡Cita creada con éxito!',
                `¡La cita para ${paciente} se ha creado con exito!`,
                'success'
              )

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
              })
            throw error;
            
        }
    }

    async obtainAll(){
        try {
            const docRef =  collection(db, this.collectionName);
            const snapshot = await getDocs(docRef);
            return map(snapshot.docs, (doc) => doc.data());
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
              })
            throw error
        }
    }

    async deleteCita(id){
        try {
            const docRef = doc(db, this.collectionName, id)
            await deleteDoc(docRef);
            Swal.fire(
                '¡La cita se ha eliminado!',
                '¡La cita se ha eliminado con exito!',
                'success'
              )


        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal!',
              })
            throw error
            
        }

    }


}