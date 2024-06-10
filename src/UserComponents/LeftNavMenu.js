import React from "react";
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
}


function NavLink({ to, children }) {
    const location = useLocation();

    return (
        <li className={location.pathname === to ? 'active' : ''}>
            <Link to={to}>{children}</Link>
        </li>
    );
}

function LeftNavMenu() {






    return (
        <>
            <div id="leftmenu">

                <div id="menuhead">
                    DDE
                </div>

                <div id="menubar">
                    <li>
                        <NavLink to="/Voting" >
                            <i className='bx bxs-notepad icon'></i>
                            <span className="text">Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Voting/Verification">
                            <i className='bx bxs-id-card icon'></i>
                            <span className="text nav-text">Verification</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Voting/Vote">
                            <i className='bx bxs-select-multiple icon'></i>
                            <span className="text nav-text">Vote</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Voting/Result">
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


export default LeftNavMenu;