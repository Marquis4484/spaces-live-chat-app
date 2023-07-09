import React, { useState } from "react";
import io from "socket.io-client";
import "../App.css";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import JoinRoom from "../pages/JoinRoom";
import LiveChat from "../pages/LiveChat";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RoomContext } from "../context/RoomContext";

const socket = io.connect(
   "https://spaces-live-chat-app-9fd41b67a6cb.herokuapp.com/"
); // connecting backend with the frontend

const App = () => {
   const [room, setRoom] = useState(""); // state created to hold room information
   const { currentUser } = useContext(AuthContext); // context api used for checking who the user is and if they are logged in

   const ProtectedRoute = ({ children }) => {
      // protected route allows for only users who are logged in to application to chat
      if (!currentUser) {
         return <Navigate to="/" />;
      }

      return children;
   };
   return (
      <div className="h-screen">
         <RoomContext.Provider value={{ room, setRoom }}>
            <Routes>
               <Route exact path="/" element={<Login socket={socket} />} />
               <Route path="/signup" element={<Signup socket={socket} />} />
               <Route
                  path="/join_room"
                  element={
                     <ProtectedRoute>
                        <JoinRoom socket={socket} />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/live_chat"
                  element={
                     <ProtectedRoute>
                        <LiveChat socket={socket} />
                     </ProtectedRoute>
                  }
               />
            </Routes>
         </RoomContext.Provider>
      </div>
   );
};

export default App;
