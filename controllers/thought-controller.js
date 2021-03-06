const { User, Thought } = require('../models'); 

const thoughtController= {
  getAllThoughts(req, res) {

    Thought.find({})
      .select('-__v')
      .sort({ id: -1 })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400)
      })
  },

  getThoughtById({ params }, res) {

    Thought.findOne({ id: params.id })
      .select('-__v')
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createThought({ params, body }, res) {

    console.log(body)
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'could not find thought' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.json(err));
  },

  updateThought({ params, body }, res) {

    Thought.findOneAndUpdate({ id: params.id }, body, { new: true, runValidators: true })
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'could not find thought' });
        return;
      }
      res.json(thoughtData);
    })
    .catch(err => res.json(err));
  },

  deleteThought({ params }, res) {

    Thought.findOneAndDelete({ id: params.id }) 
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json(err))
  }
};

module.exports = thoughtController;