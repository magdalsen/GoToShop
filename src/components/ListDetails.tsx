import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Badge, Box, Button, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNotificationContext } from "../contexts/NotificationContext";
import { useUserContext } from "../contexts/UserContext";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
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
    handleStateButton();

    const mutation = useMutation(async ()=>await fetchList(), {
        onSuccess: () => {
          queryClient.invalidateQueries(['listDet',listId.id]);
        },
        onError: ()=>{
          throw new Error("Something went wrong :(");
        }
    });

    useEffect(() => {
        mutation.mutate();
      }, []);

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
                        {!list?.archived && !list?.confirmed && !list?.approved && !list?.inprogress ? <Badge colorScheme='green'>Do wzięcia</Badge> : ''}
                        {list?.inprogress && !list?.confirmed && !list?.approved && !list?.archived ? <Badge colorScheme='yellow'>W realizacji</Badge> : ''}
                        {list?.confirmed || list?.approved ? <Badge colorScheme='purple'>Zrealizowana</Badge> : ''}
                        {list?.archived ? <Badge colorScheme='red'>Archiwum</Badge> : ''}
                    </Stack>
                    </div>
                    <div>Nazwa listy: {list?.listName}</div>
                    <div className={style.productData}>
                        <div>Produkty:
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
                            <div>Szacowany koszt: {list?.estimatedCost} zł</div>
                            <div>Napiwek: {list?.tip}%</div>
                            <div>Data dostarczenia: {list?.receiveDate}</div>
                            <div>Telefon: {list?.phone}</div>
                            <div>Adres dostarczenia: {list?.address}</div>
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