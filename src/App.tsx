import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import './App.css'
import 'leaflet/dist/leaflet.css';
import MyAccount from './components/MyAccount';
import MyLists from './components/MyLists';
import AddList from './components/AddList';
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToDo from './components/ToDo';
import TaskCompleted from './components/TaskCompleted';
import ListDetails from './components/ListDetails';
import AllLists from './components/AllLists';
import SubmitList from './components/SubmitList';
const Login = lazy(() => import("./components/Login"));
const Faq = lazy(() => import("./components/Faq"));
const Signup = lazy(() => import("./components/Signup"));
const Menu = lazy(() => import("./components/Menu"));

const queryClient=new QueryClient({
  queryCache: new QueryCache(),
   defaultOptions: {
      queries: {
        staleTime: 60_000,
        // enabled: useRouter().isReady
      }
    }
})

function App() {
  return (
    <>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
                    {process.env.NODE_ENV === "development" && (
                  <ReactQueryDevtools position="top-right" initialIsOpen={false} />
                )}
        <BrowserRouter>
          <Menu />
            <Suspense fallback={<h1>Still Loading…</h1>}>
              <Routes>
                  <Route path="/" element={<AllLists />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/myaccount" element={<MyAccount />} />
                  <Route path="/mylists" element={<MyLists />} />
                  <Route path="/taskcompleted" element={<TaskCompleted />} />
                  <Route path="/listdetails/:id" index element={<ListDetails />} />
                  <Route path="/todo/listdetails/:id" index element={<ListDetails />} />
                  <Route path="/submitlist/:id" index element={<SubmitList />} />
                  <Route path="/addlist" element={<AddList />} />
                  <Route path="/todo" element={<ToDo />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route element={<div>404</div>} path="*"/>
              </Routes>
            </Suspense>
        </BrowserRouter>
        </QueryClientProvider>
      </UserProvider>
    </>
  )
}

export default App
