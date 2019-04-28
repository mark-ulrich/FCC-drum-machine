import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class VolumeControls extends Component {
  render() {
    const { volumeUp, volumeDown, volumeMute } = this.props.volumeMethods;
    return (
      <div className='volume-controls'>
        <i
          id='volume-down'
          className='fas fa-volume-mute fa-3x'
          onClick={volumeMute}
        />
        <i
          id='volume-mute'
          className='fas fa-volume-down fa-3x'
          onClick={volumeDown}
        />
        <i
          id='volume-up'
          className='fas fa-volume-up fa-3x'
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
