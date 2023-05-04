import { Box, Button } from "@chakra-ui/react";
import { Products } from "./AddList";
import { supabase } from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import style from './ListDetails.module.css';
import { useUserContext } from "../contexts/UserContext";

const ListDetails = () => {
    const listId = useParams();
    const {isLoggedIn,id}=useUserContext();    
    const fetchList = async () => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('id', listId.id)
        if (error) throw error;
        return data[0];
    }
    const {data:list, isLoading, error}=useQuery(["listDet",listId.id],fetchList);
console.log(list?.ownerId, id);

    const updateList = async () => {
        const { data, error } = await supabase
          .from('lists')
          .update({ contractorId: id })
          .eq('id', listId.id)
          if (error) throw error;
          if (data) {
            alert('Lista dodana do realizacji!');
            return data;
          }
      }

    if (error) {
        <div>Sorry, error!</div>
    }
    if (isLoading) {
        <div>Loading data...</div>
    }

    return (
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
                <Button colorScheme='blue' type="button" onClick={updateList} isDisabled={(isLoggedIn && list?.contractorId === '') && (isLoggedIn && list?.ownerId !== id)  ? false : true}>Chcę zrealizować</Button>
            </div>
            <Link to="/mylists">
                <Button colorScheme='blue' type="button">Wróć</Button>
            </Link>
        </Box>
    )
}

export default ListDetails