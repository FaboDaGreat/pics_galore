import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as reviewsActions from '../../store/reviews'
import './ReviewModal.css'

const ReviewModal = ({spotId}) => {

      const dispatch = useDispatch();
      const [review, setReview] = useState("");
      const [stars, setStars] = useState(0);
      const [errors, setErrors] = useState({});
      const { closeModal } = useModal();

      const noSubmit = review.length < 10 || stars === 0;
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
          try{
            const newReview = await dispatch(
                reviewsActions.createReviewThunk(spotId, {
                  review,
                  stars,
                })
        
          )
            if (newReview){
                closeModal();
                window.location.reload();
            }
        } catch (res) {
            
              const data = await res.json();
              if (data?.errors) {
                setErrors(data.errors);
              }
            
        }
        
        
      };
    
      return (
        <>
          <h1>How was your stay?</h1>
          {Object.keys(errors).length > 0 && (
      <div className="errors">
        {Object.values(errors).map((error, idx) => (
          <p key={idx} className="error">{error}</p>
        ))}
      </div>
    )}

          <form onSubmit={handleSubmit}>
          <textarea
        placeholder="Leave your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <div className="starRating">
        <label htmlFor="stars">Stars</label>
        <input
          type="text"
          id="stars"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={noSubmit}>
        Submit Your Review
      </button>
    </form>

        </>
      );
    }


export default ReviewModal
