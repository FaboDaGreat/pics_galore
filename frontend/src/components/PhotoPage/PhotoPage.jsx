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
import './PhotoPage.css'
import { getAlbumsByUserThunk } from "../../store/albums";
import { FaComments, FaEdit, FaTrash } from "react-icons/fa";

const PhotoPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const photo = useSelector((state) => state.photosReducer.byId[id]);
    const user = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albumsReducer.allAlbums);
    const albumArr = albums ? Object.values(albums) : [];
    const comments = photo?.Comments;
    const ownerId = photo?.userId;
    const commentArr = comments ? Object.values(comments) : [];
    const [isLoaded, setIsLoaded] = useState(false);

    const leavePhotoPage = () => {
        navigate('/my-profile/photos')
    }

    useEffect(() => {
        const getPhotoDetails = async () => {
            if (id && !isNaN(id)) {
                await dispatch(getPhotoByIdThunk(id));
                await dispatch(getAlbumsByUserThunk(ownerId));
                setIsLoaded(true);
            } else {
                navigate('/');
            }
        };
        if (!isLoaded) {
            getPhotoDetails();
        }
    }, [id, dispatch, navigate, isLoaded, ownerId]);

    if (!photo) {
        return <div className="no-photos-box"><h1>Post not found</h1></div>;
    }

    if (!isLoaded) {
        return <h1>Loading...</h1>;
    }
    else {
        return (
            <>
                <div className="photo-page-container">
                    <div className="photo-container">
                        <img src={photo.url} />
                    </div>
                    <div className="photo-detail-box">
                        <h3>{`@${photo.username}`}</h3>
                        <h3>{photo.title}</h3>
                        <p>{photo.description}</p>
                        <p>Uploaded on {new Date(photo.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}</p>
                        <div className="edit-delete-box">
                            {user?.id === photo.userId && (
                                <OpenModalButton
                                    className={"edit-button"}
                                    tooltip={"Edit Photo"}
                                    onModalClose={null}
                                    modalComponent={<EditPhotoModal photo={photo} albums={albumArr} />}
                                    icon={<FaEdit size={25} />}
                                />
                            )}
                            {user?.id === photo.userId && (
                                <OpenModalButton
                                    className={"delete-button"}
                                    tooltip={"Delete Photo"}
                                    onModalClose={null}
                                    modalComponent={<DeletePhotoModal photoId={photo.id} leavePhotoPage={leavePhotoPage} />}
                                    icon={<FaTrash size={22} />}
                                />
                            )}
                        </div>
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
                                <strong>{`@${comment.username}`}</strong>
                            </div>
                            <div className="comment-body">
                                <div className="comment-text-and-date">
                                    <p>{comment.comment}</p>
                                </div>
                                <div className="comment-buttons">
                                    {user?.id === comment.userId &&
                                        (<OpenModalButton
                                            buttonText="Edit"
                                            className={"edit-comment-button"}
                                            modalComponent={<EditCommentModal photoId={photo.id} commentToEdit={comment} />}
                                        />)}
                                    {user?.id === comment.userId || user?.id === photo.userId ?
                                        (<OpenModalButton
                                            buttonText="Delete"
                                            className="delete-comment-button"
                                            modalComponent={<DeleteCommentModal photoId={photo.id} commentId={comment.id} />} />)
                                        : null}
                                    <span className="comment-date-time">{comment.createdAt !== comment.updatedAt ?
                                        (`${new Date(comment.updatedAt).getMonth() + 1}-${new Date(comment.updatedAt).getDate()}-${new Date(comment.updatedAt).getFullYear().toString()} 
                                ${new Date(comment.updatedAt).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })} Edited`) :
                                        (`${new Date(comment.createdAt).getMonth() + 1}-${new Date(comment.createdAt).getDate()}-${new Date(comment.createdAt).getFullYear().toString()} 
                                ${new Date(comment.createdAt).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}`)}</span>
                                </div>
                            </div>
                        </div>))}
                </div>
            </>
        );
    }
};

export default PhotoPage;