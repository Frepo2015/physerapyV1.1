import *  as Yup from "yup"

export function initialValues(){
    return{
        paciente: ""
    }
}

export function validationSchema(){
    return Yup.object({
        paciente: Yup.string().required(true)
    });
}