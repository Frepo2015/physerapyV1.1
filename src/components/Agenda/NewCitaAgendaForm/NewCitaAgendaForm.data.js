import * as Yup from "yup";

export function initialValues(){
    return{
        paciente: "",
        title: "",
        startDate: "",
        startTimeH: null,
        startTimeM: null,
        endTimeH: null,
        endTimeM: null,
    };
};

export function validationSchema(){
    return Yup.object({
        paciente: Yup.string(). required(true),
        title: Yup.string().required(true),
        startDate: Yup.string().required(true),
        startTimeH: Yup.number().required(true),
        startTimeM: Yup.number().required(true),
        endTimeH: Yup.number().required(true),
        endTimeM: Yup.number().required(true),
    })

}