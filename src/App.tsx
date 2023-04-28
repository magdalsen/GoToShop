import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
const Login = lazy(() => import("./components/Login"));
const Faq = lazy(() => import("./components/Faq"));
const Signup = lazy(() => import("./components/Signup"));
const Menu = lazy(() => import("./components/Menu"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
          <Suspense fallback={<h1>Still Loading…</h1>}>
            <Routes>
                <Route path="/" element={<p>listy bez zalogowania</p>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/faq" element={<Faq />} />
                <Route element={<div>404</div>} path="*"/>
            </Routes>
          </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
