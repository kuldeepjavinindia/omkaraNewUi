import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const PeerAnalysis = () => {
  const [TableColumns, setTableColumns] = useState([]);
  const [TableBody, setTableBody] = useState([]);
  const [PlusIcons, setPlusIcons] = useState({});

  const rr_dispatch = useDispatch();
  const {
    SCPeers:{
      data: PeersData,
      loading: PeersLoading,
    }
  } = useSelector(state=>state.SingleCompany)

  
useEffect(() => {
  if(!PeersLoading){
    let col_id = 'column_'
    if(PeersData.header && PeersData.header.length > 0){
      let cols = []
      let firstObj = PeersData.header[0];
      let a0 = firstObj.row;
      
      // let TThead = [];
      
      a0.map((item, i)=>{
          let dd = {
              "id": col_id+i,
              "width": "",
              "align": "",
              "bg_color": firstObj?.bg_color,
              "isItalic": firstObj?.isItalic,
              "isBold": firstObj?.isBold,
              "text_color": firstObj?.text_color,
              "label": item?.col
            }
          cols.push(dd);
      })
      
      // setTableHead(TThead)
      setTableColumns(cols)
    }
    
    
    if(PeersData.Data && PeersData.Data.length){
      let dataA = []
      let plusIcon = {};
      let a00 = PeersData.Data;
      a00.map((item)=>{
        let cData = item?.row;
        let childObj = {}
        cData.map((item0, i0)=>{
          let data = {
                "label":item0?.col,
                "bg_color":item['bg_color'],
                "isItalic":item['isItalic'],
                "isBold":item['isBold'],
                "text_color":item['text_color']
            }
            
            childObj = {...childObj, [`${col_id}${i0}`]: data} 
      })
        dataA.push(childObj)
      })
      setPlusIcons(plusIcon);
      setTableBody(dataA)
    }
  }
}, [rr_dispatch, PeersLoading])



  return (
    <>

    </>
  )
}

export default PeerAnalysis
