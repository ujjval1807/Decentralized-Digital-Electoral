import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './HomeComponents/Navbar'
import Home from './HomeComponents/Home'
import SignUp from './HomeComponents/SignUp'
import SignIn from './HomeComponents/SignIn'

import LeftNavMenu from './UserComponents/LeftNavMenu'
import UserProfile from './UserComponents/UserProfile'
import UserVerification from './UserComponents/UserVerification'
import VoteOptions from './UserComponents/VoteOptions'
import VoteResult from './UserComponents/VoteResult'

import AdminLeftMenu from './AdminComponents/AdminLeftMenu'
import AdminSignIn from './AdminComponents/AdminSignIn'
import AdminVoting from './AdminComponents/AdminVoting'
import AdminVotersData from './AdminComponents/AdminVotersData'
import AdminResult from './AdminComponents/AdminResult'





function App() {

  const data = [
    {
      id: 1,
      name: 'Option A',
      votes: 20,
      color: '#ff0000',
    },
    {
      id: 2,
      name: 'Option B',
      votes: 30,
      color: '#00ff00',
    },
    {
      id: 3,
      name: 'Option C',
      votes: 10,
      color: '#0000ff',
    },
  ];
  return (
    <div className="App">


      <Router>
        <Routes>
          {/* DDE USER ONLY */}
          <Route path="/" element={<> <Navbar /><Home /> </>} />
          <Route path="/SignUp" element={<> <Navbar /><SignUp /> </>} />
          <Route path="/SignIn" element={<> <Navbar /><SignIn /> </>} />
          <Route path="/Voting" element={<div id="fullvoting"> <LeftNavMenu /><UserProfile/></div>}/>
          <Route path="/Voting/Verification" element={<div id="fullvoting"> <LeftNavMenu /><UserVerification /> </div>} />
          <Route path="/Voting/Vote" element={<div id="fullvoting"> <LeftNavMenu /><VoteOptions /> </div>} />
          <Route path="/Voting/Result" element={<div id="fullvoting"> <LeftNavMenu /><VoteResult data={data} /> </div>} />


          {/* DDE ADMIN ONLY */}
          <Route path="/Admin" element={<div id="afullvoting"> <AdminLeftMenu /><AdminSignIn /></div>}/>
          <Route path="/Admin/Vote" element={<div id="afullvoting"> <AdminLeftMenu /><AdminVoting /></div>}/>
          <Route path="/Admin/VotesData" element={<div id="afullvoting"> <AdminLeftMenu /><AdminVotersData /></div>}/>
          <Route path="/Admin/Result" element={<div id="afullvoting"> <AdminLeftMenu /><AdminResult /></div>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;