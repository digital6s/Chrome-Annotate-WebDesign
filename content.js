//Listens to messages from the background script using the chrome.runtime.onMessage.addListener API. When the background script sends a "contentScriptLoaded" message, it knows that the content script has been injected into the web page and can start listening for user actions.
//Listens for right-click events on the web page using the addEventListener API. When the user right-clicks on the web page, it sends a message to the background script with the location of the click


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "showNotePopup") {
    //Creates a pop-up window at the location of the right-click using the document.createElement API. The pop-up window contains a text area where the user can enter their note, and a save button that sends a message to the background script with the contents of the note.
    const popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.left = request.x + "px";
    popup.style.top = request.y + "px";
    popup.innerHTML = `
      <textarea></textarea>
      <button id="saveNote">Save</button>
    `;
    document.body.appendChild(popup);
//Listens to messages from the background script using the chrome.runtime.onMessage.addListener API. When the background script sends a "showNotePopup" message, it creates the pop-up window at the location specified in the message. When the background script sends a "saveNote" message, it reads the contents of the note and sends it back to the background script.
    const saveButton = popup.querySelector("#saveNote");
    saveButton.addEventListener("click", function() {
      const note = popup.querySelector("textarea").value;
      chrome.runtime.sendMessage({ action: "saveNote", note: note });
      popup.remove();
    });
  }
});

chrome.runtime.sendMessage({ action: "contentScriptLoaded" });
