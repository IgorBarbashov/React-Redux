import React, { Component } from "react";
import OneStringOfList from "./onestringofjist";
import PropTypes from 'prop-types';
import "./adminpanel.css";

class AdminPanel extends Component {

    renderListOfPages = (page, index) => {
        if ( this.props.location.state && page.id === this.props.location.state.pageID ) {
            return (
            <div className="admin-panel" key={index}>
                <OneStringOfList key={index} isCurrent={false} page={page} />
            </div>
            ); }
        return;
    }

    render() {
        return (
            this.props.pagesList.map(this.renderListOfPages)
        );
    }
}

AdminPanel.propTypes = {
    pagesList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default AdminPanel;