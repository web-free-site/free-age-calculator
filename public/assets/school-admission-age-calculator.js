document.addEventListener('DOMContentLoaded', () => {
  const { setupDateParts, parseParts, setFieldError } = window.ToolPageCommon;
  const dobDd = document.getElementById('adm-dob-dd');
  const dobMm = document.getElementById('adm-dob-mm');
  const dobYyyy = document.getElementById('adm-dob-yyyy');
  const cutDd = document.getElementById('adm-cut-dd');
  const cutMm = document.getElementById('adm-cut-mm');
  const cutYyyy = document.getElementById('adm-cut-yyyy');
  const dobContainer = document.getElementById('adm-dob-container');
  const cutContainer = document.getElementById('adm-cut-container');
  const dobError = document.getElementById('adm-dob-error');
  const cutError = document.getElementById('adm-cut-error');
  const outYears = document.getElementById('adm-years');
  const outMonths = document.getElementById('adm-months');
  const outDays = document.getElementById('adm-days');
  const outSummary = document.getElementById('adm-summary');

  const defaultCutoff = () => {
    const y = new Date().getFullYear();
    cutDd.value = '01';
    cutMm.value = '09';
    cutYyyy.value = String(y);
    calc();
  };

  const calc = () => {
    const birth = parseParts(dobDd, dobMm, dobYyyy);
    const cutoff = parseParts(cutDd, cutMm, cutYyyy);
    const fullDob =
      dobDd.value.length === 2 && dobMm.value.length === 2 && dobYyyy.value.length === 4;
    const fullCut =
      cutDd.value.length === 2 && cutMm.value.length === 2 && cutYyyy.value.length === 4;

    if (!cutDd.value && !cutMm.value && !cutYyyy.value) {
      outYears.textContent = '—';
      outMonths.textContent = '—';
      outDays.textContent = '—';
      outSummary.textContent = 'Enter birth date and school cutoff date (example: 01/09/' + new Date().getFullYear() + ').';
      return;
    }

    setFieldError(dobContainer, dobError, fullDob && !birth);
    setFieldError(cutContainer, cutError, fullCut && !cutoff);

    if (!birth || !cutoff) return;

    if (birth > cutoff) {
      setFieldError(dobContainer, dobError, true);
      outSummary.textContent = 'Birth date must be on or before the cutoff date.';
      return;
    }

    setFieldError(dobContainer, dobError, false);
    setFieldError(cutContainer, cutError, false);

    const age = window.AgeCore.getExactAge(birth, cutoff);
    outYears.textContent = age.years;
    outMonths.textContent = age.months;
    outDays.textContent = age.days;
    const opts = { year: 'numeric', month: 'long', day: 'numeric' };
    outSummary.textContent = `On ${cutoff.toLocaleDateString(undefined, opts)}, the child would be exactly ${age.years} years, ${age.months} months, and ${age.days} days old. Verify local admission rules with your school.`;
  };

  setupDateParts(dobDd, dobMm, dobYyyy, calc);
  setupDateParts(cutDd, cutMm, cutYyyy, calc);
  const btn = document.getElementById('adm-example-cutoff');
  if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); defaultCutoff(); });
});