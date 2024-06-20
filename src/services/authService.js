const userModel = require('../models/user');

const authService = {
    register: async (name, email, password) => {
        let user = await userModel.findOne({email});
        if(user) {
            return false;
        }

        user = new userModel({name, email, password});
        await userModel.save();
        return true;
    },

    login: async (email, password) => {
        const user = await userModel.findOne({email});

        if(!user) {
            return false;
        }
        const isMatch = await user.matchPassword(password);
        if(isMatch) {
            return false;
        }

        return true;
    }
}

module.exports = authService;