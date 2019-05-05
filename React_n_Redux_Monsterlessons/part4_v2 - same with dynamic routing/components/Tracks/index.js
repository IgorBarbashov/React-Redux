import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Tracks extends Component {
    render () {
        return(
            !this.props.location.state || !this.props.location.state.fromLink
            ?
                <Redirect to="/" />
            :
                <Fragment>
                    <div>Tracks: {this.props.track.name}</div>
                </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    track: state.tracks.filter(track => track.id === Number(ownProps.match.params.id))[0]
});

export default connect(mapStateToProps)(Tracks);