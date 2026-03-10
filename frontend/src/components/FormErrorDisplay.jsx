export const FormErrorDisplay = ({ errorList = [] }) => {
  if (errorList.length > 0)
    return (
      <div className='mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 animate-in fade-in slide-in-from-top-1'>
        <div className='flex items-center gap-2 mb-2 text-rose-400'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
          <p className='font-semibold text-sm'>Please check the following:</p>
        </div>
        <ul className='list-disc list-inside space-y-1 p-4'>
          {errorList.map((error, index) => (
            <li
              key={error.field || index}
              className='text-xs md:text-sm text-rose-300/90 leading-relaxed'
            >
              {error.msg}
            </li>
          ))}
        </ul>
      </div>
    );
  else {
    return null;
  }
};
