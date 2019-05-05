import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

class Menu extends Component {
    render () {
        return(
            <div className="main-menu">
                <div>
                    <Link to="/">Menu</Link>
                </div>
                <div>
                    <Link to="/playlist">Playlist</Link>
                </div>
                <div>
                    <Link to="tracks">Tracks</Link>
                </div>
            </div>
        );
    }
}

export default Menu;