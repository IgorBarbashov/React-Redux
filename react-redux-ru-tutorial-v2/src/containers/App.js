import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import User from '../components/User';
import Page from '../components/Page';
import * as getPhotos from '../actions/PageActions';
import * as handleLogin from '../actions/UserActions';

class App extends Component {
	render() {
		const { user, page, getPhotos, handleLogin } = this.props;
		return (
			<div className="app">
				<Page
					photos={page.photos}
					year={page.year}
					isFetching={page.isFetching}
					getPhotos={getPhotos}
					error={page.error}
				/>
				<User
					name={user.name}
					isFetching={user.isFetching}
					error={user.error}
					handleLogin={handleLogin}
				/>
			</div>
		);
	}
}

const mapStateToProps = store => {
	return {
		user: store.user,
		page: store.page,
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ ...getPhotos, ...handleLogin }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
