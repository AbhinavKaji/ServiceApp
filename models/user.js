const sequelize = require("../db/sequelize");
const Sequelize = require("sequelize");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const Role = require("./role");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    field: "email"
  },
  password: {
    type: Sequelize.STRING,
    field: "password"
  },
  roleId: {
    type: Sequelize.INTEGER,
    field: "role_id"
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.Now,
    field: "created_at"
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "updated_at"
  },tokens: [{
    token: {
        type: Sequelize.STRING,
        field:"tokens"
    }
}],
});
User.beforeCreate(async function(user, options) {
    return await bcrypt.hash(user.password, 8).then(function (hashedPw) {
      user.password = hashedPw;
    });
});
User.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
User.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ id: user.id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
// const user = await User.findByCredentials(req.body.email, req.body.password)
// User.belongsTo(Role, { as: "role", foreignKey: "roleId" });

module.exports = User;
