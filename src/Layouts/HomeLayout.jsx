import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import authSlice from  '../Redux/Slices/AuthSlice';
import { logout } from '../Redux/Slices/AuthSlice';
import  Logo from '../assets/images/logo.jpeg';

function HomeLayout({children}){
     const dispatch=useDispatch();
      const navigate=useNavigate();
    //for checking if user loggedin
    const isLoggedIn=useSelector((state)=> state?.auth?.isLoggedIn);
    //for display option acording to role
    const role=useSelector((state)=>state?.auth?.role);

    function changeWidth(){
        const drawerSide=document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width ='auto';
    }
    function hideDrawer(){
        const element=document.getElementsByClassName("drawer-toggle");
        element[0].checked=false;
        //changeWidth();

    }
async function handlelogout(e){
        e.preventDefault();
        const res=await dispatch(logout());
        console.log("response->",res)
        if(res?.payload?.success)
            navigate('/')
    }
 
    return(
       <div className="min-h-[90vh]">

{/* -------- NAV FOR LARGE SCREENS -------- */}
<div className="hidden  lg:flex justify-between items-center bg-gray-700 text-white px-8 py-4">
   <div className="flex items-center justify-center">
  <img
    src={Logo}
    alt="logo"
    className="
      rounded-full
      object-contain
      w-20                /* mobile */
      sm:w-24            /* small screens */
      md:w-28            /* tablets */
      lg:w-32            /* laptops */
      xl:w-36            /* large screens */
      2xl:w-40           /* ultra wide screens */
      transition-all duration-500 hover:scale-105
    "
  />
</div>

    <ul className="flex gap-20 font-medium items-center py-2">
       
        <li><Link to="/">Home</Link></li>
        {isLoggedIn && role === "ADMIN" && (
            <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
        )}
        <li><Link to="/courses">All Courses</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/about">About Us</Link></li>

        {!isLoggedIn && (
            <li className="flex gap-10">
                <Link to="/login" className="bg-blue-800 px-4 py-1 rounded-md font-semibold  transition-all duration-500 hover:scale-105">Login</Link>
                <Link to="/signup" className="bg-pink-500 px-4 py-1 rounded-md font-semibold  transition-all duration-500 hover:scale-105">Signup</Link>
            </li>
        )}

        {isLoggedIn && (
            <li className="flex gap-10">
                <Link to="/user/profile" className="bg-blue-800 px-4 py-1 rounded-md font-semibold  transition-all duration-500 hover:scale-105">Profile</Link>
                <button onClick={handlelogout} className="bg-pink-500 px-4 py-1 rounded-md font-semibold transition-all duration-500 hover:scale-105">Logout</button>
            </li>
        )}
    </ul>
</div>


{/* -------- DRAWER FOR SMALL & MEDIUM SCREENS -------- */}
<div className="drawer absolute left-8 z-50 w-fit lg:hidden">
    <input type="checkbox" className="drawer-toggle" id="my-drawer" />
    <div className="drawer-content">
        
        <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu size={"32px"} className="font-bold text-white m-4"onClick={changeWidth}  />
        </label>
         
    </div>

    <div className="drawer-side w-0 mx-10">
        <label htmlFor="my-drawer" className="drawer-overlay">
            
        </label>

        <ul className="menu p-4 w-48 sm:w-88 bg-gray-600 text-white relative">
            <li className="absolute right-2 z-50">
                <button onClick={hideDrawer}>
                    <AiFillCloseCircle size={20} />
                </button>
            </li>

            <div className="w-full flex items-center  my-4">
      <img
        src={Logo}
        alt="logo"
        className="rounded-full object-contain w-12 sm:w-14 transition-all duration-500 hover:scale-105"
      />
    </div>

            <li><Link to="/">Home</Link></li>

            {isLoggedIn && role === "ADMIN" && (
                <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
            )}

            <li><Link to="/courses">All Courses</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/about">About Us</Link></li>

            {!isLoggedIn && (
                <li className="flex flex-col gap-2">
                    <Link to="/login" className="bg-blue-800 px-4 py-1 rounded-md font-semibold transition-all duration-500 hover:scale-105">Login</Link>
                    <Link to="/signup" className="bg-pink-500 px-4 py-1 rounded-md font-semibold transition-all duration-500 hover:scale-105">Signup</Link>
                </li>
            )}

            {isLoggedIn && (
                <li className="flex flex-col gap-2">
                    <Link to="/user/profile" className="bg-blue-800 px-4 py-1 rounded-md font- transition-all duration-500 hover:scale-105">Profile</Link>
                    <button onClick={handlelogout} className="bg-pink-500 px-4 py-1 rounded-md font-semibold transition-all duration-500 hover:scale-105">Logout</button>
                </li>
            )}
        </ul>
    </div>
</div>

{children}
<Footer/>

</div>

    )
}
export default HomeLayout

