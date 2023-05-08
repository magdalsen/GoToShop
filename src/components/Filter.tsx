import { useState } from 'react'
import { supabase } from '../supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import List from './pages/List';
import style from './MyLists.module.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Checkbox, FormLabel } from '@chakra-ui/react';
// import { addFilterElement } from '../redux/filterSlice';
const Filter = () => {
    const [filterTags, setFilterTags] = useState([]);
    const filteredThings=useAppSelector(state=>state.filter.filtered);
    // const dispatch = useAppDispatch();
    const fetchAll = async () => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('archived', false)
        .eq('confirmed', false)
        if (error) throw error;
        return data;
    }
    const {data:allListsFilter, isLoading, error}=useQuery(["allListsFilter"],fetchAll);

  const filteredDATA = allListsFilter?.filter((el) =>
    filterTags.length > 0
      ? filterTags.map((filterTag:string) => filterTag).includes(el.address) || 
        filterTags.map((filterTag:string) => filterTag).includes(el.listName) || 
        filterTags.map((filterTag:string) => filterTag).includes(el.receiveDate)
      : allListsFilter
  )

  const filterHandler = (event: { target: { checked: any; value: any; }; }) => {
    if (event.target.checked) {
    //   dispatch(addFilterElement(...filterTags))
      setFilterTags([...filterTags, event.target.value])
    } else {
      setFilterTags(
        filterTags.filter((filterTag) => filterTag !== event.target.value)
      )
    }
  }

  if (error) {
    <div>Sorry, error!</div>
  }
  if (isLoading) {
      <div>Loading data...</div>
  }
console.log(filteredThings);
console.log(filterTags);

  return (
    <div className={style.main}>
      <div className={style.leftColumn}>
        <h3>Filtry</h3>
        <h3>Adres dostarczenia:</h3>
        {allListsFilter?.map((el)=>(
            <FormLabel htmlFor={el.address} key={el.address}>
                <Checkbox
                    onChange={filterHandler}
                    value={el.address}
                    id={el.address}
                />
                <span>{el.address}</span>
            </FormLabel>
        ))}

        <h3>Nazwa Listy:</h3>
        {allListsFilter?.map((el)=>(
            <FormLabel htmlFor={el.listName} key={el.listName}>
                <Checkbox
                    type="checkbox"
                    onChange={filterHandler}
                    value={el.listName}
                    id={el.listName}
                />
                <span>{el.listName}</span>
            </FormLabel>
        ))}

        <h3>Data dostarczenia:</h3>
        {allListsFilter?.map((el)=>(
            <FormLabel htmlFor={el.receiveDate} key={el.receiveDate}>
                <Checkbox
                    type="checkbox"
                    onChange={filterHandler}
                    value={el.receiveDate}
                    id={el.receiveDate}
                />
                <span>{el.receiveDate}</span>
            </FormLabel>
        ))}
      </div>
      <div className={style.rightColumn}>
        <h3>Dostępne listy</h3>
            <div className={style.listsBox}>
                    {filteredDATA?.map((el) => (
                        <div>
                        <Link to={`/listdetails/${el.id}`} key={el.id}>
                            <div key={el.id}>
                                <List {...el} />
                            </div>
                        </Link>
                        </div>
                    ))}
            </div>
      </div>
    </div>
  )
}

export default Filter