import { useState } from 'react'
// import LoginPage from './pages/LoginPage'
import RegisterForm from './components/RegisterForm';
// import LoginForm from './components/LoginForm';


function App() {
  // const [user, setUser] = useState(() => {
  //   const savedUser = sessionStorage.getItem('user');
  //   return savedUser ? JSON.parse(savedUser) : null;
  // });

  // if (!user) {
  //   return <LoginPage onLoginSuccess={setUser} />;
  // }

  return (
    <>
     {/* <LoginForm /> */}
     <RegisterForm/>
    </>
    // <div>
    //   <h1>Welcome, {user.email}</h1>
    //   {/* Render your logged-in app UI */}
    //   <button onClick={() => {
    //     sessionStorage.clear();
    //     setUser(null);
    //   }}>Logout</button>
    // </div>
  );
}


export default App
