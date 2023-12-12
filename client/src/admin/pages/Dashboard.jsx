import React from 'react'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import TransactionChart from '../components/TransactionChart'
import RecentOrders from '../components/RecentOrders'
import { getOrders } from '../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAdminUsers } from '../../redux/features/admin/adminProducts/adminReducer'

export default function Dashboard() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const { order, loading, success } = useSelector((state) => state?.orders);
  const [orders, setOrders] = useState();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    if(order){
      setOrders(order?.orders)
    }
  }, [order]);

  useEffect(() => {
    dispatch(getAdminUsers())
  }, []);

	return (
		<div className="flex flex-col gap-4 mt-5">
			<DashboardStatsGrid orders={orders} loading={loading} users={users} />
			<div className="flex flex-row gap-4 w-full">
        <div className="">
          <TransactionChart  orders={orders} loading={loading} />
          <RecentOrders orders={orders} loading={loading} />
        </div>
			</div>
		</div>
	)
}
