const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');
const request = require('request')


const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

// To parse data from credentials.json
let rawdata_cred = fs.readFileSync('credentials.json');
let cred_info = JSON.parse(rawdata_cred);

let rawdata_token = fs.readFileSync('token.json');
let token_info = JSON.parse(rawdata_token);


const myOAuth2Client = new OAuth2(
  cred_info.installed.client_id,
  cred_info.installed.client_secret,
  "https://developers.google.com/oauthplayground"
)

myOAuth2Client.setCredentials({
  refresh_token: token_info.refresh_token,
});

const myAccessToken = myOAuth2Client.getAccessToken()

const url = 'https://www.googleapis.com/gmail/v1/users/me/profile?access_token='+token_info.access_token

var sender
var transport

request({ url: url, json: true}, (err, data) => {
  sender=data.body.emailAddress
  transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: sender, //your gmail account you used to set the project up in google cloud console"
         clientId: cred_info.installed.client_id,
         clientSecret: cred_info.installed.client_secret,
         refreshToken: token_info.refresh_token,
         accessToken: myAccessToken //access token variable we defined earlier
  },
   tls:{
    rejectUnauthorized: false
  }});
})




// Post request to send mail.
app.post('/sendemail',function(req,res){
  const mailOptions = {
  from: sender, // sender
  to: req.body.email, // receiver
  subject: 'My tutorial brought me here', // Subject
  html: '<p>You have received this email using nodemailer, you are welcome ;)</p>'// html body
  }
  transport.sendMail(mailOptions,function(err,result){
  if(err){
    console.log(err)
  res.send({
  message:err
  })
  }else{
  transport.close();
  res.send({
  message:'Email has been sent: check your inbox!'})}
})
})

app.get('/',function(req,res){
  res.send({
  message:'Default route in email tutorial project'
  })
});

app.listen(PORT, function (req, res) {
  console.log(`Listening on port ${PORT}`);
})