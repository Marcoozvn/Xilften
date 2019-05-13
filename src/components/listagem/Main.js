import React, { Component } from 'react';

import { getUserId } from '../../services/auth';
import api from "../../services/api";
import Dashboard from './Dashboard';
import Card from './Card';
import logo from '../../logo.svg';
import { FilmList, Footer, Button, Load, AppLogo } from './styles';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';


export default class Listagem extends Component {
  state = {
    films: [],
    offset: 0,
    perPage: 20,
    loading: true,
  }

  async componentDidMount() {
    const userId = getUserId(); 

    const response = await api.get(`/film/recommendation/${userId}`);
 
    this.setState( { ...this.state, films: response.data, loading: false});
  }

  rate = async (rate, film) => {

    const response = await api.post('/rating', { userId: getUserId(), filmId: film._id, rate });

    if (response.statusText === "OK") {
      this.hideFilm(film);    

      ToastsStore.success(response.data.message);
    } else {
      ToastsStore.error(`Ocorreu um erro: ${response.data.error}`)
    }    
  }

  hideFilm = (film) => {
    const { films } = this.state;

    const newArr = films.filter(elem => elem !== film);

    this.setState({...this.state, films: newArr});
  }

  previousPage = () => {
    let { offset, perPage } = this.state;
    
    if (offset > 0) {
      offset -= perPage;
    }

    this.setState({...this.state, offset: offset});
  }

  nextPage = () => {
    let { offset, perPage, films } = this.state;

    if (offset < films.length - perPage) {
      offset += perPage;
    }

    this.setState({...this.state, offset: offset});
  }

  render() {
    const { films, offset, perPage, loading} = this.state;    
    const filmsInPage = films.slice(offset, offset + perPage);
    
    return (
      <>
        <Dashboard />
        {loading && 
        <Load>
          <div><span>Aguarde um pouco</span></div>
          <AppLogo src={logo} height={200}/>
          <div><span>Carregando recomendação...</span></div>
        </Load>}    
        {!loading && 
        <>
          <FilmList>
            {filmsInPage.map(film => (
              <Card key={film._id} film={film} handleRate={this.rate.bind(this)} hideFilm={this.hideFilm.bind(this)}/>
            ))}
          </FilmList>
          <Footer>
            <Button disabled={offset === 0} onClick={this.previousPage}>Anterior</Button>
            <Button disabled={offset === films.length - perPage} onClick={this.nextPage}>Próxima</Button>
          </Footer>
          <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
        </>}          
      </>    
    )
  }
}
