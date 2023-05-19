/* eslint-disable no-console */
import { createSlice,PayloadAction } from '@reduxjs/toolkit'

interface StatusState {
    values: string;
    text: string;
  }
  
const initialState: StatusState = {
  values: '',
  text: ''
}

interface Data {
  archived: boolean;
  confirmed: boolean;
  approved: boolean;
  inprogress: boolean;
}

export const statusSlice = createSlice({
  name: "statusSlice",
  initialState,
  reducers: {
    statusToChange: (state, action:PayloadAction<Data>)=>{
        if (!action.payload.archived && !action.payload.confirmed && !action.payload.approved && !action.payload.inprogress) {
            return {
                ...state,
                values: 'green',
                text: 'Do wzięcia'
              }
        } else if (action.payload.inprogress && !action.payload.confirmed && !action.payload.approved && !action.payload.archived) {
            return {
                ...state,
                values: 'yellow',
                text: 'W realizacji'
              }
        } else if ((action.payload.confirmed || action.payload.approved) && !action.payload.archived) {
            return {
                ...state,
                values: 'purple',
                text: 'Zrealizowana'
              }
        } else if (!action.payload.inprogress && action.payload.confirmed && action.payload.approved && action.payload.archived) {
            return {
                ...state,
                values: 'red',
                text: 'Archiwum'
              }
        }

      },
  },
});

export const { statusToChange } = statusSlice.actions;
//nasz wlasny selector do wyciągania części przechowywanego stanu
// export const selectCount=(state:RootState)=>state.counter.value
export default statusSlice.reducer;