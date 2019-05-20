import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const StockInfo = (props) => {
    const {
        data
    } = props;
    console.log(data);
    const ticker = data['Meta Data']['2. Symbol'];
    const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
    const timezone = data['Meta Data']['5. Time Zone : US/Eastern'];//check this line if errors

    const rows = [];
    const timeSeries = data['Time Series (1min)'];
    console.log(timeSeries);
    for (var key in timeSeries) {
        if (timeSeries[key]) {
            const finData = timeSeries[key];
            const open = parseFloat(finData['1. open']);
            const high = parseFloat(finData['2. high']);
            const low = parseFloat(finData['3. low']);
            const close = parseFloat(finData['4. close']);
            const volume = parseFloat(finData['5. volume']);

            rows.push({
                date: key,
                open,
                high,
                low,
                close
            })
        }
    }

    console.log('rows', rows);

    return (
        <div>
            <p>{ticker}</p>
            <p>{lastRefreshed}</p>
            <p>{timezone}</p>

            <LineChart
                width={500}
                height={300}
                data={rows}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="open" stroke="#8884d8" dot={false} />
                <Line type="monotone" dataKey="high" stroke="#82ca9d" dot={false} />
                <Line type="monotone" dataKey="low" stroke="#8884d8" dot={false} />
                <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
            </LineChart>
        </div>
    )
}
export default StockInfo;