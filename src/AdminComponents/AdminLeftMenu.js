import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const handleLogout = () => {
    localStorage.removeItem('admintoken');
}

function NavLink({ to, children }) {
    const location = useLocation();
  
    return (
      <li className={location.pathname === to ? 'active' : ''}>
        <Link to={to}>{children}</Link>
      </li>
    );
  }

function AdminLeftMenu() {
  return (
    <>
            <div id="aleftmenu">

                <div id="menuhead">
                    DDE ADMIN
                </div>

                <div id="menubar">
                    <li>
                        <NavLink to="/Admin" >
                            <i className='bx bxs-notepad icon'></i>
                            <span className="text">Admin</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Admin/Vote">
                            <i className='bx bxs-select-multiple icon'></i>
                            <span className="text nav-text">Voting</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Admin/VotesData">
                            <i className='bx bxs-bar-chart-alt-2 icon'></i>
                            <span className="text nav-text">Voters Data</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Admin/Result">
                            <i className='bx bxs-bar-chart-alt-2 icon'></i>
                            <span className="text nav-text">Result</span>
                        </NavLink>
                    </li>
                </div>

                <div id="menubottom">
                    <li onClick={handleLogout}>
                        <NavLink to="#">
                            <i className='bx bx-log-out icon' ></i>
                            <span className="text nav-text">Logout</span>
                        </NavLink>
                    </li>
                </div>

            </div>
    </>
  )
}

export default AdminLeftMenu