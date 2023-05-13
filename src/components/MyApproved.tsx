import { Link, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNotificationContext } from "../contexts/NotificationContext";
import { useUserContext } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

import List from "./pages/List";
import LoginDataWrapper from "./LoginDataWrapper"

import style from './MyLists.module.css';

const MyApproved = () => {
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
        .eq('approved', true)
        if (error) throw error;
        return data;
    }
    const {data:lists, isLoading, error}=useQuery(["listsToApproveByMe",id],fetchLists);

    const handleClick = async (id:number) => {
        const { data, error } = await supabase
        .from('lists')
        .update([
          { archived: true, inprogress: false }
        ])
        .eq('id', id)
        if (error) throw error;
        toggleAlertSuccess('Lista zarchiwizowana!');
        navigate("/taskcompleted", { replace: true });
        return data;
    }

    const mutation = useMutation(async (accId:number)=>await handleClick(accId), {
        onSuccess: () => {
          queryClient.invalidateQueries(['listsToApproveByMe']);
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
        <>
        <LoginDataWrapper>
                <div className={style.listsBox}>
                    {lists?.map((values)=>(
                        <div>
                            <div key={values.id}>
                                <List {...values} />
                            </div>
                            <div>
                                <Button colorScheme="blue" type="submit" onClick={()=>handleClick(values.id)} onChange={()=>mutation.mutate(values.id)}>Zarchiwizuj listę</Button>
                                <Link to={`/repeatlist/${values.id}`}>
                                    <Button colorScheme="green" type="submit">Zrealizuj ponownie</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
        </LoginDataWrapper>
        </>
    )
}

export default MyApproved