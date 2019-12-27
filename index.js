async function doServiceWorkerStuff() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");
      console.log("Worker registered: ", registration.scope);
    } catch (err) {
      console.log("Worker registration failure:", err);
    }
  }
}

function addKanaHighlights() {
  const kana = Array.from(document.querySelectorAll(".kana"));
  let selectedKana = null;

  for (const item of kana) {
    console.log("add", item);

    item.addEventListener("click", () => {
      if (selectedKana === item) {
        item.classList.remove("kana-selected");
        selectedKana = null;
      } else {
        if (selectedKana != null) {
          selectedKana.classList.remove("kana-selected");
        }

        item.classList.add("kana-selected");
        selectedKana = item;
      }
    });
  }
}

window.addEventListener("load", () => {
  doServiceWorkerStuff();
  addKanaHighlights();
});