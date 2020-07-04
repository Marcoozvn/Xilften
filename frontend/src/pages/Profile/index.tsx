import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Toolbar from '../../components/Toolbar'
import GenreCard from '../../components/GenreCard'
import { useAuth } from '../../contexts/auth'
import User from '../../models/User'
import Api from '../../services/Api'

import './styles.css'

const mock = ['Comedy', 'Thriller', 'Horror', 'Crime', 'Drama', 'Adventure', 'Musical', 'Fantasy', 'Animation', 'Romance', 'Action',
  'Sci-Fi', 'Children', 'War']

export default () => {
  const { user, updateUser } = useAuth() 
  const userActive = user as User
  const [genres, setGenres] = useState(userActive.genres)
  const [avatar, setAvatar] = useState(userActive.avatar)
  const history = useHistory()

  const avatars = [
    'https://api.adorable.io/avatars/100/1@adorable.png',
    'https://api.adorable.io/avatars/100/2@adorable.png',
    'https://api.adorable.io/avatars/100/3@adorable.png',
    'https://api.adorable.io/avatars/100/4@adorable.png',
    'https://api.adorable.io/avatars/100/5@adorable.png',
  ]


  function addGenre(genre: string) {
    setGenres([...genres, genre])
  }

  function deleteGenre(genre: string) {
    setGenres(genres.filter( item => item !== genre))
  }

  async function handleSave() {
    try {
      await Api.put(`/user/${userActive._id}`, { ...userActive, avatar, genres });
      updateUser({ ...userActive, avatar, genres })
      history.push('/');
    } catch (err) {
      alert('Algo deu errado');
    }
  }

  return (
    <div className='profile-container'>
      <Toolbar />
      <h2>Escolha seu <span style={{color: '#6C63FF'}}>avatar</span></h2>
      <div className='avatar-list'>
        {avatars.map( item => (
          <img key={item} src={item} alt={item} className={item === avatar ? 'avatar-selected' : ''} onClick={() => setAvatar(item)}/>
        ))}
      </div>
      <h2>Quais são seus <span style={{color: '#6C63FF'}}>gêneros</span> preferidos?</h2>
      <div className='genre-list'>
        {mock.map( genre => <GenreCard key={genre} select={addGenre} unselect={deleteGenre} genre={genre} selectedGenres={genres}></GenreCard>)}
      </div>
      <button onClick={handleSave}><strong>Salvar</strong></button>
    </div>
  )
}