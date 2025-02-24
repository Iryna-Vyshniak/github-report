import { useCallback, useState } from 'react';
import { toJpeg } from 'html-to-image';
import { GiRapidshareArrow } from 'react-icons/gi';
import { GoDownload } from 'react-icons/go';
import { dataUrlToBlob } from '@/shared/helpers';

interface ShareButtonProps {
  reportRef: React.RefObject<HTMLDivElement>;
  username: string;
  isPrint: boolean;
}

const ShareButton = ({ reportRef, username, isPrint }: ShareButtonProps) => {
  const [isSharing, setIsSharing] = useState<boolean>(false);

  const downloadImage = useCallback(async () => {
    if (!reportRef.current || !isPrint) return;

    try {
      const dataUrl = await toJpeg(reportRef.current, { quality: 0.95, cacheBust: true });
      const blob = await dataUrlToBlob(dataUrl);
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `github-report-${username}.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl); // Звільняємо пам’ять
    } catch (err) {
      console.error('Error downloading image:', err);
    }
  }, [isPrint, reportRef, username]);

  const shareReport = useCallback(async () => {
    if (!reportRef.current || isSharing || !isPrint) return;

    setIsSharing(true); // Блокуємо повторний виклик

    try {
      const dataUrl = await toJpeg(reportRef.current, { quality: 0.95, cacheBust: true });
      const blob = await dataUrlToBlob(dataUrl);
      const file = new File([blob], `github-report-${username}.jpeg`, { type: 'image/jpeg' });

      if (
        navigator.share &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: 'GitHub Report',
          text: `Check out latest GitHub activity summary for ${username}`,
          files: [file],
        });
      } else {
        downloadImage();
      }
    } catch (error) {
      console.error('Error sharing report:', error);
    } finally {
      setIsSharing(false);
    }
  }, [reportRef, isSharing, isPrint, username, downloadImage]);

  return (
    <div className='flex items-center justify-end gap-2'>
      <button
        onClick={downloadImage}
        role='button'
        tabIndex={0}
        aria-label='Download report'
        disabled={!username}
        className={`key p-[2px] w-[1.5rem] sm:w-[2.5rem] rounded-md flex items-center justify-center cursor-pointer transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-500 text-[.5rem] s:text-[.6rem] sm:text-[.7rem] md:text-xs ${
          !isPrint || !username ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title='Download report'
      >
        <GoDownload />
      </button>
      <button
        onClick={shareReport}
        role='button'
        tabIndex={0}
        aria-label='Share report'
        className={`key p-[2px] w-[1.5rem] sm:w-[2.5rem] rounded-md flex items-center justify-center cursor-pointer transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-500 text-[.5rem] s:text-[.6rem] sm:text-[.7rem] md:text-xs ${
          !isPrint || isSharing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title='Share report'
        disabled={isSharing || !username}
      >
        <GiRapidshareArrow />
      </button>
    </div>
  );
};

export default ShareButton;
