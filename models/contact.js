module.exports = function(sequelize, DataTypes) {
  const Contact = sequelize.define('contacts', {
    contact_name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    // email_address: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    outgoing_message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // scheduled_date: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
    // scheduled_time: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
    // date_to_send: DataTypes.DATE,
  }, {
    timestamps: false,
  });
  return Contact;
};
