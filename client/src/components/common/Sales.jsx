import React from 'react'
import Item from '../../utils/Item'
import Title from '../../utils/Title'

const Sales = ({ items, category }) =>
{
  return (
    <>
      <div className=''>
        <Title title={category} />
        <div className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 md:grid-cols-3 xl:grid-cols-3 grid-cols-1`}>
          {items?.map((item, i) => (
            <Item {...item} key={i} item={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Sales