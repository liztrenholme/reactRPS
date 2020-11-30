import React from 'react';
import './paper.css';
import PropTypes from 'prop-types';
import paperImg from './assets/paper.png';

const Paper = ({ handleSelect, display, player, choice }) => {
  const name = `${player}paper`;
  return display ? (
    <div>
      <img 
        className='paper-sketch'
        src={paperImg} 
        alt={name}
        onClick={() => handleSelect(name)}
        style={choice === name ? {} : {opacity: '.5'}} />
    </div>
  ) : null;
};

Paper.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.string,
  choice: PropTypes.string
};
  
export default Paper;