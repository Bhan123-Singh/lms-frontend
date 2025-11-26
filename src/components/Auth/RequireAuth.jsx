
//this pages create only for check user logged or not


import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({allowedRoles}){
const {isLoggedIn,role}=useSelector((state)=>state.auth);
console.log("islggedin",isLoggedIn)
console.log('role',role)
 //useSelector for using the state comes the data from auth isLoggedin Roll
//if isloggeduser role is matched then execute the return
    /* find the role to allowedRoals array one by one which is available in allowedRoles array and 
    store the allowedRoles in myRole variable and compare to role 'myRole==role'  */

return isLoggedIn && allowedRoles.find((myRole)=>myRole==role)?(
    <Outlet/> //add the children component
):isLoggedIn?(<Navigate to='/denied'/>):(<Navigate to='/login'/>) /*  it means if user isloggedin and no have any  allowedRole role then
execute denied page ,If user not isloggedin and no have any role then the execute login page*/


}

export default RequireAuth;

/*
useSelector Hook:-> useSelector is a hook react-redux ,library provides to get hold of any state that is maintained
                    in the redux store

syntax:-> const xyz=useSelector(selector:function,equalityfn?:function)

-> selector function accepts the redux state as its argument and return a value

Example ->  BookAction.jsx
          const initiaState={
          NumberOfBooks:20
          }

          BookContainer.jsx ->
          import React from 'react'
          import {useSelector} from 'react-redux'
          function BookContainer(){
          const noOfBooks=useSelector(state=>state.NumberOfBooks)
          return(
          <> 
          <div>Book Container </div>
          <h2>  Number of Books: {noOfBooks}</h2> 
          </>)
          }

          OUTPUT-> Number of Books:20



*/
