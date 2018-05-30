module.exports = function(sequelize, DataTypes) {
  const Contact = sequelize.define('contacts', {
    contact_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    outgoing_message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scheduled_date: {
      // YYYY-MM-DD HH:MM:SS
      type: DataTypes.DATE,
      allowNull: false,
    },
    scheduled_time: {
      // YYYY-MM-DD HH:MM:SS
      type: DataTypes.DATE,
      allowNull: false,
    },
    // date_to_send: DataTypes.DATE,
  }, {
    timestamps: false,
  });
  return Contact;
};
