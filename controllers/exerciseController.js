const User = require("../models/User");

module.exports = {
  postUser: async (req, res) => {
    try {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        return res.json({
          username: existingUser.username,
          _id: existingUser._id,
        });
      }
      const user = await User.create({ username: req.body.username });
      console.log("User has been created");
      return res.json({
        username: user.username,
        _id: user._id,
      });
    } catch (err) {
      console.error(err);
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find().select("username _id");
      return res.json(users);
    } catch (error) {
      console.log("Error:", error);
    }
  },
  postExercise: async (req, res) => {
    try {
      const exercise = {
        description: req.body.description,
        duration: Number(req.body.duration),
        date: req.body.date
          ? new Date(req.body.date).toDateString()
          : undefined,
      };
      const user = await User.findById(req.params._id);
      user.log.push(exercise);
      await user.save();
      console.log("Exercise has been saved");
      const savedExercise = user.log[user.log.length - 1];

      return res.json({
        _id: req.params._id,
        username: user.username,
        description: savedExercise.description,
        duration: savedExercise.duration,
        date: savedExercise.date,
      });
    } catch (err) {
      console.error(err);
    }
  },
  getLog: async (req, res) => {
    try {
      const { from, to, limit } = req.query;
      const user = await User.findById(req.params._id);
      let logs = [...user.log];

      // Apply "from" and "to" filters
      if (from) {
        const fromDate = new Date(from);
        logs = logs.filter((entry) => new Date(entry.date) >= fromDate);
      }

      if (to) {
        const toDate = new Date(to);
        logs = logs.filter((entry) => new Date(entry.date) <= toDate);
      }

      // Apply "limit" if given
      if (limit) {
        logs = logs.slice(0, Number(limit));
      }

      return res.json({
        _id: user._id,
        username: user.username,
        log: logs,
        count: logs.length,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
