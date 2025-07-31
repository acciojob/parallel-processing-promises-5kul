const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Function to download all images
function downloadImages(images) {
  // Show loading
  loadingDiv.style.display = 'block';
  errorDiv.textContent = '';
  output.innerHTML = '';

  const downloadPromises = images.map(image => downloadImage(image.url));

  Promise.all(downloadPromises)
    .then(loadedImages => {
      loadingDiv.style.display = 'none';
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      loadingDiv.style.display = 'none';
      errorDiv.textContent = error;
    });
}

// Add event listener to the button
btn.addEventListener('click', () => {
  downloadImages(images);
});
