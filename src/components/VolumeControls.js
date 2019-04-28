import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class VolumeControls extends Component {
  render() {
    const padPowerClass = this.props.isPoweredOn
      ? 'padPoweredOn'
      : 'padPoweredOff';
    const { volumeUp, volumeDown, volumeMute } = this.props.volumeMethods;
    return (
      <div className='volume-controls'>
        <i
          id='volume-down'
          className={`fas fa-volume-mute fa-2x pad ${padPowerClass}`}
          onClick={volumeMute}
        />
        <i
          id='volume-mute'
          className={`fas fa-volume-down fa-2x pad ${padPowerClass}`}
          onClick={volumeDown}
        />
        <i
          id='volume-up'
          className={`fas fa-volume-up fa-2x pad ${padPowerClass}`}
          onClick={volumeUp}
        />
      </div>
    );
  }
}

VolumeControls.propTypes = {
  volumeMethods: PropTypes.object.isRequired
};

export default VolumeControls;
