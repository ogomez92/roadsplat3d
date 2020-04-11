export const debug = false
import { strings } from './strings'
import { so } from './soundObject'
export let _
export let content = {
	numberOfVehicles: 7,
	bonusTypes: 3,
}
export var gameID = "road";
export let parsedCars = []
parsedCars.push({})
import { speech } from './tts'
import { LanguageSelector } from './languageSelector'
import { Game } from './game';
export var version = "1.0";
export let data = {
	coins: 0,
	jumps: 0,
	unlocks: {
		hyperjump: false,
	},
}
export var version2 = "";

export var lang = 0;
export var ttsVoice;
export var ttsRate = 1;
import $ from 'jquery';
import { Menu } from './menu';
import { MenuItem, MenuTypes } from './menuItem'
document.addEventListener('DOMContentLoaded', setup);
async function setup() {
	document.getElementById("app").focus();
	if (localStorage.getItem("string_data") != null) {
		data = JSON.parse(localStorage.getItem("string_data"))
	}
	try {
		const fs = require('fs')
		let file = fs.readFileSync("./cars.txt", "utf8")
		console.log(file)
		let lines = file.split("\n")
		console.log(lines[0])
		lines.forEach(element => {
			let elements = element.split(",")
			let name = elements[0]
			let speed = Number(elements[1])
			let horning = elements[2]
			let hornable = ""
			if (horning == 1) {
				hornable = name
			}
			else if (horning == 0) {
				hornable = ""
			} else {
				hornable = horning;
			}
			let z = Number(elements[3])
			parsedCars.push({ sound: "vehicles/" + name, speed: speed, hornable: hornable, name: name, z: z })
		});
		content.numberOfVehicles = parsedCars.length - 1
	} catch (e) {
		console.log("Error parsing cars file: " + e)
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
	let langs = new LanguageSelector("langSelect", async (result) => {
		lang = result;
		speech.setLanguage(lang);
		_ = strings.get
		let music = so.create("music/menu")
		music.volume = 0.6
		music.loop=true;
		music.play()
		speech.ducker=music
		let items = []
		items.push(new MenuItem(0, strings.get("mStart")))
		items.push(new MenuItem(1, strings.get("mShop", [data.coins])))
		let menu = new Menu(strings.get("mainMenu"), items)
		let selection = await menu.runSync()
		await music.fade(0)
		switch (selection) {
			case 0:
				let game = new Game()
				game.start()
				break;
			default: break;
		}
	});
}
export function save() {
	localStorage.setItem("string_data", JSON.stringify(data))
}