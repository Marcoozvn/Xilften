import React, { useState, useEffect } from 'react';

import './GenreCard.css';

export default ({ select, unselect, selectedGenres, genre }) => {
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