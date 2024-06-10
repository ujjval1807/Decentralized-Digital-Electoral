import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VoterCandidateCard from './VoterCandidateCard';

function VoteOptions() {
  const [votingData, setVotingData] = useState([]);

  function handleHasVoted(voteStatus, votingInfoId) {
    if (voteStatus) {
      setVotingData(votingData.filter((v) => v._id !== votingInfoId));
    }
  }


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
      <div id="votingcontent">
        {votingData.map((votingInfo) => (
          <div key={votingInfo._id} className="CandidateHolder">
            <div className='votingHead'>
              <h1>{votingInfo.name}</h1>
              <p>Start Date: {new Date(votingInfo.start).toDateString()}</p>
              <p>End Date: {new Date(votingInfo.end).toDateString()}</p>
            </div>
            {votingInfo.candidates && votingInfo.candidates.map((candidate) => (
              <VoterCandidateCard
              key={candidate._id}
              voterCandidateImage={candidate.image}
              voterCandidateName={candidate.name}
              voterCandidateAddress={candidate.address}
              hasVoted={(voteStatus) => handleHasVoted(voteStatus, votingInfo._id)}
            />
            
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoteOptions;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import VoterCandidateCard from './VoterCandidateCard';

// function VoteOptions() {
//   const [votingData, setVotingData] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:6012/dde/votersData');
//         setVotingData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div id="rightcontent">
//       <div id="votingcontent">

//         {votingData.map((votingInfo) => (
//           <div key={votingInfo._id} className="CandidateHolder">

//             <div className='votingHead'>
//               <h1>{votingInfo.name}</h1>
//               <p>Start Date: {new Date(votingInfo.start).toDateString()}</p>
//               <p>End Date: {new Date(votingInfo.end).toDateString()}</p>
//             </div>


//             <div style={{ display: 'flex', flexDirection: 'row' }}>
//               {votingInfo.candidates && votingInfo.candidates.map((candidate) => (
//                   <VoterCandidateCard
//                     key={candidate._id}
//                     voterCandidateImage={candidate.image}
//                     voterCandidateName={candidate.name}
//                     voterCandidateAddress={candidate.address}
//                   />
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default VoteOptions;
