const API_BASE = window.location.hostname.includes("localhost") ?
    "http://localhost:5000" :
    "https://congruent-tennis-website.onrender.com";

document.getElementById("upload-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch(`${API_BASE}/upload_article`, {
            method: "POST",
            body: formData
        })
        .then(async (res) => {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const json = await res.json();
                if (!res.ok) throw new Error(json.error || "Upload failed.");
                return json;
            } else {
                const text = await res.text(); // This is the HTML error page
                throw new Error("Server error:\n" + text.substring(0, 200));
            }
        })
        .then((data) => {
            if (data.success) {
                bootstrap.Modal.getInstance(document.getElementById("uploadArticleModal")).hide();
                this.reset();
                loadArticles();
            }
        })
        .catch((err) => {
            alert("❌ Upload Failed: " + err.message);
            console.error("Upload error:", err);
        });
});


function loadArticles() {
    const forum = document.getElementById('article-forum');
    if (!forum) {
        console.error("Missing #article-forum in DOM");
        return;
    }

    fetch(`${API_BASE}/articles`)
        .then(res => res.json())
        .then(articles => {
            forum.innerHTML = ''; // Clear existing content

            if (!articles.length) {
                forum.innerHTML = "<p>No articles have been posted yet.</p>";
                return;
            }

            articles.forEach(article => {
                const card = document.createElement('div');
                card.className = 'article-card mb-5';
                card.innerHTML = `
          <h3>${article.title}</h3>
          <p><strong>By:</strong> ${article.author} | <strong>Date:</strong> ${new Date(article.date).toLocaleDateString()}</p>
${article.image_data ? `<img src="${API_BASE}/article/image/${article._id}" class="img-fluid mb-3" style="max-width:100%; max-height:300px; object-fit:cover;">` : ''}
          <p>${article.summary || ''}</p>
<button class="btn custom-btn" onclick="openPdfModal('/article/pdf/${article._id}', '${article.title}')">Read More</button>
        `;
                forum.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Failed to load articles:", err);
            forum.innerHTML = "<p class='text-danger'>Failed to load articles.</p>";
        });
}


document.addEventListener("DOMContentLoaded", loadArticles);


function openPdfModal(pdfUrl, title) {
    const modal = new bootstrap.Modal(document.getElementById("pdfModal"));
    const viewer = document.getElementById("pdfViewer");
    const label = document.getElementById("pdfModalLabel");

    viewer.src = `${API_BASE}${pdfUrl}`;
    label.textContent = title;
    modal.show();
}