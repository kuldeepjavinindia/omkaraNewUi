import React, {useState, useRef, useEffect} from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Typography } from '@material-tailwind/react';
// import "chartjs-plugin-piechart-outlabels";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);




const PieChart = (props) => {

  const chartRef = useRef(null);
  const { chartData, ChartTitle } = props
  const [Data, setData] = useState(null);
  const [Options, setOptions] = useState(null);


    let values1 = [];
    let labels1 = [];
    chartData.map((res)=>{
        // if(res.value > -1){
          labels1.push(res.subtitle)
          values1.push(parseFloat(res.value))
    });

  const data = {
  labels: labels1,
  datasets: [
    {
      data: values1,
      backgroundColor: [
        "#4448F5",
        '#3D9298',
        '#D3BDFF',
        '#A0ABE8',
        '#7DB6F9',
        '#CC8EA5',
        '#7DB6F9',
        '#ffffb2',
        '#F0AD0C',
        '#003f5c',
        '#c9cf71',
        '#efa956',
        '#303f9f',
        '#d81b60',
        '#1976d2',
        '#00c853',
        '#84ffff',
        '#5d4037',
      ],
      borderWidth: 1,
    },
  ],
};



  const pieOptions = {
    
    // maintainAspectRatio: false,
    responsive: true,
    aspectRatio:2,
    zoomOutPercentage: 100,
    plugins:{
      legend: {
        display: false,
        position: "bottom",
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            // console.log(datasets[0].data);
            let sum = 0;
            let dataArr = datasets[0].data;
            dataArr.map(data => {
                sum += Number(data);
            });
            return dataArr.map((data, i) => {
              let percentage = (data * 100 / sum).toFixed(2) + '%';
              return ({
                text: `${chart.data.labels[i]} (${data.toFixed(2)}%)`,
                fillStyle: datasets[0].backgroundColor[i],
              })
            })
          }
        },
        
      },
      datalabels: {
        display: false,
        color: '#36A2EB'
      },
      labels: {
        display: true,
        color: '#36A2EB'
      },
      outlabels: {
        display: true
      }, 
      tooltip: {
        callbacks: {
            label: function(context) {
                let label = context.label;
                let value = context.formattedValue;

                if (!label)
                    label = 'Unknown'

                let sum = 0;
                let dataArr = context.chart.data.datasets[0].data;
                dataArr.map(data => {
                    sum += Number(data);
                });

                // let percentage = (value * 100 / sum).toFixed(2) + '%';
                let percentage = value + '%';
                return label + ": " + percentage;
            }
        }
    },
      elements: {
        arc: {
          borderWidth: 0
        }
      }
    }
  };

  const [Legends, setLegends] = useState([])

  useEffect(() => {
    setLegends(chartRef.current.legend.legendItems)
  }, [])
  


  return (
    <>
    <div  className='bg-[#fff] rounded px-7 py-4'>
        <Typography className='text-[15px] text-[#000] font-semibold'>{ChartTitle}</Typography> 

      <Pie 
      data={data} 
      options={pieOptions}
      ref={chartRef}
      width={10}
      height={5}
      className='mb-8'
       />
       <div className="legend">
       <ul>

        {
          Legends.map((legend, i)=>{
            return (
              <li className='text-[12px] mb-3 flex gap-2 ' key={i}>
                <span style={{ backgroundColor: legend.fillStyle }} className='!text-[#000]  p-2 rounded-full w-[10px] h-[10px] font-medium'></span>
                {legend.text}
              </li>
            );
          })
        }
       </ul>
       </div>
    </div>
  </>
  
  )
}

export default PieChart