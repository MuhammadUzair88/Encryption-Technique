// Encrypt function
const User = require('../model/User');
function caesarEncrypt(plaintext, shift) {
    let result='';
    for(let i=0;i<plaintext.length;i++){
        let char=plaintext[i];

        if(char>="A" && char<="Z"){
            result+=String.fromCharCode((char.charCodeAt(0)-65+shift)%26+65);
            
        }
        if(char>="a" && char<="z"){
            result+=String.fromCharCode((char.charCodeAt(0)-97+shift)%26+97);
        }
    }
    return result;

  }

  function caesarDecrypt(ciphertext, shift) {
    let result = '';
    for (let i = 0; i < ciphertext.length; i++) {
      let char = ciphertext[i];
  
      if (char >= "A" && char <= "Z") {
        result += String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      } else if (char >= "a" && char <= "z") {
        result += String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
      }
    }
    return result;
  }
  
  // Function to encrypt user data and store it in the database
  const EncryptUserDataAndStore = (req, res) => {
    try {
      const { name, email, address, phone, password } = req.body;
  

   const shift =Math.floor(Math.random()*10)+1;

      // Encrypt the password using Caesar Cipher
      const encryptedPassword = caesarEncrypt(password, shift);
  
      const userData = {
        name: name,
        email: email,
        address: address,
        phone: phone,
        password: encryptedPassword,
        shift:shift,
      };
  
      // Import User model and save the user data to the database
     
      const newUser = new User(userData);
      newUser.save()
        .then(() => {
          res.status(200).json({ message: "User Data Encrypted and Stored Successfully" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Error storing user data" });
        });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error encrypting or storing user data" });
    }
  };

  const decryptUserPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const decryptedPassword = caesarDecrypt(user.password, user.shift);
  
      res.status(200).json({ decryptedPassword });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error decrypting password" });
    }
  };
  
  module.exports = {
    EncryptUserDataAndStore,
    decryptUserPassword,
  }; // Correctly export the function
  