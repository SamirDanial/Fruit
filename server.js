const express = require("express");
const connectDB = require("./config/db");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const auth = require("./middleware/auth");
const UserRole = require("./models/userRole");
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const app = express();

connectDB();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    let now = new Date().toISOString().replaceAll(':', '-');
    cb(null, now + '-' + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if(
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}




app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-auth-token");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  
app.use(express.json({ extended: false }));
app.use(auth);

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter}).single('image')
);

app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.put('/fruit-images', (req, res, next) => {
  try{
    if (!req.isAuth) {
      throw new Error('Not authenticated');
    }
    if(!req.file) {
      return res.status(200).json({message: 'No file provided'});
    }
    if(req.body.oldPath) {
      clearImage(req.body.oldPath);
    }
    return res.status(201).json({message: 'File stored', filePath: req.file.path})

  }catch(error) {
    return res.json({message: "Not authorized"});
  }
})

RoleExist('Admin');
RoleExist('Vendor')
RoleExist('Customer')

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    customFormatErrorFn(error) {
      if (!error.originalError) {
        return error;
      }
      const message = error.message || "An Error Occured";
      const data = error.originalError.data;
      const code = error.originalError.code || 500;
      return { message: message, status: code, data: data };
    },
  })
);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});


async function RoleExist(roleName) {
  const role = await UserRole.findOne({name: roleName});
  if(!role) {
    const newRole = new UserRole({
      name: roleName,
      description: 'This is a role'
    })
    
    await newRole.save();
  }
}

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
}

