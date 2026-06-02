import { auth, onAuthStateChanged, signOut } from "/public/firebase-init.js";

export function renderNav(target = "#nav") {
  const el = document.querySelector(target);
  if (!el) return;
  el.innerHTML = `
    <nav class="navbar-lite">
      <div class="container d-flex align-items-center justify-content-between py-3" style="max-width: 1200px;">
        <a href="/public/index.html" class="brand">🍽️ RecipeHub</a>
        <div id="nav-actions" class="d-flex align-items-center gap-3"></div>
      </div>
    </nav>
  `;
  const actions = el.querySelector("#nav-actions");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      actions.innerHTML = `
        <a href="/public/new.html" class="btn-ghost" style="font-weight: 600;">+ Share Recipe</a>
        <span class="meta d-none d-sm-inline">${user.displayName || user.email}</span>
        <button id="signout" class="btn-ink">Sign out</button>
      `;
      actions.querySelector("#signout").onclick = () => signOut(auth).then(() => location.href = "/public/login.html");
    } else {
      actions.innerHTML = `
        <a href="/public/login.html" class="btn-ghost" style="font-weight: 600;">Sign in</a>
        <a href="/public/signup.html" class="btn-ink text-decoration-none">Get started</a>
      `;
    }
  });
}