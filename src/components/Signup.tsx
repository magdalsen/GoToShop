import { Button, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaSignup } from "./pages/validation";

export interface SignupData {
    name: string;
    age: string;
    email: string;
    password: string;
    confirm: string;
    image: string;
}

const Signup = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<SignupData>({
        defaultValues: {
          name: '',
          age: '',
          email: '',
          password: '',
          confirm: '',
          image: ''
        },
        resolver: yupResolver(schemaSignup)
      });
      const onSubmit = (data: SignupData) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} type="text" placeholder="Imię" htmlSize={20} width='auto' />}
            />
            <p>{errors.name?.message}</p>
            <Controller
                name="age"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <RadioGroup onChange={onChange} value={value}>
                    <Stack direction="row" justify="center">
                        <Radio value="1">Mniej niż 18</Radio>
                        <Radio value="2">Więcej niż 18</Radio>
                    </Stack>
                    </RadioGroup>
                )}
            />
            <p>{errors.age?.message}</p>
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
            <Controller
                name="confirm"
                control={control}
                render={({ field }) => <Input {...field} type="password" placeholder="Powtórz hasło" htmlSize={20} width='auto' />}
            />
            <p>{errors.confirm?.message}</p>
            <Controller
                name="image"
                control={control}
                render={({ field }) => <Input {...field} type="text" placeholder="Avatar" htmlSize={20} width='auto' />}
            />
            <p>{errors.image?.message}</p>
            <Button colorScheme='blue' type="submit">Zarejestruj</Button>
        </form>
    )
}

export default Signup