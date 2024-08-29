const crypto = require('crypto');

// Khóa và IV (Vector khởi tạo) cần phải được bảo mật
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16);  // 128-bit IV

// Mã hóa
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Giải mã
function decrypt(encrypted) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const text = 'Hello, world!';
const encrypted = encrypt(text);
const decrypted = decrypt(encrypted);

console.log('Encrypted:', encrypted);
console.log('Decrypted:', decrypted);