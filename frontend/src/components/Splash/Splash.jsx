import { useEffect, useState } from "react";
import './Splash.css'

const Splash = () => {


  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {


    if (!isLoaded) {
      setIsLoaded(true);
    }

  }, [isLoaded])

  if (!isLoaded) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div>
        <h1>Welcome!</h1>
      </div>
    )
  }


}


export default Splash