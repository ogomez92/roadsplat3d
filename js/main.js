export const debug = false
import { strings } from './strings'
export let _
export let content = {
	numberOfVehicles: 7,
	bonusTypes: 2,
}
export var gameID = "road";
import { speech } from './tts'
import { LanguageSelector } from './languageSelector'
import { Game } from './game';
export var version = "1.0";
export let data = {
	coins: 0,
	jumps: 0,
}
export var version2 = "";

export var lang = 0;
export var ttsVoice;
export var ttsRate = 1;
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', setup);
async function setup() {
	document.getElementById("app").focus();
	if (localStorage.getItem("string_data") != null) {
		data = JSON.parse(localStorage.getItem("string_data"))
	}
	//the below is an example of a new version notifier. The version2 variable can be used and compared inside a menu or wherever, and would contain the new version of your game based on what your server returns.
	let prom = new Promise((resolve, reject) => {
		fetch('http://yourserver.com/versions.php?gameVersionRequest=' + gameID)
			.then(event => event.text()) //convert http response into text
			.then(data => {
				version2 = data;
				resolve(data); //resolve promise let go.
			});
	});
	let langs = new LanguageSelector("langSelect", (result) => {
		lang = result;
		speech.setLanguage(lang);
		_ = strings.get
		const game = new Game();
		game.start();
		console.log("Success!");
	});
}
export function save() {
	localStorage.setItem("string_data", JSON.stringify(data))
}