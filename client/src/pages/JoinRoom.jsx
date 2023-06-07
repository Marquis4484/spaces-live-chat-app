import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import spacesLogo from "../img/SpacesLogo.png";
import { RoomContext } from "../context/RoomContext";
import { AuthContext } from "../context/AuthContext";

const JoinRoom = ({ socket }) => {
   const { currentUser } = useContext(AuthContext);
   const { setRoom } = useContext(RoomContext);
   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault(); // prevents page reload
      let roomInfo = e.target[0].value;
      setRoom(roomInfo);
      socket.emit("joinRoom", roomInfo);

      //sends the room name, username and socket ID to the Node.js server
      socket.emit("newUser", { roomInfo, currentUser, socketID: socket.id });

      navigate("/live_chat");
   };

   return (
      <div className="h-screen bg-cover bg-center bg-hero-pattern">
         <div className="h-screen flex flex-col justify-center items-center">
            <img
               className="w-[231px] h-[78px] m-12"
               src={spacesLogo}
               alt="spaces"
            />
            <div className="bg-[#F0F0F0] flex flex-col items-center py-10 px-10 shadow rounded-[38px] max-[375px]:py-4 max-[375px]:px-4">
               <p className=" items-center font-semibold text-xl">
                  Join A Room
               </p>
               <form className="flex flex-col" onSubmit={handleSubmit}>
                  <div className="my-5">
                     <label className="block text-md font-medium text-gray-700">
                        Room Name
                     </label>
                     <input
                        placeholder="Enter any room name"
                        className="w-full py-2"
                        type="text"
                        maxLength="12"
                        required
                     />
                  </div>

                  <button className="bg-[#007CE6] hover:bg-[#0954b6] my-5 rounded-[19.5px] px-20 text-white">
                     Join Room!
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default JoinRoom;
