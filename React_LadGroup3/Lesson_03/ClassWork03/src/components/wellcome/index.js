import React, { Component } from 'react';
import './Wellcome.css';
import { Link } from 'react-router-dom';

class Wellcome extends Component {
constructor() {
    super();
    this.input = React.createRef();
}
checkInput = () => {
    console.log (this.input.current.value);
}


state = {
    fpname: "Первый игрок",
    spname: "Второй игрок"
}

setFirstUserName = (event) => {
    this.setState({
        fpname: event.target.value
    });
}

setSecondUserName = (event) => {
    this.setState({
        spname: event.target.value
    });
}

render() {
  return (
    <div className="wellHeader">
       <h1>Wellcome!!!</h1>

       <div><input type="text" value={this.state.fpname} onChange={this.setFirstUserName} /></div>
       <div><input type="text" value={this.state.spname} onChange={this.setSecondUserName} /></div>

       <div><input type="text" ref={this.input} /></div>
       {/* здесь еще енопка для вызова функции */}

        <Link to={{
            pathname: "/game",
            state: {
                fromWellcome: true,
                fpname: this.state.fpname,
                spname: this.state.spname
            }
        }}> Let the Game begin!!! </Link>

    </div>
  )
  }
}

export default Wellcome;
