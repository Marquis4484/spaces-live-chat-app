import React, { useContext } from "react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { RoomContext } from "../context/RoomContext";

const Nav = () => {
   const { currentUser } = useContext(AuthContext);
   const { room } = useContext(RoomContext);

   return (
      <div className="text-white bg-[#4D51D5] h-20 flex justify-between px-10 items-center">
         <div className="flex phone:gap-[20px] tablet:gap-[120px]">
            <div className="desktop:text-[20px] laptop:text-[18px] tablet:text-[15px] phone:text-[14px]">
               UserName: {currentUser.displayName}
            </div>
            <div className="desktop:text-[20px] laptop:text-[18px] tablet:text-[15px] phone:text-[14px]">
               Room Name: {room}
            </div>
         </div>
         <div className="flex gap-[4px]">
            <ArrowLeftOnRectangleIcon className=" tablet:h-8 phone:h-6" />
            <button
               className="desktop:text-[20px] laptop:text-[18px] tablet:text-[15px] phone:text-[14px]"
               onClick={() => signOut(auth)}
            >
               Logout
            </button>
         </div>
      </div>
   );
};

export default Nav;
