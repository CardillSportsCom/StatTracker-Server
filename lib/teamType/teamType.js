const TeamType = require('../../models/teamType')
const mongoose = require('mongoose');
const Boom = require('boom');

exports.list = (request, h) => {
    return TeamType.find().exec().then((teamTypes)=>{
        return {message: "Got Team Types", teamTypess: teamTypes};
    }).catch((err)=>{
        throw Boom.badRequest(err);
    });
}