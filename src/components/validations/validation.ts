import * as yup from "yup";
import {InferType} from "yup";

export const schemaLogin = yup.object({
    email: yup.string().email('Invalid email').required('E-mail required!'),
    password: yup.string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
      .required('Password required!')
  }).required();

  export const schemaSignup = yup.object({
    name: yup.string().min(3, 'Min. 3 znaki!').required("Name required!"),
    age: yup.string().required('Select age!'),
    email: yup.string().email('Invalid email').required('E-mail required!'),
    password: yup.string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
      .required('Password required!'),
    confirm: yup.string()
      .oneOf([yup.ref('password')], 'Must match "password" field value')
      .required('Confirm password required!'),
    // image: yup.string(),
    city: yup.string().required('Select city!')
  }).required();

  export type SignupData = InferType<typeof schemaSignup>
  
  const ProductsSchema = yup.object().shape({
      name: yup.string().min(3, 'Min. 3 znaki!').required("Wpisz nazwę!"),
      amount: yup.number().required('Wpisz ilość!'),
      price: yup.number().required('Wpisz cenę!'),
      unit: yup.string().required('Wybierz jednostkę!'),
  }).required();

  const ArrayOfCarsSchema = yup.array().of(ProductsSchema);

  export const schemaAddList = yup.object({
    products: ArrayOfCarsSchema,
    listName: yup.string().required('Wpisz nazwę listy!'),
    address: yup.string().required('Wpisz adres!'),
    receiveDate: yup.string().required('Wybierz datę!'),
    phone: yup.string().matches(/\+[0-9]{9}/),
  }).required();

  export const schemaSubmitList = yup.object({
    spent: yup.number().required('Wpisz kwotę!')
  }).required();