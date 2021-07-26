if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {})
      .catch(() => {
        console.log("register fail");
      });
  });
}
