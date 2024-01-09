import { AiOutlineComment } from 'react-icons/ai'
import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
  HiOutlineClipboardList,
  HiOutlinePencilAlt,
  HiOutlineNewspaper
} from 'react-icons/hi'
import { MdOutlineReviews } from 'react-icons/md'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'products',
		label: 'Products',
		path: 'admin/products',
		icon: <HiOutlineCube />
	},
  {
		key: 'categories',
		label: 'Categories',
		path: 'admin/categories',
		icon: <HiOutlineNewspaper />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: 'admin/orders',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'users',
		label: 'Users',
		path: 'admin/users',
		icon: <HiOutlineUsers />
	},
  {
		key: 'reviews',
		label: 'Reviews',
		path: 'admin/reviews',
		icon: <MdOutlineReviews />
	},
  {
		key: 'comments',
		label: 'Comments',
		path: 'admin/comments',
		icon: <AiOutlineComment />
	},
	{
		key: 'enquiries',
		label: 'Enquiries',
		path: 'admin/enquiries',
		icon: <HiOutlineClipboardList />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
