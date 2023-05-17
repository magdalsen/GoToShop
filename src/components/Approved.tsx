import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useUserContext } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

import List from "./pages/List";
import LoginDataWrapper from "./LoginDataWrapper"

import style from './MyLists.module.css';

const Approved = () => {
    const {id}=useUserContext();
    const queryClient = useQueryClient();
    const fetchLists = async () => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('contractorId', id)
        .eq('archived', false)
        .eq('approved', true)
        if (error) throw error;
        return data;
    }
    const {data:lists, isLoading, error}=useQuery(["listsToApprove",id],fetchLists);

    // const handleClick = async (id:number) => {
    //     const { data, error } = await supabase
    //     .from('lists')
    //     .update([
    //       { archived: true }
    //     ])
    //     .eq('id', id)
    //     if (error) throw error;
    //     toggleAlertSuccess('Lista zarchiwizowana!');
    //     navigate("/taskcompleted", { replace: true });
    //     return data;
    // }

    const mutation = useMutation(async ()=>await fetchLists(), {
        onSuccess: () => {
          queryClient.invalidateQueries(['listApproved']);
        },
        onError: ()=>{
          throw new Error("Something went wrong :(");
        }
    });

    useEffect(()=>{
        mutation.mutate();
    },[]);

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
                        <div key={values.id}>
                            <div>
                                <List {...values} />
                            </div>
                            <div>
                                {/* <Button colorScheme="blue" type="submit" onClick={()=>handleClick(values.id)} onChange={()=>mutation.mutate(values.id)}>Zarchiwizuj listę</Button> */}
                                <Link to={"/"}>
                                    <Button colorScheme="green" type="button">Wróć</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
        </LoginDataWrapper>
        </>
    )
}

export default Approved