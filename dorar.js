chrome.contextMenus.create({
  title: "تحقق من صحة الحديث",
  contexts: ["selection"],
  id: "takhrij"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  var url = "http://dorar.net/dorar_api.json?skey=" + info.selectionText;

  // create and inject modal, with default display none
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "createModal"
    });
  });
  // open this modal
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "openModal"
    });
  });
  // add process....
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "sendProcess"
    });
  });
  // on success display result
  var req = new XMLHttpRequest();

  req.open("GET", url, true);

  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: "displayResult",
          content: JSON.parse(req.responseText).ahadith.result
        });
      });
    }
  };

  req.send();
});
