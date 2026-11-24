document.addEventListener('DOMContentLoaded', () => {
  const { setupDateParts, parseParts, setFieldError } = window.ToolPageCommon;
  const dd = document.getElementById('dow-dd');
  const mm = document.getElementById('dow-mm');
  const yyyy = document.getElementById('dow-yyyy');
  const container = document.getElementById('dow-container');
  const errorEl = document.getElementById('dow-error');
  const outWeekday = document.getElementById('dow-weekday');
  const outFull = document.getElementById('dow-full');

  const calc = () => {
    const date = parseParts(dd, mm, yyyy);
    const full = dd.value.length === 2 && mm.value.length === 2 && yyyy.value.length === 4;
    setFieldError(container, errorEl, full && !date);

    if (!date) {
      if (!full) {
        outWeekday.textContent = '—';
        outFull.textContent = 'Enter any calendar date to see the weekday.';
      }
      return;
    }

    setFieldError(container, errorEl, false);
    const weekday = window.AgeCore.getDayOfWeek(date);
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    outWeekday.textContent = weekday;
    outFull.textContent = date.toLocaleDateString(undefined, opts);
  };

  setupDateParts(dd, mm, yyyy, calc);
});