import {useEffect, useState} from 'react'
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { Typography } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { TrendlyneReq } from '../../../constants/defaultRequest';
import { EOD_OHLCAPI } from '../../../store/slice/TrendlyneSlice';


import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";

indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);

const PriceChart = () => {

    
  const [OHLC, setOHLC] = useState([]);
  const [VOLUME, setVOLUME] = useState([]);
  const [Options, setOptions] = useState([]);
  const [IsChart, setIsChart] = useState(false);

  const rr_dispatch = useDispatch();

  const {
    EOD_OHLC: {
      data: EOD_OHLCData,
      loading: EOD_OHLCLoading,
    }
  } = useSelector(state=>state?.Trendlyne)


    
  const {
    companyNotes:{
    //   loading: cmpNotesLoading,
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
            // console.log('EOD_OHLCData ?????? ', EOD_OHLCData)
            let a0 = [];
            let v0 = [];
            let a0000 = EOD_OHLCData && EOD_OHLCData.length > 0 && EOD_OHLCData.slice(0, (EOD_OHLCData.length-1)).sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            })

            a0000 && a0000.length > 0 && a0000.map((item ) => {
                const d = new Date(item?.date);
                let date1 = d.valueOf();
                // let date12 = d;
                let a00 = [
                    date1,
                    item.close_price,
                    item.open_price,
                    item.high_price,
                    item.low_price,
                ]
                a0.push(a00)
                let v00 = [
                    date1,
                    (item?.volume || item.traded_qty),
                ]
                v0.push(v00)
            })

            setOHLC(a0)
            setVOLUME(v0)

        }

    }
  }, [rr_dispatch, EOD_OHLCLoading])
  
  

  useEffect(()=>{
    if(OHLC.length > 0 &&
        VOLUME.length > 0){
            let options0 ={}
                options0 = {
                  colors: [
                    '#7cb5ec',
                    '#434348',
                    '#90ed7d',
                    '#f7a35c',
                    '#8085e9',
                    '#f15c80',
                    '#e4d354',
                    '#2b908f',
                    '#f45b5b',
                    '#91e8e1'
                ],
                  chart: {
            
                    zooming:{
                      key:undefined,
                      mouseWheel:{
                      enabled:false
                      }
                      
                      },
                      spacingTop: 50,
                      spacingBottom: 50,
        
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
              yAxis: [
                {
                  labels: {
                    align: "left",
                  },
                  height: "80%",
                  resize: {
                    enabled: true,
                  },
                },
                {
                  labels: {
                    align: "left",
                  },
                  top: "80%",
                  height: "20%",
                  offset: 0,
                  plotLines: [{
                      value: 0,
                      color: '#59D',
                      dashStyle: 'shortDash',
                      width: 2
                  }],
                },
              ],
              series: [
                {
                  type: "spline",
                  id: "aapl-ohlc",
                  name: "Price",
                  data: OHLC,
                },
                {
                  type: "column",
                  id: "aapl-volume",
                  name: "Volume",
                  data: VOLUME,
                  yAxis: 1,
                },
              ],
              plotOptions: {
                series: {
                    // pointWidth: 20,
                    // minPointLength: 100
                    lineWidth: 2.5,
                    lineColor:'#006aff',
                    color:'#817e88', // Volume Color/ Bar Color
                    "gapSize": 10,

                }
            },
              responsive: {
                rules: [
                  {
                    condition: {
                      maxWidth: 800,
                    },
                    chartOptions: {
                      rangeSelector: {
                        inputEnabled: false,
                      },
                    },
                  },
                ],
              },
            };
            setOptions(options0);
            setIsChart(true);
    }
  }, [OHLC, VOLUME]);



  return (
    <>
      {
        !IsChart && 
            <div className='w-full text-center'>
                <Typography>
                Fetching Data...
                </Typography>
            </div>
      }
      {IsChart && (
          <HighchartsReact
            containerProps={{ style: { height: "100%", overflow:"hidden" } }}
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={Options}
          />
        )}
    </>
  )
}

export default PriceChart
