import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Badge, Box, Button, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNotificationContext } from "../contexts/NotificationContext";
import { useUserContext } from "../contexts/UserContext";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { statusToChange } from "../redux/statusSlice";
import { buttonActive,buttonDisabled } from "../redux/takeListSlice";
import { supabase } from "../supabaseClient";

import { Products } from "./AddList";

import style from './ListDetails.module.css';

const ListDetails = () => {
    const {toggleAlertSuccess}=useNotificationContext();
    const listId = useParams();
    const {isLoggedIn,id}=useUserContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const checkedButtons=useAppSelector(state=>state.button);
    const dispatch = useAppDispatch();
    const status=useAppSelector(state=>state.status.values);
    const text=useAppSelector(state=>state.status.text);

    const updateList = async () => {
        const { data, error } = await supabase
          .from('lists')
          .update({ contractorId: id, inprogress: true })
          .eq('id', listId.id)
          if (error) throw error;
          toggleAlertSuccess('Lista dodana do realizacji!');
          navigate("/todo", { replace: true });
          return data;
    }

    const fetchList = async () => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('id', listId.id)
        if (error) throw error;
        return data[0];
    }
    const {data:list, isLoading, error}=useQuery(["listDet",listId.id],fetchList);

    const handleStateButton = () => {
      (isLoggedIn && (list?.contractorId === '' && list?.ownerId !== id)) ? dispatch(buttonActive()) : dispatch(buttonDisabled())
    }
    useEffect(()=>{
        handleStateButton();
    },[])

    useEffect(() => {
        dispatch(statusToChange({inprogress: list?.inprogress, confirmed: list?.confirmed, approved: list?.approved, archived: list?.archived}))
      }, [list]);

    if (error) {
        <div>Sorry, error!</div>
    }
    if (isLoading) {
        <div>Loading data...</div>
    }

    return (
            <div className={list?.archived ? style.opacity : '' }>
                <Box bgImage="url('./list.png')" className={style.oneList}>
                    <div>
                    <Stack direction='row' className={style.statusBox}>
                        <Badge colorScheme={status}>{text}</Badge>
                    </Stack>
                    </div>
                    <div className={style.listName}>Nazwa listy: {list?.listName}</div>
                    <div className={style.productData}>
                        <div><span className={style.elementName}>Produkty:</span>
                            <TableContainer>
                                <Table variant='simple'>
                                    <Thead>
                                        <Tr>
                                            <Th>Nazwa</Th>
                                            <Th>Ilość</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                {list?.products.map((product:Products)=>(
                                                <div key={Math.random()}>
                                                    <p>{product.name}</p>
                                                </div>
                                                ))}
                                            </Td>
                                            <Td>
                                                {list?.products.map((product:Products)=>(
                                                <div key={Math.random()}>
                                                    <p>{product.amount} {product.unit}</p>
                                                </div>
                                                ))}
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div>
                            <div><span className={style.elementName}>Szacowany koszt:</span> {list?.estimatedCost} zł</div>
                            <div><span className={style.elementName}>Napiwek:</span> {list?.tip}%</div>
                            <div><span className={style.elementName}>Data dostarczenia:</span> {list?.receiveDate}</div>
                            <div><span className={style.elementName}>Telefon:</span> {list?.phone}</div>
                            <div><span className={style.elementName}>Adres dostarczenia:</span> {list?.address}</div>
                        </div>
                    </div>
                    <div>
                        <Button colorScheme='blue' type="button" onClick={updateList} isDisabled={checkedButtons}>Chcę zrealizować</Button>
                    </div>
                    <Link to={`/submitlist/${listId.id}`} className={(location.pathname === `/listdetails/${listId.id}`) ? style.dispNone : '' }>
                        <Button colorScheme='blue' type="button">Podsumuj listę</Button>
                    </Link>
                    <Link to="/">
                        <Button colorScheme='blue' type="button">Wróć</Button>
                    </Link>
                </Box>
            </div>
    )
}

export default ListDetails