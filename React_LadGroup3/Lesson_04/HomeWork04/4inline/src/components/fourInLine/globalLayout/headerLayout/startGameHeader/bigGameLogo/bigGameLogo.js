import React, { Component} from "react";
import "./style.css"

class BigGameLogo extends Component {

    // getGameNameStyle = () => {
    //     let styleName = "wellcome-name";
    //     if (this.props.location.pathname !== "/") styleName += " playing";
    //     return styleName;
    // }

    render() {
        return (
            // <div className={ this.getGameNameStyle() }>4 в одну линию</div>
            <div className="big-game-logo-name">4 в одну линию</div>
        );
    }
}

export default BigGameLogo;