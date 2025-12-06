import { Route, Routes } from "react-router"
import CandidateRegister from './pages/CandidateRegister';
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateLogin from './pages/CandidateLogin'

function App() {

  return (<>
      <Routes>
      <Route path="*" element={<CandidateLogin/>}></Route>
      <Route path="candidate/register" element={<CandidateRegister/>}></Route>
      <Route path="candidate/dashboard" element={<CandidateDashboard/>}> </Route>
      </Routes>
  </>

  )
}

export default App
