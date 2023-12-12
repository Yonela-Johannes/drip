import React, { useRef, useState } from 'react'
import "./Support.css";
// import emailjs from "@emailjs/browser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import support from '../../assets/support.png'
import MaxWidthWrapper from '../MaxWidthWrapper';

const Support = () => {

    const [done, setDone] = useState(false);

    const formRef = useRef(null)

    const handleSubmit = (e) =>{
      //   e.preventDefault()
      //   emailjs.sendForm('service_hc4y6hp', 'template_q6oankt', formRef.current, 'user_XiIxNsDzs1ebEgXJcyD1U')
      // .then((result) => {
      //     console.log(result.text);
      //     setDone(true)
      // }, (error) => {
      //     console.log(error.text);
      // });

    }

    return (
       <MaxWidthWrapper>
       <div
       className='support my-10 mt-16 md:mt-10'
       style={{
           width:"100%",
           justifyContent:"center",
           alignItems:"center",
           padding:'50px 0'
       }}>
       <p className=' text-center text-lg md:text-2xl mb-4 md:text-black'>Support us</p>
           <h2 className='support__heading' style={{
               textAlign:"center"
           }}>Hey How can we improve our services</h2>
           <h2  className='support__heading' style={{
               textAlign:"center"
           }}>Report to us for something...</h2>
           <div>
               <form className='md:w-[400px]' style={{
                   margin:"auto",
               }} ref={formRef}
               onSubmit={handleSubmit}
               >
                   <input type="text" placeholder='Write your Name ...' required style={{
                       border:"none",
                       outline:"none",
                       width:"100%",
                       border:"1px solid pink",
                       padding: 5,
                       margin:"10px 0",
                       height:"40px"
                   }}
                   name='user__name'
                   />
                    <input type="text" placeholder='Write a Subject ...' required style={{
                       border:"none",
                       outline:"none",
                       width:"100%",
                       border:"1px solid pink",
                       padding: 5,
                       margin:"10px 0",
                       height:"40px"
                   }}
                   name='user__subject'
                   />
                   <input type="email" placeholder='write your Email ...' required style={{
                       border:"none",
                       outline:"none",
                       width:"100%",
                       border:"1px solid pink",
                       padding: 5,
                       margin:"10px 0",
                       height:"40px"
                   }}/>
                   <textarea cols="30" rows="5" required placeholder='write your message ...'
                   style={{
                    border:"none",
                    outline:"none",
                    width:"100%",
                    border:"1px solid pink",
                    padding: 5,
                    margin:"10px 0",
                }}
                name='user__message'
                   ></textarea>
                   <button
                   style={{
                       border:"none",
                       cursor:"pointer",
                       width:"100%",
                       background:"pink",
                       height:"40px",
                       margin:"10px 0",
                       color:"black",
                   }}
                   >Submit</button>
                   {done && toast.success("Thanks for your report we will reply it in very soon...")}
               </form>
               <div className='animation'>

               </div>
           </div>
       </div>
       </MaxWidthWrapper>
    )
}

export default Support
