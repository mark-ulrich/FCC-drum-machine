import React, { Component } from 'react';

import Pads from './components/Pads';
import Display from './components/Display';

export class BeatMachineApp extends Component {
  constructor(props) {
    super(props);

    this.bank = [
      {
        id: 'Heater1',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        key: 'Q'
      },
      {
        id: 'Heater2',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
        key: 'W'
      },
      {
        id: 'Heater3',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
        key: 'E'
      },
      {
        id: 'Heater4',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
        key: 'A'
      },
      {
        id: 'Clap',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
        key: 'S'
      },
      {
        id: 'Open Hat',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
        key: 'D'
      },
      {
        id: 'Kick & Hat',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
        key: 'Z'
      },
      {
        id: 'Kick',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
        key: 'X'
      },
      {
        id: 'Closed Hat',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
        key: 'C'
      }
    ];

    this.state = {
      displayText: ''
    };
  }

  componentDidMount = () => {
    document.addEventListener('keypress', e => {
      // console.log(e.key);
      const id = e.key.toUpperCase();
      const keys = this.bank.map(elem => elem.key);
      if (keys.indexOf(id) >= 0) this.playSound(id);
    });
  };

  playSound = key => {
    // console.log(key);
    document.getElementById(key).play();
    const clipID = this.bank
      .filter(clip => clip.key === key)
      .map(clip => clip.id);
    this.setDisplayText(clipID);
  };

  setDisplayText = displayText => {
    this.setState({
      displayText
    });
  };

  render() {
    return (
      <div id='drum-machine' onKeyPress={this.onKeyPress}>
        <Pads bank={this.bank} playSound={this.playSound} />
        <Display displayText={this.state.displayText} />
      </div>
    );
  }
}

export default BeatMachineApp;
