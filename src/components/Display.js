import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Display extends Component {
  render() {
    return (
      <div id='display'>
        <h1>{this.props.displayText}</h1>
      </div>
    );
  }
}

Display.propTypes = {
  displayText: PropTypes.string.isRequired
};

export default Display;
