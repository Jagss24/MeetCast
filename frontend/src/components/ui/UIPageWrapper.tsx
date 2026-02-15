interface PageWrapperProps {
  classname?: string;
  children: React.ReactNode;
}
const UIPageWrapper = ({ classname = '', children }: PageWrapperProps) => {
  return (
    <div className={`overflow-x-hidden min-h-[calc(100vh-80px)]  ${classname}`}>
      {children}
    </div>
  );
};

export default UIPageWrapper;
