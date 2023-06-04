import * as Yup from "yup";

export function initialValues(){
    return{
        email: "",
        contrasenia: "",
    };
}

export function validationSchema(){
    return Yup.object({
        email: Yup.string().email(true).required(true),
        contrasenia: Yup.string().required(true),
    })
}