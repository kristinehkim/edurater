const { User, Rating } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const {ObjectId} = require('mongoose').Types

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('ratings');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('ratings');
    },
    ratings: async (parent, { username }) => {
      const params = username ? {ratingAuthor: username} : {};
      return Rating.find(params).sort({ createdAt: -1 });
    },
    rating: async (parent, { ratingId }) => {
      return Rating.findOne({ _id: ratingId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('ratings');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addRating: async (parent, { ratingText, ratedEducator, educatorRating}, context) => {
          if (context.user) {
        const rating = await Rating.create({
          ratingText,
          ratedEducator,
          educatorRating,
          ratingAuthor: context.user.username,
        });
        
        await User.findOneAndUpdate(
          { _id: new ObjectId(context.user._id)},
          { $addToSet: { ratings: rating._id } }
        );

        return rating;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addComment: async (parent, { ratingId, commentText, commentRating }, context) => {
      if (context.user) {
        return Rating.findOneAndUpdate(
          { _id: ratingId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username, commentRating },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeRating: async (parent, { ratingId }, context) => {
      if (context.user) {
        const rating = await Rating.findOneAndDelete(
          {_id: ratingId});

        await User.findOneAndUpdate(
          { _id: (context.user._id) },
          { $pull: { ratings: {ratingId: rating._id} } }
        );

        return rating;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { ratingId, commentId }, context) => {
      if (context.user) {
        return Rating.findOneAndUpdate(
          { _id: ratingId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
