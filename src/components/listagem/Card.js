import React, { Component } from 'react'

import StarRatings from 'react-star-ratings';
import { tmdb_api, api_key, poster_url } from '../../services/api';
import { Cardfilm } from './styles';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

export default class Card extends Component {
  state = {
    rating: 0,
    poster: ""
  }

  getMoviePoster = async () => {
    const { film } = this.props;
    const { data: { poster_path } } = await tmdb_api.get(`/movie/${film.tmdbId}?api_key=${api_key}`);

    this.setState({ ...this.state, poster: poster_url + poster_path});
    console.log(this.state);
  }

  componentDidMount() {
    this.getMoviePoster();
  }

  changeRating = (newRating) => {
    this.setState({rating: newRating});
    this.props.handleRate(newRating, this.props.film);
  }

  notInterested = () => {
    this.props.hideFilm(this.props.film);
  }

  render() {
    const { film } = this.props;

    return (
      <Cardfilm poster={this.state.poster}> 
        <header>
          <div></div>
          <IconButton onClick={this.notInterested}>
            <Clear color="primary"/>
          </IconButton>
        </header>    
        <StarRatings
          rating={this.state.rating}
          starRatedColor="yellow"
          starHoverColor="yellow"
          changeRating={this.changeRating}
          starDimension="40px"
          numberOfStars={5}
          name={film._id}
        />
      </Cardfilm>
    )
  }
}
