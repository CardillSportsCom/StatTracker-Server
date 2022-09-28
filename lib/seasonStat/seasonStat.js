const BasketballStat = require("../../models/basketballStat");
const Boom = require("boom");
const mongoose = require("mongoose");

exports.get = (request, h) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.leagueId)) {
    return { message: "League not found", league: null };
  }

  return BasketballStat.find({ league: request.params.leagueId })
    .populate("player")
    .populate("game")
    .exec()
    .then((leagueStats) => {
      return {
        seasonStats:
          "This will contain all the league specific stats for a given season",
      };
    })
    .catch((err) => {
      throw Boom.badRequest(err);
    });
};
