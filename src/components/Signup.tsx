import {useEffect} from "react"
import { useForm } from "react-hook-form";
import { Button, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNotificationContext } from "../contexts/NotificationContext";
import { useUserContext } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

import { schemaSignup,SignupData } from "./validations/validation";
import LocationMarker from "./LocationMarker";
// import { Input as FormInput } from './form/Input'

const Signup = () => {
    const {city}=useUserContext();
    const {toggleAlertSuccess, toggleAlertError}=useNotificationContext();
    const addUser = async (values:SignupData) => {
      const {email,password,name,age,city}=values;

      const { data, error } = await supabase.auth.signUp({ 
        email: email,
        password: password
      })
      if (error) throw error;
      if (data && data.user) {
        const { data:userData, error } = await supabase
        .from('users')
        .insert([
          { id: data.user?.id, name, email, age, city }
        ])
        if (error != null) {
          toggleAlertError("User already exist! Use different email");
          throw error;
        }
        if (userData === null) {
          toggleAlertSuccess(`Client ${values.email} registered!`);
        }
      }
    }

      useEffect(() => {
        setValue("city", city)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [city])
      

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<SignupData>({
        defaultValues: {
          name: '',
          age: '',
          email: '',
          password: '',
          city: city
        },
        resolver: yupResolver(schemaSignup)
      });
      const onSubmit = (data: SignupData) => {
        addUser(data);
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("name")} type="text" placeholder="Imię" htmlSize={20} width='auto' />
            <p>{errors.name?.message}</p>
             <RadioGroup>
                    <Stack direction="row" justify="center">
                        <Radio {...register("age")} value="false">Mniej niż 18 lat</Radio>
                        <Radio {...register("age")} value="true">Więcej niż 18 lat</Radio>
                    </Stack>
                    </RadioGroup>
            <p>{errors.age?.message}</p>
            <Input {...register("email")} type="text" placeholder="E-mail" htmlSize={20} width='auto' />
            <p>{errors.email?.message}</p>
            <Input {...register("password")} type="password" placeholder="Hasło" htmlSize={20} width='auto' />
            
            <p>{errors.password?.message}</p>
            <Input {...register("confirm")} type="password" placeholder="Powtórz hasło" htmlSize={20} width='auto' />
            <p>{errors.confirm?.message}</p>
            <div>Kliknij w mapę, aby pobrać lokalizację lub wpisz miasto</div>
            <Input {...register("city")} type="text" placeholder="Miasto" htmlSize={20} width='auto' />
            <p>{errors.city?.message}</p>
            <LocationMarker />
            <Button colorScheme='blue' type="submit">Zarejestruj</Button>
        </form>
    )
}

export default Signup