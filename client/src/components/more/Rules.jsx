import React from 'react'
import "./Rules.css";
import MaxWidthWrapper from '../MaxWidthWrapper';
import Accordion from './Accordion';

const Rules = () => {

    return (
        <MaxWidthWrapper>
          <div className="mx-auto">
            <div className="my-10 mt-20 md:mt-10 w-min mx-auto">
              <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Frequently asked questions</p>
              <div className="flex flex-col my-10">
                <Accordion q="Question q" a="Answer" />
                <Accordion q="Question q" a="Answer" />
            </div>
          </div>
          </div>
        </MaxWidthWrapper>
    )
}

export default Rules
