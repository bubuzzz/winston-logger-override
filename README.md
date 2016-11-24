This is the demo application to overide the console log with Winston. After meteor build, all the logs will lose timestamp, thus we need to have a proper logger to handle the situation. In this field, Winston is the best candidate. Also, `console.log` is familiar with all the JS developers, so it is better to make the wrapper of Winston in this way so the developer will not change the logging code in the client and the server

**How to run**

    1. npm install
    2. NODE_ENV=production meteor --settings config/settings.json

**Troubleshooting**

In order to run the application, make sure to change the log settings inside config/settings.json into the folder you have the permission to write the log


