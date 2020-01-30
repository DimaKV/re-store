import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator';

export default class ErrorBoundary extends Component{
    constructor(){
        super();
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(){
        this.setState({
            hasError: true
        });
    }

    render(){
        const {hasError} = this.state;

        return hasError ? <ErrorIndicator/> : this.props.children
    }
}

