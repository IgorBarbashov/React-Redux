import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/auth';
import * as evotorActions from '../actions/evotor';

class App extends Component {
  static propTypes = {
		location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
		setAuthorization: PropTypes.func,
		evotorGetShops: PropTypes.func,
		evotorGetTerminals: PropTypes.func,
		// evotorGetCashiers: PropTypes.func
  };

  componentDidMount() {
    const { evotorGetShops, evotorGetTerminals } = this.props;
    this.authorization();
    // evotorGetShops();
    // evotorGetTerminals();
  };

  authorization = () => {
    const tokens = this.props.location.search.substring(1).split('&');
    let token, evoToken;
    tokens.map(el => {
      if (el.match('token')) token = el.slice('token='.length);
      else if (el.match('evoToken')) evoToken = el.slice('evoToken='.length);
    });
    this.props.setAuthorization({ token, evoToken });
  };
  
  render() {
    const { loadingToken, token } = this.props.auth;
    if (loadingToken !== false || token === '') return <h1>&quot;Token&quot; не был передан</h1>;

      return (
        <div>
        </div>
      );
  };
};

const mapStateToProps = ({ auth, router }) => ({ auth, location: router.location });

const mapDispatchToProps = dispatch =>
	bindActionCreators({ ...authActions, ...evotorActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);