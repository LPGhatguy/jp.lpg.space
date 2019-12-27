if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");
      console.log("Worker registered: ", registration.scope);
    } catch (err) {
      console.log("Worker registration failure:", err);
    }
  });
}