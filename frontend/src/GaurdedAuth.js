
import { Component, useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import UserService from './services/user.service';

function GaurdedAuth({ comp}) {
 
  function isAuth(){
      let name='_aklpsk'
      var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
      if(!document.cookie.indexOf(name)&&match[1]){
        console.log("logged in");
        return true;
      }
      console.log("not logged in")
      return false;
  };

  // to do to check  for password set or not 

  // async function checkPasswordSet(){
  //     try{
  //       let data=await UserService.getUser();
  //       console.log(data);
  //       console.log(data.naiveAuthPass);
  //       return true;
  //     }catch(c){
  //       console.log(c)
  //       throw new Error(c);
  //     }
  // }
   
    return (isAuth() ?  comp : <Navigate to="/login" replace />);
  
  
  }
export default GaurdedAuth;