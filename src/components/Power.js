import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Power extends Component {
  render() {
    const padPowerClass = this.props.isPoweredOn
      ? 'padPoweredOn'
      : 'padPoweredOff';
    return (
      <div className={`power-button pad ${padPowerClass}`}>
        <i
          className='fas fa-power-off fa-3x'
          onClick={this.props.togglePower}
          id='power-button'
        />
      </div>
    );
  }
}

Power.propTypes = {
  togglePower: PropTypes.func.isRequired
};

export default Power;
