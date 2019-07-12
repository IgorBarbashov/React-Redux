import React, { Component } from "react";
import Greetings from "./greetings";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import "./pagecontent.css";

class PageContent extends Component {

    getCurrentPage = () => {
        if ( !this.props.location.state ) return <Greetings />;

        let currentPage = this.props.pagesList.filter( page =>
            page.id === this.props.location.state.pageID );

        return currentPage.length > 0 ? currentPage[0].description : "";
    }

    render() {
        if ( !this.props.location.state && this.props.location.pathname !== "/" )
            return <Redirect to="/" />

        return (
            <div className="page-content">
                { this.getCurrentPage() }
            </div>
        );
    }
}

PageContent.propTypes = {
    pagesList: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PageContent;