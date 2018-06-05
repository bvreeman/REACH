module.exports = function(sequelize, DataTypes) {
  const Contact = sequelize.define('contacts', {
    contact_name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      defaultValue: '',
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    outgoing_message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scheduled_send: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // scheduled_date: {
    //   // YYYY-MM-DD HH:MM:SS
    //   type: DataTypes.DATEONLY,
    //   allowNull: false,
    // },
    // scheduled_time: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  }, {
    timestamps: false,
  });
  return Contact;
};
