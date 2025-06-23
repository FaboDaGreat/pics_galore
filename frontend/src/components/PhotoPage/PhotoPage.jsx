import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPhotoByIdThunk } from "../../store/photos";
import OpenModalButton from '../OpenModalButton';
import DeletePhotoModal from "../DeletePhotoModal";
import './PhotoPage.css'

const PhotoPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const photo = useSelector((state) => state.photosReducer.byId[id]);
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    const leavePhotoPage = () => {
        navigate('/my-profile/photos')
    }

    const editPhotoPage = (e) => {
        e.preventDefault();
        navigate(`/photos/${id}/edit`)
    }

    useEffect(() => {
        const getPhotoDetails = async () => {
            if (id && !isNaN(id)) {
                await dispatch(getPhotoByIdThunk(id));
                setIsLoaded(true);
            } else {
                navigate('/');
            }
        };
        if (!isLoaded) {
            getPhotoDetails();
        }
    }, [id, dispatch, navigate, isLoaded]);

    if (!photo) {
        return <h1>Post not found</h1>;
    }

    if (!isLoaded) {
        return <h1>Loading...</h1>
    }
    else {
        return (
            <>
                <div className="photo-page-container">
                    <div className="photo-container">
                        <img src={photo.url} />
                        <div>
                            {user?.id === photo.userId && (
                                <OpenModalButton
                                    buttonText="Delete"
                                    className={"delete-button"}
                                    onModalClose={null}
                                    modalComponent={<DeletePhotoModal photoId={photo.id} leavePhotoPage={leavePhotoPage} />}
                                />
                            )}
                        </div>
                    </div>
                    <div className="photo-detail-box">
                        <div>
                            {user?.id === photo.userId &&
                                (<button className="edit-link" onClick={(e) => editPhotoPage(e)}>
                                    Edit
                                </button>)
                            }
                        </div>
                        <h3>{`@${photo.username}`}</h3>
                        <h3>{photo.title}</h3>
                        <p>{photo.description}</p>
                        <p>Uploaded on {new Date(photo.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })}</p>
                    </div>
                </div>
            </>
        );
    }
};

export default PhotoPage;