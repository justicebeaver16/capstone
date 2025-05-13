import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

// Components
import Dashboard from './components/Dashboard';
import Vendors from './components/Vendors';
import GuestList from './components/GuestList';
import MoodBoard from './components/MoodBoard';
import Seating from './components/Seating';
import PhotoAlbum from './components/PhotoAlbum';
import Tasks from './components/Tasks';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
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
        element: <Dashboard />
      },
      {
        path: '/vendors',
        element: <Vendors />
      },
      {
        path: '/guest-list',
        element: <GuestList />
      },
      {
        path: '/mood-board',
        element: <MoodBoard />
      },
      {
        path: '/seating',
        element: <Seating />
      },
      {
        path: '/photo-album',
        element: <PhotoAlbum />
      },
      {
        path: '/tasks',
        element: <Tasks />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;