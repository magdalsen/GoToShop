import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import './App.css'
import 'leaflet/dist/leaflet.css';
import MyAccount from './components/MyAccount';
import MyLists from './components/MyLists';
import AddList from './components/AddList';
const Login = lazy(() => import("./components/Login"));
const Faq = lazy(() => import("./components/Faq"));
const Signup = lazy(() => import("./components/Signup"));
const Menu = lazy(() => import("./components/Menu"));

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Menu />
            <Suspense fallback={<h1>Still Loading…</h1>}>
              <Routes>
                  <Route path="/" element={<p>listy bez zalogowania</p>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/myaccount" element={<MyAccount />} />
                  <Route path="/mylists" element={<MyLists />} />
                  <Route path="/addlist" element={<AddList />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route element={<div>404</div>} path="*"/>
              </Routes>
            </Suspense>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
