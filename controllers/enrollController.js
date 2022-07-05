const User = require('../models/user');
const crypto = require('crypto');

const enrollService = require('../service/enrollService.js');
const util = require('../routes/makeReply.js');

exports.enroll = async (req, res, next) => {
    const {
        user_id, user_pw, user_name
    } = req.body;

    var reply = {};

    if(!user_id || !user_pw || !user_name)
        return res.json(util.makeReply(reply, false, 400, '입력하지 않은 항목이 존재합니다.'));
    if(user_id.length > 15)
        return res.json(util.makeReply(reply, false, 305, '아이디는 최대 15자까지 가능합니다.'));
    if(user_pw.length < 6 || user_pw.length > 15)
        return res.json(util.makeReply(reply, false, 306, '비밀번호는 6~15자로 입력해야 합니다.'));
    if(user_name.length > 10)
        return res.json(util.makeReply(reply, false, 307, '닉네임은 최대 10자까지 가능합니다.'));

    try {
        const idCheck = await enrollService.idOverlapCheck(user_id);
        if(idCheck) {
            return res.json(util.makeReply(reply, false, 301, '이미 사용 중인 아이디입니다.')); 
        }
        const hashed_pw = crypto.createHash('sha512').update(user_pw).digest('base64');
        const newUserInfo = [user_id, hashed_pw, user_name];
        const enrollUser = await enrollService.insertUser(newUserInfo);

        return res.json(util.makeReply(reply, true, 200, '회원가입이 성공하였습니다.'));
    } catch (err) {
        return res.status(500).send('Server error respose');
    }
}