document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#apiList").addEventListener("click", async function(e) {
    const target = e.target;
    if (target.classList.contains("btn") && target.href.includes("?")) {
      e.preventDefault(); // cegah halaman reload
      
      document.getElementById("loadingIndicator").style.display = "block";

      try {
        // Ambil URL tujuan dari tombol
        const url = target.href;

        // Fetch data dari URL tombol
        const res = await fetch(url);
        const data = await res.json();

        // Tampilkan ke halaman
        document.getElementById("pageContent").innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      } catch (err) {
        document.getElementById("pageContent").innerHTML = `<pre style="color:red">Gagal mengambil data:\n${err}</pre>`;
      } finally {
        document.getElementById("loadingIndicator").style.display = "none";
      }
    }
  });
});
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
  page.innerHTML = `<pre>${JSON.stringify({
    status: true,
    creator: "Vinzz official",
    feature,
    ...(text && { text }),
    response
  }, null, 2)}</pre>`;
}

function renderError() {
  page.innerHTML = `<pre>${JSON.stringify({ status: false, message: 'Gagal merespon, mohon muat ulang' }, null, 2)}</pre>`;
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
