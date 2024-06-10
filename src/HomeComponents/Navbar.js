import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {


    function homehoverenter() {
        document.getElementById("hometext").innerHTML = "Home";
    }
    function homehoverleave() {
        document.getElementById("hometext").innerHTML = "";
    }


    function profilehoverenter() {
        document.getElementById("profiletext").innerHTML = "Profile";
    }
    function profilehoverleave() {
        document.getElementById("profiletext").innerHTML = "";
    }
    return (
        <nav>
            <div className="navbar">

                <div className="logo">
                    DDE
                </div>

                <div>
                    <ul className="menu">
                        <li id="home" onMouseOver={homehoverenter} onMouseOut={homehoverleave}>
                            <Link to="/" >
                                <i className="bx bxs-home icon"></i>
                                <span id="hometext" className="displaytext"></span>
                            </Link>
                        </li>
                        <li id="profile" onMouseOver={profilehoverenter} onMouseOut={profilehoverleave}>
                            <Link to="/SignUp">
                                <i className="bx bxs-user-circle icon"></i>
                                <span id="profiletext" className="displaytext"></span>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar