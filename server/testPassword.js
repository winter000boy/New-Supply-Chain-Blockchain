const bcrypt = require('bcrypt');

const testPassword = async () => {
  const plainPassword = 'durgesh'; // Replace with the password you want to test
  const hashedPassword = '$2b$10$p5hvKDbqFu93iPiqbl1FTOaxLePhOzHhvo/4THeE9VIX/ZDmFsese'; // Replace with the hashed password from the database

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('Password match:', isMatch);
};

testPassword();