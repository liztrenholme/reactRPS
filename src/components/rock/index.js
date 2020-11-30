import React from 'react';
import './rock.css';
import rockImg from './assets/rock.png';
import PropTypes from 'prop-types';

const Rock = ({ handleClick, display }) => {
  return display ? (
    <div>
      <img
        src={rockImg}
        alt='rock'
        onClick={handleClick} />
    </div>
  ) : null;
};

Rock.propTypes = {
  handleClick: PropTypes.func,
  display: PropTypes.bool
};

export default Rock;