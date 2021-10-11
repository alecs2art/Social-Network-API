const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },

    username: {
        type: String,
        required: true
    },

    reactions: [ReactionSchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    }
},
)

ThoughtSchema.virtual('reactionCount').get(function () {

    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
