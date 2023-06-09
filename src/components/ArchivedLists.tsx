import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useUserContext } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

import List from "./pages/List";
import LoginDataWrapper from "./LoginDataWrapper";

import style from './MyLists.module.css';

export const ArchivedLists = () => {
    const {id}=useUserContext();
    const fetchArchivedLists = async () => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        .match({
            archived: true,
            inprogress: false,
        })
        if (error) throw error;
        return data;
    }
    const {data:lists, isLoading, error}=useQuery(["myListsArchived",id],fetchArchivedLists);

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
                        <Link to={`/archived/listdetails/${values.id}`} key={values.id}>
                            <div key={values.id}>
                                <List {...values} />
                            </div>
                        </Link>
                    ))}
                </div>
        </LoginDataWrapper>
    )
}
