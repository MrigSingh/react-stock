import React, { Component } from 'react';
import StockInfo from './StockInfo';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            error: null,
            results: [],
        };
        this.fetchProfileStockInfo = this.fetchProfileStockInfo.bind(this);
    }
    componentWillMount() {
        this.fetchProfileStockInfo();
    }

    fetchProfileStockInfo() {
        console.log("Calling Fetch");
        fetch('/api/stock/portfolio', { method: 'POST' })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        isLoading: false,
                        results: json.results
                    })

                } else {
                    this.setState({
                        isLoading: false,
                        error: json.message,
                    });
                }
            });
    }

    render() {
        const {
            error,
            isLoading,
            results
        } = this.state;
        if (isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        }
        if (error) {
            return (
                <div style={{ backgroundColor: '#610B21' }}>
                    <p style={{ color: 'fff' }}>{error}</p>
                </div>
            )
        }
        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>Welcome to the Dashboard</h2>
                {results.map(result => <StockInfo data={result} />)}
            </div>
        );

    }
}

export default Profile;