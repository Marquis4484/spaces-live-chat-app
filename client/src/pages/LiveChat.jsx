import { useEffect, useState } from "react";
import { Nav, ChatMembers, ChatWindow } from "../components";

import spacesLogo from "../img/SpacesLogo.png";

const LiveChat = ({ socket }) => {
   const [messages, setMessages] = useState([]);

   useEffect(() => {
      socket.on("messageResponse", (data) => setMessages([...messages, data]));
   }, [socket, messages]);

   return (
      <div className="h-screen bg-cover bg-center bg-hero-pattern">
         <div className="h-screen flex flex-col justify-center items-center">
            <img
               className="w-[231px] h-[78px] m-12"
               src={spacesLogo}
               alt="spaces"
            />
            <div className="bg-[#F0F0F0] text-lg drop-shadow-xl phone:w-[300px] desktop:w-[1200px] laptop:w-[800px] tablet:w-[600px] h-[700px] flex rounded-[38px] flex-col overflow-hidden">
               <Nav />
               <div className="flex flex-row">
                  <div className="flex-1 phone:hidden tablet:inline">
                     <ChatMembers className="phone:w-[300px]" socket={socket} />
                  </div>
                  <div className="flex-[2_2_0%]">
                     <ChatWindow message={messages} socket={socket} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LiveChat;
