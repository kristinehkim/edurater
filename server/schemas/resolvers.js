const { User, Rate } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('rates');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('rates');
    },
    rates: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Rate.find(params).sort({ createdAt: -1 });
    },
    rate: async (parent, { rateId }) => {
      return Rate.findOne({ _id: rateId });
    },
    me: async (parent, args, context) => {
      console.log(args)
      console.log('context.user:', context.user)
      if (context.user) {
        const user = User.findOne({ _id: context.user._id }).populate({path: 'rates', select: '-__v'});
        console.log(user)
        return user;
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
    addRate: async (parent, { rateText }, context) => {
      if (context.user) {
        const rate = await Rate.create({
          rateText,
          rateAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { rates: rate._id } }
        );

        return rate;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addComment: async (parent, { rateId, commentText }, context) => {
      if (context.user) {
        return Rate.findOneAndUpdate(
          { _id: rateId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
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
    removeRate: async (parent, { rateId }, context) => {
      if (context.user) {
        const rate = await Rate.findOneAndDelete({
          _id: rateId,
          rateAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { rates: rate._id } }
        );

        return rate;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { rateId, commentId }, context) => {
      if (context.user) {
        return Rate.findOneAndUpdate(
          { _id: rateId },
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
