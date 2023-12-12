import Loader from "../../components/shared/Loader"
import moment from 'moment'

const CommentCard = ({comment}) => {
    return (
       <>
       {'' ? (
        <Loader />
       ) : (
        <>
        <div>
          <div className="flex items-center text-center px-1 gap-2 bg-pink w-max rounded-md mb-1">
            <img src={comment?.user?.avatar} alt='avatar' className="w-[35px] h-[35px] object-cover object-center rounded-full" />
            <p className='text-center m-0 p-0'>{comment?.user?.name}{' '}{comment?.user?.lastName}</p>
          </div>
            <p className="text-[10px] font-semibold">{moment(comment?.time).fromNow()}</p>
        </div>
          <div style={{padding:"0px 15px",paddingBottom:"5px"}}>
            <p className="text-[13px]">{comment?.comment}</p>
          </div>
        </>
       )}
       </>
    )
}

export default CommentCard
