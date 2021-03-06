import React from 'react'

export const Counter = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Fetching : {props.isFetching ? 'waiting' : 'idle'}</h2>
    <p>{props.counter}</p>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.getValue}>
      Double (Async)
    </button>
  </div>
)

Counter.propTypes = {
  counter     : React.PropTypes.string,
  isFetching     : React.PropTypes.bool.isRequired,
  getValue : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default Counter
