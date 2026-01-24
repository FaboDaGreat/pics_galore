import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPhotoByIdThunk } from "../../store/photos";
import OpenModalButton from '../OpenModalButton';
import DeletePhotoModal from "../DeletePhotoModal";
import AddCommentModal from "../AddCommentModal";
import EditCommentModal from "../EditCommentModal";
import DeleteCommentModal from "../DeleteCommentModal";
import EditPhotoModal from "../EditPhotoModal";
import { getAlbumsByUserThunk } from "../../store/albums";
import { FaComments, FaEdit, FaTrash } from "react-icons/fa";
import './PhotoPage.css'
import { getCommentsByPhotoThunk } from "../../store/comments";

const PhotoPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const photo = useSelector((state) => state.photosReducer.byId[id]);
    const user = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albumsReducer.allAlbums);
    const albumArr = albums ? Object.values(albums) : [];
    const comments = useSelector((state) => state.commentsReducer.allComments);
    const commentArr = comments ? Object.values(comments) : [];
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const leavePhotoPage = () => {
        navigate('/my-profile/photos')
    }

    const formatTimeAgo = (createdAtDate) => {
        const createdAt = new Date(createdAtDate);
        const now = new Date();
        const secondsAgo = Math.floor((now - createdAt) / 1000);

        if (secondsAgo < 60) {
            return "Just now";
        } else if (secondsAgo < 3600) {
            return `${Math.floor(secondsAgo / 60)} ${Math.floor(secondsAgo / 60) !== 1 ? "minutes" : "minute"} ago`;
        } else if (secondsAgo < 86400) {
            return `${Math.floor(secondsAgo / 3600)} ${Math.floor(secondsAgo / 3600) !== 1 ? "hours" : "hour"} ago`;
        } else if (secondsAgo < 604800) {
            return `${Math.floor(secondsAgo / 86400)} ${Math.floor(secondsAgo / 86400) !== 1 ? "days" : "day"} ago`;
        } else if (secondsAgo < 31536000) {
            return `${Math.floor(secondsAgo / 604800)} ${Math.floor(secondsAgo / 604800) !== 1 ? "weeks" : "week"} ago`;
        } else {
            return createdAt.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
            });
        }
    };

    const goToAlbum = (e) => {
        e.preventDefault();
        navigate(`/albums/${photo.Album.id}`);
    };

    const getAllAlbums = async (photoOwner) => {
        await dispatch(getAlbumsByUserThunk(photoOwner));
    };

    useEffect(() => {
        const getPhotoDetails = async () => {

            if (!id || isNaN(id)) {
                navigate('/');
            }

            await dispatch(getPhotoByIdThunk(id));
            await dispatch(getCommentsByPhotoThunk(id));

            if (user?.id === photo?.userId) {
                await dispatch(getAlbumsByUserThunk(photo?.userId));
            }

            setIsLoaded(true);
        };

        getPhotoDetails();
    }, [id, dispatch, navigate, user?.id, photo?.userId]);

    if (!isLoaded) {
        return <h1>Loading...</h1>;
    }

    if (!photo) {
        return <div className="no-photos-box"><h1>Post not found</h1></div>;
    }

    return (
        <>
            <div className="photo-page-container">
                <div className="photo-container">
                    <div className="photo-wrapper">
                        <img
                            src={photo.url}
                            onClick={() => setIsFullScreen(true)}
                            className="clickable-photo"
                        />
                        <div className="edit-delete-box">
                            {user?.id === photo.userId && (
                                <OpenModalButton
                                    className="edit-button"
                                    tooltip="Edit Photo"
                                    modalComponent={<EditPhotoModal photo={photo} albums={albumArr} getAllAlbums={getAllAlbums} />}
                                    icon={<FaEdit size={25} />}
                                />
                            )}
                            {user?.id === photo.userId && (
                                <OpenModalButton
                                    className="delete-button"
                                    tooltip="Delete Photo"
                                    modalComponent={<DeletePhotoModal photoId={photo.id} leavePhotoPage={leavePhotoPage} />}
                                    icon={<FaTrash size={22} />}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="photo-detail-box">

                    <h3>{photo.title}</h3>
                    <strong>{user?.id === photo.userId ? "by You" : `by @${photo.User.username}`}</strong>
                    <p>{photo.description}</p>
                    {photo.Album && (
                        <h4 onClick={(e) => goToAlbum(e)}>
                            {`Album: ${photo.Album.title}`}
                        </h4>
                    )}
                    <p className="upload-date">Uploaded on {new Date(photo.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}</p>
                </div>
            </div>
            <hr />
            <div className="comment-section">
                <div className="comment-section-header">
                    <h2>
                        {`Comments (${commentArr.length})`}
                    </h2>
                    {user && (<OpenModalButton
                        buttonText="Add comment"
                        className={"comment-button"}
                        onModalClose={null}
                        modalComponent={<AddCommentModal photoId={photo.id} />}
                        icon={<FaComments />}
                    />)}
                </div>
                {commentArr.map((comment, idx) => (
                    <div key={`${idx}-${comment.id}`} className="each-comment">
                        <div className="comment-header">
                            <strong>{`@${comment.User.username}`}</strong>
                        </div>
                        <div className="comment-body">
                            <div className="comment-text-and-date">
                                <p>{comment.comment}</p>
                            </div>
                            <div className="comment-buttons">
                                <span className="comment-date-time">
                                    {formatTimeAgo(comment.createdAt)} {comment.createdAt !== comment.updatedAt && " (Edited)"}
                                </span>
                                {user?.id === comment.userId &&
                                    (<OpenModalButton
                                        buttonText="Edit"
                                        className={"edit-comment-button"}
                                        modalComponent={<EditCommentModal commentToEdit={comment} />}
                                    />)}
                                {user?.id === comment.userId || user?.id === photo.userId ?
                                    (<OpenModalButton
                                        buttonText="Delete"
                                        className="delete-comment-button"
                                        modalComponent={<DeleteCommentModal commentId={comment.id} photoOwner={photo.userId} />} />)
                                    : null}
                            </div>
                        </div>
                    </div>))}
            </div>
            {isFullScreen && (
                <div className="fullscreen-overlay" onClick={() => setIsFullScreen(false)}>
                    <img
                        src={photo.url}
                        className="fullscreen-photo"
                    />
                </div>
            )}
        </>
    );
};

export default PhotoPage;