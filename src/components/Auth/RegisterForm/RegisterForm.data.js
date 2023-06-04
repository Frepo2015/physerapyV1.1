import * as Yup from "yup";

export function initialValues(){
    return{
        email:"",
        contrasenia:"",
        nombre:"",
        telefono:"",
        genero:""
    };
}

export function validationSchema(){
    return Yup.object({
        email: Yup.string().email(true).required(true),
        contrasenia:Yup.string().required(true),
        nombre: Yup.string().required(true),
        telefono:Yup.number().required(true),
        genero:Yup.string().required(true)

    })
}