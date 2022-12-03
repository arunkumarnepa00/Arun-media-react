import { createSlice} from '@reduxjs/toolkit';

const onlineUsrSlice=createSlice({
    name:'onlineUsr',
    initialState:{
        userArr:[]
    },
    reducers:{
       setOnlineUsr:(state,action)=>{
           state.userArr=action.payload
       }
    }
})

export const {setOnlineUsr}=onlineUsrSlice.actions;
export default onlineUsrSlice.reducer;