import throttle from "lodash.throttle";

// const email = 'ffhn@mail.com';
const STORAGE_KEY = "feedback-form-state";
const userData = {}

const refs = {
	form: document.querySelector('.feedback-form'),
	emailRef: document.querySelector('[name="email"]'),
	msgRef: document.querySelector('[name="message"]'),
}

populateForm();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(evt) {
	evt.preventDefault();

	if (refs.emailRef.value === '' || refs.msgRef.value === '') {
		alert('Все поля должны быть заполнены');
		return;
	}

	let isStorageKey = localStorage.getItem(STORAGE_KEY);

	if (isStorageKey) {
		console.log(JSON.parse(isStorageKey));
	}

	localStorage.removeItem(STORAGE_KEY);
	evt.target.reset();
}

function onFormInput(evt) {
	const target = evt.target;
	const targetName = target.getAttribute('name');

	userData[targetName] = target.value;

	localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function populateForm() {
	let isStorageKey = localStorage.getItem(STORAGE_KEY);

	if (isStorageKey) {
		const storageKeyObj = JSON.parse(isStorageKey);

		for (let key in storageKeyObj) {
			switch (key) {
				case 'email':
					refs.emailRef.value = storageKeyObj[key];
					break;
				case 'message':
					refs.msgRef.value = storageKeyObj[key];
					break;
			}
		}
	}
}