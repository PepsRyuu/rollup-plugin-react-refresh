import React , { Component } from 'react';

export default class MyClassComponent extends Component {
    constructor () {
        super();

        this.state = {
            count: 0 
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                count: this.state.count + 1
            })
        }, 200);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return <h2 className="MyClassComponent">MyClassComponent: {this.state.count}</h2>
    }
}