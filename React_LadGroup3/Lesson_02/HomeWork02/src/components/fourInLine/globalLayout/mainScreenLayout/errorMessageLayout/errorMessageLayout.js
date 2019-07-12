import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./style.css"

class ErrorMessageLayout extends Component {
    render() {
    // alert("ErrorMessageLayout");
    // const curPath = this.props.location.pathname ? this.props.location.pathname : "/";
    // const curIsLink = (!this.props.location.state || !this.props.location.state.isLink) ? false : true;
    // if (!curIsLink) { return <Redirect to="/error" />; }
    
        return (
            <div className="settings-layout">
            {/* <div className="comp-name-and-data">ErrorMessageLayout (/error - {curPath}):</div> */}
            {/* <div className="comp-name-and-data">Мы попали сюда по ссылке Link?: {""+curIsLink} (isLink)</div> */}


        <h1>Ай-ай-ай!!! Произошло что-то непредвиденное (возможно вы одновили страницу или ввели вручную адрес в строке)</h1>
        <div>
          <Link to={{ pathname: "/", state: {isLink: true} }}>
            Переходим на начало игры предварительно сбросив ее состояние (это проверяемый Link)
          </Link>
        </div>



            </div>
        );
    }
}

export default ErrorMessageLayout;