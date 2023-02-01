import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../base/Header'
import SignInForm from './SignInForm'

const AuthPage = () => {
    const {type} = useParams()
  return (
    <div>
        {type === "in" ? (
            <>
                <Header currentLocation="login" /> 
                <SignInForm />            
            </>
        ) : (
           <Header currentLocation="register" /> 
        )}
        
    </div>
  )
}

export default AuthPage