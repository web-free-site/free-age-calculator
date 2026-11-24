document.addEventListener('DOMContentLoaded', () => {
  const { setupDateParts, parseParts, setFieldError, formatNum } = window.ToolPageCommon;
  const dd = document.getElementById('bday-dd');
  const mm = document.getElementById('bday-mm');
  const yyyy = document.getElementById('bday-yyyy');
  const container = document.getElementById('bday-container');
  const errorEl = document.getElementById('bday-error');
  const outDays = document.getElementById('until-days');
  const outWeeks = document.getElementById('until-weeks');
  const outYm = document.getElementById('until-ym');
  const outWeekday = document.getElementById('until-weekday');
  const outNext = document.getElementById('until-next-date');

  const calc = () => {
    const birth = parseParts(dd, mm, yyyy);
    const full = dd.value.length === 2 && mm.value.length === 2 && yyyy.value.length === 4;
    setFieldError(container, errorEl, full && !birth);

    if (!birth) {
      if (!full) {
        outDays.textContent = '—';
        outWeeks.textContent = '—';
        outYm.textContent = '—';
        outWeekday.textContent = '—';
        outNext.textContent = 'Enter your date of birth above.';
      }
      return;
    }

    const now = new Date();
    if (birth > now) {
      setFieldError(container, errorEl, true);
      return;
    }
    setFieldError(container, errorEl, false);

    const info = window.AgeCore.getDaysUntilBirthday(birth, now);
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    outDays.textContent = formatNum(info.totalDays);
    outWeeks.textContent = formatNum(info.totalWeeks);
    outYm.textContent = `${info.months} months, ${info.days} days`;
    outWeekday.textContent = info.weekday;
    outNext.textContent = info.nextBday.toLocaleDateString(undefined, opts);
  };

  setupDateParts(dd, mm, yyyy, calc);
});