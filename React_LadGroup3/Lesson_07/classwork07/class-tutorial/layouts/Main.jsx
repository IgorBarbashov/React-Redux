import React, {Component} from 'react';
import Menu from '../components/Menu';
import Head from 'next/head';

class MainTemplate extends Component {
    render() {
        return (
            <div>
                <Menu />
                <h1>This is cool web-site</h1>
                <div>
                    {this.props.children}
                </div>
                <div>
                    <hr/>
                    This is footer
                </div>

                <Head>
                    <title>Supersite</title>
                </Head>

                <style jsx> {`
                    h1 {
                        color: red;
                    }
                `}</style>

            </div>
        );
    }
}

export default MainTemplate;