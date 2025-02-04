# NurseLink

NurseLink is a **Next.js** web application that allows users to **register, log in, hire nurses based on their specialty and experience, and manage them** effectively. With protected routes and secure authentication, NurseLink ensures a seamless and safe user experience.

## 🚀 Features
- **User Authentication**: Secure login and registration with **NextAuth.js**.
- **Protected Routes**: Only authenticated users can access certain pages.
- **Hire & Manage Nurses**: Users can hire nurses based on their expertise and experience and fire them when necessary.
- **Image Upload**: Cloudinary integration for nurse profile images.
- **Dashboard UI**: A well-structured interface for smooth user interaction.

## 🛠️ Technologies Used
- **Next.js** – React framework for server-side rendering and static site generation.
- **MongoDB & Mongoose** – NoSQL database for managing user and nurse data.
- **NextAuth.js** – Secure authentication and session management.
- **Cloudinary** – Image upload and storage service.
- **Bcrypt** – Password hashing for security.
- **Axios** – Handling API requests.
- **CSS Modules** – Styling components efficiently.

## 🏗️ Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js**
- **MongoDB**
- **Git**

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/nurselink.git

# Navigate to the project directory
cd nurselink

# Install dependencies
npm install  # or yarn install
```

### Environment Variables
Create a **.env.local** file in the root directory and add the following:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the Application
```bash
# Start the development server
npm run dev  # or yarn dev
```
Your app will be running at `http://localhost:3000`.

## 🚀 Deployment
The app is deployed on **Vercel**. Check it out here: **[Live Demo](https://nurselink.vercel.app/)**

## 📌 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

## 📜 License
This project is licensed under the **MIT License**.

---

Made with ❤️ by [Oteri Prince](https://github.com/terri-miles)
