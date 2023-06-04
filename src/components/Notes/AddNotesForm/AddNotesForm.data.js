import * as Yup from "yup";

export function initialValues(){
    return{
        title:"",
        notes: "",
        
        
    };
};

export function validationSchema(){
    return Yup.object({
        title: Yup.string().required(true),
        notes: Yup.string().required(true)
    })

}