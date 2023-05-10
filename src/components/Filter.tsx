import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import List from './pages/List';
import style from './MyLists.module.css';
import { Checkbox, FormLabel, Input } from '@chakra-ui/react';
import { useDebounce } from './helpers/useDebounce';

const Filter = () => {
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [searchAddress, setSearchAddress]=useState("");
    const [searchListName, setListName]=useState("");
    const fetchAll = async (address="",listName="") => {
        const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('archived', false)
        .eq('confirmed', false)
        .ilike("address", `%${address}%`)
        .ilike("listName", `%${listName}%`)
        if (error) throw error;
        return data;
    }
    const {data:allListsFilter, isLoading, error}=useQuery(["allListsFilter",searchAddress,searchListName],async ()=>await fetchAll(searchAddress,searchListName));

  const filteredDATA = allListsFilter?.filter((el) =>
    filterTags.length > 0
      ? filterTags.map((filterTag:string) => filterTag).includes(el.address) || 
        filterTags.map((filterTag:string) => filterTag).includes(el.listName) || 
        filterTags.map((filterTag:string) => filterTag).includes(el.receiveDate)
      : allListsFilter
  )

  const filterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilterTags([...filterTags, event.target.value])
    } else {
      setFilterTags(
        filterTags.filter((filterTag) => filterTag !== event.target.value)
      )
    }
  }

  const changeAddress=useDebounce((e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchAddress(e.target.value)
  },700);
  const changeListName=useDebounce((e:React.ChangeEvent<HTMLInputElement>)=>{
    setListName(e.target.value)
  },700)

  const newAddressArray:string[] = [];
  const newNameArray:string[] = [];
  const newDateArray:string[] = [];
  const addressArray = () => {
      return allListsFilter?.map((el)=>{
          return newAddressArray.push(el.address)
      })
    }
    const nameArray = () => {
      return allListsFilter?.map((el)=>{
          return newNameArray.push(el.listName)
      })
    }
    const dateArray = () => {
      return allListsFilter?.map((el)=>{
          return newDateArray.push(el.receiveDate)
      })
    }
    addressArray();
    nameArray();
    dateArray();
    let newSetAddress = [...new Set(newAddressArray)];
    let newSetName = [...new Set(newNameArray)];
    let newSetDate = [...new Set(newDateArray)];

  if (error) {
    <div>Sorry, error!</div>
  }
  if (isLoading) {
      <div>Loading data...</div>
  }

  return (
    <div className={style.main}>
      <div className={style.leftColumn}>
        <h3>Filtry</h3>
        <h3>Adres dostarczenia:</h3>
        <Input onChange={changeAddress} name="address" />
        {newSetAddress?.map((el)=>(
            <FormLabel htmlFor={el} key={el}>
                <Checkbox
                    onChange={filterHandler}
                    value={el}
                    id={el}
                />
                <span>{el}</span>
            </FormLabel>
        ))}

        <h3>Nazwa Listy:</h3>
        <Input onChange={changeListName} name="listName" />
        {newSetName?.map((el)=>(
            <FormLabel htmlFor={el} key={el}>
                <Checkbox
                    type="checkbox"
                    onChange={filterHandler}
                    value={el}
                    id={el}
                />
                <span>{el}</span>
            </FormLabel>
        ))}

        <h3>Data dostarczenia:</h3>
        {newSetDate?.map((el)=>(
            <FormLabel htmlFor={el} key={el}>
                <Checkbox
                    type="checkbox"
                    onChange={filterHandler}
                    value={el}
                    id={el}
                />
                <span>{el}</span>
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