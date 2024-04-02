import { date } from "joi";
import { ObjectId } from "mongodb";

const mongoose = require("mongoose");
const VideoHighlights = require("../../models/videoHighlights");
var db = require("../../src/database.js").db;

// read videos.txt file and create a string array of video URLs
function ingestVideoHighlights(): string[] {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(__dirname, "videos.txt");
  const data = fs.readFileSync(filePath, "utf8");
  return data.split("\n");
}

type VideoHighlight = {
  storageKey: string;
  dateCreated: string;
  player: ObjectId;
  summary?: string;
  thumbnail?: string;
  likes: any[];
  shotType?: string;
};

function createVideoHighlights(
  videoStorageKey: string,
  dateString: string,
  dateCreated: string
): VideoHighlight {
  const storageKey = dateString + videoStorageKey;
  const player = new ObjectId(videoStorageKey.split("-")[0]);
  const likes: any[] = [];

  return {
    storageKey,
    dateCreated,
    player,
    likes,
  };
}

// insert an object into the VideoHighlights collection
function insertVideoHighlights(dateString: string, dateCreated: string): void {
  const videoHighlights = ingestVideoHighlights();
  VideoHighlights.insertMany(
    videoHighlights.map((video) =>
      createVideoHighlights(video, dateString, dateCreated)
    )
  ).then(() => {
    console.log("Data inserted");
  });
}

// update these variables each week
const dateString = "20240326/";
const dateCreated = new Date("2024-03-26T20:00:00.000Z").toISOString();
insertVideoHighlights(dateString, dateCreated);
