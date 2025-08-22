// utils/deleteCookie.ts
// utils/auth.ts

export function deleteCookie(...names: string[]) {
  names.forEach((name) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  });
  window.location.href = "/signin";
}
