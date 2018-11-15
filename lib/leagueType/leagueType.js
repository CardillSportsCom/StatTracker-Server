const LeagueType = require('../../models/leagueType')
const mongoose = require('mongoose');
const Boom = require('boom');

exports.list = (request, h) => {
    return LeagueType.find({'isDisplay': true}).exec().then((leagueTypes)=>{
        return {message: "Got League Types", leagueTypes: leagueTypes};
    }).catch((err)=>{
        throw Boom.badRequest(err);
    });
}