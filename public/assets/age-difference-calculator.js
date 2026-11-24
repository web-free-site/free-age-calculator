document.addEventListener('DOMContentLoaded', () => {
  const { setupDateParts, parseParts, setFieldError, formatNum } = window.ToolPageCommon;
  const p1dd = document.getElementById('p1-dd');
  const p1mm = document.getElementById('p1-mm');
  const p1yyyy = document.getElementById('p1-yyyy');
  const p2dd = document.getElementById('p2-dd');
  const p2mm = document.getElementById('p2-mm');
  const p2yyyy = document.getElementById('p2-yyyy');
  const p1Container = document.getElementById('p1-container');
  const p2Container = document.getElementById('p2-container');
  const p1Error = document.getElementById('p1-error');
  const p2Error = document.getElementById('p2-error');
  const outYears = document.getElementById('diff-years');
  const outMonths = document.getElementById('diff-months');
  const outDays = document.getElementById('diff-days');
  const outTotal = document.getElementById('diff-total-days');
  const outSummary = document.getElementById('diff-summary');

  const calc = () => {
    const d1 = parseParts(p1dd, p1mm, p1yyyy);
    const d2 = parseParts(p2dd, p2mm, p2yyyy);

    const full1 = p1dd.value.length === 2 && p1mm.value.length === 2 && p1yyyy.value.length === 4;
    const full2 = p2dd.value.length === 2 && p2mm.value.length === 2 && p2yyyy.value.length === 4;

    setFieldError(p1Container, p1Error, full1 && !d1);
    setFieldError(p2Container, p2Error, full2 && !d2);

    if (!d1 || !d2) {
      if (!full1 || !full2) {
        outYears.textContent = '—';
        outMonths.textContent = '—';
        outDays.textContent = '—';
        outTotal.textContent = '—';
        outSummary.textContent = 'Enter two valid birth dates to see the age gap.';
      }
      return;
    }

    const { age, totalDays, olderFirst } = window.AgeCore.getAgeDifference(d1, d2);
    outYears.textContent = age.years;
    outMonths.textContent = age.months;
    outDays.textContent = age.days;
    outTotal.textContent = formatNum(totalDays);
    const label = olderFirst ? 'Person 1 is older' : 'Person 2 is older';
    outSummary.textContent = `${label}. The gap is ${age.years} years, ${age.months} months, and ${age.days} days (${formatNum(totalDays)} calendar days).`;
  };

  setupDateParts(p1dd, p1mm, p1yyyy, calc);
  setupDateParts(p2dd, p2mm, p2yyyy, calc);
});