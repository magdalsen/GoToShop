import { useState } from 'react'
import { supabase } from '../supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import List from './pages/List';
import style from './MyLists.module.css';
const Filter = () => {
    const [filterTags, setFilterTags] = useState([]);
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

  const filteredDATA = allListsFilter?.filter((node) =>
    filterTags.length > 0
      ? filterTags.map((filterTag:string) => filterTag).includes(node.address)
      : allListsFilter
  )

  const filterHandler = (event: { target: { checked: any; value: any; }; }) => {
    if (event.target.checked) {
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

  return (
    <div className={style.main}>
      <div className={style.leftColumn}>
        <h3>Filtry</h3>
        <h3>Adres dostarczenia:</h3>
        {allListsFilter?.map((el)=>(
            <label htmlFor={el.address} key={el.address}>
                <input
                    type="checkbox"
                    onChange={filterHandler}
                    value={el.address}
                    id={el.address}
                />
                <span>{el.address}</span>
            </label>
        ))}
      </div>
      <div className={style.rightColumn}>
        <h3>Dostępne listy</h3>
            <div className={style.listsBox}>
                
                    {filteredDATA?.map((node) => (
                        <div>
                        <Link to={`/listdetails/${node.id}`} key={node.id}>
                            <div key={node.id}>
                                <List {...node} />
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