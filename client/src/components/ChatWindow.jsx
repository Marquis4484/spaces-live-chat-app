import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { RoomContext } from "../context/RoomContext";

const ChatWindow = ({ socket }) => {
   const { currentUser } = useContext(AuthContext);
   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([]);
   const { room } = useContext(RoomContext);
   const lastMessageRef = useRef(null);

   const handleSendMessage = async (e) => {
      e.preventDefault();
      if (message.trim()) {
         const messageData = {
            room: room,
            text: message,
            name: currentUser.displayName,
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
         };
         await socket.emit("message", messageData);
         setMessages((list) => [...list, messageData]);
         setMessage("");
      }
   };

   useEffect(() => {
      socket.on("messageResponse", (data) => {
         setMessages([...messages, data]);
      });
   }, [socket, messages]);

   useEffect(() => {
      // scrolls to the bottom every time messages change
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   return (
      <div className="flex justify-center items-center pt-5">
         <div className="desktop:w-[700px] laptop:w-[500px] tablet:w-[390px] phone:w-[280px] h-[550px] bg-[#7786F4] grid place-items-center ">
            <div>Chat Window</div>
            <div className="h-[400px] desktop:w-[600px] laptop:w-[430px] tablet:w-[350px] phone:w-[250px] bg-white overflow-auto ">
               <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col m-[10px]">
                     {messages.map((message) =>
                        message.name === currentUser.displayName ? (
                           <div
                              className="text-[13px] justify-end"
                              key={message.id}
                           >
                              <p className="text-right">You</p>
                              <div className="bg-[#007CE6] p-2 ml-auto text-sm max-w-[200px] rounded-[12px]">
                                 <p>{message.text}</p>
                              </div>
                           </div>
                        ) : (
                           <div
                              className="text-[13px]  align-end"
                              key={message.id}
                           >
                              <p>{message.name}</p>
                              <div className="bg-[#F7AC2A] p-2 text-sm w-[200px] rounded-[12px]">
                                 <p>{message.text}</p>
                              </div>
                           </div>
                        )
                     )}

                     <div className="message__status"></div>
                     <div ref={lastMessageRef} />
                  </div>
               </div>
            </div>
            <div className="flex py-8 px-2 phone:w-full h-full bg-[#4D51D5] items-center">
               <form className="form" onSubmit={handleSendMessage}>
                  <input
                     type="text"
                     placeholder="Write message"
                     className="desktop:w-[620px] laptop:w-[420px] tablet:w-[310px] phone:w-[200px]"
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="sendBtn px-3 bg-[#007CE6]">Send</button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default ChatWindow;
