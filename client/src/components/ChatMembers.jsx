import { useState, useEffect } from "react";

const ChatMembers = ({ socket }) => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      socket.on("newUserResponse", (data) => setUsers(data));
   }, [socket, users]);

   return (
      <div className="grid place-items-center pt-5">
         <div className="desktop:w-[230px] laptop:w-[190px] tablet:w-[150px] h-[550px] bg-[#7786F4] grid place-items-center  ">
            <div className="tablet:text-sm laptop:text-xl">Chat Members</div>
            <div className="desktop:w-[200px] laptop:w-[160px] tablet:w-[130px] h-[400px] bg-white flex items-center flex-col gap-[20px] p-5">
               {users.map((user) => (
                  <p key={user.socketID}>{user.currentUser.displayName}</p>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ChatMembers;
