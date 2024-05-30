import { Typography, Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { ForensicApi } from "../../../store/slice/SingleCompnaySlice";
import { ForensicDataReq } from "../../../constants/defaultRequest";
import { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";


const ForensicData = (props)=> {
    const{
        type,
        title,
    }=props

 
    
  const rrd_params = useParams();
  const dispatch =  useDispatch();
  const [tabelHead, setTabelHead] = useState();
  const [tableBody, setTabelBody] = useState()



  const { Forensic :
     {data: ForensicData, loading: ForensicLoading}
    }  = useSelector(state=> state.SingleCompany);


    const {
        ForensicTabShowHide:{ data: ForensicTabShowHideData, loading: ForensicTabShowHideLoading},
        ForensicTabShowHide: ssss
      } = useSelector(state=>state.SingleCompany)



    
  let cmpId = rrd_params?.company_id;
  if(cmpId){
    cmpId = window.atob(cmpId);
  }

 const compId = cmpId

useEffect(()=> {
    let param =  ForensicDataReq
     param = {
        ...param,
       "companyID": compId,
       "Type": type
     }

  dispatch(ForensicApi(param))
     
}, [ForensicTabShowHideLoading]);


// console.log(ForensicData, "Forensic api", type, "===type======");


  let data = ForensicData.Data;

  
    return (
        <>

        {type}

        {
            data && data.length > 0 && data.map((item, index)=> {

              let tableHeader = item.header[0];
                let tabelData = []
                
                Object.keys(tableHeader).forEach((item,index)=> {
                  
                  var label = tableHeader[`column_${index}`];
                  var table = {
                    id: item,
                    header: label
                  }
                  tabelData.push(table)
                  
                })
                console.log(tabelData, "========= table body===========");

              
              
              
               


          let tableBody = item.TableData;
          let tableBodyData = [];

          Object.keys(tableBody).forEach((item, index)=> {

            var row = tableBody[item];
          
            var tableRow = {
              id: item,
              label : row
            }

            tableBodyData.push(tableRow)

          });


          


  


                return (
                    <>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            {
                tabelData.map((item, index)=> {

                    if(item.label != "") {
                        return (
                            <>
                             <tr>
                   
                  <th className="border-b border-blue-gray-100 bg-[#22242F] text-white p-2 text-[13px] font-medium" key={item.index}>
                  {item.label}
                  </th>
                </tr>
                            </>
                        )
                    }
              
                })
            }
           
          </thead>
          {/* <tbody className="text-black">
                {tableBodyData.map((item, index) => (
                    <tr key={item.$id} className="odd:bg-[#E8F0F4] even:bg-[#fff]">
                        {Object.keys(item).filter(key => key.startsWith('column_')).map((key, subIndex) => (
                            <td key={subIndex} className="px-2 py-1 text-[13px] font-medium">
                                {item[key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody> */}
        </table>
                    </>
                )
            })
        }


    


        </>
    )
}

export default ForensicData;