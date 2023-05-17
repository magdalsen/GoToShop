import { useState } from "react";
import { Control,useFieldArray, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, FormLabel, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNotificationContext } from "../contexts/NotificationContext";
import { useUserContext } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

import { schemaAddList } from "./validations/validation";
import LoginDataWrapper from "./LoginDataWrapper";

import style from './AddList.module.css';

export interface Products {
    name: string;
    price: number;
    amount: number;
    unit: string;
}

export interface FormValues {
  products: Products[];
  listName: string;
  receiveDate: string;
  address: string;
  estimatedCost: number;
  tip: number;
  phone: string;
  id: number;
  ownerId: number;
  contractorId: string;
}

const AddList = () => {
  const {id}=useUserContext();
  const {toggleAlertSuccess}=useNotificationContext();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const Total = ({ control }: { control: Control<FormValues> }) => {
      const formValues = useWatch({
        name: "products",
        control
      });
      const formValues2 = useWatch({
        name: "tip",
        control
      });
      const total = formValues.reduce(
        (acc, current) => acc + (current.price || 0) * (current.amount || 0),
        0
      );
      const total2 = (total*formValues2/100)+total
      setTotalPrice(total);
      return <>
        <div>Szacowana wartość bez napiwku: {total} zł</div>
        <div>Szacowana wartość z napiwkiem: {total2} zł</div>
      </>;
  };

  const addList = async (values:FormValues) => {
    const { data:userCity, error:errorCity } = await supabase
    .from('users')
    .select('*')
    .eq('id', id);
    if (errorCity) throw errorCity;
    const { data, error } = await supabase
    .from('lists')
    .insert([
      { ...values, estimatedCost: totalPrice, ownerId: id, city: userCity[0].city }
    ])
    if (error) throw error;
    return data;
  }
      
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      products: [{ name: "", amount: 0, price: 0, unit: "" }],
      listName: "",
      receiveDate: "",
      address: "",
      tip: 0,
      phone: ""
    },
    resolver: yupResolver(schemaAddList),
    mode: "onBlur"
  });
  const { fields, append, remove } = useFieldArray({
    name: "products",
    control
  });
  const onSubmit = (data: FormValues) => {
    addList(data);
    toggleAlertSuccess('Lista dodana!');
    navigate("/taskcompleted", { replace: true });
  };

  return (
    <LoginDataWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form}>
            <div className={style.leftColumn}>
                <FormLabel display="flex" justifyContent="center">Nazwa listy</FormLabel>
                <Input {...register("listName")} type="text" placeholder="Nazwa listy" htmlSize={20} width='auto' />
                <p>{errors.listName?.message}</p>
                <TableContainer>
                  <Table variant='striped' colorScheme='teal' className={style.table}>
                  <TableCaption><Total control={control} /></TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Produkt</Th>
                        <Th>Ilość</Th>
                        <Th minWidth={160}>Jednostka</Th>
                        <Th>Cena</Th>
                        <Th>Usuń</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                    {fields.map((field, index) => (
                    <Tr key={field.id}>
                        <Td><Input {...register(`products.${index}.name` as const)} type="text" placeholder="Produkt" /></Td>
                        <Td><Input {...register(`products.${index}.amount` as const)} type="number" placeholder="Ilość" /></Td>
                        <Td><Select
                          placeholder="Wybierz"
                          {...register(`products.${index}.unit` as const)}
                        >
                          <option value="kg">kg</option>
                          <option value="g">g</option>
                          <option value="szt">szt</option>
                          <option value="l">l</option>
                          <option value="ml">ml</option>
                        </Select></Td>
                        <Td><Input {...register(`products.${index}.price` as const)} type="number" placeholder="Cena" /></Td>

                        <Td onClick={() => remove(index)}>Usuń</Td>
                        <Td key={field.id}>
                          <p>{errors?.products?.[index]?.name?.message}</p>
                          <p>{errors?.products?.[index]?.amount?.message}</p>
                          <p>{errors?.products?.[index]?.unit?.message}</p>
                          <p>{errors?.products?.[index]?.price?.message}</p>
                        </Td>
                    </Tr>
                ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Button
                  type="button"
                  onClick={() =>
                      append({
                      name: "",
                      amount: 0,
                      price: 0,
                      unit: ""
                      })
                  }
                  >
                  Dodaj produkt
                </Button>
            </div>
            <div className={style.rightColumn}>            
                <FormLabel display="flex" justifyContent="center">Napiwek w %</FormLabel>
                <Input {...register("tip")} type="number" htmlSize={20} width='auto' />
                <p>{errors.tip?.message}</p>
                <FormLabel display="flex" justifyContent="center">Termin dostarczenia</FormLabel>
                <Input {...register("receiveDate")} type="date" htmlSize={20} width='auto' />
                <p>{errors.receiveDate?.message}</p>
                <FormLabel display="flex" justifyContent="center">Adres dostarczenia</FormLabel>
                <Input {...register("address")} type="text" placeholder="np. ul. Jasna 5" htmlSize={20} width='auto' />
                <p>{errors.address?.message}</p>
                <FormLabel display="flex" justifyContent="center">Telefon kontaktowy</FormLabel>
                <Input {...register("phone")} type="text" placeholder="Telefon" htmlSize={20} width='auto' />
                <p>{errors.phone?.message}</p>
            </div>
        </div>
        <Button colorScheme='blue' type="submit">Utwórz</Button>
      </form>
    </LoginDataWrapper>
  );
}

export default AddList