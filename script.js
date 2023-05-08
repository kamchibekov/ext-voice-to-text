// Get the button and text_area elements
const button = document.getElementById("button");
const text_area = document.getElementById("text-area");

// Add a click event listener to the button
button.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Check if the recognition is active
  if (button.textContent == "Speak") {
    // send stop message to content script
    await chrome.tabs.sendMessage(tab.id, { type: "start" });
    button.style.backgroundColor = "red";
    button.textContent = "Stop";
    console.log(tab)
  } else {
    // send start message to content script
    await chrome.tabs.sendMessage(tab.id, { type: "end" });
    button.style.backgroundColor = "green";
    button.textContent = "Speak";
  }
});
