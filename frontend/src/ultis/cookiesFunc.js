export function setCookie(cname, cvalue, exMinute) {
  const d = new Date();
  d.setTime(d.getTime() + exMinute * 15 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${cname} = ${JSON.stringify(cvalue)} ; ${expires} ;path=/`;
}

export function getCookieValue(name) {
  return JSON.parse(
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ||
      null
  );
}

export function deleteCookieValue(array_cart) {
  const user_cart = getCookieValue("cart");
  const new_user_cart = [];
  for (const cart of user_cart) {
    if (!array_cart.find((item) => item === cart.cart_id)) {
      new_user_cart.push(cart);
    }
  }
  setCookie("cart", new_user_cart, 2);
  return new_user_cart;
}
