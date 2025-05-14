import Cookies from 'js-cookie';

// CSRF-protected fetch wrapper
export async function csrfFetch(url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    const csrfToken = Cookies.get('XSRF-TOKEN');
    if (csrfToken) {
      options.headers['X-CSRF-Token'] = csrfToken;
    }
  }

  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}

// Restore CSRF token
export async function restoreCSRF() {
  try {
    const res = await csrfFetch('/api/csrf/restore');
    const data = await res.json();
    console.info('CSRF token restored:', data);
  } catch (error) {
    console.error('CSRF restore failed:', error);
  }
}