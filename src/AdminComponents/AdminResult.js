import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminResult() {
    const [votingData, setVotingData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:6012/dde/votersData');
                setVotingData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div id="rightcontent">
            <div id="votingcontent" style={{ padding: '10px', overflow: 'hidden' }}>
                {votingData.map((votingInfo) => (
                    <div key={votingInfo._id} >
                        <div className='votingHead'>
                            <h1>{votingInfo.name}</h1>
                        </div>
                        {votingInfo.candidates && votingInfo.candidates.map((candidate) => (
                            <div key={candidate._id} style={{ display: 'flex', flexDirection: 'column',padding: '10px',fontSize:'18px' }}>
                                {candidate.name}: {candidate.voteCount}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
}
export default AdminResult;