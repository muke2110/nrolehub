const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/dataBase');
const Event = require('./events.model');
const Subevent = require('./subevents.model');
const PaymentDetails = require('../payments/payment.model')

const StudentRegistration = sequelize.define(
  'StudentRegistration',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_name:{
      type: DataTypes.STRING,
      allowNull: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subevent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    registration_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    student_name:{
      type: DataTypes.STRING,
      allowNull: true
    },
    student_contact:{
      type: DataTypes.STRING,
      allowNull: true
    },
    student_email:{
      type: DataTypes.STRING,
      allowNull: true
    },
    payment_status: {
      type: DataTypes.ENUM('paid', 'pending', 'failed'),
      defaultValue: 'pending',
      allowNull: false,
    },
    razorpay_order_id: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    razorpay_payment_id: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    attendance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'Student_Registrations',
    timestamps: false,
  }
);

Event.hasMany(StudentRegistration, { foreignKey: 'event_id', onDelete: 'CASCADE' });
Subevent.hasMany(StudentRegistration, { foreignKey: 'subevent_id', onDelete: 'CASCADE' });
Event.hasMany(Subevent, { foreignKey: 'event_id', onDelete: 'CASCADE' });

PaymentDetails.belongsTo(StudentRegistration, { foreignKey: 'registration_id' });
StudentRegistration.hasMany(PaymentDetails, { foreignKey: 'registration_id' });


module.exports =  StudentRegistration  ;
