import bcrypt from 'bcrypt';
const saltRounds = 10;

const tools = {
    /**
     * 
     * @param {*} myPlaintextPassword 要加密的参数
     * @returns bcrypt 返回加密的字符
     */
    _BCRYPT_ (myPlaintextPassword){
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);
        return hash;
    }
}

module.exports = tools