/* eslint-disable no-console */
// import { useEffect } from "react";
import { Badge, Box, Stack } from "@chakra-ui/react";

// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { statusToChange } from "../../redux/statusSlice";
import style from "./List.module.css";

const List = ({ ...values }) => 
    // const dispatch = useAppDispatch();
    // const status=useAppSelector(state=>state.status.values);
    // const text=useAppSelector(state=>state.status.text);
    
    // useEffect(() => {
    //     dispatch(statusToChange({inprogress: values.inprogress, confirmed: values.confirmed, approved: values.approved, archived: values.archived}))
    //   }, [values]);

    // console.log({...values});
    
     (
      <Box bgImage="url('./list.png')" className={style.oneList}>
          {/* <Stack direction='row' className={style.statusBox}>
              <Badge colorScheme={status}>{text}</Badge>
          </Stack> */}
          <Stack direction='row'>
          {!values.archived && !values.confirmed && !values.approved && !values.inprogress ? <Badge colorScheme='green'>Do wzięcia</Badge> : ''}
          {values.inprogress && !values.confirmed && !values.approved && !values.archived ? <Badge colorScheme='yellow'>W realizacji</Badge> : ''}
          {values.confirmed || values.approved ? <Badge colorScheme='purple'>Zrealizowana</Badge> : ''}
          {values.archived ? <Badge colorScheme='red'>Archiwum</Badge> : ''}
          </Stack>
          <div>Nazwa listy: {values.listName}</div>
          <div>Szacowany koszt: {values.estimatedCost} zł</div>
          <div>Napiwek: {values.tip}%</div>
          <div>Data dostarczenia: {values.receiveDate}</div>
      </Box>
    )
    

export default List