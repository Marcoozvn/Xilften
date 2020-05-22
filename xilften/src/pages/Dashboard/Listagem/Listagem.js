import React, { useEffect } from 'react';
import Card from '../../../components/Card/Card';
import './Listagem.css';
import SlideButton from '../../../components/SlideButton/SlideButton';
import useWindowDimensions from '../../../assets/useWindowDimensions';
import Details from '../../../components/Details/Details';
import { useSelector, useDispatch } from 'react-redux';
import { changeMoviesDetails, changeMoviesOffset, changeMoviesPerPage } from '../../../store/actions/movieActions';

export default ({ genre }) => {
  const { width } = useWindowDimensions();
  const perPage = Math.trunc(width/180);

  const movies = useSelector(state => state.movies[genre].list);
  const movieDetails = useSelector(state => state.movies[genre].details);
  const offset = useSelector(state => state.movies[genre].offset);
  const moviesPerPage = useSelector(state => state.movies[genre].moviesPerPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeMoviesPerPage(genre, movies.slice(offset, offset + perPage)));
    // eslint-disable-next-line
  }, [offset, movies, perPage]);

  function previousPage() {
    let my_offset = offset;
    if (my_offset > 0) {
      my_offset -= 1;
    }

    dispatch(changeMoviesOffset(genre, my_offset));
  }

  function nextPage() {
    let my_offset = offset;
    if (my_offset < movies.length - 1) {
      my_offset += 1;
    }

    dispatch(changeMoviesOffset(genre, my_offset));
  }  

  function openMovieDetails(movie) {
    dispatch(changeMoviesDetails(genre, movie));
  }

  return (
    <>
      <div className="slider">
        {offset > 0 && <SlideButton onClick={previousPage} type="prev"/>}      
        <div className="slider-container">
          {moviesPerPage.map( mov => (
            <div className='wrap' key={mov._id} onClick={() => openMovieDetails(mov)}>
              <Card movie={mov} genre={genre}/>
            </div>
          ))}
        </div>
        {offset < movies.length - perPage + 1 && <SlideButton onClick={nextPage} type="next"/>}
      </div>
      { movieDetails ? <Details genre={genre}/> : <></> }
    </>
  )
}