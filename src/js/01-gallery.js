// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryRef = document.querySelector('.gallery');

const getMurkupImages = list => {
	return list.reduce((nodes, { preview, original, description }) =>
		nodes += `<a class="gallery__item" href="${original}">
		<img class="gallery__image"
		src="${preview}"
		alt="${description}"
		title="${description}">
		</a>`, '');
};

galleryRef.insertAdjacentHTML('beforeend', getMurkupImages(galleryItems));

const options = {
	captionDelay: 250,
}

let lightbox = new SimpleLightbox('.gallery .gallery__item', options);

const imageHandler = (event) => {
	event.preventDefault();
	const targetIMG = event.target;

	if (targetIMG.nodeName !== 'IMG') {
		return;
	}

	lightbox;
}

galleryRef.addEventListener('click', imageHandler);
