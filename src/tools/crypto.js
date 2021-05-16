const crypto = require('crypto');

// 加密秘钥
const keyConf = {
    key: 'ESS-2019$05#sb%_', // 登录加密密钥 --- 对应后端解密密钥
    key2: 'EDge^@2021$04#n0', // 验证码解密密钥 --- 对应后端验证码加密密钥
    iv: '1012132405963708' // 偏移向量
};

export default {
    /**
     * AES_128_CBC 加密
     * keyName: 密钥的key
     * 128位
     * return base64
     */
    encryption: (data, keyName = 'key') => {
        if (!data) {
            return '';
        }
        let key = keyConf[keyName];
        let iv = keyConf.iv;

        var cipherChunks = [];
        var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        cipher.setAutoPadding(true);
        cipherChunks.push(cipher.update(data, 'utf8', 'base64'));
        cipherChunks.push(cipher.final('base64'));
        return cipherChunks.join('');
        // return cipherChunks.join('').replace(new RegExp('=','g'),'')
    },

    /**
     * 解密
     * return utf8
     */
    decryption: (data, keyName = 'key') => {
        // let add = data.length%3;
        // for(let i = 0 ;i<add ;i++){
        //     data+='='
        // }
        let key = keyConf[keyName];
        let iv = keyConf.iv;
        var cipherChunks = [];
        var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        decipher.setAutoPadding(true);
        try {
            cipherChunks.push(decipher.update(data, 'base64', 'utf8'));
            cipherChunks.push(decipher.final('utf8'));
            return {
                code: 200,
                data: cipherChunks.join('')
            };
        } catch (error) {
            return {
                code: 400,
                data: '密文错误，解密失败'
            };
        }
    }
};

// 使用方式见： views/demos/login.vue
