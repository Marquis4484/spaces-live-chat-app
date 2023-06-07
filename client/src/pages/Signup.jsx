import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import spacesLogo from "../img/SpacesLogo.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Signup = ({ socket }) => {
   const navigate = useNavigate();
   const { currentUser } = useContext(AuthContext);
   const [err, setErr] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault(); // prevents page reload

      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;

      try {
         //Create user
         const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
         );

         try {
            //Update profile
            await updateProfile(res.user, {
               displayName,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
               uid: res.user.uid,
               displayName,
               email,
            });

            // socket.emit("newUser", { currentUser, socketID: socket.id });
            navigate("/join_room");
         } catch (err) {
            console.log(err);
         }
      } catch (err) {
         setErr(true);
      }
   };

   return (
      <div className="h-screen bg-cover bg-center bg-hero-pattern">
         <div className="h-screen flex flex-col justify-center items-center">
            <img
               className="w-[231px] h-[78px] m-12 max-[375px]:w-[200px] max-[375px]:h-[90px] max-[375px]:pt-[20px] "
               src={spacesLogo}
               alt="spaces"
            />
            <div className="bg-[#F0F0F0] flex flex-col items-center py-10 px-10 drop-shadow-xl rounded-[38px] max-[375px]:py-4 max-[375px]:px-4">
               <p className=" items-center font-semibold text-xl">SignUp</p>
               {/* //start of form */}{" "}
               <form
                  className="flex flex-col items-center"
                  onSubmit={handleSubmit}
               >
                  <div className="my-5">
                     <label className="block text-md font-medium text-gray-700">
                        UserName
                     </label>
                     <input
                        placeholder="Enter your username"
                        // onChange={(e) => setEmail(e.target.value)}
                        className="py-2"
                        type="text"
                        required
                        maxLength="10"
                     />
                  </div>
                  <div className="my-5">
                     <label className="block text-md font-medium text-gray-700">
                        Email
                     </label>
                     <input
                        placeholder="Enter your email"
                        // onChange={(e) => setEmail(e.target.value)}
                        className="py-2"
                        type="email"
                        required
                     />
                  </div>
                  <div className="my-5 ">
                     <label className="block text-md font-medium text-gray-700">
                        Password
                     </label>
                     <input
                        placeholder="Enter your password"
                        // onChange={(e) => setPassword(e.target.value)}
                        className=" py-2"
                        type="password"
                        required
                     />
                  </div>
                  <button className="bg-[#007CE6] hover:bg-[#0954b6] my-5 rounded-[19.5px] px-20 text-white">
                     Signup
                  </button>
               </form>
               {err && <span className="my-5">Account already exists</span>}
               <p>
                  Already have an account?
                  <Link
                     to="/"
                     className="text-decoration-line: underline hover:text-[#0954b6] text-[#007CE6]"
                  >
                     Login.
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default Signup;
