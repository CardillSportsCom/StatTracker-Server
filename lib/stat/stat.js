const BasketballStat = require('../../models/basketballStat');
const Team = require('../../models/team');
const TeamType = require('../../models/teamType');
const Game = require('../../models/game');
const League = require('../../models/league');
const Player = require('../../models/player');

const mongoose = require('mongoose');

exports.create = (request, h) => {

    return League.findById(request.payload.leagueId).exec().then((league)=>{
        return TeamType.findById(request.payload.teamTypeId).exec().then((teamType)=>{
            const TeamA = new Team({
                name: request.payload.teamA.name,
                league: league,
                dateCreated: Date.now()
            })
            const TeamB = new Team({
                name: request.payload.teamB.name,
                league: league,
                dateCreated: Date.now()
            })
        }).catch((err)=>{
            return {err : err};
        });
    }).catch((err)=>{
        return {err : err};
    });

   
}