import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'


export interface ListElement {address:string}

// export interface CounterState {
//     filtered: ListElement[]
//   }

export const filterSlice = createSlice({
    name: "filterSlice",
    initialState: {
      filtered: [] as ListElement[]
    },
    reducers: {
      addFilterElement: (state,action)=>({
        filtered: [...state.filtered, action.payload],
          }),
    //   removeFilterElementById: (state,action:PayloadAction<number>)=>{
    //     const id = action.payload
    //     return {
    //         ...state,
    //         filtered: state.filtered.filter((order: {id:number})=> order.id !== id)
    //     }
    //   }
    },
  });
  
  export const { addFilterElement } = filterSlice.actions;
  export default filterSlice.reducer;