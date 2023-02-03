import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../base/Header'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

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
          <>
            <Header currentLocation="register" /> 
            <SignUpForm />
           </>
        )}
        
    </div>
  )
}

export default AuthPage