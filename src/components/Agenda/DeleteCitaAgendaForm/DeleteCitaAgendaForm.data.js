import * as Yup from "yup";

export function initialValues(){
    return{
        cita: "",
    };
};

export function validationSchema(){
    return Yup.object({
        cita: Yup.string().required(true),

    })

}