import { Fragment, useContext, useEffect } from 'react'
import { GlobalContext } from '../../../context/GlobalContext'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogBody, DialogHeader, Typography, DialogFooter, Spinner } from '@material-tailwind/react'
import { BoardOfDirectorDetailApi } from '../../../store/slice/SingleCompnaySlice'
import { BoardOfDirectorDetail_Req } from '../../../constants/defaultRequest'

const ForensicModal = (props) => {
  
    
  
    const {
        DIR_Model,
        setDIR_Model,
        SelectedDIR,
        setSelectedDIR,
      } = useContext(GlobalContext)

      const rr_dispatch = useDispatch()
      const handleOpen = () => {
        setDIR_Model(null)
        setSelectedDIR(null)
      }
      const {
        BoardOfDirectorDetail:{
            data: BodData,
            loading: BodLoading
        }
      } = useSelector(state=>state.SingleCompany)

      useEffect(() => {
        let params = BoardOfDirectorDetail_Req
            params = {
                ...params,
                "Type": DIR_Model?.typeData, 
                "DirName": (SelectedDIR?.column_2),
                "companyId": DIR_Model?.cmpId
            }
            if(DIR_Model?.typeData && SelectedDIR?.column_2){
                console.log('Object.keys(params).length >>> ', Object.keys(params).length, params)
                rr_dispatch(BoardOfDirectorDetailApi(params))
            }
      }, [SelectedDIR])

      useEffect(() => {
        
      }, [BodLoading])
      


  return (
    <>
      
      {/* <Button onClick={handleOpen}>Long Dialog</Button> */}
      <Dialog open={DIR_Model} handler={handleOpen} size='lg'>
        <DialogHeader>{SelectedDIR?.column_2 || "Loading..."}</DialogHeader>
        <DialogBody className="max-h-[42rem] overflow-auto">

            {
                BodLoading ? (
                    <>
                        <Spinner />
                    </>
                )
                :
                <>

            {
                BodData?.Data && BodData?.Data.length == 0 && (
                  <Typography variant='h6' sx={{ margin: '10px 0', fontSize: '15px' }}  >
                    N/A
                  </Typography>
                )
            }

            <table className="forensicTable w-full min-w-max table-auto text-left" >
                <thead>
                    <tr className={`!bg-[#22242F]`}>
                        {
                            BodData?.header && BodData?.header.length > 0 && Object.keys(BodData?.header[0]).map((item, i_0)=>{
                                if(i_0 > 0){
                                    return (
                                        <th  className={`!text-white p-2 text-[13px] font-semibold !bg-[#22242F]"`} key={i_0}>
                                            {BodData?.header[0]?.[item]}
                                        </th>
                                    )
                                }
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        BodData?.Data && BodData?.Data.length > 0 && (BodData.Data).map((item_data, d_0)=>{
                            return (
                                <Fragment key={d_0}>
                                    <tr  className="odd:bg-[#E8F0F4] even:bg-[#fff]">
                                    {
                                            BodData?.header && BodData?.header.length > 0 && Object.keys(BodData?.header[0]).map((item, i_0)=>{
                                                if(i_0 > 0){
                                                    return (
                                                        <td key={i_0} className={`text-[13px] px-2 font-medium `}>
                                                            {item_data?.[item]}
                                                        </td>
                                                    )
                                                }
                                            })
                                        }

                                        <td></td>
                                    </tr>
                                </Fragment>
                            )
                        })
                    }
                    
                </tbody>
            </table>


                </>
            }

            
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button className=' bg-theme' fullWidth onClick={()=>handleOpen()}>
            Go back
          </Button>
          
        </DialogFooter>
      </Dialog>


    </>
  )
}

export default ForensicModal
