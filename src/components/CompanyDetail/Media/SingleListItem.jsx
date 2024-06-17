import { IconButton, Typography } from '@material-tailwind/react';
import moment from 'moment';
import {
  useEffect,
  useState
} from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import { useDispatch } from "react-redux";
// import { toggleCheck, toggleUncheck } from "../../../store/slice/CheckboxSlice";
import { add_to_importantReq } from '../../../constants/defaultRequest';
import { useAuthState } from '../../../context/AuthContext';
import { addToImportantApi } from '../../../store/slice/SingleCompnaySlice';

const SingleListItem = (props) => {

  const rr_dispatch = useDispatch();
  const authState = useAuthState()
  const userId = authState.user.UserID

  const {
    handleVideoSet,
    setOpenModal,
    item
  } = props

  const [checked, setChecked] = useState(item.isImp);

  // const [bgColor, setBgColor] = useState('white');

  const handleToggle = (checked, vidId) => {
    // setBgColor(bgColor === 'white' ? 'lightblue' : 'white');


    let nC = !checked;
    let actionVal = 0;

    if (nC) {
      actionVal = "0"
    } else {
      actionVal = "1"
    }

    let params = add_to_importantReq;
    params = {
      ...params,
      "item_id": vidId,
      "user_id": userId,
      "item_type": "media",
      "action": actionVal,
      "isImp": item.isImp,
    }


    // console.log('checked >>>> ', params)

    rr_dispatch(addToImportantApi(params))

    setChecked(nC);


  };


  return (
    <>
      <div className="MediaList w-full mb-3 ">
        <div className=" flex items-center gap-1">

          <div className="pb-3 basis-1/12" >
            <div
              onClick={() => handleToggle(checked, item.videoId)}
              className=" cursor-pointer"
              // style={{ 
              //   backgroundColor: bgColor
              // }}
            >
              {checked ? (
                <AiFillStar size={20} className="text-theme" />
              ) : (
                <AiOutlineStar size={20} className="text-theme" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-[#B9C6E7] border-b cursor-pointer w-full pb-3 basis-10/12 "
            onClick={() => handleVideoSet(item)}>

            <div className="flex items-center  basis-9/12" >
              <span className="mr-2 basis-1/12">
                <img
                  src={
                    import.meta.env.VITE_BASE_URL +
                    "/images/icons/play.svg"
                  }
                  alt=""
                  className="w-[22px]"
                />
              </span>
              <Typography className=" basis-11/12 text-[16px] text-lg-[18px] text-[#000] font-medium">
                {item.videoTitle}
              </Typography>
            </div>

            <div className="basis-3/12">

              <Typography className="text-[13px] font-normal">
                {item.dateTime
                  ? moment(item.dateTime).format("DD MMM, YYYY")
                  : ""}
              </Typography>

            </div>

          </div>


          <div className="basis-1/12 pb-3">
            <IconButton className=" bg-transparent" size="sm" onClick={() => setOpenModal(item)}><BiTrashAlt color="red" size={20} /></IconButton>
          </div>

        </div>
      </div>


    </>
  )
}


export default SingleListItem