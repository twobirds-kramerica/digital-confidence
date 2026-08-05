/*
 * DCC AI Help-Chat Widget --- PROTOTYPE (S-DCC-AI-CHAT-PROTO-001)
 * ============================================================================
 * NOT LINKED FROM ANY LIVE DCC PAGE. Lives in v2-lab/ alongside the existing
 * unlinked prototype pages (see v2-lab/scam-defence.html) -- this directory
 * is DCC's established "built, not yet wired into navigation" convention.
 *
 * DESIGN-GATE FLAG (read before shipping this anywhere near production):
 * PRODUCT.md's own Anti-references list names "Floating overlays that cover
 * content (? Help buttons, feedback bubbles -- these are current
 * anti-patterns already on the live site)" -- i.e. DCC's PRODUCT.md already
 * considers a floating help bubble an anti-pattern to move AWAY from, not
 * toward. The sprint that commissioned this prototype explicitly asked for
 * "a small floating button + expandable chat panel," so it is built exactly
 * that way here for Aaron's review -- but this is a genuine conflict with a
 * filed product doc, not a design decision this sprint is authorized to
 * settle on its own. Per DESIGN GATE / FILED DECISIONS OUTRANK SPRINT NOTES:
 * flagging this, not silently building through it. Before any production
 * merge, Aaron should decide whether the chat entry point lives in a fixed
 * "designated zone" (PRODUCT.md principle 4) instead of a floating FAB --
 * e.g. a persistent link in the nav/footer that opens the same panel.
 *
 * PRIVACY NOTICE (PIPEDA-adjacent, plain language, shown every time the
 * panel opens -- not just once, since DCC is often used on shared/library
 * devices where a "seen once" localStorage flag would hide it from the next
 * person): messages typed here are sent to an AI service to generate a
 * reply. Users are told plainly not to share passwords, account numbers, or
 * other sensitive details.
 *
 * CONFIGURATION
 * Set window.DCC_CHAT_ENDPOINT to the Worker's /chat URL before this script
 * runs, e.g. window.DCC_CHAT_ENDPOINT = "http://127.0.0.1:8787/chat" for a
 * local `wrangler dev` session. Leave unset and the widget disables itself
 * with an explanatory message instead of silently failing.
 *
 * Canadian English. No em-dashes in user-facing copy.
 */
