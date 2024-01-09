import MaxWidthWrapper from '../components/MaxWidthWrapper'
import ProductReel from '../components/ProductReel'
import { useSelector } from 'react-redux'
import Items from '../components/Products/Products'
import Loader from '../components/shared/Loader'

const parse = (param) => {
  return typeof param === 'string' ? param : undefined
}

const Products = () => {
  const { items , loading} = useSelector((state) => state.products);

  return (
    <MaxWidthWrapper>
      {loading ? (
        <Loader />
      ) : (
      <div className="flex flex-col items-center justify-between">
        <div className='lg:block'>
          <Items items={items} loading={loading} category={'Featured'}/>
        </div>
        <div className='lg:block'>
          <Items items={items} loading={loading} category={'Low Prices'}/>
        </div>
        <ProductReel
          title={'Browse high-quality products'}
          products={items}
        />
      </div>)
      }
    </MaxWidthWrapper>
  )
}

export default Products
