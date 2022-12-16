import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './core/Home'
import Register from "./auth/Register";
import Login from "./auth/Login";
import Profile from "./profile/Profile";
import PrivateRoutes from './auth/PrivateRoutes';
import Follow from "./follow/Follow";
import Followers from "./follow/Followers";
// import Messenger from "./messenger/Messenger";
// import ChatWindows from "./messenger/ChatWindows";



const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<PrivateRoutes />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path='/profile' element={<PrivateRoutes />}>
          <Route path=':userId' element={<Profile />} />
        </Route>
        <Route path='/find' element={<PrivateRoutes />}>
          <Route path='friends' element={<Follow />} />
        </Route>
        <Route path='/followers' element={<PrivateRoutes />}>
          <Route path='' element={<Followers />} />
        </Route>
        {/* <Route path='/messenger' element={<PrivateRoutes />}>
          <Route path='' element={<Messenger />} />
        </Route>
        <Route path='/chatWindow' element={<PrivateRoutes />}>
          <Route path=':friendId' element={<ChatWindows />} />
        </Route> */}
    
      </Routes>
    </Router>
  );
}

export default App;
