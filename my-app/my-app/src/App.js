import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import Admin from "./admin/admin";
import Manage_user from "./admin/manage_user";
import Add_user from "./admin/add_user";
import Task from "./admin/task";
import Addtask from "./admin/addtask";

import Main from "./user/main";
import Home from "./user/home"; // You forgot to import this
import Login from "./registrtaion/login";
import Register from "./registrtaion/register";
import AuthWrapper from "./validateuser";
import Ask_holiday from "./user/Ask_holiday";
import Notice from "./user/notice";
import Display from "./user/display";
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /admin/task */}
        <Route path="/" element={<Navigate to="/admin/task" replace />} />

        {/* Admin layout */}
        <Route path="/admin" element={<Admin />}>
          <Route path="task" element={<Task />} />
          <Route path="addTask" element={<Addtask />} />
          <Route path="add_user" element={<Add_user />} />
          <Route path="manage_user" element={<Manage_user />} />
        </Route>

        {/* User layout - Protected by AuthWrapper */}
        <Route
          path="/user"
          element={
            <AuthWrapper>
              <Main />
            </AuthWrapper>
          }
        >
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
            <Route path="askHoliday" element={<Ask_holiday />} />
                <Route path="notice" element={<Notice />} />
                   <Route path="display" element={<Display />} />
          
        </Route>

        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Catch-all */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
