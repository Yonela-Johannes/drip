import moment from 'moment'
import React from 'react'

const MobileFirstOrders = ({order}) => {
  return (
  <div className="flex md:hidden md:items-center bg-gray-50 flex-col px-2 mt-20 mb-2">
    <div className="md:w-full">
      <h3 className="mb-4 font-semibold md:font-normal md:text-2xl">My order</h3>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th className="">Quantity</th>
              <th className="">Total</th>
              <th>Order status</th>
            </tr>
          </thead>
          <tbody>
            <tr key={order?.order?._id}>
              <td className="">
                <p>{order?.order?.orderItems?.length}</p>
              </td>
              <td>
                <p>R{order?.order?.totalPrice}</p>
              </td>
              <td>
                <p>{order?.order?.orderStatus}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="md:w-full mb-4 mt-8">
      <h3 className="mb-4 font-semibold md:font-normal md:text-2xl">My order details</h3>
      <div className="border-x border-gray-200 rounded-sm">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th  className="">Image</th>
              <th>Name</th>
              <th className="">Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order && order?.order?.orderItems?.map((odr, i) => (
              <tr key={odr?._id}>
                <td  className="">
                  <img src={odr?.imageUrl} className="w-16 h-16 rounded-md object-cover" />
                </td>
                <td>
                  <p>{odr?.name}</p>
                </td>
                <td className="">
                  <p>{odr?.quantity}</p>
                </td>
                <td>
                  <p>R{odr?.total}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default MobileFirstOrders
