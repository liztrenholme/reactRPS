/* eslint-disable no-console */

// 1. call to db to check for players
// 2. if no players, assign to player one, if one player, assign to player two, otherwise say full
// 3. if two players present, first turn starts
// 4. player 1 selects and call is sent to db, second turn activated





import React, { Component } from 'react';
import './main.css';
import Display from '../display/index';
import Input from '../Input/index';
import InfoIconCircle from './assets/infoicon.png';
// import {  } from '../modules/index.js';
import json from '../../../package.json';
import Firebase from 'firebase';
import config from '../../config';
import ChatBox from '../chatBox';

Firebase.initializeApp(config);

class Main extends Component {
state = {
  name: '',
  player: null,
  error: '',
  showInstructions: false,
  // p1turn: false,
  // p2turn: false,
  nameChosen: false,
  choice: '',
  currentPlayerTurn: null,
  game: {
    choice: '',
    currentPlayers: 0,
    currentPlayerTurn: null,
  }
}

setPlayer = () => {
  const {name} = this.state;
  const playerRef = Firebase.database().ref('/players/' + name);
  playerRef.set({
    name: name,
    wins: 0,
    losses: 0,
    choice: null
  });
  this.setState({currentPlayerTurn: 'p1'});
}

getChatData = () => {
  let ref = Firebase.database().ref('/chat');
  ref.on('value', snapshot => {
    const chatData = snapshot.val();
    console.log('what is coming back for chat??', chatData);
  });
}

getGameData = () => {
  let ref = Firebase.database().ref('/players');
  ref.on('value', snapshot => {
    const gameData = snapshot.val();
    console.log('what is coming back for gamedata??', gameData);
    // this.setState(state);
  });
}

componentDidMount() {
  this.getChatData();
  this.getGameData();
}

handleShowMobileInstructions = () => {
  this.state.showInstructions 
    ? this.setState({showInstructions: false}) 
    : this.setState({showInstructions: true});
}

handleTextChange = (e) => {
  const name = e.target.value;
  this.setState({name});
}

saveName = () => {
  // call to db to save name goes here
  this.setState({nameChosen: true});
  this.setPlayer();
}

handleSelectChoice = (choice) => {
  console.log('choice is', choice);
  // const chosen = choice.split('1')[1] || choice.split('2')[1];
  this.setState({choice});
  const {name} = this.state;
  const playerRef = Firebase.database().ref('/players/' + name);
  playerRef.set({
    name: name,
    wins: 0,
    losses: 0,
    choice: choice
  });
  this.setState({currentPlayerTurn: 'p2'});
}

render() {
  const { name, contrast, error, currentPlayerTurn, nameChosen, choice, player } = this.state;
  console.log('config', config);
  console.log('wtffff', nameChosen && currentPlayerTurn === 'p1');
  return (
    <div className="main">
      <h1 className='header' style={{color: contrast}}>Rock, Paper, Scissors</h1>
      <div className='infoIcon'>
        <img 
          src={InfoIconCircle} 
          onClick={this.handleShowMobileInstructions}
          width='20px'
          height='20px'
          alt='info-icon' />
      </div>

      {/* <div className='buttonBox'>
        <button onClick={this.convertToHex} 
          className={mode === 'hex' ? 'active' : 'inactive'}>
                  Hex
        </button>
        <button onClick={this.convertToRgb} 
          className={mode === 'rgb' ? 'active' : 'inactive'}>
                  RGB
        </button>
        <button onClick={this.convertToColorName} 
          className={mode === 'colorName' ? 'active' : 'inactive'}>
                  Color Name
        </button>
      </div> */}
      <div className='inputWithSave'>
        {nameChosen ? 
          (<h1 className='name-display'>Hi {name}, you are player {player}!</h1>)
          : (<div className='inputWithSave'>
            <Input 
              name={name}
              handleTextChange={this.handleTextChange}
            />
            {name ?
              <button 
                className='saveBtn' 
                onClick={this.saveName}>
                  Add my name!
              </button> : null}
          </div>)}
      </div>
      <div>
        <h3 style={{color: 'darkRed'}}>{error}</h3>
      </div>
      <div className='gameboard'>
        <div className='left-side'>
          <Display 
            player='p1' 
            isTurn={nameChosen && currentPlayerTurn === 'p1'} 
            handleSelect={this.handleSelectChoice}
            choice={choice} />
        </div>
        <div className='right-side'>
          <Display 
            player='p2' 
            isTurn={nameChosen && currentPlayerTurn === 'p2'} 
            handleSelect={this.handleSelectChoice}
            choice={choice} />
        </div> 
      </div>
      <div>
        <ChatBox />
      </div>
      <h3>Version: {json.version}</h3>
    </div>
  );
}
}


export default Main;