import ProductListing from './ProductListing'

const ProductReel = ({title, products}) => {

  return (
    <section className='py-12'>
      <div className='md:flex md:items-center md:justify-between mb-4'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {title ? (
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              {title}
            </h1>
          ) : null}
        </div>
          <p
            className='hidden text-sm font-medium text-gray-500 md:block'>
            Shop the collection
          </p>
      </div>

      <div className='relative'>
        <div className='mt-6 flex items-center w-full'>
          <div className='w-full items-center justify-center grid md:grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
            {products?.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReel
