interface ReportProps {
  isVisible: boolean;
  onAnimationEnd: () => void;
}

const Report = ({ isVisible, onAnimationEnd }: ReportProps) => {
  return (
    <div className='absolute top-0 left-0 transform translate-x-1/2 container-report p-2 w-full max-w-[18.75rem] min-h-40 flex items-center justify-center'>
      <div
        className={`absolute top-0 left-0 transform translate-x-1/2 report min-h-40 w-full ${
          isVisible ? 'report-print' : 'report-exit'
        }`}
        onAnimationEnd={!isVisible ? onAnimationEnd : undefined}
      ></div>
    </div>
  );
};

export default Report;
