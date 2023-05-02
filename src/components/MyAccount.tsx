import {useEffect, useState} from "react"
import { Button, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SignupData, schemaSignup } from "./validations/validation";
import { useUserContext } from "../contexts/UserContext";
import updateUser from "../api/updateUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "../supabaseClient";
import LoginDataWrapper from "./LoginDataWrapper";
// import { Input as FormInput } from './form/Input'

const MyAccount = () => {
    const {id}=useUserContext();
    const [editedUser, setEditUser] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: '',
        age: '',
        email: '',
        city: ''
      });

    const fetchUserData = async () => {
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        if (error) throw error;
        setInitialValues(data[0]);
      }

      const handleClick = () => {
        setEditUser(prev=>!prev);
      }

    const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
        defaultValues: {
            name: initialValues.name,
            age: initialValues.age,
            email:initialValues.email,
            city: initialValues.city
        },
        resolver: yupResolver(schemaSignup)
      });
      const onSubmit = (data: SignupData) => {
        alert('User updated!');
        updateUser(data, initialValues.email);
      }
      
      useEffect(() => {
        fetchUserData();
      }, []);

    return (
        <LoginDataWrapper>
                        Twoje konto:

                        {!editedUser ?
                        <>
                            <div>Imię: {initialValues.name}</div>
                            <div>Wiek: {initialValues.age ? 'Więcej niż 18 lat' : 'Mniej niż 18 lat'}</div>
                            <div>E-mail: {initialValues.email}</div>
                            <div>Hasło: ************</div>
                            <div>Miasto: {initialValues.city}</div>
                        </> :

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input {...register("name")} type="text" placeholder="Imię" htmlSize={20} width='auto' />
                            <p>{errors.name?.message}</p>
                            <RadioGroup>
                                <Stack direction="row" justify="center">
                                    <Radio {...register("age")} value="1">Mniej niż 18</Radio>
                                    <Radio {...register("age")} value="2">Więcej niż 18</Radio>
                                </Stack>
                            </RadioGroup>
                            <p>{errors.age?.message}</p>
                            <Input {...register("email")} readOnly className="opacity" type="text" placeholder="E-mail" htmlSize={20} width='auto' />
                            <p></p>
                            <Input {...register("password")} type="password" placeholder="Hasło" htmlSize={20} width='auto' />
                            <p>{errors.password?.message}</p>
                            <Input {...register("confirm")} type="password" placeholder="Powtórz hasło" htmlSize={20} width='auto' />
                            <p>{errors.confirm?.message}</p>
                            <Input {...register("city")} type="text" placeholder="Miasto" htmlSize={20} width='auto' />
                            <p>{errors.city?.message}</p>
                            <Button colorScheme='blue' type="submit">Zmień</Button>
                        </form>
                        }

                        <Button onClick={handleClick}>{!editedUser ? 'Edytuj' : 'Wróć'}</Button>
        </LoginDataWrapper>
    )
}
//invalid hooks call, data[0] typy, initialValues
export default MyAccount