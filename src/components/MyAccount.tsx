import {useEffect, useState} from "react"
import { Button, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SignupData, schemaSignup } from "./validations/validation";
import { useUserContext } from "../contexts/UserContext";
// import updateUser from "../api/updateUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "../supabaseClient";
import LoginDataWrapper from "./LoginDataWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import style from './MyAccount.module.css';
import { useNotificationContext } from "../contexts/NotificationContext";
// import { Input as FormInput } from './form/Input'

const MyAccount = () => {
    const {id}=useUserContext();
    const [editedUser, setEditUser] = useState(false);
    const queryClient = useQueryClient();
    const {toggleAlertSuccess}=useNotificationContext();

    const updateUser = async (values:SignupData, initialEmail:string) => {
        const { data, error } = await supabase.auth.updateUser({ email: initialEmail, password: values.password });
        if (error) throw error;
        if (data) {
            const { data:userData, error:errorData } = await supabase
            .from('users')
            .update({
                name: values.name,
                age: values.age,
                email: values.email,
                city: values.city
            })
            .eq('id', id)
            if (errorData) throw errorData;
            return userData;
        }
      }

      const mutation = useMutation(async (data:SignupData, email:string)=>await updateUser(data, email), {
        onSuccess: () => {
          queryClient.invalidateQueries(['users']);
        },
        onError: ()=>{
          throw new Error("Something went wrong :(");
        }
    });

    const fetchUserData = async () => {
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        if (error) throw error;
        return data[0];
      }

      const {data:users,isLoading,error}=useQuery(['users'],fetchUserData);

      const handleClick = () => {
        setEditUser(prev=>!prev);
      }

      useEffect(() => {
        fetchUserData();
      }, []);

    const { register, handleSubmit, formState: { errors } } = useForm<SignupData>({
        defaultValues: {
            name: users?.name,
            age: users?.age,
            email: users?.email,
            city: users?.city
        },
        resolver: yupResolver(schemaSignup)
      });
      const onSubmit = (data: SignupData) => {
        updateUser(data, users?.email);
        mutation.mutate(data, users?.email);
        toggleAlertSuccess('User updated!');
      }

      if(error){
        return <p>Cannot get data</p>
      }
    
      if (isLoading) {
        return <p>Loading...</p>;
      }

    return (
        <LoginDataWrapper>
                        <div style={{fontWeight:"bold"}}>Twoje konto:</div>

                        {!editedUser ?
                        <div className={style.userData}>
                            <div><span>Imię: </span>{users?.name}</div>
                            <div><span>Wiek: </span> {users?.age ? 'Więcej niż 18 lat' : 'Mniej niż 18 lat'}</div>
                            <div><span>E-mail: </span> {users?.email}</div>
                            <div><span>Hasło: </span> ************</div>
                            <div><span>Miasto: </span> {users?.city}</div>
                        </div> :

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
//invalid hooks call gdy updateUser jest w innym pliku, initialValues dopiero gdy zmienię zakładkę
export default MyAccount