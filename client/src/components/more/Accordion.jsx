import React from 'react'
import { useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';

const Accordion = ({q, a}) => {
  const [accordion, setAccordion] = useState(false)
  return (
    <div>
      <div className='flex flex-col gap-4 text-sm md:text-base mb-4 md:mb-8 overflow-hidden' >
          <ul className='flex flex-col gap-4 md:text-black bg-pink drop-shadow-lg px-2 rounded-sm'>
            <div className="rounded-md px-1 md:px-8 md:py-4" onClick={() => setAccordion(!accordion)}>
              <div className="flex w-full justify-between cursor-pointer transition-all transform">
                <p className='font-semibold text-base md:text-lg'>{q}</p>
                <MdAdd className={`${!accordion ? "-rotate-180" : "rotate-180 animate-spin"} text-[24px] md:text-[28px]`} />
              </div>
                {accordion && (
                  <p className={`${!accordion ? "animate-slidedown" : "animate-slideup"} mt-2 border-t border-pink2 pt-2  text-base md:text-lg`}>
                    {a}
                  </p>
                )}
            </div>
          </ul>
        </div>
    </div>
  )
}

export default Accordion
