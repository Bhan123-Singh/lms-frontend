
import { Route,Routes } from 'react-router-dom'; /*  react-router-dom is the standard routing library for 
React applications that run in the browser. It allows you to handle client-side routing: 
changing the browser URL without reloading the page, and rendering different components based on the URL.*/
import './App.css';

import HomePage from './Pages/HomePage';
import AboutusPage from './Pages/AboutusPage';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import CourseList from './Pages/CourseList'
import Contact from './Pages/Contact';
import Denied from './Pages/Denied';
import CourseDescription from './Pages/Course/CourseDescription';
import RequireAuth from './components/Auth/RequireAuth';
import CreateCourse from './Pages/Course/CreateCourse';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';
import Checkout from './Pages/Payment/Checkout';
 import CheckoutSuccess from './Pages/Payment/CheckoutSuccess';
 import CheckoutFailure from './Pages/Payment/CheckoutFailure';
import Displaylectures from './Pages/Dashboard/Displaylectures';
import AddLecture from './Pages/Dashboard/Addlecture';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';

function App() {
 

  return (
    <>
        <Routes>
          <Route path='/' element={<HomePage/>}> </Route>
          <Route path='/about' element={<AboutusPage/>}> </Route>

          <Route path='*' element={<NotFound/>}> </Route>
          <Route path='/signup' element={<SignUp/>}> </Route>
          <Route path='/login' element={<Login/>}> </Route>
          <Route path='/courses' element={<CourseList/>}></Route>
          <Route path='/course/description' element={<CourseDescription />}></Route>

       

          <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}> 
          <Route path='/course/create' element={<CreateCourse />}/>
          <Route path='/course/addlecture' element={<AddLecture />}/>
          <Route path='/admin/dashboard' element={<AdminDashboard />}/>
          </Route>
           
          <Route element={<RequireAuth allowedRoles={['ADMIN','USER']}/>}> 
          <Route path='/user/profile' element={<Profile/>}/>
           <Route path='/user/EditProfile' element={<EditProfile/>}/>  
           <Route path='/checkout' element={<Checkout/>}/>
           <Route path='/checkout/success' element={<CheckoutSuccess/>}/>
           <Route path='/checkout/fail' element={<CheckoutFailure/>}/>  
           <Route path='/course/displaylectures' element={<Displaylectures/>}/> 
           
          </Route>
  
          
         
          <Route path='/contact' element={<Contact/>}> </Route>
          <Route path='/denied' element={<Denied/>}> </Route>
         
       </Routes> 
    </> 
  )
}

export default App


/* 🧠 Key Concepts of react-router-dom
BrowserRouter: Wraps your app and enables routing.

Routes: Container for all your <Route> components.

Route: Matches a URL path and renders a component.

Link: Used for navigation (instead of <a>).

useNavigate, useParams, useLocation: Useful hooks for routing logic.
*/
