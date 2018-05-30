module.exports = function(sequelize, DataTypes) {
  const Contact = sequelize.define('contacts', {
    contact_name: {
      type: DataTypes.STRING,
      unique: false,
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
    // scheduled_date: {
    //   // "2016-01-01 00:00:00+00:00"
    //   type: DataTypes.DATEONLY,
    //   allowNull: false,
    //   timestamps: false,
    // },
    // scheduled_time: {
    //   // "2016-01-01 00:00:00+00:00"
    //   type: DataTypes.TIME,
    //   allowNull: false,
    //   timestamps: false,
    // },
  }, {
    timestamps: false,
  });
  return Contact;
};
