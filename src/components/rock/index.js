import React from 'react';
import './rock.css';
import rockImg from './assets/rock.png';
import PropTypes from 'prop-types';

const Rock = ({ handleSelect, display, player, choice }) => {
  const name = `${player}rock`;
  return display ? (
    <div>
      <img
        className='rock-sketch'
        src={rockImg}
        alt={name}
        onClick={() => handleSelect(name)}
        style={choice === name ? {} : {opacity: '.5'}} />
    </div>
  ) : null;
};

Rock.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.string,
  choice: PropTypes.string
};

export default Rock;