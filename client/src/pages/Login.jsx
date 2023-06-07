import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import spacesLogo from "../img/SpacesLogo.png";
import { AuthContext } from "../context/AuthContext";

const Login = ({ socket }) => {
   const { currentUser } = useContext(AuthContext);
   const [err, setErr] = useState(false);
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      // socket.emit("newUser", { currentUser, socketID: socket.id });
      try {
         await signInWithEmailAndPassword(auth, email, password);

         navigate("/join_room");
      } catch (err) {
         setErr(true);
      }
   };
   return (
      <div className="h-screen bg-cover bg-center bg-hero-pattern">
         <div className="h-screen flex flex-col justify-center items-center">
            <img
               className="w-[231px] h-[78px] m-12"
               src={spacesLogo}
               alt="spaces"
            />
            <div className="bg-[#F0F0F0] flex flex-col items-center py-10 px-12 drop-shadow-xl rounded-[38px] max-[375px]:py-4 max-[375px]:px-4">
               <div className=" items-center font-semibold text-xl">Login</div>
               <form onSubmit={handleSubmit}>
                  <div className="my-5 ">
                     <label className="block text-md font-medium text-gray-700">
                        Email
                     </label>
                     <input
                        placeholder="Enter your Email"
                        className="w-full py-2"
                        type="email"
                     />
                  </div>
                  <div className="my-5">
                     <label className="block text-md font-medium text-gray-700">
                        Password
                     </label>
                     <input
                        placeholder="Enter your password"
                        className="w-full py-2"
                        type="password"
                        maxlength="10"
                     />
                  </div>
                  {err && (
                     <span className="flex items-center">
                        Password or Email is Incorrect
                     </span>
                  )}
                  <button className="bg-[#007CE6] hover:bg-[#0954b6] my-5 rounded-[19.5px] px-20 text-white">
                     Login
                  </button>
               </form>

               <p>
                  Don't have an account?
                  <Link
                     to="/signup"
                     className="text-decoration-line: underline text-[#007CE6] hover:text-[#0954b6]"
                  >
                     Signup.
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default Login;
