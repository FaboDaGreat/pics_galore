import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPhotoByIdThunk } from "../../store/photos";
import './PhotoPage.css'
import OpenModalButton from '../OpenModalButton';
import DeletePhotoModal from "../DeletePhotoModal";

const PhotoPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const photo = useSelector((state) => state.photosReducer.byId[id]);
    const user = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    const leavePhotoPage = () => {
        navigate('/my-profile')
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
                navigate('/my-profile');
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
            <div className="photo-page-container"> 
                <div className="photo-container"> 
                    <img src={photo.url}/>
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
                    <h2>{`@${photo.username}`}</h2>
                    <strong>{photo.title}</strong>
                    <p>{photo.description}</p>
                    <p>Uploaded on {new Date(photo.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}</p>
                </div>
            </div>
        );
    }
};

export default PhotoPage;