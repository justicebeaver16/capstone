// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import { restoreCSRF } from './store/csrf';
// import * as sessionActions from './store/session';
// import Homepage from './components/Homepage';
// import Dashboard from './components/Dashboard';
// import Vendors from './components/Vendors';
// import EditVendor from './components/Vendors/EditVendor';
// import GuestList from './components/GuestList';
// import MoodBoard from './components/MoodBoard';
// import Seating from './components/Seating';
// import PhotoAlbum from './components/PhotoAlbum';
// import Tasks from './components/Tasks';
// import ProtectedRoute from './components/ProtectedRoute';
// import Navigation from './components/Navigation';

// // Protected layout includes Nav
// function ProtectedLayout() {
//   return (
//     <>
//       <Navigation isLoaded={true} />
//       <Outlet />
//     </>
//   );
// }

// const router = createBrowserRouter([
//   { path: '/', element: <Homepage /> },
//   {
//     element: (
//       <ProtectedRoute>
//         <ProtectedLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { path: '/dashboard', element: <Dashboard /> },
//       { path: '/vendors', element: <Vendors /> },
//       { path: '/vendors/:vendorId/edit', element: <EditVendor /> },
//       { path: '/guest-list', element: <GuestList /> },
//       { path: '/mood-board', element: <MoodBoard /> },
//       { path: '/seating', element: <Seating /> },
//       { path: '/photo-album', element: <PhotoAlbum /> },
//       { path: '/tasks', element: <Tasks /> },
//     ],
//   },
// ]);

// function App() {
//   const dispatch = useDispatch();
//   const isLoaded = useSelector((state) => state.session.isLoaded);

//   useEffect(() => {
//     restoreCSRF();
//     dispatch(sessionActions.restoreUser());
//   }, [dispatch]);

//   if (!isLoaded) return null; // or a loading spinner

//   return <RouterProvider router={router} />;
// }

// export default App;

// import { useEffect } from 'react';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { restoreCSRF } from './store/csrf';
// import * as sessionActions from './store/session';
// import Homepage from './components/Homepage';
// import Dashboard from './components/Dashboard';
// import Vendors from './components/Vendors';
// import EditVendor from './components/Vendors/EditVendor';
// import GuestList from './components/GuestList';
// import MoodBoard from './components/MoodBoard';
// import Seating from './components/Seating';
// import PhotoAlbum from './components/PhotoAlbum';
// import Tasks from './components/Tasks';
// import ProtectedRoute from './components/ProtectedRoute';
// import Navigation from './components/Navigation';

// // Protected layout includes Nav
// function ProtectedLayout() {
//   return (
//     <>
//       <Navigation isLoaded={true} />
//       <Outlet />
//     </>
//   );
// }

// const router = createBrowserRouter([
//   { path: '/', element: <Homepage /> },
//   {
//     element: (
//       <ProtectedRoute>
//         <ProtectedLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { path: '/dashboard', element: <Dashboard /> },
//       { path: '/vendors', element: <Vendors /> },
//       { path: '/vendors/:vendorId/edit', element: <EditVendor /> },
//       { path: '/guest-list', element: <GuestList /> },
//       { path: '/mood-board', element: <MoodBoard /> },
//       { path: '/seating', element: <Seating /> },
//       { path: '/photo-album', element: <PhotoAlbum /> },
//       { path: '/tasks', element: <Tasks /> },
//     ],
//   },
// ]);

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     restoreCSRF();
//     dispatch(sessionActions.restoreUser());
//   }, [dispatch]);

//   return <RouterProvider router={router} />;
// }

// export default App;


import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';

import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import Vendors from './components/Vendors';
import EditVendor from './components/Vendors/EditVendor';
import GuestList from './components/GuestList';
import MoodBoard from './components/MoodBoard';
import Seating from './components/Seating';
import PhotoAlbum from './components/PhotoAlbum';
import Tasks from './components/Tasks';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';

function ProtectedLayout() {
  return (
    <>
      <Navigation isLoaded={true} />
      <Outlet />
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    restoreCSRF();

    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(true)); // always flip to true so app loads even on 401
  }, [dispatch]);

  const router = createBrowserRouter([
    { path: '/', element: <Homepage /> },
    {
      element: (
        <ProtectedRoute>
          <ProtectedLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/vendors', element: <Vendors /> },
        { path: '/vendors/:vendorId/edit', element: <EditVendor /> },
        { path: '/guest-list', element: <GuestList /> },
        { path: '/mood-board', element: <MoodBoard /> },
        { path: '/seating', element: <Seating /> },
        { path: '/photo-album', element: <PhotoAlbum /> },
        { path: '/tasks', element: <Tasks /> },
      ],
    },
  ]);

  if (!isLoaded) return <div className="app-loading">Loading...</div>; // You can style this

  return <RouterProvider router={router} />;
}

export default App;