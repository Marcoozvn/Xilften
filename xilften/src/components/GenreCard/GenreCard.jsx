import React, { useState } from 'react';

import './GenreCard.css';

export default ({ select, unselect, genre }) => {
  const [selected, setSelected] = useState(true);

  function handleClick() {
    if (selected) {
      setSelected(false)
      unselect(genre);
    } else {
      setSelected(true);
      select(genre);
    }
  }

  return (
    <div className={ selected ? 'genre-card selected' : 'genre-card'} onClick={handleClick}>
      <strong>{genre}</strong>
    </div>
  )
}