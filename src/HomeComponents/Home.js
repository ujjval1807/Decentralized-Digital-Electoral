import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
    return (
        <section id="homebody">

            <div id="headbody" className="box">
                <div id="imgbox" className="subbox">
                    <img className="img" alt="image" src={process.env.PUBLIC_URL + '/home1.png'} />
                </div>
                <div className="subbox" id="note">
                    <h1 className="headtitle">Why You Need DDE?</h1>
                    <p className="headpara">
                        A Decentralized Digital Electoral is web-app that offers a secure and transparent
                        voting system that eliminates the potential for fraudulent activities, such as vote
                        tampering, as all data is securely stored and recorded on a Decentralized Ledger.
                    </p>
                    <Link to="/Voting">
                        <button id="btnhome"> Get Start</button>
                    </Link>
                </div>

            </div>

        </section>
    )
}

export default Home