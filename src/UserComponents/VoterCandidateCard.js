import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Voting from '../Contracts/Voting.json';

const web3 = new Web3('http://127.0.0.1:7545'); // Assuming Ganache is running on this URL
const contractAddress = '0x38E4b49957b9a840DfC5364A5F8c2fFB8cb3b83a'; // Replace with your contract address

const votingContract = new web3.eth.Contract(Voting.abi, contractAddress);

function VoterCandidateCard({
    voterName,
    voterAddress,
    voterCandidateImage,
    voterCandidateName,
    voterCandidateAddress,
    hasVoted,
}) {
    const [userData, setUserData] = useState({});
    const [voteStatus, setVoteStatus] = useState(false);

    useEffect(() => {
        async function getUserData(ddetoken) {
            const response = await fetch('http://localhost:6012/dde/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            });
            const userData = await response.json();
            setUserData(userData);
        }
        getUserData();
    }, []);

    const handleVote = async () => {
        try {
            const voterAddress = userData.ddeAddress;
            const candidateIndex = 0;
            await votingContract.methods.vote(candidateIndex).send({ from: voterAddress });
            alert('Vote cast successfully!');
            setVoteStatus(true);
            hasVoted(true);
        } catch (error) {
            console.error('Error casting vote:', error);
            alert('Vote is not Cast due to Technical Error');
        }
    };

    return (
        <>
            <div className="votercard">
                {!voteStatus && (
                    <div className="mainvotercard">
                        <h3 className="voterCandidateName">{voterCandidateName}</h3>
                        <img src={voterCandidateImage} alt={voterCandidateImage} className="voterimg" />
                        <button className="votebtn" onClick={handleVote}>
                            Vote
                        </button>
                    </div>
                )}
                {voteStatus && <div>You have successfully Voted</div>}
            </div>
        </>
    );
}

export default VoterCandidateCard;
// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import Voting from '../Contracts/Voting.json';

// const web3 = new Web3('http://127.0.0.1:7545'); // Assuming Ganache is running on this URL
// const contractAddress = '0x38E4b49957b9a840DfC5364A5F8c2fFB8cb3b83a'; // Replace with your contract address

// const votingContract = new web3.eth.Contract(Voting.abi, contractAddress);

// function VoterCandidateCard({
//     voterName,
//     voterAddress,
//     voterCandidateImage,
//     voterCandidateName,
//     voterCandidateAddress,
// }) {
//     const [userData, setUserData] = useState({});
//     const [voteStatus, setVoteStatus] = useState(false);

//     useEffect(() => {
//         async function getUserData(ddetoken) {
//             const response = await fetch('http://localhost:6012/dde/user', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: localStorage.getItem('token'),
//                 },
//             });
//             const userData = await response.json();
//             setUserData(userData);
//         }
//         getUserData();
//     }, []);

//     const handleVote = async () => {
//         try {
//             const voterAddress = userData.ddeAddress;
//             const candidateIndex = 0;
//             await votingContract.methods.vote(candidateIndex).send({ from: voterAddress });
//             alert('Vote cast successfully!');
//             setVoteStatus(true);
//         } catch (error) {
//             console.error('Error casting vote:', error);
//             alert('Vote is not Cast due to Technical Error');
//         }
//     };

//     return (
//         <>
//             <div className="votercard">
//                 {!voteStatus && (
//                     <div className="mainvotercard">
//                         <h3 className="voterCandidateName">{voterCandidateName}</h3>
//                         <img src={voterCandidateImage} alt={voterCandidateImage} className="voterimg" />
//                         <button className="votebtn" onClick={handleVote}>
//                             Vote
//                         </button>
//                     </div>
//                 )}
//                 {voteStatus && <div>You have Voted</div>}
//             </div>
//         </>
//     );
// }

// export default VoterCandidateCard;

