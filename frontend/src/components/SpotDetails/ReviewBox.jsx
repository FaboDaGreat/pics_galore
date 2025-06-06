import { useSelector } from "react-redux";
import ReviewModal from "../ReviewModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./ReviewBox.css";

    const ReviewBox = ({ spot }) => {
    const sortedReviews = [...spot.Reviews].sort((a, b) => b.id - a.id);
    const user = useSelector((state) => state.session.user);
    const hasPostedReview = user ? spot.Reviews.some((review) => review.userId === user.id) : false;
  
    return (
      <div className="reviewsSection">
        <h2>
            {spot.Reviews.length > 0
                        ? `★${spot.avgRating} • ${spot.Reviews.length} ${spot.Reviews.length === 1 ? "review" : "reviews"}`
                        : `★${spot.avgRating}`}
                        </h2>
                        
                        {user && !hasPostedReview && user.id !== spot.ownerId && (
        <OpenModalButton 
        className="reviewModalButton"
        modalComponent={<ReviewModal spotId={spot.id} />} 
        buttonText="Post Your Review"
        />

      )}

        {sortedReviews.length > 0 ? (
          <ul>
            {sortedReviews.map((review, idx) => (
              <div className="reviewItem" key={`${idx}-${review.id}`}>
                <p>
                  <strong>{review.name}</strong>
                </p>
                <p className="reviewDate">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p>{review.review}</p>
              </div>
            ))}
          </ul>
        ) : (
            user && user.id !== spot.ownerId && (
            <p>No reviews yet. Be the first to leave one!</p>
          )
        )}
      </div>
    );
  };
  
  export default ReviewBox;
  
  