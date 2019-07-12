import React, {Component} from 'react';
import MainTemplate from '../layouts/Main';

class IndexPage extends Component {
    constructor() {
        super();
        this.state = {
            number: 1
        }
    }

    render() {
        return (
            <MainTemplate>
                <h1>It works!</h1>

                <style global jsx>{`
                    h1 {
                        color: ${this.state.number == 1 ? 'green' : 'blue'}
                    }
                `}</style>

            </MainTemplate>
        );
    }
}

export default IndexPage;