import add from 'date-fns/add';
import { utcToZonedTime, zonedTimeToUtc, format } from 'date-fns-tz';

const defaultTimeZone = 'Asia/Tokyo';
const dateStringFormat = 'yyyy-MM-dd';
const dateTimeStringFormat = 'yyyy-MM-dd HH:mm';

export const getDateString = (date = new Date()) => format(date, dateStringFormat);
export const getDateTimeString = (date = new Date()) => format(date, dateTimeStringFormat);

export const getLocaleDate = (date = new Date, timeZone = defaultTimeZone) => utcToZonedTime(new Date(date), timeZone);
export const getLocaleDateString = (date = new Date, timeZone = defaultTimeZone) => getDateString(getLocaleDate(date, timeZone));
export const getLocaleDateTimeString = (date = new Date, timeZone = defaultTimeZone) => getDateTimeString(getLocaleDate(date, timeZone));

export const getUtcDate = (localeDate: Date, timeZone = defaultTimeZone) => zonedTimeToUtc(new Date(localeDate), timeZone);

export const setMinutes = (minutes: number, date = new Date(), timeZone = defaultTimeZone) => {
  const d = getLocaleDate(date, timeZone);
  d.setMinutes(minutes);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return getUtcDate(d);
};

export const setHoursAndMinutes = (hours: number, minutes: number, date = new Date(), timeZone = defaultTimeZone) => {
  const d = getLocaleDate(setMinutes(minutes, date, timeZone));
  d.setHours(hours);
  return getUtcDate(d);
};

export const setTime = (time: string, date = new Date(), timeZone = defaultTimeZone) => {
  const match = time.match(/^(\d+)\:(\d+)$/);
  if (!match) throw new Error('Invalid time string format');
  return setHoursAndMinutes(parseInt(match[1]), parseInt(match[2]), date, timeZone);
};

export const getMidNight = (date = new Date(), timeZone = defaultTimeZone) => setHoursAndMinutes(0, 0, date);

export const getNextHour = (date = new Date(), timeZone = defaultTimeZone) => {
  const d = getLocaleDate(setMinutes(0, date, timeZone));
  d.setHours(d.getHours() + 1);
  return getUtcDate(d);
};

export const getNextDate = (date = new Date(), timeZone = defaultTimeZone) => {
  const d = getLocaleDate(getMidNight(date, timeZone));
  d.setDate(d.getDate() + 1);
  return getUtcDate(d);
};

export const getNextMonth = (date = new Date(), timeZone = defaultTimeZone) => {
  const d = getLocaleDate(getMidNight(date, timeZone));
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  return getUtcDate(d);
};

export const addMinutes = (minutes: number, date = new Date()) => add(date, { minutes });
export const addHours = (hours: number, date = new Date()) => add(date, { hours });
export const addDays = (days: number, date = new Date()) => add(date, { days });
export const addWeeks = (weeks: number, date = new Date()) => add(date, { weeks });
export const addMonths = (months: number, date = new Date()) => add(date, { months });
export const addYears = (years: number, date = new Date()) => add(date, { years });