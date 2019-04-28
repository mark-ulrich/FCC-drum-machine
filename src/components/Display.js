import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Display extends Component {
  render() {
    const text = this.props.isPoweredOn ? this.props.displayText : '';
    return <div id='display'>{text}</div>;
  }
}

Display.propTypes = {
  displayText: PropTypes.string.isRequired,
  isPoweredOn: PropTypes.bool.isRequired
};

export default Display;
