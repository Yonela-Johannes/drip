import React, { useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Loader from '../../components/shared/Loader'
import moment from 'moment'


export default function TransactionChart({orders, loading}) {
  let data = [];

  if (orders) {
    orders.forEach((order) => {
      data.push({
        name: moment(order?.paidAt).format('DD-MM-YYYY'),
        income: order?.itemsPrice,
        delivery: order?.deliveryPrice,
        total: order?.totalPrice,
      });
    });
  }

	return (
    <>
      {loading ? (<Loader />) : (
        <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
          <strong className="text-gray-700 font-medium">Transactions</strong>
          <div className="mt-3 w-full flex-1 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 10,
                  left: -10,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="pink" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
	)
}
