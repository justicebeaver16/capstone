import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}

export function getCookie(name) {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((cookie) => cookie.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
}

export async function restoreCSRF() {
  if (import.meta.env.MODE === 'production') {
    console.info('CSRF restore skipped in production (handled by backend)');
    return;
  }

  try {
    const res = await csrfFetch('/api/csrf/restore');
    console.info('CSRF token restored:', res);
  } catch (error) {
    console.error('CSRF restore failed:', error);
  }
}

// import Cookies from 'js-cookie';

// // CSRF-protected fetch wrapper
// export async function csrfFetch(url, options = {}) {
//   options.method = options.method || 'GET';
//   options.headers = options.headers || {};

//   if (options.method.toUpperCase() !== 'GET') {
//     options.headers['Content-Type'] =
//       options.headers['Content-Type'] || 'application/json';
//     options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
//   }

//   const res = await window.fetch(url, options);

//   if (res.status >= 400) throw res;

//   return res;
// }

// // Get any cookie by name
// export function getCookie(name) {
//   const cookies = document.cookie.split('; ');
//   const cookie = cookies.find((cookie) => cookie.startsWith(name + '='));
//   return cookie ? cookie.split('=')[1] : null;
// }

// // Trigger CSRF token restoration (useful on first app load)
// export function restoreCSRF() {
//   return csrfFetch('/api/csrf/restore').catch((error) => {
//     console.error('CSRF restore error:', error);
//   });
// }