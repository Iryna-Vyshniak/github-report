import { GitHubRepo } from '../types/repo';

export const formatDate = (date: Date, locale: string = 'en-US'): string => {
  return date
    .toLocaleDateString(locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase();
};

export const generateOrderNumber = (): string => {
  const orderNumber = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return orderNumber;
};

export const handleError = (message: string): null => {
  console.warn(message);
  return null;
};

export const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      handleError('Failed to convert data URL to Blob');
      return new Blob();
    }
    return await response.blob();
  } catch {
    handleError('Could not convert data URL to blob');
    return new Blob();
  }
};

export const calculateRepoStats = (repos: GitHubRepo[]) => {
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
  return { totalStars, totalForks };
};

export const getMostActiveDay = (repos: GitHubRepo[]) => {
  if (!repos.length) return 'No activity';

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Підраховуємо, скільки разів кожен день зустрічається у `pushed_at`
  const dayCount = repos.reduce((acc, repo) => {
    const dayIndex = new Date(repo.pushed_at).getDay();
    acc[dayIndex] = (acc[dayIndex] || 0) + 1;
    return acc;
  }, Array(7).fill(0)); // Індекси масиву відповідають дням тижня
  // [  Sun,  Mon,  Tue,  Wed,  Thu,  Fri,  Sat ]
  // [   0,    0,    0,    0,    0,    0,    0  ]
  // Коли ми знаходимо getDay(), ми збільшуємо відповідний індекс у цьому масиві.

  // Знаходимо день із найбільшою кількістю пушів
  const mostActiveDayIndex = dayCount.indexOf(Math.max(...dayCount));

  return days[mostActiveDayIndex];
};

export const getTopLanguages = (repos: GitHubRepo[]): string => {
  // Якщо немає репозиторіїв, одразу повертаємо 'NONE'
  if (!repos.length) return 'NONE';

  // Record<K, V> — це вбудований дженерик TypeScript, який створює об'єктний тип, де:
  // K (key) — тип ключів
  // V (value) — тип значень, тобто типізація Record<string, number> чітко вказує, що acc — це об'єкт, де ключ — рядок, а значення — число.
  const languages = repos.reduce<Record<string, number>>((acc, repo) => {
    if (!repo.language) return acc; // Пропускаємо репо без мови

    acc[repo.language] = (acc[repo.language] ?? 0) + 1; // Збільшуємо лічильник мови
    return acc;
  }, {});

  // Визначаємо **топ-3 мови** за кількістю використань
  const topLanguages = Object.entries(languages)
    .sort(([, countA], [, countB]) => countB - countA) // Сортуємо за спаданням
    .slice(0, 3) // Беремо тільки перші 3
    .map(([lang]) => lang); // Отримуємо лише назви мов

  return topLanguages.length ? topLanguages.join(', ') : 'NONE';
};
