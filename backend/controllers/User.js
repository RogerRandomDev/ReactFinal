const { connectDB, process } = require('../db/connect');
require('dotenv').config();
//returns the user database content
const getUser = async (userName) => {
    var output = [null];
    try {
      await connectDB(process.env.MONGO_URI);
      await (output = await UserModel.find({ Name: userName }));
      console.log(output);
    } catch (err) {
      console.log(err);
    }
    return output[0];
  };
  //creates a user and adds it to the database
  const createUser = async (userData) => {
    if ((await getUser(userData.Name)) == null) {
      return { success: false, msg: 'User already exists with name' };
    }
    try {
      await connectDB(process.env.MONGO_URI);
      UserModel.create([userData]);
    } catch (err) {
      console.log(err);
    }
    return { success: true, msg: 'User Created successfully' };
  };
  
  module.exports = { getUser, createUser };