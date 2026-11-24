document.addEventListener('DOMContentLoaded', () => {
  const { setupDateParts, parseParts, setFieldError } = window.ToolPageCommon;
  const dobDd = document.getElementById('chrono-dob-dd');
  const dobMm = document.getElementById('chrono-dob-mm');
  const dobYyyy = document.getElementById('chrono-dob-yyyy');
  const testDd = document.getElementById('chrono-test-dd');
  const testMm = document.getElementById('chrono-test-mm');
  const testYyyy = document.getElementById('chrono-test-yyyy');
  const dobContainer = document.getElementById('chrono-dob-container');
  const testContainer = document.getElementById('chrono-test-container');
  const dobError = document.getElementById('chrono-dob-error');
  const testError = document.getElementById('chrono-test-error');
  const outYears = document.getElementById('chrono-years');
  const outMonths = document.getElementById('chrono-months');
  const outDays = document.getElementById('chrono-days');
  const outLine = document.getElementById('chrono-line');

  const calc = () => {
    const birth = parseParts(dobDd, dobMm, dobYyyy);
    const test = parseParts(testDd, testMm, testYyyy);
    const fullDob =
      dobDd.value.length === 2 && dobMm.value.length === 2 && dobYyyy.value.length === 4;
    const fullTest =
      testDd.value.length === 2 && testMm.value.length === 2 && testYyyy.value.length === 4;

    setFieldError(dobContainer, dobError, fullDob && !birth);
    setFieldError(testContainer, testError, fullTest && !test);

    if (!birth || !test) {
      if (!fullDob || !fullTest) {
        outYears.textContent = '—';
        outMonths.textContent = '—';
        outDays.textContent = '—';
        outLine.textContent = 'Enter birth date and test date to compute chronological age.';
      }
      return;
    }

    if (birth > test) {
      setFieldError(dobContainer, dobError, true);
      outLine.textContent = 'Birth date must be on or before the test date.';
      return;
    }

    setFieldError(dobContainer, dobError, false);
    setFieldError(testContainer, testError, false);

    const age = window.AgeCore.getExactAge(birth, test);
    outYears.textContent = age.years;
    outMonths.textContent = age.months;
    outDays.textContent = age.days;
    const opts = { year: 'numeric', month: 'short', day: 'numeric' };
    outLine.textContent = `Chronological age on ${test.toLocaleDateString(undefined, opts)}: ${age.years} years, ${age.months} months, ${age.days} days.`;
  };

  setupDateParts(dobDd, dobMm, dobYyyy, calc);
  setupDateParts(testDd, testMm, testYyyy, calc);
});