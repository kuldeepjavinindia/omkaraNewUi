import { AiOutlineCloseCircle } from "react-icons/ai"; 
import React from 'react'
import { Box, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';




export default function FilterItemRender(props) {

    const { keys, itemData, onClick, showFilter, setShowFilter } = props

    const dispatch = useDispatch();

    const { 
            sectorMaster:{
                data: sectorMaster,
                // loading: sectorMasterLoading
            },
            industryMaster:{
                data: industryMaster,
                // loading: industryMasterLoading
            },
            allCompanyMaster:{
                data: companyMaster,
                // loading: companyMasterLoading
            },
            turnAroundMaster:{
                data: turnAroundData,
                // loading: companyMasterLoading
            },
            P_IndexMaster:{
                data: P_IndexData,
                // loading: companyMasterLoading
            } 
    } = useSelector((state) => state.Masters);
    // const {  } = useSelector((state) => state.Masters);
    // const {  } = useSelector((state) => state.Masters);
    // const { data: turnAroundMaster, loading: turnAroundMasterLoading } = useSelector((state) => state.turnAroundMasterData);
    // const { data: P_IndexMaster, loading: P_IndexMasterLoading } = useSelector((state) => state.priceIndexMasterReducer);
    // let turnAroundMaster = []
    // let P_IndexMaster = []


    const arrVal = (key, valArr) => {
        var a1 = '';
        var arr4 = '';
        if (key == 'company') {
            arr4 = companyMaster;

            let dd = [];
            for (let a = 0; a < valArr.length; a++) {
                arr4.map((item) => {
                    if (item.CompanyID == valArr[a]) {
                        dd.push(item.CompanyName);
                    }
                })
            }
        } else
            if (key == 'sectors') {
                arr4 = sectorMaster;
                let dd = [];
                for (let a = 0; a < valArr.length; a++) {
                    arr4.map((item) => {
                        if (item.sectorID == valArr[a]) {
                            dd.push(item.Sector);
                        }
                    })
                }
            } else
            if (key == 'index') {
                arr4 = P_IndexData;
                // console.log('arr4', valArr);
                let dd = [];
                for (let a = 0; a < valArr.length; a++) {
                    arr4.map((item) => {
                        if (item.IndexID == valArr[a]) {
                            dd.push(item.IndexName);
                        }
                    })
                }
            } else
                if (key == 'industry') {
                    arr4 = industryMaster;
                    let dd = [];
                    for (let a = 0; a < valArr.length; a++) {
                        arr4.map((item) => {
                            if (item.IndustryID == valArr[a]) {
                                dd.push(item.Industry);
                            }
                        })
                    }
                }
        if (key == 'PAT_TO') {
            arr4 = turnAroundData;
            valArr = [valArr]
            let dd = [];
            for (let a = 0; a < valArr.length; a++) {
                arr4.map((item) => {
                    if (item.Id == valArr[a]) {
                        dd.push(item.FilterName);
                    }
                })
            }
        }
        if (key == 'EBDITA_TO') {
            arr4 = turnAroundData;
            valArr = [valArr]
            let dd = [];
            for (let a = 0; a < valArr.length; a++) {
                arr4.map((item) => {
                    if (item.Id == valArr[a]) {
                        dd.push(item.FilterName);
                    }
                })
            }
        }

        var p = []
        for (let a0 = 0; a0 < dd.length; a0++) {
            const element = dd[a0];
            a1 = [<div>{element}</div>];
            if (a0 > 1) {
                break;
            }
            p.push(a1);
        }


        
        if (dd.length > 2) {
            p.push(<div>+{dd.length - 2}</div>)
        }
        return (p);

    }

    return (
        <>
            {
                itemData.value1 && itemData.value1.length > 0 ?
                    <div className="fItem">
                        {/* {setShowFilter && setShowFilter(true)} */}
                        <div className="fLabel">{itemData.label}</div>
                        <div className="fValue">
                            {
                                keys == 'sectors' || keys == 'industry' || keys == 'company' || keys == 'index' || keys == 'EBDITA_TO' || keys == 'PAT_TO' ?
                                    <>
                                        {arrVal(keys, itemData.value1)}
                                    </>
                                    :
                                    <>
                                        {
                                            keys == 'date_range' ?
                                                <div>{moment(itemData.value1).format('DD-MMM-YYYY')} {itemData.value2 ? ' - ' + moment(itemData.value2).format('DD-MMM-YYYY') : null}</div>
                                                :
                                                <>
                                                    {
                                                        (keys == 'portfolio' || keys == 'chkF_O' || keys == 'chkPortfolio' || keys == 'chkbox200DMA' || keys == 'chkbox50DMA')
                                                            ?
                                                            <div>{itemData.value1 ? 'Yes' : null}</div>
                                                            :
                                                            <div>{itemData.value1} {itemData.value2 ? ' - ' + itemData.value2 : null}</div>
                                                    }
                                                </>

                                        }
                                    </>
                            }
                        </div>
                        {
                            onClick ?

                                <>
                                <div className="fClose" >
                                    <IconButton onClick={onClick} disableRipple={false} color="error" edge="end" size="small" >
                                        <AiOutlineCloseCircle size={'15px'} />
                                    </IconButton>
                                </div>
                                </>
                                :
                                null
                        }
                    </div>
                    :
                    null
            }
        </>
    )
}
