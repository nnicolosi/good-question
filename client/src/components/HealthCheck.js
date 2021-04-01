import React from 'react';

export class HealthCheck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            apiStatus: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/health', {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                this.setState({
                    apiStatus: response.status
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    apiStatus: 'Failure'
                })
            })
    }

    render() {
        return (
            <div>
                <span>Health Check Status: </span>
                <span>{this.state.apiStatus}</span>
            </div>
        )
    }
}
