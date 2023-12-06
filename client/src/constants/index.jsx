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

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'products',
		label: 'Products',
		path: 'admin/products',
		icon: <HiOutlineCube />
	},
  {
		key: 'create',
		label: 'New product',
		path: 'admin/create-product',
		icon: <HiOutlineCube />
	},
  {
		key: 'category',
		label: 'New category',
		path: 'admin/create-category',
		icon: <HiOutlinePencilAlt />
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
		key: 'customers',
		label: 'Customers',
		path: 'admin/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'users',
		label: 'Users',
		path: 'admin/users',
		icon: <HiOutlineDocumentText />
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
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
