module.exports = function(sequelize, DataTypes) {
  const Contact = sequelize.define('contacts', {
    contact_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,

  });
  return Contact;
};
