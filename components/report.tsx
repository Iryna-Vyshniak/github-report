import Barcode from './barcode';

interface ReportProps {
  isVisible: boolean;
  onAnimationEnd: () => void;
  user: string;
}

const Report = ({ user, isVisible, onAnimationEnd }: ReportProps) => {
  return (
    <div className='absolute top-0 left-1/2 -translate-x-1/2 container-report p-2 w-full max-w-[18.75rem] min-h-40 flex items-center justify-center'>
      <div
        className={`absolute top-0 left-0 -translate-x-1/2 report min-h-40 w-full ${
          isVisible ? 'report-print' : 'report-exit'
        }`}
        onAnimationEnd={!isVisible ? onAnimationEnd : undefined}
      >
        <Barcode value={user} />
      </div>
    </div>
  );
};

export default Report;
