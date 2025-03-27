const bcrypt = require('bcrypt');

/**
 * Test if a plain password matches a hashed password.
 * @param {string} plainPassword - The plain password to test.
 * @param {string} hashedPassword - The hashed password to compare against.
 */
const testPassword = async (plainPassword, hashedPassword) => {
  try {
    if (!plainPassword || !hashedPassword) {
      console.error("Both plain password and hashed password are required.");
      return;
    }

    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log("Password match:", isMatch);
  } catch (err) {
    console.error("Error testing password:", err.message);
  }
};

// Example usage
const plainPassword = process.argv[2] || "durgesh"; // Pass plain password as a command-line argument or use default
const hashedPassword =
  process.argv[3] ||
  "$2b$10$p5hvKDbqFu93iPiqbl1FTOaxLePhOzHhvo/4THeE9VIX/ZDmFsese"; // Pass hashed password as a command-line argument or use default

testPassword(plainPassword, hashedPassword);

module.exports = testPassword;