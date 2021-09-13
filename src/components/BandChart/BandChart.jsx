import React, { useEffect, useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import { SocketContext } from '../../context/SocketContext';
import { Bar } from 'react-chartjs-2';

export const BandChart = () => {
    const { socket } = useContext(SocketContext);
    const [votos, setVotos] = useState({});

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            // console.log(bands);
            // crearGrafica(bands);
            const {data}=crearGrafica(bands);
            setVotos(data);
            console.log(data.labels,bands)
        })
    }, [socket])

    const crearGrafica = (bands = []) => {

        const data = {
            labels: bands.map(band => band.name),
            datasets: [
              {
                label: '# of Votes',
                data: bands.map(band => band.votes),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };
          
          const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            animation: false,
            indexAxis: 'y',
          };

        // const myChart=new Chart(ctx, {
        //     type: 'bar',
        //     data: {
        //         labels: bands.map(band => band.name),
        //         datasets: [{
        //             label: '# of Votes',
        //             data: bands.map(band => band.votes),
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(255, 99, 132, 1)',
        //                 'rgba(54, 162, 235, 1)',
        //                 'rgba(255, 206, 86, 1)',
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         animation: false,
        //         indexAxis: 'y',
        //         scales: {
        //             y: {
        //                 beginAtZero: true
        //             }
        //         }
        //     }
        // });
        // if (myChart instanceof Chart) {
        //     myChart.destroy();
        // }
        return {
            data,
            options
        }
    }
   
      const options = {
        animation:false,
        indexAxis: 'x',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Lista de Bandas',
          },
        },
      };

    return (
        <Bar data={votos} options={options}  />
    )
}
