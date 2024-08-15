(function () {
  const TOGGLE_BUTTON_ID = "text-only-toggle";
  const TEXT_ONLY_CLASS = "text-only-mode";
  let isTextOnlyMode = false;

  function createToggleButton() {
    const button = document.createElement("button");
    button.id = TOGGLE_BUTTON_ID;
    button.textContent = "enable text-only mode";
    button.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
      padding: 5px 10px;
      background-color: #1da1f2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: Arial, sans-serif;
    `;
    return button;
  }

  function toggleTextOnlyMode() {
    isTextOnlyMode = !isTextOnlyMode;
    document.body.classList.toggle(TEXT_ONLY_CLASS, isTextOnlyMode);
    const button = document.getElementById(TOGGLE_BUTTON_ID);
    if (button) {
      button.textContent = isTextOnlyMode
        ? "disable text-only mode"
        : "enable text-only mode";
    }
    hideMediaPosts();
  }

  function hideMediaPosts() {
    // find all tweets
    const posts = document.querySelectorAll('[data-testid="tweet"]');
    posts.forEach((post) => {
      // check if the tweet has media
      const hasMedia = post.querySelector(
        '[data-testid="tweetPhoto"], [data-testid="tweetVideo"]',
      );
      // hide the tweet if it has media and text-only mode is enabled
      post.classList.toggle("text-only-hidden", hasMedia && isTextOnlyMode);
    });
  }

  function initializeExtension() {
    // create and add the toggle button
    const toggleButton = createToggleButton();
    document.body.appendChild(toggleButton);
    toggleButton.addEventListener("click", toggleTextOnlyMode);

    // observe for new tweets being added
    const observer = new MutationObserver(hideMediaPosts);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // initialize the extension when the page is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeExtension);
  } else {
    initializeExtension();
  }
})();
