import { createSlice} from '@reduxjs/toolkit';

const sendMsgSlice=createSlice({
    name:'sentMsg',
    initialState:{
        sender:'',
        msg:''
    },
    reducers:{
       setSentMsg:(state,action)=>{
           state.msg=action.payload.text;
           state.sender=action.payload.sender;
       }
    }
})

export const {setSentMsg}=sendMsgSlice.actions;
export default sendMsgSlice.reducer;