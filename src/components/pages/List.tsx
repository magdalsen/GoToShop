import { Badge, Box, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../supabaseClient";

import style from "./List.module.css";

const List = ({ ...values }) => {
    const fetchList = async () => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('id', values.id)
        if (error) throw error;
        return data[0];
    }
    const {data:list, isLoading, error}=useQuery(["listDet",values.id],fetchList);

    if (error) {
        <div>Sorry, error!</div>
    }
    if (isLoading) {
        <div>Loading data...</div>
    }

    return (
        <Box bgImage="url('./list.png')" className={style.oneList}>
        <Stack direction='row'>
            {!list?.archived && !list?.confirmed && !list?.approved && !list?.inprogress ? <Badge colorScheme='green'>Do wzięcia</Badge> : ''}
            {list?.inprogress && !list?.confirmed && !list?.approved && !list?.archived ? <Badge colorScheme='yellow'>W realizacji</Badge> : ''}
            {list?.confirmed || list?.approved ? <Badge colorScheme='purple'>Zrealizowana</Badge> : ''}
            {list?.archived ? <Badge colorScheme='red'>Archiwum</Badge> : ''}
        </Stack>
        <div>Nazwa listy: {values.listName}</div>
        <div>Szacowany koszt: {values.estimatedCost} zł</div>
        <div>Napiwek: {values.tip}%</div>
        <div>Data dostarczenia: {values.receiveDate}</div>
        </Box>
    )

}

export default List