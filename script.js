
function toggleDrawer() {
  const drawer = document.getElementById("drawer");
  drawer.style.left = drawer.style.left === "0px" ? "-250px" : "0px";
}

function showLoading() {
  document.getElementById("loadingIndicator").style.display = "block";
  document.getElementById("pageContent").innerHTML = "";
}

function hideLoading() {
  document.getElementById("loadingIndicator").style.display = "none";
}

const params = new URLSearchParams(window.location.search);
const page = document.getElementById("pageContent");

function renderResult(feature, response, text = '') {
  const result = {
    status: true,
    creator: "Vinzz official",
    feature,
    ...(text && { text }),
    response
  };
  page.textContent = JSON.stringify(result, null, 2); // tampilkan JSON murni
}

function renderError() {
  const error = { status: false, message: 'Gagal merespon, mohon muat ulang' };
  page.textContent = JSON.stringify(error, null, 2); // tampilkan JSON murni
}

if (params.has("ffstalk") && params.get("id")) {
  showLoading();
  hideLoading();
  renderResult("ffstalk", "Fitur sedang maintenance");
}

else if (params.has("ttstalk") && params.get("user")) {
  const user = decodeURIComponent(params.get("user"));
  const apiUrl = `https://api.vreden.my.id/api/tiktokStalk?query=${user}`;
  showLoading();
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`)
    .then(res => res.json())
    .then(data => {
      hideLoading();
      renderResult("ttstalk", data.result || "No response");
    })
    .catch(() => {
      hideLoading();
      renderError();
    });
}

else if (params.has("ai") && params.get("text")) {
  const text = decodeURIComponent(params.get("text"));
  const apiUrl = `https://api.nekorinn.my.id/ai/chatbot?ai_name=Open+ai&text=${encodeURIComponent(text)}&logic=Kamu+adalah+ai+yang+pintar+dan+membantu+manusia,+nama+kamu+adalah+Open+ai`;
  showLoading();
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`)
    .then(res => res.json())
    .then(data => {
      hideLoading();
      renderResult("Open ai", data.result || "No response", text);
    })
    .catch(() => {
      hideLoading();
      renderError();
    });
}

else if (params.has("sfile") && params.get("link")) {
  const link = decodeURIComponent(params.get("link"));
  const apiUrl = `https://api.vreden.my.id/api/sfile?url=${link}`;
  showLoading();
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`)
    .then(res => res.json())
    .then(data => {
      hideLoading();
      renderResult("sfile downloader", data.result || "No response");
    })
    .catch(() => {
      hideLoading();
      renderError();
    });
}

else if (params.has("subdo") && params.get("domain")) {
  const domain = decodeURIComponent(params.get("domain"));
  const apiUrl = `https://api.vreden.my.id/api/tools/subfinder?domain=${domain}`;
  showLoading();
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`)
    .then(res => res.json())
    .then(data => {
      hideLoading();
      renderResult("subdomain finder", data.result || "No response");
    })
    .catch(() => {
      hideLoading();
      renderError();
    });
}

else if (params.has("mediafire") && params.get("linkmf")) {
  const linkmf = decodeURIComponent(params.get("linkmf"));
  const apiUrl = `https://api.vreden.my.id/api/mediafiredl?url=${linkmf}`;
  showLoading();
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`)
    .then(res => res.json())
    .then(data => {
      hideLoading();
      renderResult("mediafire downloader", data.result || "No response");
    })
    .catch(() => {
      hideLoading();
      renderError();
    });
    }
