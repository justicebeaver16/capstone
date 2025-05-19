It's Happening

It's Happening is a comprehensive event planning application that serves as a one-stop solution for organizing and managing all aspects of your events. From weddings and corporate gatherings to birthday parties and conferences, our platform streamlines the entire planning process in one centralized location.

✨ Features
	•	Event Dashboard: Create and manage multiple events with detailed information
	•	Vendor Management: Track and manage vendors with location mapping
	•	Guest List & RSVPs: Manage invitations and keep a guest list
	•	Timeline & Scheduling: Keep track of appointments, deadlines, and day-of schedules

🚀 Getting Started
Prerequisites
	•	Node
	•	npm
	•	SQL
Installation
	1	Clone the repository
git clone https://github.com/justicebeaver16/capstone.git
cd capstone
	2	Install dependencies
npm install
	3	Configure environment variables
# Copy the example .env file
cp server/.env.example server/.env

# Edit the .env file with your database credentials and other settings
	4	Set up the database
# Create the database
npm run db:create

# Run migrations
npm run db:migrate

# (Optional) Seed demo data
npm run db:seed
	5	Start the development server
# Run backend and frontend concurrently
npm run dev

# Or run them separately
npm run server
npm run client

💻 Technology Stack
Frontend
	•	React
	•	Redux
	•	React Router
	•	CSS
    •   HTML
Backend
	•	Node
	•	Express
	•	Sequelize
	•	JWT
Database
	•	SQL database

📱 Mobile Responsiveness
It's Happening is designed with a mobile-first approach, ensuring a seamless experience across devices of all sizes:
	•	Desktop: Full-featured interface with advanced editing capabilities
	•	Tablet: Optimized layout for medium-sized screens
	•	Mobile: Streamlined interface for on-the-go planning and management

🔒 Security Features
	•	JWT-based authentication
	•	Password encryption
	•	CSRF protection
	•	Input validation
	•	Role-based access control

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🎉 Why Choose It's Happening?
"It's Happening" centralizes all your event planning needs in one cohesive platform. No more juggling multiple apps for different aspects of event planning - our solution provides a seamless experience from initial concept to the big day itself.
Whether you're planning your dream wedding, organizing a corporate retreat, or putting together a milestone birthday celebration, It's Happening makes the process more efficient, collaborative, and enjoyable!

Start creating unforgettable events today!
