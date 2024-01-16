const MaxWidthWrapper = ({ children }) => {
  return (
    <div className={'flex flex-col mx-auto w-full max-w-screen-xl px-2.5  overflow-hidden min-h-[60vh]'}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
