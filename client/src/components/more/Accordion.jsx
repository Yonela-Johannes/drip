import React from 'react'
import { useState } from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';

const Accordion = ({q, a}) => {
  const [accordion, setAccordion] = useState(false)
  return (
    <div>
      <div className='flex flex-col gap-4 text-sm md:text-base mb-4 md:mb-8 md:w-[500px]' >
          <ul className='flex flex-col gap-4 md:text-black'>
            <div className="bg-pink rounded-md px-1 md:px-4 md:py-2" onClick={() => setAccordion(!accordion)}>
              <div className="flex w-full justify-between cursor-pointer">
                <p>{q}</p>
                {!accordion ? <MdAdd size={20} /> : <MdRemove size={20} />}
              </div>
                {accordion && (
                  <p className="">
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
