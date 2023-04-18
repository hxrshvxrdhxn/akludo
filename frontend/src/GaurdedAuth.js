
import { Component, useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';

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

   
    return(isAuth() ?  comp : <Navigate to="/login" replace />);
  
  
  }
export default GaurdedAuth;