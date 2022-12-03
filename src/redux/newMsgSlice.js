import { createSlice} from '@reduxjs/toolkit';

const newMsgSlice=createSlice({
    name:'newMsg',
    initialState:{
        sender:'',
        receiver:'',
        msg:''
    },
    reducers:{
       setNewMsg:(state,action)=>{
        state.sender=action.payload.userId;
        state.receiver=action.payload.friendId;
        state.msg=action.payload.text; 
       }
    }
})

export const {setNewMsg}=newMsgSlice.actions;
export default newMsgSlice.reducer;