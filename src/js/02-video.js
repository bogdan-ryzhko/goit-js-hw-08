import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = "videoplayer-current-time";
const iframe = document.querySelector('iframe');

const player = new Player(iframe);

function onPlay() {
	player.getCurrentTime().then(function (seconds) {
		localStorage.setItem(STORAGE_KEY, seconds);
	}).catch(function (error) {
		console.log(error.name);
	});
}

player.on('timeupdate', throttle(onPlay, 1000));

let isStorageKey = localStorage.getItem(STORAGE_KEY);

if (isStorageKey) {
	player.setCurrentTime(isStorageKey).then(function() {
		// seconds = the actual time that the player seeked to
	}).catch(function(error) {
		switch (error.name) {
			case 'RangeError':
					break;
			default:
					break;
		}
	});
}
