import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TrendlyneReq } from '../../../constants/defaultRequest';
import { EOD_OHLCAPI, PBAPI } from '../../../store/slice/TrendlyneSlice';
import { Typography } from '@material-tailwind/react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';

const PBChart = () => {

    const [OHLC, setOHLC] = useState([]);
    const [VOLUME, setVOLUME] = useState([]);
    const [Options, setOptions] = useState([]);
    const [IsChart, setIsChart] = useState(false);
      
    const rr_dispatch = useDispatch();

    
    const {
        EOD_OHLC: {
          data: EOD_OHLCData,
          loading: EOD_OHLCLoading,
        },
        PB: {
          data: PBData,
          loading: PBLoading,
        },
      } = useSelector(state=>state?.Trendlyne)
    
    
        
      const {
        companyNotes:{
          data: cmpNotesData
        }
      } = useSelector(state=>state.SingleCompany)
      const companyData = cmpNotesData?.Data?.[0] || [];


      
  useEffect(() => {
    if(cmpNotesData?.Data && cmpNotesData?.Data.length > 0){
        let compSlug = (companyData.BSEcode || companyData.NSEcode);
        if(EOD_OHLCLoading){
            let param = TrendlyneReq;
            param = {
                ...param,
                compSlug: compSlug
            }
            rr_dispatch(EOD_OHLCAPI(param));

        }

    if(!EOD_OHLCLoading){
        let a0 = [];
        // let v0 = [];
        let a0000 = EOD_OHLCData.slice(0, (EOD_OHLCData.length-1)).sort(function (a, b) {
                      return new Date(a.date) - new Date(b.date);
                  })
          a0000.map((item) => {
            const d = new Date(item?.date);
            let date1 = d.valueOf();
            let a00 = [
                date1,
                item.close_price,
            ]
            a0.push(a00)
            
        })
        setOHLC(a0)
        
    }
    }
  }, [rr_dispatch, EOD_OHLCLoading]);


  useEffect(() => {


    if(cmpNotesData?.Data && cmpNotesData?.Data.length > 0){
        let compSlug = (companyData.BSEcode || companyData.NSEcode);
        if(PBLoading){
            let param = TrendlyneReq;
            param = {
                ...param,
                compSlug: compSlug
            }
            rr_dispatch(PBAPI(param));
            
        }
    
    if(!PBLoading){
        let v0 = [];
        for(let i = PBData.length - 1; i >= 0; i--) {
              const valueAtIndex = PBData[i]
              const d = new Date(valueAtIndex[0]);
              let date1 = d.valueOf();
              let a00 = [
                date1,
                valueAtIndex[1]
              ]
          v0.push(a00)
        }
        setVOLUME(v0)
    }
}


    // fetchData();
  }, [rr_dispatch, PBLoading]);




  useEffect(() => {
    if(OHLC.length > 0 &&
      VOLUME.length > 0){
        let options = {
          chart: {
                
            zooming:{
              key:undefined,
              mouseWheel:{
              enabled:false
              }
              
              }

            },
        
          title: {
            text: "",
          },
    
    
          
          
          rangeSelector: {
                        
            buttons: [{
              type: 'month',
              count: 1,
              text: '1m',
              title: 'View 1 month'
          }, {
              type: 'month',
              count: 3,
              text: '3m',
              title: 'View 3 months'
          }, {
              type: 'month',
              count: 6,
              text: '6m',
              title: 'View 6 months'
          }, {
              type: 'ytd',
              text: 'YTD',
              title: 'View year to date'
          }, {
              type: 'year',
              count: 1,
              text: '1y',
              title: 'View 1 year'
          }, {
              type: 'year',
              count: 3,
              text: '3y',
              title: 'View 3 year'
          }, {
              type: 'year',
              count: 5,
              text: '5y',
              title: 'View 5 year'
          }, {
              type: 'all',
              text: 'All',
              title: 'View all'
          }],
                selected: 4
            },


          yAxis: [{ // left y axis
            opposite:false,
            title: {
                text: "Price"
            },
            
        }, { 
          opposite:true,

            title: {
                text: 'PB'
            },
        }],
        plotOptions: {
          series: {
              lineWidth: 1.5,
          }
      },
          series: [
            {
              data: OHLC,
              name: "Price",
              type: "spline",
              id: "Price_001",
            },
            {
              data: VOLUME,
              name: "PB",
              type: "spline",
              id: "PB_001",
              yAxis: 1,
            },
          ],
        };
        setOptions(options)
        setIsChart(true);
      }

    
  }, [OHLC, VOLUME]);





  return (
    <>
      {
      !IsChart && 
      <div  className=' w-full text-center'>
          <Typography>
            Fetching Data...
          </Typography>
      </div>
    }
    {
      IsChart &&
        <HighchartsReact
          containerProps={{ style: { height: "100%" } }}
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={Options}
        />
    }
    </>
  )
}

export default PBChart
