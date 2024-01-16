import React from 'react'
import "./Rules.css";
import MaxWidthWrapper from '../MaxWidthWrapper';
import Accordion from './Accordion';

const Rules = () => {

  const faqData = [
    {
      id: "0",
      question: "What type of websites you specialize in?",
      answer:
        "I specialize in building web and SaaS apps for companies.",
    },
    {
      id: "1",
      question: "How can I book a meeting session with you?",
      answer:
        "I specialize in building web and SaaS apps for companies.",
    },
    {
      id: "2",
      question: "What technologies do you use for your development?",
      answer:
        "I specialize in building web and SaaS apps for companies.",
    },
  ];

    return (
        <div className="relative flex flex-col items-center">
        <div className="h-[80px] w-[80px] bg-pink rounded-full -top-10 absolute left-0"></div>
          <div className="my-10 mt-20 md:mt-10 mx-auto  bg-lgray px-2 md:px-0 md:w-[650px] md:p-8" >
            <p className='text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl text-uppercase text-center'>Frequently asked questions</p>
            <div className="flex flex-col my-10 flex-wrap w-full md:px-8">
              {faqData.map((faq) => (<Accordion key={faq.id} q={faq.question} a={faq.answer} />))}
            </div>
        </div>
        <div className="h-[80px] w-[80px] bg-pink2 -bottom-10 absolute right-0 rotate-45"></div>
      </div>
    )
}

export default Rules
