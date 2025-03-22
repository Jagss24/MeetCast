import { LoaderCircle } from 'lucide-react';

const UiButton = ({
  text,
  buttonType = 'primary',
  icon,
  isLoading,
  type = 'button',
  ...rest
}) => {
  if (buttonType === 'secondary') {
    return (
      <button
        {...rest}
        type={type}
        disabled={isLoading || rest.disabled}
        className={`h-10 flex items-center text-body justify-center gap-2 text-sm font-semibold 
        cursor-pointer ${rest.className} rounded bg-secondary text-white outline-none 
         transition-all disabled:brightness-90 disabled:cursor-not-allowed
         hover:brightness-90 focus:ring-2 focus:ring-white/50`}>
        <>
          {text ? <>{text}</> : <></>}
          {icon ? <span>{icon}</span> : <></>}
        </>
        {isLoading && (
          <LoaderCircle className='size-5 animate-spin text-white' />
        )}
      </button>
    );
  }

  if (buttonType === 'primary') {
    return (
      <button
        {...rest}
        type={type}
        disabled={isLoading || rest.disabled}
        className={`h-10 ${rest.className} rounded flex items-center justify-center gap-2 text-sm 
          font-medium  text-primary bg-white outline-none hover:brightness-90 transition-all
           focus:ring-2 focus:ring-primary/50 cursor-pointer disabled:brightness-90 disabled:cursor-not-allowed`}>
        <>
          {text ? <>{text}</> : <></>}
          {icon ? <span>{icon}</span> : <></>}
        </>
        {isLoading && (
          <LoaderCircle className='size-5 animate-spin text-body' />
        )}
      </button>
    );
  }

  return (
    <button
      {...rest}
      type={type}
      disabled={isLoading || rest.disabled}
      className={`text-sm text-body font-medium flex items-center justify-center  gap-1  
            cursor-pointer ${rest.className} rounded transition-all disabled:opacity-60 
             disabled:cursor-not-allowed outline-none`}>
      <>
        {text ? <>{text}</> : <></>}
        {icon ? <span>{icon}</span> : <></>}
      </>
      {isLoading && <LoaderCircle className='size-5 animate-spin text-body' />}
    </button>
  );
};

export default UiButton;
