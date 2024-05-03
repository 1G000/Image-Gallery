const accessKey = "4vzfAKqtJ1SkSCt9mYi6IkcaTfRXvJ4f9uizBrMR4WI";
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const galeryContainer = document.querySelector(".galery-container");
const searchIco = document.querySelector(".search-ico");
const closeIco = document.querySelector(".close-ico");
function loadImages() {
  input.value = "lime";
  fetchPhotos();
  input.value = "";
}
document.addEventListener("DOMContentLoaded", loadImages);

async function fetchPhotos() {
  const url = `https://api.unsplash.com/search/photos?&query=${input.value}&per_page=21&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  console.log(results);
  results.map((res) => {
    const imageContainer = document.createElement("picture");
    imageContainer.classList.add("image-container");
    const image = document.createElement("img");
    image.classList.add("image");
    image.src = res.urls.small;
    const bigImg = document.createElement("a");
    bigImg.setAttribute("href", `${res.urls.full}`);
    bigImg.setAttribute("target", "_blank");
    bigImg.appendChild(image);
    imageContainer.appendChild(bigImg);
    galeryContainer.appendChild(imageContainer);
  });
}

function deleteImages() {
  galeryContainer.innerHTML = "";
}

searchIco.addEventListener("click", fetchPhotos());

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    deleteImages();
  }
  fetchPhotos();
});

closeIco.addEventListener("click", () => {
  input.value = "";
});
