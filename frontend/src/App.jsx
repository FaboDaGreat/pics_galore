import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import Splash from './components/Splash';
import ProfilePage from './components/ProfilePage';
import UploadNewPhotoPage from './components/UploadNewPhotoPage';
import PhotoPage from './components/PhotoPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import EditPhotoPage from './components/EditPhotoPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Splash />
      },
      {
        path: '/log-in',
        element: <LoginForm />
      },
      {
        path: '/sign-up',
        element: <SignupForm />
      },
      {
        path: '/my-profile',
        element: <ProfilePage />
      },
      {
        path: 'photos/:id',
        element: <PhotoPage />
      },
      {
        path: 'photos/:id/edit',
        element: <EditPhotoPage />
      },
      {
        path: 'photos/upload',
        element: <UploadNewPhotoPage />
      },
      {
        path: '*',
        element: <h1>404 Not Found</h1> 
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;