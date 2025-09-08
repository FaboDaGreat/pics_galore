# PicsGalore

PicsGalore, a clone project of the social media site Flickr, is for posting and showcasing beautiful amateur to professional level photography. 

## Stack

- **Storage:** AWS S3 is used for persistent object storage. Seeder files and user-uploaded images are stored and retrieved directly from S3.  
- **Frontend:** React application with Redux for centralized state management and predictable state transitions.  
- **Backend:** RESTful API built with Express.js. Data persistence is handled via PostgreSQL, with Sequelize managing schema and queries.  
- **Deployment:** Both frontend and backend services are deployed on Render, with CI/CD pipelines managing build and release.  

## Current Features

### Photos

Logged in users can upload photo files directly from their computer to the site using the 'Upload New Photo' button at the top of the page. They select the photo and create a title for the post, a description and album choice is optional. Users can also upload new photos directly to an existing album by selecting the 'Upload Photo to Album' button that is located in the album. New photos posted will be shown on the main feed as well as the user's personal photos page, ordered from newest to oldest. In an album, photos are ordered from oldest to newest. Photos can only be edited or deleted by the original poster.

### Albums

Users can use albums to organize their photos. When uploading a new photo, they can either select an existing album or create a new album to put their photo into. When editing a photo users can select, create, or change the album that the photo is in. They can also just simply remove a photo from the album it is currently in. Users can also create new albums by going to their albums page and selecting 'Create a New Album'. Albums only require a title, the description is optional. The cover photo for an album is the most recently uploaded photo in that album and when there are no photos in an album, the cover photo is a blank photo. Only the owner of the album can edit, delete, or view it at this time.

### Comments

A logged in user can leave comments under any photo. Comments show the date and time that they were created underneath them. Only the creator of the comment can edit it, and the date and time under the comment will change to the date and time that it was edited with the word 'Edited' next to it. Comments are shown in order of oldest to newest underneath each photo. Only the creator of the comment or the owner of the photo can delete it.

## [[Live Link](https://pics-galore.onrender.com/)]

## Installation

If you would like to test this project out locally, first git clone it and create a local repository for it on your machine. Open this project in VSCode and then run 'npm install' in the root and in the frontend folder of this project.

```bash
npm install
cd frontend
npm install
```

Create a .env file in the backend and set up your variables as you see them in the .env.example file that is already there. Be the sure that your .env file is being gitignored. 

Run 'npm start' in the backend folder in one terminal 

```bash
cd backend
npm start
```

and in another terminal, cd into the frontend folder and run 'npm run dev' to launch the project via local host.

```bash
cd frontend
npm run dev
```

You can now access this project by navigating to the local host link shown in your frontend terminal.