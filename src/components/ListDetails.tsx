import { Box, Button } from "@chakra-ui/react";
import { Products } from "./AddList";
import { supabase } from "../supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import style from './ListDetails.module.css';
import { useUserContext } from "../contexts/UserContext";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { buttonDisabled, buttonActive } from "../redux/takeListSlice";
import LoginDataWrapper from "./LoginDataWrapper";
import { useEffect } from "react";

const ListDetails = () => {
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
          .update({ contractorId: id })
          .eq('id', listId.id)
          if (error) throw error;
          alert('Lista dodana do realizacji!');
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
        <LoginDataWrapper>
            <div className={list?.archived ? style.opacity : '' }>
                <Box bgImage="url('./list.png')" className={style.oneList}>
                    <div>Nazwa listy: {list?.listName}</div>
                    <div className={style.productData}>
                        <div>Produkty:
                            <div className={style.onlyProducts}>
                                <div>
                                <p>Nazwa</p>
                                    {list?.products.map((product:Products)=>(
                                    <div key={Math.random()}>
                                        <p>{product.name}</p>
                                    </div>
                                    ))}
                                </div>
                                <div>
                                    <p>Ilość</p>
                                    {list?.products.map((product:Products)=>(
                                    <div key={Math.random()}>
                                        <p>{product.amount}</p>
                                    </div>
                                    ))}
                                </div>
                            </div>
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
        </LoginDataWrapper>
    )
}

export default ListDetails