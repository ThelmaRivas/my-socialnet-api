// Import Thought and User models
const Thought = require("../models/Thought");
const User = require("../models/User");

// Get all thoughts
const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughtData = await Thought.find({}).select("-__v");
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
    }
  },

// Get thought by ID
  getThoughtById: async (req, res) => {
    try {
      const thoughtData = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
    }
  },

  // Create thought
  createThought: async (req, res) => {
    try {
      const thoughtData = await Thought.create(req.body);
      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughtData._id } },
        { new: true }
      );

      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
      console.error(err);
    }
  },

  // Update thought
  updateThought: async (req, res) => {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true, runValidators: true }
      );
      if (!thoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
      console.error(err);
    }
  },

  // Delete thought
  deleteThought: async (req, res) => {
    try {
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      const userData = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res.json({ message: "Thought and associated user data deleted!" });
    } catch (err) {
      res.status(400).json(err);
      console.error(err);
    }
  },

  // Add reaction to thought 
  addReaction: async (req, res) => {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
      console.error(err);
    }
  },

  // Remove reaction from thought 
  removeReaction: async (req, res) => {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      ).select("-__v");
      if (!thoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      if (!thoughtData.reactions) {
        res.status(404).json({ message: "No reaction found with this id!" });
      }
      res.json(thoughtData);
    } catch (err) {
      res.status(400).json(err);
      console.error(err);
    }
  },
};

module.exports = thoughtController;
