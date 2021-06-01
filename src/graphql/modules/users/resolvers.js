const User = require('../../../models/User');
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        userById: async (_, { id }) => {
            const user = await User.findById(id);

            if (user) {
                return user;
            }
            else {
                throw new Error('User not fund!');
            }
        }
    },
    Mutation: {
        createUser: async (_, { data }) => {
            const existingUser = await User.findOne({ email: data.email });

            if (existingUser) {
                throw new Error('User exists already!');
            }

            const newUser = new User({
                email: data.email,
                name: data.name,
                password: bcrypt.hashSync(data.password, 12),
                registerDate: new Date().toISOString()
            });

            return await newUser.save()
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new Error("User not created!", err);
                });
        },
        deleteUser: async (_, { id }) => {
            const user = await User.findById(id);

            if (user) {
                return await user.deleteOne()
                    .then(() => {
                        return 'User deleted';
                    })
                    .catch(err => {
                        throw new Error("Error delete user!", err);
                    });
            }
            else {
                throw new Error('User not fund!');
            }
        },
        updateUser: async(_, { id, data }) => {
            const user = await User.findById(id);

            if (user) {
                return await User.findByIdAndUpdate(id, data, { new: true })
                    .then(res => {
                        return res;
                    })
                    .catch(err => {
                        throw new Error("Error update user!", err);
                    });
            }
            else {
                throw new Error('User not fund!');
            }
        }
    }
}

module.exports = resolvers;