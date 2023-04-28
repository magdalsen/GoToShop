import { Button, Input } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from "./pages/validation";

export interface LoginData {
    email: string,
    password: string
}

const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
        defaultValues: {
          email: '',
          password: ''
        },
        resolver: yupResolver(schemaLogin)
      });
      const onSubmit = (data: LoginData) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} type="email" placeholder="E-mail" htmlSize={20} width='auto' />}
            />
            <p>{errors.email?.message}</p>
            <Controller
                name="password"
                control={control}
                render={({ field }) => <Input {...field} type="password" placeholder="Hasło" htmlSize={20} width='auto' />}
            />
            <p>{errors.password?.message}</p>
            <Button colorScheme='blue' type="submit">Zaloguj</Button>
        </form>
    )
}

export default Login