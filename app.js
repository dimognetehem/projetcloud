const express = require("express");
const path = require("path")
const db = require("./routes/db-config");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const fs = require('fs');
const port = 3000;
const authRoute = require("./routes/authRoutes");
const multer = require('multer');
const aws = require('aws-sdk');
const storage = multer.diskStorage({
  destination: '.',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.mimetype.split('/')[1]); 
  }
});

const upload = multer({ storage });

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set("views", "./views");


// Lecture du fichier init.sql
// const initSqlScript = fs.readFileSync('./init.sql', 'utf8');

/* const db = mysql.createConnection(process.env.MYSQL_URI); */
/* const db = mysql.createConnection({
    host: 'mysql',
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306
}); */

// Création d'une instance du service S3
const s3 = new aws.S3({
    endpoint: 'localstack:4566',
    s3ForcePathStyle: true, 
    signatureVersion: 'v4',
    region:"eu-central-1",
    sslEnabled: false,
    credentials: new aws.Credentials({
        accessKeyId: 'key_aws1',
        secretAccessKey: 'key_aws1'
    }),
  });
  
  // aws.config.update({
  //   accessKeyId: 'key_aws1',
  //   secretAccessKey: 'key_aws1',
  //   region:"eu-central-1",
  // });
  
  
  
  async function uploadFichier(fichier) {
            console.log('essaie');
            console.log('essaie');
            console.log('essaie');
  
    try {
        // Vérifier si le bucket existe déjà
        await s3.headBucket({ Bucket: 'mes-fichiers' }).promise();
        console.log('Bucket S3 existe déjà.');
        console.log('Bucket S3 existe déjà.');
        console.log('Bucket S3 existe déjà.');
    } catch (error) {
        if (error.statusCode === 404) {
            // Le bucket n'existe pas, le créer
            await s3.createBucket({ Bucket: 'mes-fichiers' }).promise();
            console.log('Bucket S3 créé avec succès.');
            console.log('Bucket S3 créé avec succès.');
            console.log('Bucket S3 créé avec succès.');
        } else {
            // Une erreur s'est produite lors de la vérification du bucket
            console.error('Erreur lors de la vérification du bucket S3:', error);
        }
    }
  
    return new Promise((resolve, reject) => {
        const file = fichier;
         const fileData =  fs.readFileSync(file.path);
        const params = {
            Bucket: "mes-fichiers",
            Key: file.originalname,
            Body: fileData,
        };
  
        s3.upload(params, (err, data) => {
            if (err) {
                console.error(err);
                console.log('Erreur lors de l\'envoi du fichier sur S3');
                reject(err);
            } else {
                console.log('Fichier envoyé avec succès sur S3');
                resolve(data.Location); // Renvoie l'URI du fichier téléchargé
            }
        });
    });
  }

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected...");
        /* db.query(initSqlScript, (err, results) => {
            if (err) {
              console.error('Erreur lors de l\'exécution du script SQL :', err);
              return;
            }
            console.log('Le script init.sql a été exécuté avec succès.');
          }); */
    }
});


// Define Routes
app.use('/', authRoute);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status.statusCode.json({message: err.message})
    return ;
});


app.listen(port);

module.exports = app;
  
