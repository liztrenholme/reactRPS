import React from 'react';
import './paper.css';
import PropTypes from 'prop-types';
import paperImg from './assets/paper.png';

const Paper = ({ handleSelect, display, player }) => {
  return display ? (
    <div>
      <img 
        className='paper-sketch'
        src={paperImg} 
        alt={`${player}paper`}
        onClick={() => handleSelect(`${player}paper`)} />
    </div>
  ) : null;
};

Paper.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.string
};
  
export default Paper;