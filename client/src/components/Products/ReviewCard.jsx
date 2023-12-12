import Loader from "../../components/shared/Loader"
import moment from 'moment'
import Rating from "../shared/Rating";

const ReviewCard = ({review}) => {

    return (
       <>
       {'' ? (
           <Loader />
       ) :(
        <>
        <div>
          <div className="flex items-center text-center px-1 gap-2 bg-pink w-max rounded-md mb-1">
            <img src={review?.user?.avatar} alt='avatar' className="w-[35px] h-[35px] object-cover object-center rounded-full" />
            <p className='text-center m-0 p-0'>{review?.user?.name}{' '}{review?.user?.lastName}</p>
          </div>
            <p className="text-[10px] font-semibold">{moment(review.time).fromNow()}</p>
        </div>
          <div style={{padding:"0px 15px",paddingBottom:"5px"}}>
              <p className="text-[13px]">{review.comment}</p>
              <Rating rating={review?.rating} view={false} select={false} hover={false} />
          </div>
        </>
       )}
       </>
    )
}

export default ReviewCard
