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
import { useSelector } from "react-redux";







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

  
  const ThemeColorData = useSelector((state) => state.ThemeColor);

  const {
    detail,
    values,
    categories
  } = props

  
  const labels = categories;
  // const CAGR = detail?.CAGR;
  
  const themeColor = ThemeColorData?.chartColor ||  '#7B70FF';


  

  
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
