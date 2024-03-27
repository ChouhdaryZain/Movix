import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api"
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer"


function App() {

  const dispatch = useDispatch();
  const { url, genres } = useSelector((state) => state.home);
  // console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then(res => {
        // console.log(res);
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }
        dispatch(getApiConfiguration(url));
      })
  }
  const genresCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    try {
      const responses = await Promise.all(promises);
      responses.forEach(({ genres }) => {
        if (genres) {
          genres.forEach((genre) => {
            allGenres[genre.id] = genre;
          });
        }
      });
      dispatch(getGenres(allGenres));
      console.log(allGenres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };


  // const genresCall = async () => {
  //   let promises = [];
  //   let endPoints = ['tv', 'movie'];
  //   let allGenres = {};

  //   endPoints.forEach((url) => {
  //     promises.push(fetchDataFromApi(`genre/${url}/list`));
  //   });

  //   const data = await Promise.all(promises);
  //   console.log(data);

  //   data.map(({ genres }) => {
  //     return genres?.map((item) => (allGenres[item.id]) = item)
  //   })
  //   dispatch(getGenres(allGenres));
  // }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
