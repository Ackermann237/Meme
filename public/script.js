const imageUpload = document.getElementById("image-upload");
const canvas = document.getElementById("meme-canvas");
const ctx = canvas.getContext("2d");

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
}
async function uploadToImgur(imageData) {
    let clientId = "TON_CLIENT_ID"; // Remplace par ton Client ID Imgur
    let formData = new FormData();
    formData.append("image", imageData.split(",")[1]); // Enlever "data:image/png;base64,"

    let response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
            Authorization: "Client-ID " + clientId,
        },
        body: formData
    });

    let data = await response.json();
    return data.data.link; // URL de l’image sur Imgur
}

async function shareOnFacebook() {
    let imageUrl = await uploadToImgur(canvas.toDataURL());
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(imageUrl), "_blank");
}

async function shareOnTwitter() {
    let imageUrl = await uploadToImgur(canvas.toDataURL());
    let text = "Regarde mon meme !";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(imageUrl)}`, "_blank");
}

async function shareOnWhatsApp() {
    let imageUrl = await uploadToImgur(canvas.toDataURL());
    let message = "Regarde ce meme : " + imageUrl;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, "_blank");
}

async function shareOnTelegram() {
    let imageUrl = await uploadToImgur(canvas.toDataURL());
    window.open(`https://t.me/share/url?url=${encodeURIComponent(imageUrl)}`, "_blank");
}
