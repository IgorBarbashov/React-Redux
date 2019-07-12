import React, { Component } from 'react';
import { Link } from "react-router-dom";
import GameButtonWithoutLink from '../../gameButton/gameButtonWithoutLink';
import "./style.css"

class ErrorMessageLayout extends Component {
    render() {
        return (
          <div className="settings-layout error-layout">
            <h1>Ай-ай-ай!!</h1>
            <h3>Произошло что-то непредвиденное (возможно вы обновили страницу<br/>или ввели вручную адрес в строке)</h3>
            <h3>Переходим на начало игры предварительно сбросив ее состояние.</h3>

            <div>
              <Link to={{ pathname: "/", state: {isLink: true} }}>
                <GameButtonWithoutLink buttonName="Сброс игры" />
              </Link>
            </div>
          </div>
        );
    }
}

export default ErrorMessageLayout;