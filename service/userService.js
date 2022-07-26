const User = require('../models/user.js');

exports.existIdCheck = async (user_id) => {
    // User.sequelize.connectionManager.initPools();

    const idData = await User.findOne({ where : { user_id: user_id }});
    
    // User.sequelize.connectionManager.close();

    return idData;
}

exports.duplicateNameCheck = async (user_name) => {
    // User.sequelize.connectionManager.initPools();

    const nameData = await User.findOne({ where : { user_name: user_name}});

    // User.sequelize.connectionManager.close();

    return nameData;
}

exports.insertUser = async (newUserInfo) => {
    const {
        user_id, hashed_pw, pw_salt, user_name
    } = newUserInfo;

    // User.sequelize.connectionManager.initPools();

    const newUser = await User
        .create({
        user_id: user_id,
        user_pw: hashed_pw,
        pw_salt: pw_salt,
        user_name: user_name
        })
        .then((result) => { // 회원 가입 성공 시
            return result;
        })
        .catch((err) => { // 회원 가입 실패 시
            throw new Error(err);
        });

    // User.sequelize.connectionManager.close();

    return newUser;
}

exports.deleteUser = async (user_id) => {
    // User.sequelize.connectionManager.initPools();

    const deleteUserInfo = await User
        .findOne({
            attributes : [ 'user_id', 'user_name' ],
            where : { user_id : user_id }
        })
        .catch((err) => {
            throw new Error(err);
        });
    
    await User.destroy({
        where : { user_id : user_id }
    });

    // User.sequelize.connectionManager.close();

    return deleteUserInfo;
}