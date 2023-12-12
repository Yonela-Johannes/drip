import React from 'react'
import moment from 'moment'
import Loader from '../../components/shared/Loader'

export default function RecentOrders({orders, loading}) {

	return (
    <>
      {loading ? (<Loader />) : (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
          <strong className="text-gray-700 font-medium">Recent Orders</strong>
          <div className="border-x border-gray-200 rounded-sm mt-3">
            <table className="w-full text-gray-700">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Order Total</th>
                  <th>Shipping Address</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders?.map((odr, i) => (
                  <tr key={odr?._id}>
                    <td>
                      <p>{1 + i}</p>
                    </td>
                    <td>
                      <p>#{odr?._id}</p>
                    </td>
                    <td>
                      <p>{odr?.user?.name} {odr?.user?.email}</p>
                    </td>
                    <td>
                      <p>{moment(odr?.createdAt).format('dd-mm-yyyy')}</p>
                    </td>
                    <td>
                      <p>R{odr?.totalPrice}</p>
                    </td>
                    <td>{odr?.address?.street}, {odr?.address?.town}, {odr?.address?.city}, {odr?.address?.country}, {odr?.address?.postalCode}</td>
                    <td>
                      <p>{odr?.orderStatus}</p>
                    </td>
                  </tr>
                ))};
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
	)
}
