import React, { useState } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import GenreCard from '../../components/GenreCard/GenreCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../store/actions/userActions';

import './Profile.css';

const mock = ['Comedy', 'Thriller', 'Horror', 'Crime', 'Drama', 'Adventure', 'Musical', 'Fantasy', 'Animation', 'Romance', 'Action',
  'Sci-Fi', 'Children', 'War'];

const Profile = ({ history, updateUser, user }) => {
  const [genres, setGenres] = useState(user.genres);
  const [avatar, setAvatar] = useState(user.avatar);

  const avatars = [
    'https://api.adorable.io/avatars/100/1@adorable.png',
    'https://api.adorable.io/avatars/100/2@adorable.png',
    'https://api.adorable.io/avatars/100/3@adorable.png',
    'https://api.adorable.io/avatars/100/4@adorable.png',
    'https://api.adorable.io/avatars/100/5@adorable.png',
  ];


  function addGenre(genre) {
    setGenres([...genres, genre]);
  }

  function deleteGenre(genre) {
    setGenres(genres.filter( item => item !== genre))
  }

  async function handleSave() {
    updateUser({...user, avatar, genres}, history);
  }

  return (
    <div className='profile-container'>
      <Toolbar history={history}/>
      <h2>Escolha seu <span style={{color: '#6C63FF'}}>avatar</span></h2>
      <div className='avatar-list'>
        {avatars.map( item => (
          <img key={item} src={item} alt={item} className={item === avatar ? 'avatar-selected' : null} onClick={() => setAvatar(item)}/>
        ))}
      </div>
      <h2>Quais são seus <span style={{color: '#6C63FF'}}>gêneros</span> preferidos?</h2>
      <div className='genre-list'>
        {mock.map( genre => <GenreCard key={genre} select={addGenre} unselect={deleteGenre} genre={genre} selectedGenres={genres}></GenreCard>)}
      </div>
      <button onClick={handleSave}><strong>Salvar</strong></button>
    </div>
  );
}

const mapStateToProps = state => ({ user: state.user })

const mapDispatchToProps = dispatch => bindActionCreators({ updateUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile);