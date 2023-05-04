import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import LoginDataWrapper from "./LoginDataWrapper"
import List from "./pages/List";
import style from './MyLists.module.css';
import { Link } from "react-router-dom";

const MyLists = () => {
    const fetchLists = async () => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        if (error) throw error;
        return data;
    }
    const {data:lists, isLoading, error}=useQuery(["lists"],fetchLists);

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

export default MyLists