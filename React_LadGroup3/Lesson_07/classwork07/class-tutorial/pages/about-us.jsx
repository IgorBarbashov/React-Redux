import React, {Component} from 'react';
import Head from 'next/head';
import MainTemplate from '../layouts/Main';

class AboutPage extends Component {
    render() {
        return (
            <div>
                <MainTemplate>
                    <h1>It all about us!</h1>
                </MainTemplate>

                <Head>
                    <title>О нас</title>
                </Head>
            </div>
        );
    }
}

export default AboutPage;