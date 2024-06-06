import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

const CustomChart = (props) => {


  const [Option, setOption] = useState(null);
  const [IsChart, setIsChart] = useState(false);

  const {
    detail,
    values,
    categories
  } = props

  

  useEffect(()=>{
    // console.log('====================================');
    // console.log('props >>> ', props);
    // console.log('====================================');
  
      let chartTitle = detail?.title
        
        let options = {
          chart: {
              backgroundColor: 'transparent',
              type: 'bar'
          },
          title: {
              text: chartTitle,
              align: 'center',
              style:{
                fontSize:'15px',
                fontWeight: 700,
                color: '#000'
              }
          },
          subtitle: {
              text: `${detail.yoy ? "YOY: "+detail.yoy+" <br />" : ""} ${detail.qoq ? "QOQ: " + detail.qoq : ""}`,
              align: 'center',
              style:{
                fontSize:'12px'
              }
          },
          accessibility: {
              point: {
                  valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
              }
          },
          legend:{
            enabled: false
          },
          xAxis: [{

              categories: categories,
              reversed: false,
              labels: {
                  step: 1
              },
              accessibility: {
                  // description: 'Age (male)'
              }
          }],
          yAxis: [{
            labels: {
                  enabled:false,
                  step: 1
              },
            
          }],
      
          plotOptions: {
              // series: {
              //     // stacking: 'normal',
              //     // borderRadius: '50%'
                 
              // }
              bar: {
                borderRadius: '20%',
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
          },
      
          tooltip: {
              // format: '<b>{series.name}, age {point.category}</b><br/>' + 'Population: {(abs point.y):.1f}%'
              format: '<b>{point.category}</b> '
          },
      
          series: [{
              name: '',
              color: '#7B70FF',
              data: values
          }]
      }
      
      setOption(options)
      setIsChart(true);

  }, [props])


  return (
    <>

    

    {
      IsChart && (
        <>  
          <HighchartsReact
              containerProps={{ style: { height: "100%" } }}
              highcharts={Highcharts}
              options={Option}
          />
        </>
      )
    }
    </>
  )
}

export default CustomChart
