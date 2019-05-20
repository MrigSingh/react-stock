const request = require('superagent');

module.exports = (app) => {
    app.post('/api/stock/portfolio', function (req, res, next) {
        const tickers = ['MSFT'];
        let apiKey = 'DV83895J9PJGTL61';

        let completed = 0;
        const results = [];
        //https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo
        for (let i = 0; i < tickers.length; i += 1) {
            const ticker = tickers[i];
            request
                .get('https://www.alphavantage.co/query')
                .query({ 'function': 'TIME_SERIES_INTRADAY' })
                .query({ interval: '1min' })
                .query({ symbol: ticker })
                .query({ apikey: apiKey })
                .then((response) => {
                    completed += 1;
                    results.push(response.body);
                    if (completed === tickers.length) {
                        console.log('completed');

                        res.send({
                            success: true,
                            message: 'Ticker Info',
                            results: results
                        });
                    }
                });
        }
    })
}