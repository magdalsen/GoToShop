import { Control,useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormLabel, Input } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNotificationContext } from "../contexts/NotificationContext";
import { supabase } from "../supabaseClient";

import { schemaSubmitList } from "./validations/validation";
import LoginDataWrapper from "./LoginDataWrapper";

import style from './AddList.module.css';

export interface FormValues {
    spent: number
}

const SubmitList = () => {
  const {id}=useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {toggleAlertSuccess}=useNotificationContext();

const fetchListData = async () => {
    const { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('id', id)
    if (error) throw error;
    return data[0];
}
const {data:list, isLoading, error}=useQuery(["listSubmited",id],fetchListData);

  const Total = ({ control }: { control: Control<FormValues> }) => {
      const formValues = useWatch({
        name: "spent",
        control
      });
      const tip = (list?.tip*formValues/100);
      return <>
        <div>Wartość zakupów: {formValues} zł</div>
        <div>Wartość Twojego napiwku: {tip} zł</div>
      </>;
  };

  const updateList = async (value:FormValues) => {
    const tip = Number(Math.round(list?.tip*value.spent/100));
    const { data, error } = await supabase
    .from('lists')
    .update([
      { realTip: tip, confirmed: true }
    ])
    .eq('id', id)
    if (error) throw error;
    toggleAlertSuccess('Lista zatwierdzona!');
    navigate("/taskcompleted", { replace: true });
    return data;
  }

  const mutation = useMutation(async (data:FormValues)=>await updateList(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['listSubmited',id]);
    },
    onError: ()=>{
      throw new Error("Something went wrong :(");
    }
  });
      
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
        spent: 0
    },
    resolver: yupResolver(schemaSubmitList),
    mode: "onBlur"
  });
  const onSubmit = (data: FormValues) => {
    updateList(data);
    mutation.mutate(data);
  };

  if (error) {
    <div>Sorry, error!</div>
}
if (isLoading) {
    <div>Loading data...</div>
}

  return (
    <LoginDataWrapper>
      {list?.confirmed ? 'Lista czeka na zatwierdzenie.' : ''}
      <form onSubmit={handleSubmit(onSubmit)} className={list?.confirmed ? style.opacity : ''}>
        <div className={style.form}>
            <div className={style.leftColumn}>
                <div>Dane listy</div>
                <div>Nazwa listy: {list?.listName}</div>
                <div>Przewidywany wydatek: {list?.estimatedCost} zł</div>
                <div>Wartość napiwku: {list?.tip}%</div>
            </div>
            <div className={style.rightColumn}>            
                <FormLabel display="flex" justifyContent="center">Wydane</FormLabel>
                <Input {...register("spent")} type="number" htmlSize={20} width='auto' />
                <p>{errors.spent?.message}</p>
                <div>Podsumowanie</div>
                <Total control={control} />
            </div>
        </div>
        <Button colorScheme='blue' type="submit">Zatwierdź zakupy</Button>
      </form>
    </LoginDataWrapper>
  );
}

export default SubmitList