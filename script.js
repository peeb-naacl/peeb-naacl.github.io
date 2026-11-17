'use strict';
const dialog = document.querySelector('#figure-dialog');
const expandedImage = document.querySelector('#expanded-figure');
let figureTrigger;
document.querySelectorAll('[data-enlarge]').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    const figure = button.closest('figure');
    figureTrigger = button;
    expandedImage.src = image.src;
    expandedImage.alt = image.alt;
    document.querySelector('#dialog-title').textContent = button.getAttribute('aria-label').replace('Enlarge ', '');
    document.querySelector('#expanded-caption').textContent = figure.querySelector('figcaption').textContent;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelector('#close-figure').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  if (figureTrigger) figureTrigger.focus();
});
document.querySelector('#copy-citation').addEventListener('click', async () => {
  const button = document.querySelector('#copy-citation');
  const value = document.querySelector('#bibtex').textContent;
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
    else {
      const area = document.createElement('textarea');
      area.value = value; area.style.position = 'fixed'; area.style.opacity = '0';
      document.body.append(area); area.select();
      const copied = document.execCommand('copy'); area.remove();
      if (!copied) throw new Error('Clipboard unavailable');
    }
    button.textContent = 'Copied ✓';
    document.querySelector('#copy-status').textContent = 'Citation copied to clipboard.';
    setTimeout(() => button.textContent = 'Copy BibTeX', 2200);
  } catch {
    document.querySelector('#copy-status').textContent = 'Please select the citation text or use Download citation.';
    const range = document.createRange(); range.selectNodeContents(document.querySelector('#bibtex'));
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
  }
});
