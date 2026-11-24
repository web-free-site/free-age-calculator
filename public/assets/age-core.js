/**
 * Age calculation utilities (from RajkumarKamarthi/Age-Calculator, MIT).
 * Exposed on window.AgeCore for the app and Node tests.
 */
(function (root) {
  const parseCustomDateParts = (d, m, y) => {
    const day = parseInt(d, 10);
    const month = parseInt(m, 10);
    const year = parseInt(y, 10);

    if (!day || !month || !year || year < 1000 || month < 1 || month > 12 || day < 1 || day > 31) {
      return null;
    }

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
      return date;
    }
    return null;
  };

  const getExactAge = (birthDate, targetDate) => {
    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const getNextBirthdayDate = (birthDate, now = new Date()) => {
    let nextBday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday < now && nextBday.toDateString() !== now.toDateString()) {
      nextBday.setFullYear(now.getFullYear() + 1);
    }
    return nextBday;
  };

  const getDaysUntilBirthday = (birthDate, now = new Date()) => {
    const nextBday = getNextBirthdayDate(birthDate, now);
    const ms = nextBday - now;
    const totalDays = Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
    const totalWeeks = Math.floor(totalDays / 7);
    const countdown = getExactAge(now, nextBday);
    const weekday = nextBday.toLocaleDateString('en-US', { weekday: 'long' });
    return { nextBday, totalDays, totalWeeks, months: countdown.months, days: countdown.days, weekday };
  };

  const getDayOfWeek = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'long' });

  const getAgeDifference = (dateA, dateB) => {
    const earlier = dateA <= dateB ? dateA : dateB;
    const later = dateA <= dateB ? dateB : dateA;
    const age = getExactAge(earlier, later);
    const stats = getDetailedStats(earlier, later);
    return { age, totalDays: stats.totalDays, olderFirst: dateA <= dateB };
  };

  const getDetailedStats = (birthDate, targetDate) => {
    const diffMs = targetDate - birthDate;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalMonths =
      (targetDate.getFullYear() - birthDate.getFullYear()) * 12 +
      (targetDate.getMonth() - birthDate.getMonth());
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalSeconds = Math.floor(diffMs / 1000);

    return { totalMonths, totalWeeks, totalDays, totalHours, totalMinutes, totalSeconds };
  };

  const api = {
    parseCustomDateParts,
    getExactAge,
    getDetailedStats,
    getNextBirthdayDate,
    getDaysUntilBirthday,
    getDayOfWeek,
    getAgeDifference,
  };

  root.AgeCore = api;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : window);