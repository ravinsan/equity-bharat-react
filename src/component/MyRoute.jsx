import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import User from '../pages/User';
import RoleList from '../admin/role/RoleList';

export const MyRoute = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/users" element={<User/>} />
      <Route path="/roles" element={<RoleList/>} />
    </Routes>
  )
}
