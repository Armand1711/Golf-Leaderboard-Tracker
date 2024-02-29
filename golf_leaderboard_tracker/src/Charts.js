import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const LandingDashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data from the Golf Leaderboard API
        const apiUrl = 'https://golf-leaderboard-data.p.rapidapi.com/scorecard/220/101017';

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0fe19bfb79msh2b7bf51b23f88b0p1b28a9jsndee7058f229c',
                'X-RapidAPI-Host': 'golf-leaderboard-data.p.rapidapi.com',
            },
        })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error:', error));
    }, []);

    // Check if data is loaded
    if (!data) {
        return <p>Loading...</p>;
    }

    // Extract relevant data for your charts
    const leaderboard = data.leaderboard || [];
    const playerNames = leaderboard.map(player => player.playerName);
    const scores = leaderboard.map(player => player.totalScore);

    // Create data for Chart.js
    const chartData = {
        labels: playerNames,
        datasets: [{
            label: 'Total Scores',
            data: scores,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    // Chart options
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h1>Golf Leaderboard Dashboard</h1>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default LandingDashboard;
