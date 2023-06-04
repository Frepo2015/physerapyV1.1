import { setDoc, doc, where, collection, query, getDocs, deleteDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { map } from "lodash"
import { db } from "../utils"
import Swal from "sweetalert2"

export class Video {
    collectionName = "video";

    async create(title, description, file, paciente) {
        try {
            const id = uuidv4();
            const created_at = new Date();
            const data = { id, title, description, file, paciente, created_at };

            const docRef = doc(db, this.collectionName, id);
            await setDoc(docRef, data);
            Swal.fire(
                '¡El video se ha asigando subido con éxito!',
                `¡El video se ha asigando al expediente ${paciente}!`,
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

    async obtainAllByPx(idPaciente) {
        try {
            const whereRef = where("paciente", "==", idPaciente);
            const collectionRef = collection(db, this.collectionName);
            const queryRef = query(collectionRef, whereRef);

            const snapshot = await getDocs(queryRef);

            return map(snapshot.docs, (doc) => doc.data());
        } catch (error) {
            throw error;
        }
    }

    async deleteVideo(id) {
        try {
            const docRef = doc(db, this.collectionName, id)
            await deleteDoc(docRef);
            Swal.fire(
                '¡El registro del video se ha eliminado!',
                '¡El registro del video ha eliminado con exito!',
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
}