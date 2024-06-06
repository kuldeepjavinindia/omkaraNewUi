// import Highcharts, { color } from "highcharts";
// import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";






import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';







ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  scales: {    
    x: {
      ticks: {
        display: false
      }, grid: {
        drawBorder: false,
        display: false

      },
    },
    y: {
      ticks: {
        display: true,
      },
      grid: {
        drawBorder: false,
        display: false
      }
    }
  },
  elements: {
    bar: {
      borderWidth: 1,
      marginLeft: 20
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 0,
      right: 50,
      bottom: 0,
      left: 0
    }
  },
  aspectRatio: 10 / 3,

  plugins: {
    datalabels: {
      align: function (context) {
        var value = context.dataset.data[context.dataIndex];
        return 'end';
      },
      anchor: function (context) {
        var value = context.dataset.data[context.dataIndex];
        // console.log(' value >>>> ', value)
        return value > -1 ? 'end' : 'start';
      },
      borderRadius: 4,
      color: 'black',
      display: true,
      padding: function (context) {
        var value = context.dataset.data[context.dataIndex];
        return value > -1 ? '0' : '5';
      },
    },
    legend: {
      display: false,
      position: 'left',
    },
    title: {
      display: false,
      // text: 'Chart.js Horizontal Bar Chart',
    },
  },
};




const CustomChart = (props) => {


  const [Option, setOption] = useState(null);
  const [IsChart, setIsChart] = useState(false);

  const {
    detail,
    values,
    categories
  } = props

  

  // useEffect(()=>{
  //   // console.log('====================================');
  //   // console.log('props >>> ', props);
  //   // console.log('====================================');
  
  //     let chartTitle = detail?.title
        
  //       let options = {
  //         chart: {
  //             backgroundColor: 'transparent',
  //             type: 'bar'
  //         },
  //         title: {
  //             text: chartTitle,
  //             align: 'center',
  //             style:{
  //               fontSize:'15px',
  //               fontWeight: 700,
  //               color: '#000'
  //             }
  //         },
  //         subtitle: {
  //             text: `${detail.yoy ? "YOY: "+detail.yoy+" <br />" : ""} ${detail.qoq ? "QOQ: " + detail.qoq : ""}`,
  //             align: 'center',
  //             style:{
  //               fontSize:'12px'
  //             }
  //         },
  //         accessibility: {
  //             point: {
  //                 valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
  //             }
  //         },
  //         legend:{
  //           enabled: false
  //         },
  //         xAxis: [{

  //             categories: categories,
  //             reversed: false,
  //             labels: {
  //                 step: 1
  //             },
  //             accessibility: {
  //                 // description: 'Age (male)'
  //             }
  //         }],
  //         yAxis: [{
  //           labels: {
  //                 enabled:false,
  //                 step: 1
  //             },
            
  //         }],
      
  //         plotOptions: {
  //             // series: {
  //             //     // stacking: 'normal',
  //             //     // borderRadius: '50%'
                 
  //             // }
  //             bar: {
  //               borderRadius: '20%',
  //               dataLabels: {
  //                   enabled: true
  //               },
  //               groupPadding: 0.1
  //           }
  //         },
      
  //         tooltip: {
  //             // format: '<b>{series.name}, age {point.category}</b><br/>' + 'Population: {(abs point.y):.1f}%'
  //             format: '<b>{point.category}</b> '
  //         },
      
  //         series: [{
  //             name: '',
  //             color: '#7B70FF',
  //             data: values
  //         }]
  //     }
      
  //     setOption(options)
  //     setIsChart(true);

  // }, [props])


  const labels = categories;
  const CAGR = detail?.CAGR;
  
  const themeColor = '#7B70FF';


  

  
  const data = {
    labels,
    legend: {
      display: false
    },
    datasets: [
      {
        // clip: {left: 10, top: 20, right: 30, bottom: 40},
        label: '',
        data: values,
        borderRadius: function(context){
          return 5
        },
        borderColor: function (context) {
          return context.raw > 0 ? `${themeColor ? themeColor : 'rgb(34, 132, 65)'}` : 'rgba(244, 67, 54)';
          // return context.raw > 0 ? 'rgb(34, 132, 65)' : 'rgba(244, 67, 54)';
        },
        backgroundColor: function (context) {
          return context.raw > 0 ? `${themeColor ? themeColor : 'rgba(34, 132, 65, 0.5)'}` : 'rgba(244, 67, 54, 0.5)';
          // return context.raw > 0 ? 'rgba(34, 132, 65, 0.5)' : 'rgba(244, 67, 54, 0.5)';
        },
      },
    ],
  };

  





  return (
    <>

    {/* <div>
      <div className="text-center">
        <h4 className=" font-semibold text-[15px] text-black">
          {detail?.title}
        </h4>
        <p className="text-[12px]" dangerouslySetInnerHTML={{ 
          __html: `${detail.yoy ? "YOY: "+detail.yoy+" <br />" : ""} ${detail.qoq ? "QOQ: " + detail.qoq : ""}`
         }}>
          
        </p>
      </div>
    </div> */}
    <Bar options={options} data={data} />

    
    {
      IsChart && (
        <>  
          {/* <HighchartsReact
              containerProps={{ style: { height: "100%" } }}
              highcharts={Highcharts}
              options={Option}
          /> */}
          
        </>
      )
    }
    </>
  )
}

export default CustomChart
