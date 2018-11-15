const TeamType = require('../../models/teamType')
const mongoose = require('mongoose');
const Boom = require('boom');

exports.list = (request, h) => {
    return TeamType.find({'isDisplay': true}).exec().then((teamTypes)=>{
        return {message: "Got Team Types", teamTypes: teamTypes};
    }).catch((err)=>{
        throw Boom.badRequest(err);
    });
}