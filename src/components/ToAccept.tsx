import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNotificationContext } from "../contexts/NotificationContext";
import { useUserContext } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

import List from "./pages/List";
import LoginDataWrapper from "./LoginDataWrapper"

import style from './MyLists.module.css';

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
        .eq('approved', false)
        if (error) throw error;
        return data;
    }
    const {data:lists, isLoading, error}=useQuery(["listsToAccept",id],fetchLists);

    const mutation2 = useMutation(async ()=>await fetchLists(), {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['listsToAccept',id] });
        },
        onError: ()=>{
          throw new Error("Something went wrong :(");
        }
    });

    const handleClick = async (id:number) => {
        const { data, error } = await supabase
        .from('lists')
        .update([
          { approved: true }
        ])
        .eq('id', id)
        if (error) throw error;
        toggleAlertSuccess('Lista zaakceptowana!');
        navigate("/taskcompleted", { replace: true });
        return data;
    }

    const mutation = useMutation(async (accId:number)=>await handleClick(accId), {
        onSuccess: (accId) => {
          queryClient.invalidateQueries({ queryKey: ['listAccepted',accId] });
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
                        <div key={values.id}>
                            <div>
                                <List {...values} />
                            </div>
                            <div>
                                <Button colorScheme="blue" type="submit" onClick={()=>{
                                    handleClick(values.id)
                                    mutation.mutate(values.id)
                                    mutation2.mutate(values.id)
                                }}>Zaakceptuj listę</Button>
                            </div>
                        </div>
                    ))}
                </div>
        </LoginDataWrapper>
    )
}

export default ToAccept