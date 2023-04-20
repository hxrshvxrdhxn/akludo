import { Component, useEffect, useState } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import UserService from "./services/user.service";
import useAuth from "./context/AuthContext";

function GaurdedAuth({ comp}) {
  // const { auth } = useAuth();
  // console.log(auth);
  const navigate=useNavigate();
  const [Auth,setAuth]=useState(null);
  const [Password,setPassword]=useState(null);
  // useEffect(()=>{
  //   const renderComp = async () => {
  //     let name = "_aklpsk";
  //     var match = document.cookie.match(
  //       RegExp("(?:^|;\\s*)" + name + "=([^;]*)")
  //     );

  //     setAuth(!document.cookie.indexOf(name) && match[1]);
  //     console.log(Auth)
  //     if(!document.cookie.indexOf(name) && match[1]){  
  //         let user=await UserService.getUser();
  //         if (user && user.naiveAuthPass) {
  //           console.log("password set");
  //           setPassword(true);
  //         }else{
  //           console.log("password not set");
  //           setPassword(false);
  //         }
        
  //     }
  //   }
  //   renderComp();
  // },[Auth,Password]);

 console.log(Auth,Password);

  useEffect(()=>{
      isAuth();
      checkPasswordSet();
      checkAuth();
  },[Auth,Password]);


  const checkAuth=()=>{
    if(Auth!=null&&Password!=null){
      if (Auth && Password) {
        return comp;
      } else if (Auth && !Password) {
        return <Navigate to="/new-password" replace />;
      } else {
        return <Navigate to="/login" replace />;
      }   
    }else if(Auth==false ){
      return <Navigate to="/login" replace />;
    }
  }

  // const authCheck = () => {
  //   console.log(Auth, Password);
  //   if (Auth != null && Password != null) {
  //     if (Auth && Password) {
  //       return comp;
  //     } else if (Auth && !Password) {
  //       return <Navigate to="/new-password" replace />;
  //     } else {
  //       return <Navigate to="/login" replace />;
  //     }
  //   } else {
  //     return <Navigate to="/login" replace />;
  //   }
  // };

  async function isAuth() {
    let name = "_aklpsk";
    var match = document.cookie.match(
      RegExp("(?:^|;\\s*)" + name + "=([^;]*)")
    );
    if (!document.cookie.indexOf(name) && match[1]) {
      console.log("logged in");
      setAuth(true);
    } else {
      console.log("not logged in");
      setAuth(false);
    }
    return
  }

 // to do to check  for password set or not

  async function checkPasswordSet(){
      try{
        if(Auth){
          let user= await UserService.getUser();
          console.log(user)
          if(user && user.naiveAuthPass){
            console.log("password set")
            setPassword(true);
            return;
          }
          console.log("password not set");
          setPassword(false);
       }
      }catch(c){
        console.log(c);
        //show toast and navigate to another route -------
        navigate('/login');
        throw new Error(c);
      }
  }

  // return (Auth && Password ? comp : (Auth && !Password ?<Navigate to="/new-password" replace /> :<Navigate to="/login" replace />));
  return <>{checkAuth()}</>;
}

export default GaurdedAuth;
