import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    

    async function handleSubmit (event){
        event.preventDefault();

        try {

            const response = await fetch(`http://localhost:6012/dde/signUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name,email,mobile,password})
            })

            const json = await response.json()
            console.log(json);
            if (json.success){
                console.log("PP22")
                navigate('/SignIn', { replace: true });
                alert("Successfully SignIn");
            }
            else{
                alert("Invalid credentials");
            }   
        }
        catch (e) {
            console.log(e);
        }
    };
    
    return (
        <section className="full_log">
            <div className="mainlog">
                <div className="subtitle">SIGN UP</div>
                <div className="subcontent">
                    <form  onSubmit={handleSubmit}>
                        <div className="field">
                            <div className="input-field">
                                <input
                                    type="name"
                                    name="username"
                                    placeholder="Enter your Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="email"
                                    name="useremail"
                                    placeholder="Enter your email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="tel"
                                    name="usermobile"
                                    placeholder="Enter your mobile number"
                                    pattern="[0-9]{10}"
                                    minLength={8}
                                    onChange={(event) => setMobile(event.target.value)}
                                    
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="password"
                                    name="userpwd"
                                    placeholder="Create password"                          
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                />
                            </div>
                        </div>
                        <div className="input-field button">
                            <input 
                                type="submit"
                                value="Submit" 
                            />
                        </div>
                        <p>
                            *already register than goto{" "}
                            <Link to="/SignIn">Sign IN</Link>{" "}
                        </p>
                    </form >
                </div>
            </div>
        </section>
    )
}

export default SignUp