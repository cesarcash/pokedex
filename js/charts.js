const ctx = document.getElementById('stats').getContext('2d');

export function createChart(stats){
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'HP',
                'Ataque',
                'Defensa',
                ['Ataque','especial'],
                ['Defensa','especial'],
                'Velocidad'
            ],
            datasets: [{
                data: stats,
                backgroundColor: 'white',
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'white'
                    },
                    pointLabels: {
                        color: 'white'
                    },
                    angleLabels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}