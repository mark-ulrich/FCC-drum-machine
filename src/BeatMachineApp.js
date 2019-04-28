import React, { Component } from 'react';

import Header from './components/Header';
import Pads from './components/Pads';
import Display from './components/Display';
import VolumeControls from './components/VolumeControls';
import Power from './components/Power';

const DefaultDisplayText = 'BeatMachine';
const DefaultMutedText = 'MUTED';
const DefaultVolume = 10;

const ResetDisplayTimeout = 2500;

export class BeatMachineApp extends Component {
  constructor(props) {
    super(props);

    this.displayTimeout = null;

    this.keyMap = {
      P: this.togglePower,
      '<': this.setVolumeDown,
      '>': this.setVolumeUp,
      M: this.toggleMute
    };

    this.bank = [
      {
        id: 'Heater 1',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        key: 'Q'
      },
      {
        id: 'Heater 2',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
        key: 'W'
      },
      {
        id: 'Heater 3',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
        key: 'E'
      },
      {
        id: 'Heater 4',
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
      poweredOn: true,
      displayText: DefaultDisplayText,
      volume: DefaultVolume,
      isMuted: false
    };
  }

  componentDidMount = () => {
    // Handle KeyPress Events
    document.addEventListener('keypress', e => {
      // Pads
      const id = e.key.toUpperCase();
      const keys = this.bank.map(elem => elem.key);
      if (keys.indexOf(id) >= 0) this.playSound(id);
      // Other hotkeys
      else if (Object.keys(this.keyMap).indexOf(id) >= 0) {
        this.keyMap[id]();
      }
    });
  };

  // Toggle power on/off
  togglePower = () => {
    const poweredOn = this.state.poweredOn ? false : true;
    this.setState({
      poweredOn,
      displayText: DefaultDisplayText,
      isMuted: false,
      volume: DefaultVolume
    });
  };

  // Play sound from associated HTML <audio> element
  playSound = key => {
    if (!this.state.poweredOn || this.state.isMuted) return;

    // Set correct volume and play clip
    const clip = document.getElementById(key);
    clip.volume = this.state.volume / 100;
    clip.play();

    // Update display with clip name
    const clipName = this.bank
      .filter(clip => clip.key === key)
      .map(clip => clip.id)[0];
    this.setDisplayText(clipName);
  };

  // Set the display text. Will revert to either 'MUTED' or default state after
  //  a given timeout.
  setDisplayText = displayText => {
    this.setState({ displayText });

    // If timeout is active, clear it first
    if (this.displayTimeout) window.clearTimeout(this.displayTimeout);
    this.displayTimeout = setTimeout(
      () =>
        this.setState({
          displayText:
            displayText === DefaultMutedText || this.isMuted
              ? DefaultMutedText
              : DefaultDisplayText
        }),
      ResetDisplayTimeout
    );
  };

  setVolume = volume => {
    this.setState({
      volume
    });
    this.setDisplayText(`Volume: ${volume}`);
  };

  setVolumeUp = () => {
    const volume = Math.min(this.state.volume + 1, 10);
    this.setVolume(volume);
  };

  setVolumeDown = () => {
    const volume = Math.max(this.state.volume - 1, 0);
    this.setVolume(volume);
  };

  toggleMute = () => {
    if (!this.state.poweredOn) return;

    const isMuted = this.state.isMuted ? false : true;
    // console.log('Setting isMuted: ', isMuted);
    this.setState({
      isMuted
    });
    if (isMuted) this.setDisplayText(DefaultMutedText);
    else this.setDisplayText(`Volume: ${this.state.volume}`);
  };

  // Pack the volume control methods for easier transfer as property
  volumeMethods = {
    volumeUp: this.setVolumeUp,
    volumeDown: this.setVolumeDown,
    volumeMute: this.toggleMute
  };

  render() {
    return (
      <div id='drum-machine' onKeyPress={this.onKeyPress}>
        <Header />
        <Pads
          bank={this.bank}
          playSound={this.playSound}
          isPoweredOn={this.state.poweredOn}
        />
        <div className='controls'>
          <Display
            displayText={this.state.displayText}
            isPoweredOn={this.state.poweredOn}
          />
          <VolumeControls
            volumeMethods={this.volumeMethods}
            isPoweredOn={this.state.poweredOn}
          />
          <Power
            togglePower={this.togglePower}
            isPoweredOn={this.state.poweredOn}
          />
        </div>
      </div>
    );
  }
}

export default BeatMachineApp;
