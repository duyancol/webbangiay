import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { googleLogout } from '@react-oauth/google';
export default function ButtonLoginWithGG() {
    const logout =()=>{
        googleLogout();
    }
  return (
    <div>
    <button onClick={logout}>Logout</button>
    <GoogleOAuthProvider clientId="296410397096-13ujm0dvd47r6ioghsh637i09l6nbt37.apps.googleusercontent.com"> <GoogleLogin
    onSuccess={credentialResponse => {
      var decode =jwt_decode(credentialResponse.credential)
  
       localStorage.setItem('1234567',JSON.stringify(decode));
       localStorage.setItem('6543217',JSON.stringify(credentialResponse.credential));
        fetch('http://localhost:8080/api/v1/auth/google', { method: 'POST', body: JSON.stringify({ googleIdToken: credentialResponse.credential }) });
      console.log("test 1243443 : ",decode)
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
  ;
  </GoogleOAuthProvider>;
    </div>
  )
}
