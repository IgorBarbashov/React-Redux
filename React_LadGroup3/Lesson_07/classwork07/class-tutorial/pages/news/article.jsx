import React, {Component} from 'react';
import MainTemplate from '../../layouts/Main';
import Head from 'next/head';

class Article extends Component {
    static async getInitialProps({query}) {
        return {
            articleCode: query.code
        }
    }

    render() {
        return (
            <div>
                <MainTemplate>
                    <h1>Article {this.props.articleCode}</h1>
                </MainTemplate>

                <Head>
                    <title>Новость: {this.props.articleCode}</title>
                </Head>
            </div>
        );
    }
}

export default Article;