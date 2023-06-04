import * as Yup from "yup";

export function initialValues(){
    return{
        file: null,
        nombre: "",
        fechaNacimiento: "",
         genero: "",
        domicilio: "",
        peso: "",
        estatura: "",
        tel: "",
        motivoConsulta: "",
        tratamientosPrevios: "",
        diabetes: false,
        inputDiabetes:"",
        accidentes: false,
        inputAccidentes: "",
        alergia: false,
        inputAlergia: "",
        cardiopatias: false,
        inputCardiopatias: "",
        cancer: false,
        inputCancer: "",
        cirugias: false,
        inputCirugias: "",
        transfusiones: false,
        inputTransfusiones: "",
        fracturas: false,
        inputFracturas: "",
        enfReumaticas: false,
        inputEnfReumaticas: "",
        espContraMus: false,
        inputEsp: "",
        tabaquismo: false,
        inputTabaquismo: "",
        actividadFisica: false,
        inputActividadFisica: "",
        alcoholismo: false,
        inputAlcoholismo: "",
        automedica: false,
        inputAutomedica: "",
        drogas: false,
        inputDrogas: "",
        pasatiempo: false,
        inputPasatiempo: "",
        marcha: "",
        observacionesMarcha: "",
        escalaDolor: "",
    };
}

export function validationSchema(){
    return Yup.object({
        file: Yup.string(),
        nombre: Yup.string().required(true),
        fechaNacimiento: Yup.string().required(true),
        genero: Yup.string().required(true),
        domicilio: Yup.string(),
        peso: Yup.string(),
        estatura: Yup.string(),
        tel: Yup.string().required(true),
        motivoConsulta: Yup.string().required(true),
        tratamientosPrevios: Yup.string(),
        diabetes: Yup.bool(),
        inputDiabetes:Yup.string(),
        accidentes: Yup.bool(),
        inputAccidentes: Yup.string(),
        alergia: Yup.bool(),
        inputAlergia: Yup.string(),
        cardiopatias: Yup.bool(),
        inputCardiopatias: Yup.string(),
        cancer: Yup.bool(),
        inputCancer: Yup.string(),
        cirugias: Yup.bool(),
        inputCirugias: Yup.string(),
        transfusiones: Yup.bool(),
        inputTransfusiones: Yup.string(),
        fracturas: Yup.bool(),
        inputFracturas:Yup.string(),
        enfReumaticas: Yup.bool(),
        inputEnfReumaticas: Yup.string(),
        espContraMus: Yup.bool(),
        inputEsp: Yup.string(),
        tabaquismo: Yup.bool(),
        inputTabaquismo:Yup.string(),
        actividadFisica: Yup.bool(),
        inputActividadFisica: Yup.string(),
        alcoholismo: Yup.bool(),
        inputAlcoholismo: Yup.string(),
        automedica: Yup.bool(),
        inputAutomedica: Yup.string(),
        drogas: Yup.bool(),
        inputDrogas: Yup.string(),
        pasatiempo: Yup.bool(),
        inputPasatiempo: Yup.string(),
        marcha: Yup.string(),
        observacionesMarcha: Yup.string(),
        escalaDolor: Yup.string(),

    })
}