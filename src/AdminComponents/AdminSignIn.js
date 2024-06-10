import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



function AdminSignIn() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {

            const response = await fetch("http://localhost:6012/dde/adminSignIn", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:email, password:password})
            })

            const json = await response.json()
            console.log(json);
            if (json.success){
                localStorage.setItem('admintoken', json.ddeadminToken)
                navigate('/Admin/Vote', { replace: true });
                alert("SignIn Successfully");
            }
            else{
                alert("Invalid credentials");
            }   
        }
        catch(error) {
            console.error(err);
        }
    };



    return (
        <div id="rightcontent">
        <section className="afull_log">
            <div className="amainlog">
                <div className="ahead">ADMIN <br></br> SIGN IN</div>
                <div className="asubcontent">
                    <form onSubmit={handleSubmit}>
                        <div className="afield">
                            <div className="ainput-field">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="ainput-field">
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="ainput-field abutton">
                            <input
                                type="submit"
                                value="Submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </div>
    )
}

export default AdminSignIn