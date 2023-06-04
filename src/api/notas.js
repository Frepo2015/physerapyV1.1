import { doc, setDoc, collection, getDocs, where, query } from "firebase/firestore";
import { v4 as uuidv4} from 'uuid'
import { map } from 'lodash'
import { db } from '../utils'
import Swal from 'sweetalert2'

export class Notas{
    collectionName = 'notas'

    async create(title, notas, paciente){
        
        	try {
                const id = uuidv4();
                const create_at = new Date()
                const data = {id,title,notas, paciente,create_at};

                const docRef = doc(db, this.collectionName, id);
                await setDoc(docRef, data)
                Swal.fire(
                    'Se ha guardado la nota',
                    'Datos almacenados con éxito.',
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

    async obtainAll(){
        try {
            const collectionRef = collection(db, this.collectionName);
            const snapshot = await getDocs(collectionRef)
            return map(snapshot.docs, (doc) => doc.data())
        } catch (error) {
            throw error
        }
    }

    async getNotesbyPx(idPx){
        try {
            const whereRef =where("paciente", "==", idPx);
            const collectionRef = collection(db, this.collectionName);
            const queryRef = query(collectionRef, whereRef);

            const snapshot = await getDocs(queryRef)
            return map(snapshot.docs, (doc) =>doc.data())
        } catch (error) {
            throw error;
            
        }
    }
}