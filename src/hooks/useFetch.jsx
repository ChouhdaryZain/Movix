import React, { useState, useEffect } from 'react'
import { fetchDataFromApi } from '../utils/api';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading('Loading...');
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(`Something went wrong!!!`)
      })

  }, [url])

  return { data, loading, error };
}

export default useFetch;