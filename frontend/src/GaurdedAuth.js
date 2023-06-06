import { Component, useEffect, useState } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import UserService from "./services/user.service";

function GaurdedAuth({ comp}) {

  const navigate=useNavigate();
  const [Auth,setAuth]=useState(null);
  const [Password,setPassword]=useState(null);

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

  async function isAuth() {
    let name = "_aklpsk";

    var match = document.cookie.split(';');
    console.log(match)
    match=match.filter(item=>item.match(RegExp('(^| )' + name + '=([^;]+)'))).map(item=>item.split('=')).flat();
    console.log(match);
    if (match.length && match[0].match('_aklpsk') && match[1]) {
      console.log("logged in");
      setAuth(true);
    } else {
      console.log("not logged in");
      setAuth(false);
    }
    return;
  }

 // to do to check  for password set or not

  async function checkPasswordSet(){
      try{
        if(Auth){
          let user= await UserService.getUser();
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
