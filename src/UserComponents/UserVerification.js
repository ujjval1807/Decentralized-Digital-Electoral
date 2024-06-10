import React, { useState, useEffect } from 'react';
import dummyAddress from './dummyAddress.json';

  
function getUserData(token) {
    return fetch(`http://localhost:6012/dde/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    }).then(response => response.json());
}

function ddeVerify(ddeAadhar, email, ddeAddress) {
    console.log(ddeAddress)
    return fetch(`http://localhost:6012/dde/ddeVerify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ddeAadhar, email, ddeAddress })
    });
}


function VerifyContainer({ ddeAadhar, setDdeAadhar, email, onVerify, ddeAddress }) {
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        const user = verifyUser(ddeAadhar);
        if (user) {
            const addresses = dummyAddress.address;
            const ddeAddress = addresses[Math.floor(Math.random() * addresses.length)].address;
            console.log(ddeAddress)
            onVerify(ddeAadhar, email, ddeAddress);
        } else {
            setErrorMessage('Invalid Aadhar number or mobile number.');
        }
    };

    function verifyUser(aadhar) {
        const dummyData = require('./dummy.json');
        const user = dummyData.users.find(u => u.aadhar === aadhar);
        if (user) {
            return user.mobile === user.mobile;
        } else {
            return false;
        }
    }

    return (
        <div className="VerifyContainer">
            <form onSubmit={handleSubmit} className="UserVerificationForm">
                <label>
                    Voter ID:{' '}
                    <input
                        id="userVoterIdIn"
                        type="number"
                        name="voterId"
                        placeholder="Enter Your Aadhar Card Number Link to Mobile"
                        pattern="[0-9]{12}"
                        minLength={12}
                        value={ddeAadhar}
                        onChange={event => setDdeAadhar(event.target.value)}
                    />
                </label>
                <button id="UserVerificationBtn" type="submit">
                    Verify
                </button>
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
            </form>
        </div>
    );
}

function UserVerification() {
    const [userData, setUserData] = useState({});
    const [userVerifyStatus, setUserVerifyStatus] = useState('');
    const [ddeAadhar, setDdeAadhar] = useState('');
    

    useEffect(() => {
        getUserData(localStorage.getItem('token')).then(data => setUserData(data));
    }, []);

    useEffect(() => {
        if (userData.ddeAadhar === null) {
            setUserVerifyStatus('ddeUserStatusNOTVerified');
        } else {
            setUserVerifyStatus('ddeUserStatusVerified');
        }
    }, [userData]);

    const handleVerify = async (ddeAadhar, email, ddeAddress) => {
        await ddeVerify(ddeAadhar, email, ddeAddress);
        setUserData({ ...userData, ddeAadhar, ddeAddress });
    };
    

    return (
        <div id="rightcontent">
            {userVerifyStatus === 'ddeUserStatusNOTVerified' && (
                <VerifyContainer
                    ddeAadhar={ddeAadhar}
                    setDdeAadhar={setDdeAadhar}
                    email={userData.email}
                    onVerify={handleVerify}
                />
            )}

            {userVerifyStatus === 'ddeUserStatusVerified' && (
                <div className="voting-history">User Is Verified</div>
            )}
        </div>
    )
}

export default UserVerification;


// import React, { useState, useEffect } from 'react';

// function getUserData(token) {
//     return fetch(`http://localhost:6012/dde/user`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: token
//         }
//     }).then(response => response.json());
// }

// function ddeVerify(ddeAadhar, email) {
//     return fetch(`http://localhost:6012/dde/ddeVerify`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ ddeAadhar, email })
//     });
// }

// function VerifyContainer({ ddeAadhar, setDdeAadhar, email, onVerify }) {
//     const handleSubmit = event => {
//         event.preventDefault();
//         onVerify(ddeAadhar, email);
//     };

//     return (
//         <div className="VerifyContainer">
//             <form onSubmit={handleSubmit} className="UserVerificationForm">
//                 <label>
//                     Voter ID:{' '}
//                     <input
//                         id="userVoterIdIn"
//                         type="number"
//                         name="voterId"
//                         placeholder="Enter Your Aadhar Card Number Link to Mobile"
//                         pattern="[0-9]{12}"
//                         minLength={12}
//                         value={ddeAadhar}
//                         onChange={event => setDdeAadhar(event.target.value)}
//                     />
//                 </label>
//                 <button id="UserVerificationBtn" type="submit">
//                     Verify
//                 </button>
//             </form>
//         </div>
//     );
// }

// function UserVerification() {
//     const [userData, setUserData] = useState({});
//     const [userVerifyStatus, setUserVerifyStatus] = useState('');
//     const [ddeAadhar, setDdeAadhar] = useState('');

//     useEffect(() => {
//         getUserData(localStorage.getItem('token')).then(data => setUserData(data));
//     }, []);

//     useEffect(() => {
//         if (userData.ddeAadhar === null) {
//             setUserVerifyStatus('ddeUserStatusNOTVerified');
//         } else {
//             setUserVerifyStatus('ddeUserStatusVerified');
//         }
//     }, [userData]);

//     const handleVerify = async (ddeAadhar, email) => {
//         await ddeVerify(ddeAadhar, email);
//         setUserData({ ...userData, ddeAadhar });
//     };

//     return (
//         <div id="rightcontent">
//             {userVerifyStatus === 'ddeUserStatusNOTVerified' && (
//                 <VerifyContainer
//                     ddeAadhar={ddeAadhar}
//                     setDdeAadhar={setDdeAadhar}
//                     email={userData.email}
//                     onVerify={handleVerify}
//                 />
//             )}

//             {userVerifyStatus === 'ddeUserStatusVerified' && (
//                 <div className="voting-history">User Is Verified</div>
//             )}
//         </div>
//     );
// }

// export default UserVerification;
