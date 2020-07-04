import React from 'react'
import IconArrow from '../../assets/IconArrow'

import './styles.css'

interface Props {
  onClick: () => void
  type: string
}

const SlideButton: React.FC<Props> = ({ onClick, type }) => (
  <button className={`slide-button slide-button-${type}`} onClick={onClick}>
    <span>
      <IconArrow />
    </span>
  </button>
)

export default SlideButton