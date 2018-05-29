module.exports = function(sequelize, DataTypes) {
  const Contact = sequelize.define('contacts', {
    contact_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email_address: DataTypes.STRING,
    outgoing_message: DataTypes.STRING,
    // date_to_send: DataTypes.DATE,
  }, {
    timestamps: false,
  });
  return Contact;
};
