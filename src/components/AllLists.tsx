import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "../supabaseClient";

import List from "./pages/List";

import style from './MyLists.module.css';

const AllLists = () => {
    const fetchAllLists = async () => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('archived', false)
        .eq('confirmed', false)
        if (error) throw error;
        return data;
    }
    const {data:allLists, isLoading, error}=useQuery(["allLists"],fetchAllLists);

    if (error) {
        <div>Sorry, error!</div>
    }
    if (isLoading) {
        <div>Loading data...</div>
    }

    return (
        <div>
            <div>Dostępne listy</div>
            <div className={style.listsBox}>
                {allLists?.map((values)=>(
                    <Link to={`/listdetails/${values.id}`} key={values.id}>
                        <div key={values.id}>
                            <List {...values} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AllLists