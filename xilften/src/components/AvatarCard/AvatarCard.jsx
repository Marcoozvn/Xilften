import React, { useState } from 'react';

import './AvatarCard.css';

export default ({ select, source }) => {
  const [selected, setSelected] = useState(false);

  function handleSelect() {
    console.log(selected);
    setSelected(!selected);
    console.log(selected);
    
  }

  return (
    <img src={source} className={selected ? 'avatar-selected' : ''} onClick={handleSelect}/>
  )
}