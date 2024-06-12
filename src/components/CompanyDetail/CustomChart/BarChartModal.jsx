import { Button, Dialog, DialogBody, DialogHeader, DialogFooter, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BarChartData_Columns_Rows_close } from '../../../store/slice/SingleCompnaySlice';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChartModal = () => {

    const {
        BarChartData: {
            Columns_Rows,
            Open: BarOpen,
            isPercentage: isPercentageBar
        }
    } = useSelector((state) => state.SingleCompany);

    const ThemeColorData = useSelector((state) => state.ThemeColor);
    const [open, setOpen] = useState(false);
    const [Option, setOption] = useState(null);
    const [IsChart, setIsChart] = useState(false);

    const rr_dispatch = useDispatch();

    let ThemeColor = ThemeColorData?.chartColor ||  '#7B70FF';

    const handleClose = () => {
        rr_dispatch(BarChartData_Columns_Rows_close({}));
        setOpen(false);
      };

      
        const handleOpen = () => setOpen(!open);


      useEffect(()=>{
        let data0 = [];
        let xInTitle = false;
        let chartTitle = "Loading..."
        if(Columns_Rows?.Columns && Columns_Rows?.Columns.length > 0){
            
            let isPercentage = ""
            let row = Columns_Rows.Rows;
            // console.log('Columns_Rows?.Columns >> ', Columns_Rows?.Columns)
            // console.log('Columns_Rows?.Rows >> ', Columns_Rows?.Rows)
    
            Columns_Rows?.Columns.map((item, i) => {
              isPercentage = ""
              if(row[item?.id].label != "" && row[item?.id].label != null && row[item?.id].label != undefined){
                if(i===0){
                  chartTitle = row[item?.id].label
                  xInTitle = chartTitle.toLowerCase(chartTitle).includes('(x)')
                  // console.log('xInTitle >>>> ', xInTitle)
                //   setChartTitle(chartTitle);
                }
                if (i > 0) {
                  let r_num = row[item?.id].label;
                  
                  if(r_num == ""){
                    r_num = Number(0);
                  }
                  // console.log('r_num >>> ', r_num)
                  if(r_num && r_num.includes("%")){
                      isPercentage = "%"
                  }
      
                  if(r_num){
                      r_num = r_num.replaceAll("%", "");
                  }
                  r_num = parseFloat(r_num);
                  
                  let n_r_num = r_num;
    
                  if(isPercentage){
                    r_num = r_num.toFixed(1);
                    n_r_num = r_num;
                    // r_num = Number(r_num).toPrecision(3)
                  }else
                  if(isPercentageBar == true){
                    r_num = r_num.toFixed(2);
                    n_r_num = r_num;
                    // r_num = Number(r_num).toPrecision(3)
                  }else
                  {
                    if(xInTitle){
                      r_num = r_num;
                    }else{
                      r_num = r_num.toFixed();
                    }
                    n_r_num = r_num;
                  }
                  r_num = Number(r_num)
                  
                  let myobj = {
                    name: item?.label,
                    y_0: n_r_num+isPercentage,
                    y: r_num,
                  };
                  data0.push(myobj);
                }
              }
    
            });
            console.log('data0 >>> ', data0)
            
            
            let options = {
              chart: {
                  type: 'column',
              },
              title: {
                    text: chartTitle,
                    },
              accessibility: {
                  announceNewData: {
                      enabled: true
                  }
              },
              xAxis: {
                  type: 'category'
              },
              legend: {
                  enabled: false
              },
              plotOptions: {
                  series: {
                      borderWidth: 0,
                      dataLabels: {
                          enabled: true,
                          format: `{point.y_0}`
                          // format: `${isPercentage ? "{point.y:.1f}"+isPercentage: "{point.y:.0f}"} -- 0`
                      }
                  }
              },
          
              tooltip: {
                  headerFormat: '<span style="font-size:11px"> </span>',
                  pointFormat: `<span style="color:{point.color}">{point.name} </span>: <b>{point.y_0}</b><br/>`
                  // pointFormat: `<span style="color:{point.color}">{point.name} </span>: <b>${isPercentage ? "{point.y:.1f}"+isPercentage: "{point.y:.0f}"}</b><br/>`
              },
          
              series: [
                  {
                      // name: 'Browsers',
                      color: ThemeColor,//ThemeColorData?.chartColor,
                      data: data0
                  }
              ]
          }
          
          setOption(options)
          setIsChart(true);
          
        }
        
    
      }, [Columns_Rows])


      useEffect(()=>{
        if(open != BarOpen){
            setOpen(BarOpen)
        }
      },[BarOpen, Columns_Rows]) 


  return (
    <>
       <Dialog
        open={open}
        handler={handleClose}
        size="lg"
        // animate={{
        //   mount: { scale: 1, y: 0 },
        //   unmount: { scale: 0.9, y: -100 },
        // }}
      >
        {/* <DialogHeader>Its a simple dialog.</DialogHeader> */}
        <DialogBody>
        {
                    IsChart ? (
                        <HighchartsReact
                            containerProps={{ style: { height: "100%" } }}
                            highcharts={Highcharts}
                            // constructorType={"stockChart"}
                            options={Option}
                        />

                    )
                    :
                    <Typography>Loading...</Typography>
                }
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
          {/* <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default BarChartModal
