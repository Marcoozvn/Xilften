import React, { useState, useEffect } from 'react';

import './styles.css';

interface Props {
  select: (genre: string) => void
  unselect: (genre: string) => void
  genre: string
  selectedGenres: string[]
}

const GenreCard: React.FC<Props> = ({ select, unselect, selectedGenres, genre }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const value = selectedGenres.includes(genre);
    setSelected(value);
  }, [selectedGenres, genre]);

  function handleClick() {
    if (selected) {
      setSelected(!selected)
      unselect(genre);
    } else {
      setSelected(!selected);
      select(genre);
    }
  }

  return (
    <div className={ selected ? 'genre-card selected' : 'genre-card'} onClick={handleClick}>
      <strong>{genre}</strong>
    </div>
  )
}

export default GenreCard