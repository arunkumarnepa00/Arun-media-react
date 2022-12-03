import { configureStore } from '@reduxjs/toolkit';
import socketReducer from './socketSlice';
import newMsgReducer from './newMsgSlice';
import sentMsgReducer from './sendMsgSlice';
import onlineUsrReducer from './onlineUsrSlice';

export default configureStore({
 
    reducer:{
      socket:socketReducer,
      newMsg:newMsgReducer,
      sentMsg:sentMsgReducer,
      onlineUsr:onlineUsrReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})