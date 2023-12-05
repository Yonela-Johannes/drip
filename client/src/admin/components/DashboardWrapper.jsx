const DashboardWrapper = ({ children }) => {
  return (
    <div className={'mx-auto w-full max-w-screen-xl px-2 overflow-hidden sm:pt-40'}>
      {children}
    </div>
  )
}

export default DashboardWrapper
