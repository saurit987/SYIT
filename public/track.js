/**
 * SYIT first-party traffic beacon + uptime reporting.
 *
 * Privacy: no cookies, no localStorage, no fingerprinting, no IP retention.
 * A visitor cannot be reconstructed from what is recorded.
 *
 * Loaded via `defer`, so it never blocks render. Every call is wrapped so a
 * failure here can never surface to the user or break the page.
 */
(function () {
  if (window.__syitTrack) return;

  function viewport() {
    var w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  }

  function referrer() {
    try {
      var r = document.referrer || "";
      if (!r) return "";
      var u = new URL(r);
      return u.hostname;
    } catch {
      return "";
    }
  }

  var lastPath = null;
  function send() {
    try {
      var path = location.pathname;
      lastPath = path;
      var payload = JSON.stringify({ path: path, ref: referrer(), vp: viewport() });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(function () {});
      }
    } catch {
      /* never surface analytics errors to the visitor */
    }
  }

  // Single page view on load, then one per client-side route change.
  window.__syitTrack = send;
  send();

  var last = location.pathname;
  setInterval(function () {
    if (location.pathname !== last) {
      last = location.pathname;
      lastPath = last;
      send();
    }
  }, 1000);

  // Heartbeat: proves the server is reachable, not just the static assets.
  setInterval(function () {
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/__ping" }),
        keepalive: true,
      }).catch(function () {});
    } catch {}
  }, 300000);
})();
