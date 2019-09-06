const emailRecipients = ['your.email@here.com']; 
const emailSource = 'your.authorized.email@here.com'; // https://console.aws.amazon.com/ses/home?region=us-east-1#verified-senders-email

const getData = require('./getWatchAsian');
var aws = require('aws-sdk');
aws.config.update({region:'us-east-1'});
var ses = new aws.SES;

exports.handler = (event, context, callback) => {
    getData().then(function(data) {
        if (data != '') {
            var params = {
                Destination: {
                    ToAddresses: emailRecipients
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: data
                        }
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: 'New Release @ WatchAsian'
                    }
                },
                Source: emailSource
            };

            ses.sendEmail(params, function (err, data) {
                callback(null, {err: err, data: data});

                if (err) {
                    console.log(err);
                    context.fail(err);
                } else {
                    console.log(data);
                    context.succeed(event);
                }
            });
        }
    });
}