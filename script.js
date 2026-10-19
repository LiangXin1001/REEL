const representationContent = {
  frames: {
    kicker: "Reference path",
    title: "Frames reprocess every question.",
    description: "Keep the selected images and run the complete vision-language path again for each new question.",
    compute: "Highest repeated work",
    storage: "Selected image files",
    fidelity: "Reference"
  },
  text: {
    kicker: "Portable but irreversible",
    title: "Text writes a compact record.",
    description: "A separate writer model describes the selected frames without seeing later questions. Details omitted by the writer cannot be recovered.",
    compute: "Low answer-path cost",
    storage: "About 6.1–8.6 KiB / video",
    fidelity: "21.1–29.6% outcomes differ"
  },
  visual: {
    kicker: "Reuse the vision tower",
    title: "Visual keeps encoder outputs.",
    description: "Later questions skip visual encoding while the language-model path still runs for each question.",
    compute: "Model-dependent saving",
    storage: "Large intermediate tensors",
    fidelity: "0.0–2.3% outcomes differ"
  },
  prefix: {
    kicker: "Reuse vision and shared prefill",
    title: "Prefix State also keeps KV pages.",
    description: "The saved state includes the visual representation and the language-model prefix used before question-specific decoding.",
    compute: "Lowest eligible in tested workloads",
    storage: "About 1.06–20.97 GiB / video",
    fidelity: "0.3–2.8% outcomes differ"
  }
};

const fields = {
  kicker: document.querySelector("#rep-kicker"),
  title: document.querySelector("#rep-title"),
  description: document.querySelector("#rep-description"),
  compute: document.querySelector("#rep-compute"),
  storage: document.querySelector("#rep-storage"),
  fidelity: document.querySelector("#rep-fidelity")
};

document.querySelectorAll(".rep-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const next = representationContent[tab.dataset.rep];
    document.querySelectorAll(".rep-tab").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    Object.entries(fields).forEach(([key, node]) => { node.textContent = next[key]; });
  });
});

const dialog = document.querySelector("#figure-dialog");
const dialogImage = document.querySelector("#lightbox-image");
const dialogTitle = document.querySelector("#lightbox-title");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    const preview = button.querySelector("img");
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = preview ? preview.alt : "Expanded paper figure";
    dialogTitle.textContent = button.dataset.title || "Paper figure";
    dialog.showModal();
  });
});

document.querySelector("#lightbox-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}
