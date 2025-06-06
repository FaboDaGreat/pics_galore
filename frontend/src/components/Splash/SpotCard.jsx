import './SpotCard.css';

const SpotCard = ({ spot }) => {

    return (
        <div className="cardContainer">
            <div className="spotImageContainer">
                    <img className="spotImage" src={spot.previewImage} />
                    <div>
                <div className="infoContainer">
                    <div className="ratingContainer spotText">
                        <span>{`${spot.city}, ${spot.state}`}</span>
                        <span>{`★ ${spot.avgRating}`}</span>
                    </div>
                    <div className="areaContainer">
                        <p className="spotText">{spot.name}</p>
                    </div>
                    <div className="priceContainer">
                        <span className="spotText spotPrice">{`$${spot.price}`}</span>
                        <span className="spotText">night</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpotCard;