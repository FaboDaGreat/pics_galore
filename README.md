# PicsGalore  

PicsGalore is a clone of Flickr, designed for posting and showcasing photography from amateur to professional creators.  

## [🌐 Live Demo](https://pics-galore.onrender.com/)  

---

## Tech Stack  

- **Storage:** AWS S3 for persistent object storage (seeder files + user-uploaded images).  
- **Frontend:** React + Redux for predictable state management.  
- **Backend:** Express.js REST API + SQLite with Sequelize ORM.  
- **Deployment:** Render with CI/CD pipelines for both frontend and backend.  

---

## Features  

### 📸 Photos  
- Upload new photos with a title (description + album optional).  
- Upload photos directly into existing albums.  
- View photos in feed (newest → oldest).  
- View photos in an album (oldest → newest).  
- Only the original poster can edit or delete their photos.  

### 📂 Albums  
- Create new albums (title required, description optional).  
- Add/remove photos from albums.  
- Album cover = Most recent upload.  
- Empty albums display a placeholder cover.  
- Only the album owner can edit, delete, or view.  

### 💬 Comments  
- Add comments under any photo.  
- Edit your own comments (“Edited” shows next to timestamp).  
- Delete comments if you’re the comment creator or the photo owner.  
- Comments ordered oldest → newest.  

---

## Installation  

### Prerequisites  
- Node.js v20+  
- AWS S3 bucket + credentials  

### Setup  

1. Clone the repository:  
   ```bash
   git clone <repo-url>
   cd pics_galore
   ```
2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   ```
3. Configure environment variables:
   - Create a .env file inside backend folder.
   - Copy values from .env.example and update accordingly.
   - Ensure .env is gitignored.

4. Set up the database:
   ```bash
   cd backend
   npm run reset
   ```
   In this project 'npm run reset' is configured to migrate and seed for you, as well as destroy any existing database first.

5. Start backend server:
   ```bash
   cd backend
   npm start
   ```
6. Start frontend server:
   ```bash
   cd frontend
   npm run dev
   ```
7. Navigate to the local link shown in the terminal to access the app.