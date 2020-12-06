import React, { Component } from 'react';
import './display.css';
import PropTypes from 'prop-types';
import Rock from '../rock';
import Paper from '../paper';
import Scissors from '../scissors';

class Display extends Component {
  render() {
    const { player, isTurn, handleSelect, choice } = this.props;
    return (
      <div className='display' style={isTurn ? {border: '3px', borderColor: 'blue', borderStyle: 'solid'} 
        : {}}>
        <Rock 
          display={isTurn}
          player={player} 
          handleSelect={handleSelect}
          choice={choice}
        />
        <Paper 
          display={isTurn} 
          player={player} 
          handleSelect={handleSelect}
          choice={choice}
        />
        <Scissors 
          display={isTurn} 
          player={player} 
          handleSelect={handleSelect}
          choice={choice}
        />
      </div>
    );
  }
}

Display.propTypes = {
  player: PropTypes.string,
  isTurn: PropTypes.bool,
  handleSelect: PropTypes.func,
  choice: PropTypes.string
};

export default Display;