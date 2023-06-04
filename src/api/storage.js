import {  getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage"
import Swal from 'sweetalert2'

export class Storage{
    async uploadFile(file, folder, nameFile){
        try {
            const storage = getStorage();
            const fileRef = ref (storage, `${folder}/${nameFile}`);
            return await uploadBytes(fileRef, file);
        } catch (error) {
            throw error;
        }
    }

    async getUrlFile(pathFile){
        try {
            const storage = getStorage();
            const fileRef = ref(storage, pathFile);
            return await getDownloadURL(fileRef);
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(pathFile){
        try {
            const storage = getStorage();
            const fileRef = ref(storage, pathFile);
            await deleteObject(fileRef);
            Swal.fire(
                '¡El video se ha eliminado!',
                '¡El video ha eliminado con exito!',
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