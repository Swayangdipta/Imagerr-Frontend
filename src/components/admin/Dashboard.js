import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../../utils/LS_Helper'

const Dashboard = () => {
  const {user,token} = isAuthenticated()
  return (
    <div>
      {
        user.role <= 2 && (<Navigate to="/" />)
      }
    </div>
  )
}

export default Dashboard