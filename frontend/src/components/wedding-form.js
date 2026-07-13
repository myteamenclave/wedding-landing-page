const form = document.getElementById('wedding-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    status.innerHTML = 'Creating your wedding page...';

    try {
      const response = await fetch('/wedding-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Unable to create page');
      }
      const publicUrl = `${window.location.origin}${result.page.publicUrl}`;
      status.innerHTML = `Page created successfully. <a href="${publicUrl}" target="_blank" rel="noopener noreferrer">Open your wedding page</a>`;
      form.reset();
    } catch (error) {
      status.innerHTML = error.message;
    }
  });
}
