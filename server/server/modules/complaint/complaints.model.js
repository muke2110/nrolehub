const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/dataBase')

const Complaint = sequelize.define('Complaint', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subevent_id: {
        type: DataTypes.INTEGER
    },
    complaint_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'resolved'),
        defaultValue: 'pending'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    resolved_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'Complaints',
    timestamps: false
});

module.exports = Complaint;
