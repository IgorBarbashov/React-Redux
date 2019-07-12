import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class AdminButtons extends Component {
    render() {
        return (
            <div className="admin-buttons">
                <Link to={ { pathname: "/" + this.props.pageiD, state: {pageID: this.props.pageiD} } }>
                    [Edit]
                </Link>
            </div>
        );
    }
}

AdminButtons.propTypes = {
    pageiD: PropTypes.string.isRequired
}

export default AdminButtons;