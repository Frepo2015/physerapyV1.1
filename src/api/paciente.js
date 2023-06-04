import { setDoc, doc, collection, getDocs, getDoc, limit, orderBy, query } from "firebase/firestore";
import {v4 as uuidv4} from "uuid";
import { map } from "lodash";
import { db } from "../utils";
import Swal from 'sweetalert2'

export class Paciente {
    collectionName = "pacientes";

    async create(image, nombre, fechaNacimiento, genero, domicilio, peso, 
        estatura, motivoConsulta, tratamientosPrevios, diabetes, inputDiabetes, alergia,
        inputAlergia, cardiopatias, inputCardiopatias, cancer, inputCancer,
        cirugias, inputCirugias, transfusiones, inputTransfusiones, fracturas, inputFracturas, 
        enfReumaticas, inputEnfReumaticas, espContraMus, inputEsp, tabaquismo, inputTabaquismo, actividadFisica,
        inputActividadFisica, alcoholismo, inputAlcoholismo, automedica, inputAutomedica, drogas, inputDrogas,
        pasatiempo, inputPasatiempo, marcha, observacionesMarcha, escalaDolor){

        try {
            const idPaciente = uuidv4();
            const created_at = new Date();
            const data = { id: idPaciente, image, nombre, fechaNacimiento, genero, domicilio, peso, 
                estatura, motivoConsulta, tratamientosPrevios, diabetes, inputDiabetes, alergia,
                inputAlergia, cardiopatias, inputCardiopatias, cancer, inputCancer,
                cirugias, inputCirugias, transfusiones, inputTransfusiones, fracturas, inputFracturas, 
                enfReumaticas, inputEnfReumaticas, espContraMus, inputEsp, tabaquismo, inputTabaquismo, actividadFisica,
                inputActividadFisica, alcoholismo, inputAlcoholismo, automedica, inputAutomedica, drogas, inputDrogas,
                pasatiempo, inputPasatiempo, marcha, observacionesMarcha, escalaDolor, created_at};
            const docRef = doc(db, this.collectionName, idPaciente)
            await setDoc(docRef, data)
            Swal.fire(
                '¡Paciente creado con éxito!',
                '¡El paciente se ha añadido a la lista!',
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
            const docRef = collection(db, this.collectionName);
            const snapshot = await getDocs(docRef);
            return map(snapshot.docs, (doc) => doc.data());
         
        } catch (error) {
            throw error
        }
    }

    async getPaciente(id){
        try {
            const docRef = doc(db, this.collectionName, id)
            const snapshot = await getDoc(docRef);
            return snapshot.data();
        } catch (error) {
            throw error;

        }
    }

    async getLastPacientes(limitItems = 10){
        try {
            const collectionRef = collection(db, this.collectionName);
            const limitRef = limit(limitItems);
            const orderByRef = orderBy("created_at", "desc")
            const queryRef = query(collectionRef, orderByRef, limitRef);

            const snapshot =  await getDocs(queryRef);

            return map(snapshot.docs, (doc) => doc.data());

            
        } catch (error) {
            throw error;
        }
    }

}
