import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import Splash from './components/Splash';
import ProfilePage from './components/ProfilePage';
import UploadNewPhotoPage from './components/UploadNewPhotoPage';

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
        path: '/profile',
        element: <ProfilePage />
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