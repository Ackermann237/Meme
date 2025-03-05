const imageUpload = document.getElementById("image-upload");
const canvas = document.getElementById("meme-canvas");
const ctx = canvas.getContext("2d");
const gallery = document.getElementById("gallery");

imageUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    };
    reader.readAsDataURL(file);
});

function addText() {
    const text = document.getElementById("meme-text").value;
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillText(text, 10, 50);
    ctx.strokeText(text, 10, 50);
}

function downloadMeme() {
    let link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "meme.png";
    link.click();
    saveToGallery();
}

function saveToGallery() {
    const memeImage = new Image();
    memeImage.src = canvas.toDataURL();
    memeImage.width = 200; // Ajustez la taille de l'image dans la galerie
    memeImage.height = 200;

    const memeContainer = document.createElement("div");
    memeContainer.className = "meme-item";
    memeContainer.appendChild(memeImage);

    gallery.appendChild(memeContainer);
}

function shareOnFacebook() {
    let url = canvas.toDataURL();
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "_blank");
}

function shareOnTwitter() {
    let url = canvas.toDataURL();
    let text = "Regarde mon meme !";
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url), "_blank");
}

function shareOnWhatsApp() {
    let url = canvas.toDataURL();
    let message = "Regarde ce meme : " + url;
    window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(message), "_blank");
}

function shareOnTelegram() {
    let url = canvas.toDataURL();
    window.open("https://t.me/share/url?url=" + encodeURIComponent(url), "_blank");
}