var CreatePlayer = require("./create-player");
var GetPlayer = require("./get-player");
var GetByEmailPlayer = require("./get-player-by-email");
var UpdatePlayer = require("./update-player");
var DeletePlayer = require("./delete-player");
var ListPlayers = require("./list-player");

module.exports = [].concat(CreatePlayer, GetPlayer, UpdatePlayer, DeletePlayer, ListPlayers, GetByEmailPlayer);
