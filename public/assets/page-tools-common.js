/**
 * Shared date-part inputs for specialty tool pages (uses AgeCore).
 */
(function () {
  const handleEightDigitPaste = (e, dd, mm, yyyy, callback) => {
    const raw = (e.clipboardData?.getData('text') || '').replace(/\D/g, '');
    if (raw.length === 8) {
      e.preventDefault();
      dd.value = raw.slice(0, 2);
      mm.value = raw.slice(2, 4);
      yyyy.value = raw.slice(4, 8);
      callback();
    }
  };

  const setupDateParts = (dd, mm, yyyy, onChange) => {
    const inputs = [dd, mm, yyyy];
    inputs.forEach((input, index) => {
      input.addEventListener('paste', (e) => handleEightDigitPaste(e, dd, mm, yyyy, onChange));
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
        const maxLen = parseInt(input.getAttribute('maxlength'), 10);
        if (input.value.length >= maxLen && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
        onChange();
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value === '' && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });
  };

  const parseParts = (dd, mm, yyyy) =>
    window.AgeCore.parseCustomDateParts(dd.value, mm.value, yyyy.value);

  const setFieldError = (container, errorEl, show) => {
    if (!container) return;
    container.classList.toggle('error', show);
    if (errorEl) errorEl.classList.toggle('visible', show);
  };

  const formatNum = (n) => new Intl.NumberFormat().format(n);

  window.ToolPageCommon = { setupDateParts, parseParts, setFieldError, formatNum };
})();