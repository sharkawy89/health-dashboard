import { format, formatDistance, formatRelative, isToday, parseISO } from 'date-fns';

/**
 * Format date to readable string
 */
export const formatDate = (date, pattern = 'MMM dd, yyyy') => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, pattern);
};

/**
 * Format date and time
 */
export const formatDateTime = (date, time) => {
  if (!date) return '';
  const dateStr = formatDate(date, 'MMM dd, yyyy');
  return time ? `${dateStr} at ${time}` : dateStr;
};

/**
 * Get relative time (e.g., "2 days ago")
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(parsedDate, new Date(), { addSuffix: true });
};

/**
 * Check if date is today
 */
export const checkIsToday = (date) => {
  if (!date) return false;
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isToday(parsedDate);
};

/**
 * Format relative date (e.g., "Today at 2:30 PM", "Yesterday at 3:00 PM")
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatRelative(parsedDate, new Date());
};
