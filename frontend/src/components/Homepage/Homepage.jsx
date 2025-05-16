import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import './Homepage.css';

export default function Homepage() {
  const user = useSelector((state) => state.session.user);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="homepage-container">
      {user && <Navigation isLoaded={true} />}

      <div className="homepage-hero">
        <h1>Welcome to It&apos;s Happening</h1>
        <p>Your all-in-one event planning platform to make your special day seamless and memorable.</p>
        <p>Manage your guests, coordinate vendors, design seating charts, create mood boards, and capture your event memories — all in one place.</p>

        {!user ? (
          <div className="homepage-cta-buttons">
            <button className="homepage-cta" onClick={() => setShowLoginModal(true)}>
              Log In
            </button>
            <button className="homepage-cta secondary" onClick={() => setShowSignupModal(true)}>
              Sign Up
            </button>
          </div>
        ) : (
          <Link to="/dashboard" className="homepage-cta">
            Go to Dashboard
          </Link>
        )}
      </div>

      <div className="homepage-features">
        <h2>Plan your events effortlessly</h2>
        <ul>
          <li><strong>Guest List Management:</strong> Keep track of your attendees and RSVPs.</li>
          <li><strong>Vendor Organization:</strong> Manage your vendors with ease and clarity.</li>
          <li><strong>Mood Boards:</strong> Bring your event vision to life visually.</li>
          <li><strong>Seating Plans:</strong> Design seating arrangements with ease.</li>
          <li><strong>Photo Albums:</strong> Collect and showcase event memories.</li>
          <li><strong>Task Management:</strong> Stay organized with your to-do lists and deadlines.</li>
        </ul>
      </div>

      {showSignupModal && <SignupFormModal onClose={() => setShowSignupModal(false)} />}
      {showLoginModal && <LoginFormModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}

// import { useSelector } from 'react-redux';
// import { useState } from 'react';
// import Navigation from '../Navigation';
// import SignupFormModal from '../SignupFormModal';
// import LoginFormModal from '../LoginFormModal';
// import './Homepage.css';

// export default function Homepage() {
//   const user = useSelector((state) => state.session.user);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   return (
//     <div className="homepage-container">
//       {/* Show Nav only when logged in */}
//       {user && <Navigation isLoaded={true} />}

//       <div className="homepage-hero">
//         <h1>Welcome to It&apos;s Happening</h1>
//         <p>Your all-in-one event planning platform to make your special day seamless and memorable.</p>
//         <p>Manage your guests, coordinate vendors, design seating charts, create mood boards, and capture your event memories — all in one place.</p>

//         {!user ? (
//           <div className="homepage-cta-buttons">
//             <button className="homepage-cta" onClick={() => setShowLoginModal(true)}>
//               Log In
//             </button>
//             <button className="homepage-cta secondary" onClick={() => setShowSignupModal(true)}>
//               Sign Up
//             </button>
//           </div>
//         ) : (
//           <a href="/dashboard" className="homepage-cta">
//             Go to Dashboard
//           </a>
//         )}
//       </div>

//       <div className="homepage-features">
//         <h2>Plan your events effortlessly</h2>
//         <ul>
//           <li><strong>Guest List Management:</strong> Keep track of your attendees and RSVPs.</li>
//           <li><strong>Vendor Organization:</strong> Manage your vendors with ease and clarity.</li>
//           <li><strong>Mood Boards:</strong> Bring your event vision to life visually.</li>
//           <li><strong>Seating Plans:</strong> Design seating arrangements with ease.</li>
//           <li><strong>Photo Albums:</strong> Collect and showcase event memories.</li>
//           <li><strong>Task Management:</strong> Stay organized with your to-do lists and deadlines.</li>
//         </ul>
//       </div>

//       {/* Signup Modal */}
//       {showSignupModal && (
//         <SignupFormModal onClose={() => setShowSignupModal(false)} />
//       )}

//       {/* Login Modal */}
//       {showLoginModal && (
//         <LoginFormModal onClose={() => setShowLoginModal(false)} />
//       )}
//     </div>
//   );
// }