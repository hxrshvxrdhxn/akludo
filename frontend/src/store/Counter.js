import React, { Component } from 'react';
import { connect } from 'react-redux';

const containerStyle = {
  display: 'flex'
}
const buttonStyle = {
  fontSize: '1.5rem',
  width: '40px',
  height: '40px'
}

const Counter = (props) => {

  const addOne = () => {
    props.dispatch({ type: 'ADD_ONE' });
  }

  const minusOne = () => {
    props.dispatch({ type: 'MINUS_ONE' });
  }

  return (
    <div className="App" >
      <header className="App-header">
        <h1>{props.number}</h1>
        <div style={containerStyle}>
          <button onClick={minusOne} type="button" style={buttonStyle}>-</button>
          <button onClick={addOne} type="button" style={buttonStyle}>+</button>
        </div>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    number: state.number
  };
}

export default connect(mapStateToProps)(Counter);