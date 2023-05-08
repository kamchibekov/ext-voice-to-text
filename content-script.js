(async () => {
  const audio = await navigator.mediaDevices.getUserMedia({ audio: true });

  if (audio.active) {
    // Use webkitSpeechRecognition
    const recognition =
      new webkitSpeechRecognition() || new SpeechRecognition();

    recognition.onerror = (event) => {
      console.error(`Speech recognition error detected: ${event.error}`);
    };

    // Set the language and continuous mode
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    // Define a function to handle the result event
    recognition.onresult = (event) => {
      // Loop through the results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        // Check if the result is final
        if (event.results[i].isFinal) {
          // Get the transcript and confidence
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;

          // Append text to active element
          const activeElement = document.activeElement;
          if (
            activeElement.tagName == "INPUT" ||
            activeElement.tagName == "TEXTAREA"
          ) {
            activeElement.value += transcript;
          } else {
            activeElement.innerText += transcript;
          }
        }
      }
    };

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type == "start") {
        recognition.start();
      }
      if (message.type == "end") {
        recognition.stop();
      }
      console.log(message);
    });
  } else {
    console.log("audio not allowed");
  }
})();
