import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate} from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Routine } from './pages/Routine';
import { NotFound } from './pages/NotFound';
import { useAuth } from './AuthProvider';
import { CircularProgress } from '@mui/material';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <CircularProgress />
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>        
      <Route index element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Authentication required (MainLayout is applied) */}
      <Route path='/' element={user ? <MainLayout /> : <Navigate to="/signin" />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Route>

      {/* Authentication required (MainLayout is NOT applied) */}
      <Route path='/routine' element={user ? <Routine /> : <Navigate to="/signin" />} />
    </>
    )
  );

  return <RouterProvider router={router}/>
}

export default App
