/* eslint-disable no-console */
import React, { Component } from 'react';
import './display.css';
import PropTypes from 'prop-types';
import Rock from '../rock';
import Paper from '../paper';
import Scissors from '../scissors';

class Display extends Component {
  render() {
    const { player, isTurn, handleSelect, choice, winner, opponentChoice } = this.props;
    return isTurn ? (
      <div className='display' style={isTurn ? {border: '3px', borderColor: 'blue', borderStyle: 'solid'} 
        : {}}>
        <Rock 
          display={(!winner && isTurn) || (winner && choice === 'rock') || (winner && opponentChoice === 'rock')}
          player={player} 
          handleSelect={handleSelect}
          choice={choice}
        />
        <Paper 
          display={(!winner && isTurn) || (winner && choice === 'paper') || (winner && opponentChoice === 'paper')} 
          player={player} 
          handleSelect={handleSelect}
          choice={choice}
        />
        <Scissors 
          display={(!winner && isTurn) || (winner && choice === 'scissors') || (winner && opponentChoice === 'scissors')} 
          player={player} 
          handleSelect={handleSelect}
          choice={choice}
        />
      </div>
    ) : (
      <div className='not-turn' style={{opacity: '0.5'}}>
        <Rock 
          display
          player={player} 
          choice={choice}
        />
        <Paper 
          display
          player={player} 
          choice={choice}
        />
        <Scissors 
          display
          player={player} 
          choice={choice}
        />
      </div>
    );
  }
}

Display.propTypes = {
  player: PropTypes.number,
  winner: PropTypes.string,
  isTurn: PropTypes.bool,
  handleSelect: PropTypes.func,
  choice: PropTypes.string,
  opponentChoice: PropTypes.string
};

export default Display;