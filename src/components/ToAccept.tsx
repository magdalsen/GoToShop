import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import LoginDataWrapper from "./LoginDataWrapper"
import List from "./pages/List";
import style from './MyLists.module.css';
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { Button } from "@chakra-ui/react";
import { useNotificationContext } from "../contexts/NotificationContext";

const ToAccept = () => {
    const {id}=useUserContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {toggleAlertSuccess}=useNotificationContext();
    const fetchLists = async () => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('ownerId', id)
        .eq('archived', false)
        .eq('confirmed', true)
        if (error) throw error;
        return data;
    }
    const {data:lists, isLoading, error}=useQuery(["listsToAccept",id],fetchLists);

    const handleClick = async (id:number) => {
        const { data, error } = await supabase
        .from('lists')
        .update([
          { archived: true }
        ])
        .eq('id', id)
        if (error) throw error;
        toggleAlertSuccess('Lista zaakceptowana i zarchiwizowana!');
        navigate("/taskcompleted", { replace: true });
        return data;
    }

    const mutation = useMutation(async (accId:number)=>await handleClick(accId), {
        onSuccess: () => {
          queryClient.invalidateQueries(['listAccepted']);
        },
        onError: ()=>{
          throw new Error("Something went wrong :(");
        }
    });

    if (error) {
        <div>Sorry, error!</div>
    }
    if (isLoading) {
        <div>Loading data...</div>
    }

    return (
        <LoginDataWrapper>
                <div className={style.listsBox}>
                    {lists?.map((values)=>(
                        <div>
                            <div key={values.id}>
                                <List {...values} />
                            </div>
                            <div>
                                <Button colorScheme="blue" type="submit" onClick={()=>handleClick(values.id)} onChange={()=>mutation.mutate(values.id)}>Zaakceptuj listę</Button>
                            </div>
                        </div>
                    ))}
                </div>
        </LoginDataWrapper>
    )
}

export default ToAccept