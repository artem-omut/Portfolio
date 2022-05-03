"use strict";

function scrollToSection(href) {
	document.querySelector(href).scrollIntoView({
		behavior: "smooth"
	});
}

document.querySelectorAll('.nav__link').forEach(function (link) {
	link.addEventListener("click", function () {
		let href = this.getAttribute("href");
		scrollToSection(href);
		document.querySelector('#toggle').checked = false;
		document.querySelector('.active').classList.remove('active');
		this.classList.add('active');
	});
});


const SUBMIT_BTN = document.querySelector('.contact .contact__container .btn');

SUBMIT_BTN.addEventListener("click", submitForm);

function submitForm(e) {
	e.preventDefault();
	let findForm = document.querySelector('form.contact__container ');
	let errorCount = formValidate(findForm);
	sendRequest(errorCount, findForm);
	// console.log(errorCount);
}

function formValidate(form) {
	let resultVar = 0;
	form.querySelectorAll('.form__items').forEach(function (items) {
		if (items.value === "") {
			resultVar = resultVar + 1;
			items.classList.add('error');
		} else {
			items.classList.remove('error');
		}
	});
	return resultVar;
}



function sendRequest(requestParametrError, requestParametrForm) {

	if (requestParametrError === 0) {
		let name = requestParametrForm.querySelector('.name.form__items');
		let surname = requestParametrForm.querySelector('.surname.form__items');
		let message = requestParametrForm.querySelector('.message.form__items');
		let useSrting = generateTelegramMessage(name.value, surname.value, message.value);
		let token = "5091711311:AAGGY2GiD_xkUaLprsppTC-8Y1q1uEJRhHc";
		let chat_id = -602547907
		let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${useSrting}&parse_mode=html`;

		let api = new XMLHttpRequest();
		api.open("GET", url, true);
		api.send();

		console.log("Message successfully sended!")
	} else {
		alert('Empty field');
	}
}

function generateTelegramMessage(firstp, secondp, thirdp) {
	let generateString = `Message is:%0A - <b>Name:</b> <i>${firstp}</i> %0A - <b>Surname:</b> <i>${secondp}</i> %0A - <b>Message:</b> <i>${thirdp}</i> `;
	return generateString;
}







// [0, 1, '^^', 1, 0, null, 'ads'].filter(item => item === '^^').length

// let arr = [0, 1, '^^', 1, 0, null, 'ads'];

// let result =arr.filter(function (item, index, array) {
// 	return item === '^^';
// });
// console.log(result.length);

// let arr = [' Matt', 'Ann', 'Dmitry', 'Max'];

// let result = arr.map(function (item, index, array) {
// 	return item.trim()[0];
// });

// let team = result.sort();

// let srt = team.join('')

// console.log(srt);