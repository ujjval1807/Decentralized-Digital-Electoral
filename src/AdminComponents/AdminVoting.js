import React, { useState } from 'react';


function AdminVoting() {
    const [votingName, setVotingName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [candidates, setCandidates] = useState([]);



    const handleCandidateAdd = (candidateName, candidateImage, candidateAddress) => {
        const newCandidate = { name: candidateName, image: candidateImage, address: candidateAddress };
        setCandidates([...candidates, newCandidate]);
    };

    const handleSubmit = async () => {
        const newEntry = { name: votingName, start: startDate, end: endDate, candidates };
        try {
            const response = await fetch(`http://localhost:6012/dde/voters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            });
            if (!response.ok) {
                throw new Error('Failed to add entry to database');
            }
            setVotingName('');
            setStartDate('');
            setEndDate('');
            setCandidates([]);

        }
        catch (error) {
            console.error(error);
            // Handle error here
        }
    };

    return (
        <div id="rightcontent">
            <div className="avotingpage">
                <div className="abarbox">
                    <h2>Create Voting</h2>
                    <button className="abtn" onClick={handleSubmit}>Submit</button>
                </div>
                <div className="abarbottom">
                    <div className="avotingform">
                        <div className="ainputbox">
                            <label htmlFor="voting-name">Voting Title:</label>
                            <input type="text" id="voting-name" value={votingName} onChange={(e) => setVotingName(e.target.value)} />
                        </div>
                        <div className="ainputbox">
                            <label htmlFor="start-date">Start Date:</label>
                            <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="ainputbox">
                            <label htmlFor="end-date">End Date:</label>
                            <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>                    
                    </div>

                    <div className="acvotingform">
                        <CandidateForm onAdd={handleCandidateAdd} />
                    </div>

                    
                </div>

                <div className="candidate-list">
                    {candidates.map((candidate, index) => (
                        <div key={index} className="candidate-box">
                            <img src={candidate.image} alt={candidate.name} />
                            <div className="aCinputbox">{candidate.name}</div>
                            <div className="aCinputbox">{candidate.address}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CandidateForm({ onAdd }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(name, image, address);
        setName('');
        setImage('');
        setAddress('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="ainputbox">
                <label htmlFor="candidate-name">Candidate Name:</label>
                <input type="text" id="candidate-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="ainputbox">
                <label htmlFor="candidate-image">Candidate Image URL:</label>
                <input type="url" id="candidate-image" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className="ainputbox">
                <label htmlFor="candidate-image">Candidate Ethereum Address:</label>
                <input type="text" id="candidate-address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <button className="acandbtn" type="submit">Add Candidate</button>
        </form>
    );
}

export default AdminVoting;
