const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { query } = require("../database");

module.exports.addUser = async function addUser(
  name,
  email,
  password,
  dob,
  gender
) {
  try {
    const result = await query(
      `
        INSERT INTO users (name, email, password, dob, role, date_joined, gender)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6)
        RETURNING uid`,
      [name, email, password, dob, "user", gender]
    );

    console.log("result:" + result.rows[0]);

    if (result.rowCount === 1) {
      const userId = result.rows[0].uid;
      return {
        success: true,
        message: "User created",
        user_id: userId,
      };
    } else {
      return {
        success: false,
        message: "Failed to create user",
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports.loginUser = async function loginUser(email, password) {
    try {
        // retrieve uid and username & password to authenticate
        const userLogin = await query(`SELECT * FROM users WHERE email = $1`, [email]);

        //no rows returned
        if (!userLogin.rows.length) {
            return [{
                "errorMsg": "User not found"
            }];
        }

        // compare passwords
        const passwordMatch = await bcrypt.compare(password, userLogin.rows[0].password);
        console.log('Hashed Password from DB:', userLogin.rows[0].password);
        console.log('Hashed Password from Login:', password);
        console.log('Password Match Result:', passwordMatch);
        console.log("User id: " + userLogin.rows[0].uid);

        if (passwordMatch) {
            // passwords match
            return {
                success: true,
                message: "login success",
                uid: userLogin.rows[0].uid
              };
              

        } else {
            // invalid password
            return [{
                "errorMsg": "Invalid Password"
            }];
        }
    } catch (error) {
        throw error;
    }
};

module.exports.getUserProfile = async function getUserProfile(uid) {
  try {
    const userProfile = await query(`SELECT * FROM users WHERE uid = $1`, [
      uid,
    ]);
    return userProfile;
  } catch (error) {
    throw error;
  }
};

module.exports.deleteUser = async function deleteUser(uid) {
  try {
    const result = await query(`DELETE FROM users WHERE uid = $1`, [uid]);
    if (result.rowCount === 1) {
      return {
        success: true,
        message: "User deleted",
      };
    } else {
      return {
        success: false,
        message: "Failed to delete user",
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports.editUser = async function editUser(uid, username, email) {
  try {
    const result = await query(
      `UPDATE users SET username = $1, email = $2 WHERE uid = $3`,
      [username, email, uid]
    );
    if (result.rowCount === 1) {
      return {
        success: true,
        message: "User profile updated",
      };
    } else {
      return {
        success: false,
        message: "Failed to update user profile",
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports.checkEmail = async function checkEmail(email) {
  try {
    const result = await query(
      `SELECT EXISTS (SELECT 1 FROM users WHERE LOWER(email) = LOWER($1)) AS it_does_exist`,
      [email]
    );

    console.log(result);

    const rows = result.rows;
    if (rows[0].it_does_exist) {
      return { emailExists: true };
    } else {
      return { emailExists: false };
    }
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
};

module.exports.insertImg = async function insertImg(uid, image_path) {
  try {
    const result = await query(
      `
        SELECT update_user_image($1,$2);
    `,
      [uid, image_path]
    );
    if (result.rowCount === 1) {
      return {
        success: true,
        message: "User created",
      };
    } else {
      return {
        success: false,
        message: "Failed to create user",
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports.getGameStats = async function getGameStats(uid, gameId) {
  try {
    const gameStats = await query(
      `
        SELECT MAX(score) AS max_score, MIN(score) AS min_score, COUNT(*) AS total_rounds, 
        ROUND(EXTRACT(EPOCH FROM MAX(end_date) - MIN(start_date))/60) AS total_duration_minutes
        FROM scores
        WHERE user_id = $1 AND category_id = $2
      `,
      [uid, gameId]
    );

    if (gameStats.rows.length === 1) {
      return gameStats.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
