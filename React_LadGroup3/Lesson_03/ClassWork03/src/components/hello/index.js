import React, { Component } from 'react';

class Hello extends Component {
      // здесь отрисовка - 'красота'

    // name = 'Maxim';

    sayHello(name) {
        return 'Hello ' + name;
    }

    render() {
        return (
        <>
            {/* <input type="button" value="pressMe" onClick="alert(1)"> */}
            {/* <p>Hello world</p> */}
            <p onClick={this.props.onPress} >{this.sayHello("Maxim")}</p>
            {/* <p>{this.sayHello(this.props.name)}</p> */}
        </>
        );
    }
}


// шаблонные строки в js es6 через скобки
export default Hello;