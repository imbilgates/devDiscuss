import React, { useState } from 'react';
import { useAuth } from '../contex/AuthContex';

const Nav = () => {
  const { user, error, setIsAuth, isLoading } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  }

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <nav className="navbar navbar-light bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand ms-3 fs-2 fw-bold text-info" href="/">devDiscuss</a>
          
          {/* Show input field and button only on large screens */}
          <div className="d-none d-sm-flex align-items-center">
            <input
              type="text"
              value={user.email}
              className="form-control disabled-input bg-primary text-white"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              disabled
            />
            <button className="btn btn-outline-danger ms-2" type="button" onClick={handleLogout}>Logout</button>
          </div>

          {/* Show only the Logout button on mobile */}
          <div className="d-sm-none d-flex justify-content-end">
            <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
