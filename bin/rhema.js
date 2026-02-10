#!/usr/bin/env node

import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

import { randomItem } from "../utils/random.js";
import { redText, grayText } from "../utils/colors.js";

/* --------------------------------------------------
   Setup __dirname for ES modules
-------------------------------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* --------------------------------------------------
   Load static JSON data (SAFE paths)
-------------------------------------------------- */
const ntPath = path.join(__dirname, "../data/nt.json");
const redPath = path.join(__dirname, "../data/red.json");
const otPath = path.join(__dirname, "../data/ot.json");

const nt = JSON.parse(fs.readFileSync(ntPath, "utf-8"));
const red = JSON.parse(fs.readFileSync(redPath, "utf-8"));
const ot = JSON.parse(fs.readFileSync(otPath, "utf-8"));

/* --------------------------------------------------
   CLI arguments
-------------------------------------------------- */
const args = process.argv.slice(2);
const arg = args[0];
const arg2 = args[1];
const arg3 = args[2];

console.log("");

/* --------------------------------------------------
   Helpers
-------------------------------------------------- */
function filterByMood(arr, mood) {
    if (!mood) return arr;
    return arr.filter(v => v.tags && v.tags.includes(mood));
}

/* --------------------------------------------------
   Daily verse storage
-------------------------------------------------- */
const dailyFile = path.join(os.homedir(), ".rhema_daily.json");

function getDailyVerse(section, mood) {
    const today = new Date().toISOString().split("T")[0];
    let dailyData = {};

    try {
        if (fs.existsSync(dailyFile)) {
            dailyData = JSON.parse(fs.readFileSync(dailyFile, "utf-8"));
            if (
                dailyData.date === today &&
                dailyData.section === section &&
                dailyData.mood === mood
            ) {
                return dailyData.verse;
            }
        }
    } catch { }

    const verses = filterByMood(section, mood);
    const verse = randomItem(verses.length ? verses : section);

    fs.writeFileSync(
        dailyFile,
        JSON.stringify({ date: today, section, mood, verse }, null, 2),
        "utf-8"
    );

    return verse;
}

/* --------------------------------------------------
   Fetch Bible API (USES GLOBAL fetch)
-------------------------------------------------- */
function formatBookName(book) {
    return book.replace(/\s+/g, "-").toLowerCase();
}

async function fetchChapter(book, chapter, version = "en-kjv") {
    const formattedBook = formatBookName(book);
    const url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${version}/books/${formattedBook}/chapters/${chapter}.json`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${book} ${chapter}`);
    return res.json();
}

async function fetchVerse(book, chapter, verseNumber) {
    const chapterData = await fetchChapter(book, chapter);
    const verseObj = chapterData.verses.find(v => v.verse === Number(verseNumber));
    if (!verseObj) throw new Error("Verse not found");
    return verseObj.text;
}

/* --------------------------------------------------
   Help
-------------------------------------------------- */
function showHelp() {
    console.log(`
RHEMA – Command-line Bible Tool

Usage:
rhema
rhema ot
rhema red
rhema peace
rhema ot comfort
rhema red rest

Daily:
rhema daily
rhema ot daily
rhema red daily

Fetch:
rhema fetch John 3:16
rhema fetch Genesis 1
rhema fetch "1 Corinthians" 13:4

Help:
rhema help
`);
}

/* --------------------------------------------------
   Main
-------------------------------------------------- */
async function main() {

    if (!arg || arg === "help") {
        showHelp();
        return;
    }

    if (arg === "fetch") {
        if (!arg2 || !arg3) {
            console.log("Usage: rhema fetch <Book> <Chapter>[:Verse]");
            return;
        }

        const [chapter, verse] = arg3.split(":");

        try {
            if (verse) {
                const text = await fetchVerse(arg2, chapter, verse);
                console.log(`“${text}”`);
            } else {
                const data = await fetchChapter(arg2, chapter);
                data.verses.forEach(v =>
                    console.log(`${v.verse}. ${v.text}`)
                );
            }
        } catch (err) {
            console.log("Error:", err.message);
        }
        return;
    }

    if (arg === "red") {
        const verse = arg2 === "daily"
            ? getDailyVerse(red)
            : randomItem(filterByMood(red, arg2).length ? filterByMood(red, arg2) : red);

        console.log(redText("Jesus said 🔴\n"));
        console.log(redText(`“${verse.text}”`));
        console.log(grayText(`— ${verse.reference}`));

    } else if (arg === "ot") {
        const verse = arg2 === "daily"
            ? getDailyVerse(ot)
            : randomItem(filterByMood(ot, arg2).length ? filterByMood(ot, arg2) : ot);

        console.log(`“${verse.text}”`);
        console.log(grayText(`— ${verse.book} ${verse.chapter}:${verse.verse}`));

    } else if (arg === "daily") {
        const verse = getDailyVerse(nt);
        console.log(`“${verse.text}”`);
        console.log(grayText(`— ${verse.book} ${verse.chapter}:${verse.verse}`));

    } else {
        const verse = randomItem(filterByMood(nt, arg2).length ? filterByMood(nt, arg2) : nt);
        console.log(`“${verse.text}”`);
        console.log(grayText(`— ${verse.book} ${verse.chapter}:${verse.verse}`));
    }

    console.log("");
}

main();










