export function setCookie(cname, cvalue, exMinute) {
  const d = new Date();
  d.setTime(d.getTime() + exMinute * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${cname} = ${cvalue} ; ${expires} ;path=/`;
}

export function getCookieValue(name) {
  return (
    JSON.parse(document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || null)
  );
}
