import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VoteResult() {
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
export default VoteResult;

// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import Voting from '../Contracts/Voting.json';

// const web3 = new Web3(window.ethereum);

// function VoteResult() {
//     const [candidateNames, setCandidateNames] = useState([]);
//     const [voteCounts, setVoteCounts] = useState([]);

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const networkId = await web3.eth.net.getId();
//                 const deployedNetwork = Voting.networks[networkId];
//                 if (!deployedNetwork) {
//                     throw new Error('Contract not deployed on current network');
//                 }
//                 const contract = new web3.eth.Contract(
//                     Voting.abi,
//                     deployedNetwork.address,
//                 );
//                 const result = await contract.methods.getAllCandidates().call();
//                 if (!Array.isArray(result[0]) || !Array.isArray(result[1])) {
//                     throw new Error('Invalid data returned from contract');
//                 }
//                 setCandidateNames(result[0]);
//                 setVoteCounts(result[1]);
//                 setLoading(false);
//             }


//             catch (error) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         }
//         fetchData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div id="rightcontent">
//             <h2>Candidates:</h2>
//             <ul>
//                 {candidateNames.map((name, i) => (
//                     <li key={i}>
//                         {name}: {voteCounts[i]}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default VoteResult;