(function () {
  "use strict";

  if (window.__dccChatLoaded) { return; }
  window.__dccChatLoaded = true;

  var ENDPOINT = window.DCC_CHAT_ENDPOINT || "";

  // --- Self-contained styles, using DCC's live Trust Blue token values -----
  // (css/tokens.css) so this reads as DCC even when the page hasn't loaded
  // that stylesheet. Font stack falls back to system sans/serif if the DCC
  // self-hosted fonts (Merriweather / Source Sans 3) aren't already loaded
  // by the host page -- no font files are duplicated into this prototype.
  var CSS = [
    ".dccchat-root,.dccchat-root *{box-sizing:border-box}",
    ".dccchat-root{position:fixed;z-index:2147483000;font-family:'Source Sans 3',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#1C2733}",
    ".dccchat-fab{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:2147483001;display:inline-flex;align-items:center;gap:8px;padding:14px 18px;border:2px solid #163C6A;border-radius:999px;background:#1D4E89;color:#fff;font-weight:700;font-size:16px;cursor:pointer;box-shadow:0 4px 14px rgba(16,23,31,.28);-webkit-tap-highlight-color:transparent;min-height:56px}",
    ".dccchat-fab:hover{background:#163C6A}",
    ".dccchat-fab:focus-visible{outline:3px solid #8A5A00;outline-offset:2px}",
    ".dccchat-overlay{position:fixed;inset:0;z-index:2147483002;background:rgba(16,23,31,.45);display:flex;align-items:flex-end;justify-content:flex-end;padding:16px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px))}",
    "@media (min-width:640px){.dccchat-overlay{align-items:center}}",
    ".dccchat-panel{width:min(420px,100%);max-height:min(640px,88vh);display:flex;flex-direction:column;background:#FFFFFF;border:2px solid #1D4E89;border-radius:12px;box-shadow:0 16px 50px rgba(16,23,31,.35);overflow:hidden}",
    ".dccchat-head{display:flex;align-items:center;gap:10px;padding:14px 16px;background:#1D4E89;color:#fff}",
    ".dccchat-head h2{margin:0;font-size:18px;font-weight:700;flex:1 1 auto}",
    ".dccchat-close{appearance:none;border:2px solid rgba(255,255,255,.6);background:transparent;color:#fff;border-radius:8px;width:36px;height:36px;font-size:18px;line-height:1;cursor:pointer}",
    ".dccchat-close:hover{background:rgba(255,255,255,.15)}",
    ".dccchat-close:focus-visible{outline:3px solid #8A5A00;outline-offset:2px}",
    ".dccchat-notice{background:#E3EDF7;border-bottom:1px solid #D5DDE6;padding:10px 14px;font-size:14px;color:#1C2733;display:flex;gap:10px;align-items:flex-start}",
    ".dccchat-notice p{margin:0 0 6px}",
    ".dccchat-notice-dismiss{appearance:none;border:1px solid #1D4E89;background:#fff;color:#1D4E89;border-radius:6px;padding:4px 10px;font-size:13px;font-weight:700;cursor:pointer;flex:0 0 auto;margin-top:2px}",
    ".dccchat-notice-dismiss:hover{background:#E3EDF7}",
    ".dccchat-notice-dismiss:focus-visible{outline:3px solid #8A5A00;outline-offset:2px}",
    ".dccchat-body{flex:1 1 auto;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px;background:#F8F9FB}",
    ".dccchat-msg{max-width:85%;padding:10px 12px;border-radius:10px;font-size:15px;line-height:1.5;white-space:pre-wrap;word-break:break-word}",
    ".dccchat-msg-user{align-self:flex-end;background:#1D4E89;color:#fff}",
    ".dccchat-msg-assistant{align-self:flex-start;background:#fff;border:1px solid #D5DDE6;color:#1C2733}",
    ".dccchat-msg-system{align-self:center;background:transparent;color:#435463;font-size:13px;font-style:italic}",
    ".dccchat-typing{align-self:flex-start;color:#435463;font-size:14px;font-style:italic}",
    ".dccchat-form{display:flex;gap:8px;padding:12px 14px;border-top:1px solid #D5DDE6;background:#fff}",
    ".dccchat-input{flex:1 1 auto;resize:none;min-height:44px;max-height:120px;border:1px solid #A9B7C6;border-radius:8px;padding:10px 12px;font:inherit;color:#1C2733}",
    ".dccchat-input:focus-visible{outline:3px solid #8A5A00;outline-offset:1px}",
    ".dccchat-send{appearance:none;border:2px solid #163C6A;background:#1D4E89;color:#fff;border-radius:8px;padding:0 18px;font-weight:700;font-size:15px;cursor:pointer;min-height:44px}",
    ".dccchat-send:hover{background:#163C6A}",
    ".dccchat-send:disabled{opacity:.6;cursor:not-allowed}",
    ".dccchat-send:focus-visible{outline:3px solid #8A5A00;outline-offset:2px}",
    ".dccchat-error{color:#B42318;font-size:14px;padding:0 16px 10px}",
    "@media (prefers-reduced-motion:no-preference){.dccchat-panel{animation:dccchat-in .15s ease-out}}",
    "@keyframes dccchat-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}",
    "html[data-theme=\"dark\"] .dccchat-panel{background:#1A2430;border-color:#7FB3E8}",
    "html[data-theme=\"dark\"] .dccchat-body{background:#10171F}",
    "html[data-theme=\"dark\"] .dccchat-msg-assistant{background:#1A2430;border-color:#223349;color:#ECF1F6}",
    "html[data-theme=\"dark\"] .dccchat-msg-system{color:#ADBDCB}",
    "html[data-theme=\"dark\"] .dccchat-notice{background:#223349;border-color:#2E3F55;color:#ECF1F6}",
    "html[data-theme=\"dark\"] .dccchat-input{background:#10171F;color:#ECF1F6;border-color:#3A4A5C}",
    "html[data-theme=\"dark\"] .dccchat-form{background:#1A2430;border-color:#2E3F55}"
  ].join("");

  function injectStyles() {
    if (document.getElementById("dccchat-styles")) { return; }
    var s = document.createElement("style");
    s.id = "dccchat-styles";
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  function elt(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  var state = {
    open: false,
    sending: false,
    history: [] // [{role:'user'|'assistant', content:string}], capped client-side too
  };
  var el = { root: null, fab: null, overlay: null, body: null, input: null, sendBtn: null, form: null };

  function buildNotice() {
    var wrap = elt("div", "dccchat-notice");
    wrap.setAttribute("role", "note");
    var textWrap = elt("div");
    var p1 = elt("p", null,
      "This chat uses an AI helper. Your message is sent to an AI service so it can write a reply.");
    var p2 = elt("p", null,
      "Please do not share passwords, account numbers, or other sensitive details here.");
    p2.style.margin = "0";
    textWrap.appendChild(p1);
    textWrap.appendChild(p2);
    var dismiss = elt("button", "dccchat-notice-dismiss", "Got it");
    dismiss.type = "button";
    dismiss.addEventListener("click", function () {
      if (wrap.parentNode) { wrap.parentNode.removeChild(wrap); }
    });
    wrap.appendChild(textWrap);
    wrap.appendChild(dismiss);
    return wrap;
  }

  function addMessage(role, text) {
    var cls = role === "user" ? "dccchat-msg dccchat-msg-user"
      : role === "system" ? "dccchat-msg dccchat-msg-system"
      : "dccchat-msg dccchat-msg-assistant";
    var m = elt("div", cls, text);
    el.body.appendChild(m);
    el.body.scrollTop = el.body.scrollHeight;
    return m;
  }

  function setTyping(on) {
    var existing = el.body.querySelector(".dccchat-typing");
    if (on && !existing) {
      var t = elt("div", "dccchat-typing", "Thinking...");
      el.body.appendChild(t);
      el.body.scrollTop = el.body.scrollHeight;
    } else if (!on && existing) {
      existing.parentNode.removeChild(existing);
    }
  }

  function showError(msg) {
    var existing = el.overlay.querySelector(".dccchat-error");
    if (existing) { existing.parentNode.removeChild(existing); }
    var e = elt("div", "dccchat-error", msg);
    el.form.parentNode.insertBefore(e, el.form);
  }

  function clearError() {
    var existing = el.overlay.querySelector(".dccchat-error");
    if (existing) { existing.parentNode.removeChild(existing); }
  }

  function sendMessage(text) {
    if (!ENDPOINT) {
      addMessage("system", "This is a local prototype and no chat service is configured yet. Set window.DCC_CHAT_ENDPOINT to the Worker's /chat URL to try it.");
      return;
    }
    clearError();
    addMessage("user", text);
    state.history.push({ role: "user", content: text });
    state.sending = true;
    el.sendBtn.disabled = true;
    el.input.disabled = true;
    setTyping(true);

    window.fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        history: state.history.slice(0, -1) // history BEFORE this turn
      })
    }).then(function (res) {
      return res.json().then(function (data) { return { ok: res.ok, data: data }; });
    }).then(function (r) {
      setTyping(false);
      if (r.ok && r.data && r.data.ok) {
        addMessage("assistant", r.data.reply || "Sorry, I didn't get a clear answer that time.");
        state.history.push({ role: "assistant", content: r.data.reply || "" });
      } else {
        showError((r.data && r.data.error) || "Something went wrong. Please try again.");
      }
    }).catch(function () {
      setTyping(false);
      showError("Could not reach the chat service. Please check your connection and try again.");
    }).finally(function () {
      state.sending = false;
      el.sendBtn.disabled = false;
      el.input.disabled = false;
      el.input.focus();
    });
  }

  function openPanel() {
    if (state.open) { return; }
    state.open = true;
    var overlay = elt("div", "dccchat-overlay");
    var panel = elt("div", "dccchat-panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Ask DCC a question");

    var head = elt("div", "dccchat-head");
    head.appendChild(elt("h2", null, "Ask DCC"));
    var closeBtn = elt("button", "dccchat-close", "×");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close chat");
    closeBtn.addEventListener("click", closePanel);
    head.appendChild(closeBtn);
    panel.appendChild(head);

    panel.appendChild(buildNotice());

    var body = elt("div", "dccchat-body");
    body.setAttribute("role", "log");
    body.setAttribute("aria-live", "polite");
    el.body = body;
    panel.appendChild(body);
    addMessage("assistant", "Hello. I'm the DCC help assistant. Ask me anything about using your device, staying safe online, or a DCC lesson, and I'll do my best to help.");

    var form = elt("form", "dccchat-form");
    el.form = form;
    var input = elt("textarea", "dccchat-input");
    input.setAttribute("aria-label", "Type your question");
    input.placeholder = "Type your question here...";
    input.rows = 1;
    el.input = input;
    var sendBtn = elt("button", "dccchat-send", "Send");
    sendBtn.type = "submit";
    el.sendBtn = sendBtn;
    form.appendChild(input);
    form.appendChild(sendBtn);
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var text = (input.value || "").trim();
      if (!text || state.sending) { return; }
      input.value = "";
      sendMessage(text);
    });
    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" && !ev.shiftKey) {
        ev.preventDefault();
        form.dispatchEvent(new Event("submit", { cancelable: true }));
      }
    });
    panel.appendChild(form);

    overlay.appendChild(panel);
    overlay.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") { closePanel(); }
    });
    el.root.appendChild(overlay);
    el.overlay = overlay;
    if (el.fab) { el.fab.style.display = "none"; }
    input.focus();
  }

  function closePanel() {
    if (!state.open) { return; }
    state.open = false;
    if (el.overlay && el.overlay.parentNode) { el.overlay.parentNode.removeChild(el.overlay); }
    el.overlay = null;
    if (el.fab) { el.fab.style.display = ""; el.fab.focus(); }
  }

  function buildFab() {
    var fab = elt("button", "dccchat-fab");
    fab.type = "button";
    fab.setAttribute("aria-label", "Ask DCC a question");
    fab.appendChild(document.createTextNode("💬 Ask DCC"));
    fab.addEventListener("click", openPanel);
    el.root.appendChild(fab);
    el.fab = fab;
  }

  function boot() {
    injectStyles();
    var root = elt("div", "dccchat-root");
    document.body.appendChild(root);
    el.root = root;
    buildFab();
    window.DCCChat = { open: openPanel, close: closePanel };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
