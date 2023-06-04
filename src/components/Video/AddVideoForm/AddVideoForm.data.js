import * as Yup from "yup";

export function initialValues(){
    return {
        title:"",
        description: "",
        file: null
    }
}

export function validationSchema(){
    return Yup.object({
        title:Yup.string().required(true),
        description: Yup.string().required(true),
        file: Yup.string().required(true),
    })
}