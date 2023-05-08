import { lazy, Suspense } from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AddList from './components/AddList';
import AllLists from './components/AllLists';
import {ArchivedLists} from './components/ArchivedLists';
import ListDetails from './components/ListDetails';
import MyAccount from './components/MyAccount';
import MyLists from './components/MyLists';
import SubmitList from './components/SubmitList';
import TaskCompleted from './components/TaskCompleted';
import ToAccept from './components/ToAccept';
import ToDo from './components/ToDo';
import { NotificationProvider } from './contexts/NotificationContext';
import { UserProvider } from './contexts/UserContext'

import './App.css'
import 'leaflet/dist/leaflet.css';
const Login = lazy(() => import("./components/Login"));
const Faq = lazy(() => import("./components/Faq"));
const Signup = lazy(() => import("./components/Signup"));
const Navbar = lazy(() => import("./components/Navbar"));

const queryClient=new QueryClient({
  queryCache: new QueryCache(),
   defaultOptions: {
      queries: {
        staleTime: 60_000,
        // enabled: useRouter().isReady
      }
    }
})

const App = () => (
    <>
      <NotificationProvider>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
                      {process.env.NODE_ENV === "development" && (
                    <ReactQueryDevtools position="top-right" initialIsOpen={false} />
                  )}
            <BrowserRouter>
              <Navbar />
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
                      <Route path="/archived/listdetails/:id" index element={<ListDetails />} />
                      <Route path="/submitlist/:id" index element={<SubmitList />} />
                      <Route path="/addlist" element={<AddList />} />
                      <Route path="/toaccept" element={<ToAccept />} />
                      <Route path="/todo" element={<ToDo />} />
                      <Route path="/faq" element={<Faq />} />
                      <Route path="/archived" element={<ArchivedLists />} />
                      <Route element={<div>404</div>} path="*"/>
                  </Routes>
                </Suspense>
            </BrowserRouter>
          </QueryClientProvider>
        </UserProvider>
      </NotificationProvider>
    </>
  )

export default App
