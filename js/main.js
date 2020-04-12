export const debug = false
import {ScrollingText} from './scrollingText'
import {utils} from './utilities'
import {SoundHandler} from './soundHandler'
import { strings } from './strings'
import { so } from './soundObject'
export let _
export let content = {
	numberOfVehicles: 7,
	bonusTypes: 3,
	shopItems:{
	hyperjump: 500,
	bombs: 250,
	galleryMembership: 75,
shortfuse: 450,
	
	}
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
import { AudioItem, MenuItem, MenuTypes } from './menuItem'
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
			let blowup=0
			let blow="generic";

			if (typeof elements[4]!=="undefined") {
				blowup=Number(elements[4])
				console.log(blowup)
			switch(blowup) {
				case 0: blow="generic"; break;
				case 1: blow=name; break;
				default: blow="generic"; break;
			}
			if (typeof data.bulletGallery==="undefined") {
				data.bulletGallery={}
			}
			if (typeof data.bulletGallery[blow]==="undefined") {
				data.bulletGallery[blow]=false
			}
			}
			parsedCars.push({ sound: "vehicles/" + name, speed: speed, hornable: hornable, name: name, z: z, blowup: blow})
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
		speech.setRate(3)
		//await strings.check(2)
		mainMenu();
})
}
export async function mainMenu() {
	let music = so.create("music/menu")
	music.volume = 0.6
	music.loop=true;
	music.play()
	speech.ducker=music
	let items = []
	items.push(new MenuItem(0, strings.get("mStart")))
	items.push(new MenuItem(1, strings.get("mShop", [data.coins])))
	items.push(new MenuItem(2, strings.get("mBullet")))	
	let menu = new Menu(strings.get("mainMenu"), items)
	let selection = await menu.runSync()
	await music.fade(0)
	switch (selection) {
		case 0:
			let game = new Game()
			game.start()
			break;
			case 1: await shop(); break;
			case 2:
			await browseGallery()
			break;
		default: break;
	}
}

export function save() {
	localStorage.setItem("string_data", JSON.stringify(data))
}
async function browseGallery() {
	if (!getUnlock("galleryMembership")) {
		let sound=so.create("gallery_locked")
await sound.playSync()
await new ScrollingText(strings.get("galleryLocked"))
mainMenu();
return;
	}
	let locked=0,unlocked=0;
	let pool=new SoundHandler()
	let items=[]
	items.push(new MenuItem(-1,strings.get("mBack")))
let arr=Object.entries(data.bulletGallery)
arr.forEach((v)=> {
	if (v[1]==false) {
		items.push(new AudioItem(-1, "blowup/locked"))
		locked++;
	}
	if (v[1]==true) {
items.push(new AudioItem(-1,"blowup/"+v[0]))
		unlocked++;
	}
	})
	
	speech.speak(strings.get("bulletIntro",[unlocked,(locked+unlocked)]))
	let menu=new Menu(" ",items)
	menu.silent=true
	menu.run((s)=> {
			menu.destroy();
			mainMenu()
			return;
	})
}
export function getUnlock(v) {
	if (typeof data.unlocks==="undefined") data.unlocks={}
	if (typeof data.unlocks[v]==="undefined") data.unlocks[v]=false;
	return data.unlocks[v]
}
export function setUnlock(v, value=true) {
	console.log(v)
	if (typeof data.unlocks==="undefined") data.unlocks={}
	if (typeof data.unlocks[v]==="undefined") data.unlocks[v]=false;
	data.unlocks[v] = value
	save()
	return value;

}
export function setData(v, value) {
	if (typeof data[v]==="undefined") data[v]=value
		data[v] = value
		save()
	return value;
	
}
export function getData(v) {
	if (typeof data[v]==="undefined") data[v]=0
return data[v] 
}
async function shop() {
	let shopAmbience=so.create("shop_ambience")
	shopAmbience.volume=0.6
	shopAmbience.loop=true
	shopAmbience.play()
	let menu;
	let result;
	let buy=so.create("purchase_item")
	let nobuy=so.create("no_cash")
	data.coins=100000
	speech.speak(strings.get("mShopIntro"))
	while (result!=0) {
		await utils.sleep(5)
		let items=[]
		items.push(new MenuItem(0,strings.get("mShopBack",[data.coins])))
		for (var k in content.shopItems) {
			if (!getUnlock(k)) {
				items.push(new MenuItem(k,strings.get("shop"+k)+": "+content.shopItems[k]+" "+strings.get("coins")))
		}
		}
menu=new Menu(" ",items)
menu.silent=true
		result=await menu.runSync()
		if (result!=0) {
		if (data.coins>=content.shopItems[result]) {
			data.coins-=content.shopItems[result]
			setUnlock(result)
			buy.replay();
		} else {
			nobuy.replay();
		}
}
	}

menu.destroy()
shopAmbience.destroy()
await mainMenu()
return;
}