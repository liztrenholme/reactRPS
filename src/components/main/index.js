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

window.config = config;

if (window && window.config) {
  Firebase.initializeApp(window.config);
}

class Main extends Component {
state = {
  name: '',
  player: null,
  error: '',
  showInstructions: false,
  nameChosen: false,
  choice: '',
  currentPlayerTurn: null,
  currentPlayers: 0,
  chatData: {},
  playerOneExists: false,
  playerTwoExists: false
}

getSnapshot = () => {
  const rootRef = this.database.ref();
  rootRef.once('value')
    .then(function(snapshot) {
      console.log('snapshot is', snapshot.child('1').exists(), snapshot.child('2').exists(), snapshot.child('1').val(), snapshot.child('2').val());
      // var key = snapshot.key; // null
      // var childKey = snapshot.child('users/ada').key; // "ada"
    });
}

// setPlayer = () => {
//   const {name} = this.state;
//   const playerRef = Firebase.database().ref('/players/' + player);
//   playerRef.set({
//     name: name,
//     wins: 0,
//     losses: 0,
//     choice: null
//   });
//   this.setState({currentPlayerTurn: 'p1'});
// }

getChatData = () => {
  let ref = Firebase.database().ref('/chat');
  ref.on('value', snapshot => {
    const chatData = snapshot.val();
    // console.log('what is coming back for chat??', chatData);
    this.setState({chatData});
  });
}

getGameData = () => {
  let ref = Firebase.database().ref('/game/players');
  let playerOneExists;
  let playerTwoExists;
  const currentTurnRef = Firebase.database().ref('turn');
  ref.on('value', snapshot => {
    // const gameData = snapshot.val();
    // console.log('what is coming back for gamedata??', gameData);
    playerOneExists = snapshot.child('1').exists();
    playerTwoExists = snapshot.child('2').exists();
    
    this.setState({playerOneExists, playerTwoExists});
    // this.setState(state);
  });
  const playerStatus = Firebase.database().ref('players');
  playerStatus.on('value', snapshot => {
    // const gameData = snapshot.val();
    // console.log('what is coming back for gamedata??', gameData);
    // playerOneExists = snapshot.child('1').exists();
    // playerTwoExists = snapshot.child('2').exists();
    
    // this.setState({playerOneExists, playerTwoExists});
    // this.setState(state);
    const currentPlayers = snapshot.numChildren();
    console.log('wtf? currentplayers', currentPlayers);
    this.setState({currentPlayers});
    const playerOneData = snapshot.child('1').val();
    const playerTwoData = snapshot.child('2').val();
    console.log('playerOneData, playerTwoData', playerOneData, playerTwoData, currentTurnRef);
  });
}

gameStart = () => {
  const currentTurnRef = Firebase.database().ref('turn');
  const chatDisc = Firebase.database().ref('/chat/' + Date.now());
  // For adding disconnects to the chat with a unique id (the date/time the user entered the game)
  // Needed because Firebase's '.push()' creates its unique keys client side,
  // so you can't ".push()" in a ".onDisconnect"
  // var chatDataDisc = database.ref("/chat/" + Date.now());

  // Checks for current players, if theres a player one connected, then the user becomes player 2.
  // If there is no player one, then the user becomes player 1
  let ref = Firebase.database().ref('/game/players');
  let playerOneExists;
  let playerTwoExists;
  // const currentTurnRef = Firebase.database().ref('turn');
  ref.on('value', snapshot => {
    const gameData = snapshot.val();
    console.log('what is coming back for gamedata??', gameData);
    playerOneExists = snapshot.child('1').exists();
    playerTwoExists = snapshot.child('2').exists();
    
    this.setState({playerOneExists, playerTwoExists});
    // this.setState(state);
  });
  console.log('CURRENT PLAYERS', this.state.currentPlayers, playerOneExists, playerTwoExists);
  if (this.state.currentPlayers < 2) {
    let {player} = this.state;
    if (playerOneExists) {
      player = 2;
    }
    else {
      player = 1;
    }

    // Creates key based on assigned player number
    const playerRef = Firebase.database().ref('/players/' + player);
    // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible
    playerRef.set({
      name: this.state.name,
      wins: 0,
      losses: 0,
      choice: null
    });

    // On disconnect remove this user's player object
    playerRef.onDisconnect().remove();

    // If a user disconnects, set the current turn to 'null' so the game does not continue
    currentTurnRef.onDisconnect().remove();

    // Send disconnect message to chat with Firebase server generated timestamp and id of '0' to denote system message
    chatDisc.onDisconnect().set({
      name: this.state.name,
      time: Firebase.database.ServerValue.TIMESTAMP,
      message: 'has disconnected.',
      idNum: 0
    });

    // Remove name input box and show current player number.
    // $("#swap-zone").html("<h2>Hi " + username + "! You are Player " + playerNum + "</h2>");
    this.setState({player});
  }
  else {

    // If current players is "2", will not allow the player to join
    this.setState({error: 'Sorry, Game Full! Try Again Later!'});
  }
}

componentDidMount() {
  this.getChatData();
  this.getGameData();
  // this.gameStart();
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
  this.gameStart();
  // this.setPlayer();
}

handleSelectChoice = (choice) => {
  console.log('choice is', choice);
  // const chosen = choice.split('1')[1] || choice.split('2')[1];
  this.setState({choice});
  const {name, player} = this.state;
  const playerRef = Firebase.database().ref('/players/' + player);
  playerRef.set({
    name: name,
    wins: 0,
    losses: 0,
    choice: choice
  });
  this.setState({currentPlayerTurn: 'p2'});
}

render() {
  const { name, error, currentPlayerTurn, nameChosen, choice, player, chatData, playerOneExists, playerTwoExists } = this.state;
  console.log('state:::', this.state);
  // console.log('wtffff', nameChosen && currentPlayerTurn === 'p1');
  return (
    <div className="main">
      <div className='main-container'>
        <h1 className='header'>Rock, Paper, Scissors</h1>
        <div className='infoIcon'>
          <img 
            src={InfoIconCircle} 
            onClick={this.handleShowMobileInstructions}
            width='20px'
            height='20px'
            alt='info-icon' />
        </div>
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
        {playerOneExists && playerTwoExists ? <div className='gameboard'>
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
        </div> : null}
        <div>
          <ChatBox
            player={player}
            name={name}
            chatData={chatData}
            firebase={Firebase} />
        </div>
      </div>
      <h3>Version: {json.version}</h3>
    </div>
  );
}
}


export default Main;