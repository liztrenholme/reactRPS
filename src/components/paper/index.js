import React from 'react';
import './paper.css';
import PropTypes from 'prop-types';
import paperImg from './assets/paper.png';

const Paper = ({ handleClick, display }) => {
  return display ? (
    <div>
      <img 
        src={paperImg} 
        alt='paper'
        onClick={handleClick} />
    </div>
  ) : null;
};

Paper.propTypes = {
  handleClick: PropTypes.func,
  display: PropTypes.bool
};
  
export default Paper;