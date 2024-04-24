const Player = require("../../models/player");
const League = require("../../models/league");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Boom = require("@hapi/boom");

exports.create = (request, h) => {
	const playerObj = new Player({
		firstName: request.payload.firstName,
		lastName: request.payload.lastName,
		email: request.payload.email,
		password: request.payload.password,
		dateCreated: Date.now(),
	});
	return bcrypt.hash(request.payload.password, 10).then(function (hash) {
		playerObj.password = hash;
		return Player.create(playerObj)
			.then((newPlayer) => {
				return { message: "Player created successfully", newPlayer: newPlayer };
			})
			.catch((err) => {
				throw Boom.badRequest(err);
			});
	});
};

exports.get = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
		return { message: "Player not found", player: null };
	}
	return Player.findById(request.params.id)
		.exec()
		.then((playerObj) => {
			return { message: "Got Player", player: playerObj };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.getbyemail = (request, h) => {
	if (request.params.email == "") {
		return { message: "Player not found", player: null };
	}
	return Player.findOne({ email: request.params.email.toLowerCase() })
		.exec()
		.then((playerObj) => {
			return { message: "Got Player", player: playerObj };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.list = (request, h) => {
	return Player.find()
		.exec()
		.then((players) => {
			return { message: "Got Players", players: players };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.update = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
		return { message: "Player not found", player: null };
	}
	return Player.findById(request.params.id)
		.exec()
		.then((playerObj) => {
			playerObj.firstName = request.payload.firstName;
			playerObj.lastName = request.payload.lastName;
			playerObj.email = request.payload.email;
			playerObj.imageUri = request.payload.imageUri;
			playerObj.save();
			return { message: "Updated Player" };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};

exports.delete = (request, h) => {
	if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
		return { message: "Player not found", league: null };
	}
	return Player.findById(request.params.id)
		.deleteOne()
		.exec()
		.then((data) => {
			return { message: "Deleted Player" };
		})
		.catch((err) => {
			throw Boom.badRequest(err);
		});
};
