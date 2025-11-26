import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import authSlice from  '../Redux/Slices/AuthSlice';
import { logout } from '../Redux/Slices/AuthSlice';

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
        
            <div className="drawer absolute left-0 z-50 w-fit">
                <input type="checkbox" className="drawer-toggle"  id="my-drawer"/>
                <div className='drawer-content'>
                <label htmlFor="my-drawer"
                className="cursor-pointer relative">
                    <FiMenu
                    onClick={changeWidth}
                    size={"32px"}
                    className="font-bold text-white m-4"/>

                </label>

                </div>
             
            
            <div className='drawer-side w-0 mx-10  '>
                <label htmlFor="my-drawer"
                className='drawer-overlay'></label>

                <ul className='menu p-4 w-48 sm:w-88 bg-base-200 text-base-content relative bg-gray-600 text-white'>
                    
                    <li className='w-fit absolute right-2 z-50'>
                        <button onClick={hideDrawer}>
                            < AiFillCloseCircle size={20}/>
                        </button>

                    </li>

                    <li>
                        <Link to='/'>
                        Home
                        </Link>
                    </li>
                    { isLoggedIn && role==="ADMIN" &&(
                    
                    <li>
                        <Link to="/admin/dashboard">
                        Admin DashBoard
                        </Link>
                    </li>
                    ) }

                  
                    
                    <li>
                        <Link to='/courses'> 
                         All Courses
                    
                        </Link>
                    </li>
                    <li>
                        <Link to='/contact'>
                        Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link to='/about'>
                        About Us
                        </Link>
                    </li>
                   
                    {!isLoggedIn &&(
                            <li  >
                                 <div className='w-full flex items-center justify-center'>
                                <button className='btn-primary px-4 py-1 font-semibold  rounded-md w-full bg-blue-800'>
                                    <Link to="/login">
                                    Login
                                    </Link>

                                </button>
                                <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full bg-pink-500'>
                                    <Link to="/signup">
                                    Signup
                                    </Link>

                                </button>

                            </div>
                            </li>
                    )
                }
                   

             {isLoggedIn &&(
                            <li  >
                                 <div className='w-full flex items-centet justify-center'>
                                <button className='btn-primary px-4 py-1 font-semibold  rounded-md w-full bg-blue-800'>
                                    <Link to="/user/profile">
                                    Profile
                                    </Link>

                                </button>
                                <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full bg-pink-500'>
                                    <Link to="/logout"  onClick={handlelogout}>
                                    Logout
                                    </Link>

                                </button>

                            </div>
                            </li>
                    )
                }

                                
                                
                          
                           
                    

                    

                    
                       
                    </ul>

                    </div>

                
            
            </div>

            {children}
            <Footer/>

       
        </div>
    )
}
export default HomeLayout

