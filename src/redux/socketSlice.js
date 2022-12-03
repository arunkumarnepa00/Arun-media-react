import { createSlice} from '@reduxjs/toolkit';


const socketSlice=createSlice({
    name:'socket',
    initialState:{
        value:null
    },
    reducers:{
       setValue:(state,action)=>{
           state.value=action.payload
       }
    }
})

export const {setValue}=socketSlice.actions;
export default socketSlice.reducer;