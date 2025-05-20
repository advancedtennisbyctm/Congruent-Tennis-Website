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
      <button class="btn  custom-btn" onclick="openCommentModal('${article._id}')">Comment</button>
<button class="btn btn-outline-dark dropdown-toggle" onclick="toggleCommentDropdown('${article._id}')">
    View Comments (${article.comments?.length || 0})
  </button>

  <div class="comment-dropdown mt-3 d-none" id="comments-${article._id}">
    <div class="card card-body comment-section" id="comment-list-${article._id}">
      ${article.comments?.length > 0
        ? article.comments.map(c => `
          <div class="comment mb-2">
            <strong>${c.author}</strong> <small class="text-muted">${new Date(c.date).toLocaleString()}</small>
            <p class="mb-0">${c.text}</p>
          
      ${c.replies?.length > 0
        ? `<div class="ms-4 mt-2">
            ${c.replies.map(r => `
              <div class="reply mb-2 ps-3 border-start">
                <strong>${r.author}</strong> <small class="text-muted">${new Date(r.date).toLocaleString()}</small>
                <p class="mb-0">${r.text}</p>
              </div>
            `).join('')}
          </div>` : ''
      }

      <div class="ms-4 mt-2">
        <input type="text" class="form-control form-control-sm mb-1" placeholder="Your name" id="reply-author-${article._id}-${c._id}">
        <input type="text" class="form-control form-control-sm mb-1" placeholder="Write a reply..." id="reply-text-${article._id}-${c._id}">
        <button class="btn custom-btn" onclick="submitReply('${article._id}', '${c._id}')">Reply</button>
      </div>
    </div>
  `).join('')
  : '<p class="text-muted">No comments yet.</p>'
      }

    </div>
  </div>
        `;
                forum.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Failed to load articles:", err);
            forum.innerHTML = "<p class='text-danger'>Failed to load articles.</p>";
        });
}


function toggleCommentDropdown(articleId) {
    const dropdown = document.getElementById(`comments-${articleId}`);
    dropdown.classList.toggle("d-none");
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

function openCommentModal(articleId) {
    document.getElementById("comment-article-id").value = articleId;
    const modal = new bootstrap.Modal(document.getElementById("commentModal"));
    modal.show();
}

document.getElementById("comment-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const articleId = formData.get("article_id");
    const author = formData.get("comment_author");
    const text = formData.get("comment_text");

    fetch(`${API_BASE}/articles/${articleId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author,
                text
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                this.reset();
                bootstrap.Modal.getInstance(document.getElementById("commentModal")).hide();
                alert("✅ Comment posted!");
            }
        })
        .catch(err => {
            console.error("Failed to post comment:", err);
            alert("❌ Failed to post comment.");
        });
});

function submitReply(articleId, commentId) {
  const authorInput = document.getElementById(`reply-author-${articleId}-${commentId}`);
  const textInput = document.getElementById(`reply-text-${articleId}-${commentId}`);

  const author = authorInput.value.trim();
  const text = textInput.value.trim();

  if (!author || !text) {
    alert("Please fill in your name and reply.");
    return;
  }

  fetch(`${API_BASE}/articles/${articleId}/comments/${commentId}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author, text })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Reply posted!");
        loadArticles();
      } else {
        throw new Error("Reply failed");
      }
    })
    .catch(err => {
      console.error("Reply error:", err);
      alert("❌ Failed to post reply.");
    });
}
