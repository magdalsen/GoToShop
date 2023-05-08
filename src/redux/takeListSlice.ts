import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const takeListSlice = createSlice({
  name: "takeListSlice",
  initialState,
  reducers: {
    buttonDisabled: () => true,
    buttonActive: () => false
  },
});

export const { buttonDisabled, buttonActive } = takeListSlice.actions;
//nasz wlasny selector do wyciągania części przechowywanego stanu
// export const selectCount=(state:RootState)=>state.counter.value
export default takeListSlice.reducer;