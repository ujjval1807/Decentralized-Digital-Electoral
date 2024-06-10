import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function SignIn() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {

            const response = await fetch("http://localhost:6012/dde/signIn", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:email, password:password})
            })

            const json = await response.json()
            console.log(json);
            if (json.success){
                console.log("PP22")
                
                localStorage.setItem('token', json.ddeauthToken)
                navigate('/Voting', { replace: true });
                alert("Login Successfully");
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
                <div className="subtitle">SIGN IN</div>
                <div className="subcontent">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <div className="input-field">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
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
                            *not registered than goto{" "}
                            <Link to="/SignUp">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignIn