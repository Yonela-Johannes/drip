const MaxWidthWrapper = ({ children }) => {
  return (
    <div className={'mx-auto w-full max-w-screen-xl px-2.5  overflow-hidden'}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
