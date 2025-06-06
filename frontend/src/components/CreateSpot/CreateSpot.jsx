import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as spotsActions from '../../store/spots';
import './CreateSpot.css';

const CreateSpot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const url = [previewUrl, image1, image2, image3, image4]

      
      const newSpot = await dispatch(
        spotsActions.createSpotThunk({
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price,
          url
        })
      );

      if (newSpot && newSpot.id) {
        navigate(`/spots/${newSpot.id}`);
      }
    } catch (res) {
      const data = await res.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-spot-form">
      <h1>Create a New Spot</h1>

      <section>
        <h2>{"Where's your place located?"}</h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <label>
          Country
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        {errors.country && <p className="error-message">{errors.country}</p>}
        <label>
          Street Address
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        {errors.address && <p className="error-message">{errors.address}</p>}
        <label>
          City
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {errors.city && <p className="error-message">{errors.city}</p>}
        <label>
          State
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        {errors.state && <p className="error-message">{errors.state}</p>}
        <label>
          Latitude
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </label>
        {errors.lat && <p className="error-message">{errors.lat}</p>}
        <label>
          Longitude
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </label>
        {errors.lng && <p className="error-message">{errors.lng}</p>}
      </section>

      <section>
        <h2>Describe your place to guests</h2>
        <p>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
      </section>

      <section>
        <h2>Create a title for your spot</h2>
        <p>{"Catch guests' attention with a spot title that highlights what makes your place special."}</p>
        <input
          type="text"
          placeholder="Name of your spot"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </section>

      <section>
        <h2>Set a base price for your spot</h2>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <input
          type="text"
          placeholder="Price per night (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {errors.price && <p className="error-message">{errors.price}</p>}
      </section>

      <section>
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <label>
          Preview Image URL
          <input
            type="text"
            placeholder="Preview Image URL"
            value={previewUrl}
            onChange={(e) => setPreviewUrl(e.target.value)}
            required
          />
        </label>
        {errors.url && <p className="error-message">{errors.url}</p>}
        <label>
          Image URL
          <input
            type="text"
            placeholder="Image URL"
            value={image1}
            onChange={(e) => setImage1(e.target.value)}
          />
        </label>
        {errors.url && <p className="error-message">{errors.url}</p>}
        <label>
          Image URL
          <input
            type="text"
            placeholder="Image URL"
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
          />
        </label>
        {errors.url && <p className="error-message">{errors.url}</p>}
        <label>
          Image URL
          <input
            type="text"
            placeholder="Image URL"
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
          />
        </label>
        {errors.url && <p className="error-message">{errors.url}</p>}
        <label>
          Image URL
          <input
            type="text"
            placeholder="Image URL"
            value={image4}
            onChange={(e) => setImage4(e.target.value)}
          />
        </label>
        {errors.url && <p className="error-message">{errors.url}</p>}
      </section>

      <button type="submit">Create Spot</button>
    </form>
  );
};

export default CreateSpot;