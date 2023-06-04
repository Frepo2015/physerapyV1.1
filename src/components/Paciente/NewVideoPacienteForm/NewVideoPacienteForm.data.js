import * as Yup from 'yup';

export function initialValues(){
    return {
        video: null,
        titulo: "",
        descripcion: "",
    }
}

export function validationSchema(){
    return Yup.object({
        video: Yup.string().required(true),
        titulo: Yup.string().required(true),
        descripcion:Yup.string().required(true),
    })
}