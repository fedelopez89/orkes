import React, { useState, useEffect } from "react";

const minUrl = `http://www.pinkvilla.com/photo-gallery-feed-page`;

const useGetPhotos = (numPage = 0) => {
  // Declare States
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      let numberPage = `/page/${numPage}`;
      let finalEndpoint = minUrl;
      if (numPage > 0) {
        finalEndpoint = minUrl + numberPage;
      }
      console.log("useEffect");
      setResults(null);
      setLoading(true);
      try {
        const response = await fetch(finalEndpoint);
        if (response.ok) {
          console.log("RESPONSE OK");
          setResults(await response.json());
          setError(null);
        } else {
          console.log("error");
          setError(await response.text());
        }
        setLoading(false);
      } catch (error) {
        console.log("error2");
        setError(error.message);
        setLoading(false);
      }
    };

    getdata();
  }, [numPage]);

  return [results, error, loading];
};

export default useGetPhotos;
