import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';

Chart.register(...registerables);

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

const PlotChart = ({ countryData, selectedCountries }) => {
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    const newData = countryData
      .filter(country => selectedCountries.includes(country._id))
      .flatMap(country =>
        country.data.map(data => ({
          ...data,
          countryId: country._id,
          Country: country.Country,
          dt: DateTime.fromISO(data.dt).toFormat('yyyy-MM-dd'), // Format date for better tooltip
        }))
      );
    setPlotData(newData);
  }, [countryData, selectedCountries]);

  const chartData = {
    datasets: selectedCountries.map((countryId, index) => {
      const country = countryData.find(c => c._id === countryId);
      return {
        label: country.Country,
        data: plotData
          .filter(data => data.countryId === countryId)
          .map(data => ({
            x: data.dt,
            y: data.AverageTemperature,
          })),
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length] + '33',
        fill: false,
        tension: 0.4,
      };
    }),
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Average Temperature (°C)',
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          enabled: true,
          mode: 'xy',
        },
      },
      tooltip: {
        callbacks: {
          label: tooltipItem => `Temperature: ${tooltipItem.raw.y}°C`,
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ position: 'relative', height: '60vh', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

PlotChart.propTypes = {
  countryData: PropTypes.array.isRequired,
  selectedCountries: PropTypes.array.isRequired,
};

export default PlotChart;
