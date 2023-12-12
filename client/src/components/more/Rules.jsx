import React from 'react'
import "./Rules.css";
import MaxWidthWrapper from '../MaxWidthWrapper';
import rules from '../../assets/rules.jpg'
const Rules = () => {
    return (
        <MaxWidthWrapper>
          <div className="my-10 mt-20 md:mt-10">
            <p className='text-lg md:text-2xl mb-4 md:text-black'>Some Rules:</p>
            <div className="flex flex-col md:flex-row my-10">
            <div className='flex flex-col gap-4 text-sm md:text-base mb-4 md:mb-8 md:w-[500px]' >
              <ul className='flex flex-col gap-4 md:text-black'>
              <p>1. Easy Returns: We offer a hassle-free 30-day return policy. Please note that a delivery charge may apply.</p>
              <p>2. Cash on Delivery in Cape Town: For Cash on Delivery orders, kindly pay the delivery charge upfront (R[amount]).</p>
              <p>3. Product Availability: Ensure the products you're interested in are in stock before making a purchase.</p>
              <p>4. Quality Assurance: We strive to provide you with the best quality products and exceptional service.</p>
              <p>5. Exciting Updates: Stay tuned for new features and improvements coming soon! Our dedicated development team is always working to enhance your experience.</p>
              <p>6. Thank You for Visiting: We appreciate your visit to our website. Have a fantastic day!</p>
              </ul>
            </div>
          <img src={rules} className='' alt="rules" />
          </div>
        </div>
        </MaxWidthWrapper>
    )
}

export default Rules
