# Automatic_mail_sender

## Step 1: Install node.js from [here](https://nodejs.org/en/)
## Step 2: Download the Github code and extract the files.
## Step 3: Open the Command Prompt and cd to root directory containing files like index.js .
## Step 4: Run the command - node index.js
## Step 5: Click on the link appearing on command prompt
## Step 6: Sign to the google account.
### Note- If the browser gives the warning "This app isn't verified", then just click on the advanced option and click on "Go to Quickstart (unsafe)" and allow for all the permissions.
## Step 7: Copy the code appearing on the screen and paste it in CMD.
### Note: A file named "Tokens.json" will get created automatically.
## Step 8: Now on your CMD run the command "npm start".
## Step 9: Open the postman app and type "localhost:3000/sendemail" in the url section and set the method to "Post".
## Step 10: In the "Body" section choose "Raw" and in the dropdown menu choose "JSON".
## Step 11: Type '{ "email" : reciever address }' in the section given below.
### Note- Put the email id of reciever in reciever address with double quotes.
## Step 12: Hit Send!

## Reciever will recieve mail from your loggged in ID.
