import React from 'react';
import IconArrow from '../../assets/IconArrow'
import './SlideButton.css'

const SlideButton = ({ onClick, type }) => (
  <button className={`slide-button slide-button-${type}`} onClick={onClick}>
    <span>
      <IconArrow />
    </span>
  </button>
);

export default SlideButton;