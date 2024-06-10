import React, { useState, useEffect } from 'react'

function UserProfile(props) {
    const [selectedMenu, setSelectedMenu] = useState('Profile');
    const [userData, setUserData] = useState({});

    
    async function getusert (ddetoken){
        const response = await fetch(`http://localhost:6012/dde/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization : localStorage.getItem('token')
            },
        });
        const userData = await response.json();
        setUserData(userData)
    }

    useEffect(() => {
        setSelectedMenu('Profile',getusert() )
    }, []);

    async function profileupdate(event) {
        setSelectedMenu('Profile')
        getusert()
    }




    return (
        <div id="rightcontent">
            <div className="user-profile-container">
                
                <div className="promainright">
                    <div className="pronavbar">
                        <div className="pronavmenu" onClick={profileupdate} >Profile</div>
                    </div>
                    <div className="display-section">
                        {selectedMenu === 'Profile' && (
                            <div className="profile-info">
                                <div className="row">
                                    <div className="taglabel bld">
                                        <label>Name:</label>
                                    </div>
                                    <div className="taglabel">
                                        <p>{userData.name}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="taglabel bld">
                                        <label>Mobile No.:</label>
                                    </div>
                                    <div className="taglabel">
                                        <p>{userData.mobile}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="taglabel bld">
                                        <label>Email ID:</label>
                                    </div>
                                    <div className="taglabel">
                                        <p>{userData.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile