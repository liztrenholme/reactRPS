/* eslint-disable no-console */
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
  error: '',
  showInstructions: false,
  p1turn: true,
  p2turn: false,
  nameChosen: false,
  choice: ''
}

writeUserData = () => {
  Firebase.database().ref('/').set(this.state);
  console.log('DATA SAVED');
}

getChatData = () => {
  let ref = Firebase.database().ref('/chat');
  ref.on('value', snapshot => {
    const state = snapshot.val();
    console.log('what is coming back??', state);
    // this.setState(state);
  });
  console.log('DATA RETRIEVED');
}

componentDidMount() {
  this.getChatData();
}

// componentDidUpdate(prevProps, prevState) {
//   // check on previous state
//   // only write when it's different with the new state
//   if (prevState !== this.state) {
//     this.writeUserData();
//   }
// }

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
}

handleSelectChoice = (choice) => {
  console.log('choice is', choice);
  // const chosen = choice.split('1')[1] || choice.split('2')[1];
  this.setState({choice});
}

render() {
  const { name, contrast, error, p1turn, p2turn, nameChosen, choice } = this.state;
  console.log('config', config);
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
          (<h1 className='name-display'>Hi {name}, you are player one!</h1>)
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
            isTurn={p1turn} 
            handleSelect={this.handleSelectChoice}
            choice={choice} />
        </div>
        <div className='right-side'>
          <Display 
            player='p2' 
            isTurn={p2turn} 
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