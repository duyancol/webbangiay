
import React, { useState, useEffect } from 'react';

function FacebookComments(props) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v16.0";
    script.async = true;
    script.defer = true;
    script.nonce = "amfyP0T7";

    script.onload = () => {
      setScriptLoaded(true);
    }

    document.body.appendChild(script);
  }, []);

  return (
    <>
      {scriptLoaded &&
        
        <div class="fb-comments" data-href="http://localhost:3000/products/1" data-width="" data-numposts="5"></div>
      }
    </>
  );
}

export default FacebookComments;
