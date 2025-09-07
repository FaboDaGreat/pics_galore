# PicsGalore

PicsGalore, my clone project of the social media site Flickr, is for posting and showcasing beautiful amateur to professional level photography. This project uses AWS S3 for the storage and referencing of allseeders, as well as the upload and storage of all new photos posted to the site.

## Current Features

### Photos

When logged into an account, you can upload photo files directly from your computer to the site using the 'Upload New Photo' button at the top of the page. You select the photo and create a title for the post, a description and album choice is optional. You can also upload new photos directly to an existing album by selecting the 'Upload Photo to Album' button that is located in the album. New photos posted will be shown on the main feed as well as the poster's personal photos page. Photos can only be edited or deleted by the original poster.

### Albums

Users can use albums to organize their photos. When uploading a new photo, they can either select an existing album or create a new album to put their photo into. They can also do this when editing a photo as well as remove that photo from an album it is already in. A user can create new albums by going to their albums page and selecting 'Create a New Album'. Albums only require a title, the description is optional. Only the owner of the album can view, edit or delete it at this time.

### Comments

A logged in user can leave comments under any photo. Only the creator of the comment can edit it, and the comment will state that it was edited and the time that it was after an edit. The creator of the comment AND the owner of the photo are the only 2 that can delete a comment.

## Installation

If you would like to test this project out locally, first git clone it and create a local repository for it on your machine. Open this project in VSCode and then run 'npm install' in the root and in the frontend folder of this project.

```bash
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