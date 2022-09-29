const Joi = require("joi");
const SeasonStatController = require("./seasonStat");

module.exports = [
  {
    method: "GET",
    path: "/stat/league/{leagueId}/{seasonId}",
    options: {
      handler: SeasonStatController.get,
      description: "Get total stats for league for a given season",
      notes: "Returns total stats per player in league for a given season",
      tags: ["api", "seasonStats"],
      auth: {
        strategy: "jwt",
        scope: ["player", "admin"],
      },
      validate: {
        params: Joi.object({
          leagueId: Joi.string().required().description("the league ID"),
          seasonId: Joi.string().required().description("the season ID"),
        }),
      },
    },
  },
];
