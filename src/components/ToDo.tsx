import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import LoginDataWrapper from "./LoginDataWrapper"
import List from "./pages/List";
import style from './MyLists.module.css';
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const ToDo = () => {
    const {id}=useUserContext();
    const fetchToDoLists = async () => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('contractorId', id)
        if (error) throw error;
        return data;
    }
    const {data:lists, isLoading, error}=useQuery(["listsToDo",id],fetchToDoLists);

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
                        <Link to={`/listdetails/${values.id}`} key={values.id}>
                            <div key={values.id}>
                                <List {...values} />
                            </div>
                        </Link>
                    ))}
                </div>
        </LoginDataWrapper>
    )
}

export default ToDo