import * as Yup from "yup";

export function initialValues(){
    return{
        videosDropdown: {
            id:'',
            url: ''
        },
    }
}

export function validationSchema(){
    Yup.object({
        videosDropdown: Yup.string().required(true),
    })
}