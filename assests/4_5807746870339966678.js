function nCount(selector) {
  const elements = document.querySelectorAll(selector);

  for (const element of elements) {
    const firstSpan = element.querySelector("span:first-child"); // Target the first span within each h3
    if (!firstSpan) {
      console.warn(`Skipping element at "${selector}" because it has no first-child span.`);
      continue;
    }

    const currentCount = parseInt(firstSpan.textContent, 10);
    const currentYear = new Date().getFullYear();
    const storedYear = localStorage.getItem("lastIncrementYear");

    if (storedYear !== currentYear) {
      const newCount = currentCount + 1;

      // Animate the counter using vanilla JavaScript
      firstSpan.textContent = currentCount; // Set initial value before animation

      let stepCount = 0;
      const animationInterval = setInterval(() => {
        stepCount++;
        const animatedValue = Math.ceil((stepCount / 40) * newCount); // Calculate smooth animation steps

        firstSpan.textContent = animatedValue;

        if (stepCount === 40) { // Duration = 40 steps * 100ms/step
          clearInterval(animationInterval);
        }
      }, 100);

      localStorage.setItem("lastIncrementYear", currentYear);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  nCount(".numbers h3");
});

setTimeout(() => {
  document.addEventListener("DOMContentLoaded", () => {
    nCount(".numbers h3");
  });
}, 5250);