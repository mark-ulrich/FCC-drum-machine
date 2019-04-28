import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Pads extends Component {
  render() {
    const pads = this.props.bank;
    const padPowerClass = this.props.isPoweredOn
      ? 'padPoweredOn'
      : 'padPoweredOff';
    return (
      <div className='pads-container'>
        {pads.map(pad => (
          <div
            className={`drum-pad pad ${padPowerClass}`}
            key={pad.id}
            id={pad.id}
            onClick={() => this.props.playSound(pad.key)}
          >
            <audio src={pad.clip} className='clip' id={pad.key} />
            {pad.key}
          </div>
        ))}
      </div>
    );
  }
}

Pads.propTypes = {
  bank: PropTypes.array.isRequired,
  playSound: PropTypes.func.isRequired,
  isPoweredOn: PropTypes.bool.isRequired
};

export default Pads;
