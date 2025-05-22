import { Sequelize } from 'sequelize';
// db.js
// const { Sequelize } = require('sequelize');

// Tạo instance Sequelize
const sequelize = new Sequelize('PH', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Tắt log nếu không cần
});

// Kiểm tra kết nối
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Kết nối MySQL thành công!');
    } catch (error) {
        console.error('❌ Kết nối MySQL thất bại:', error);
    }
};

export default connectDB;
