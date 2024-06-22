const MaxWidthWrapper = ({ children }) =>
{
  return (
    <div className={'flex flex-col mx-auto w-full max-w-screen-xl px-2.5 md:pt-12  overflow-hidden min-h-[90vh] justify-center'}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
