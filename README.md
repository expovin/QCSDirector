# QCS Director
QCS Director allow you to run sequences of qlik application reloads on your Qlik Cloud Service tenant. They are two pure bash scripts taken a descriptor json file as imput. To start a sequence of reload it is enought to run the script command
```
startSequence.sh Sequences/<sequenceName.json>
```
You can easily schedule that command with CRON or your favorite scheduler, launched from your on-prem server. This utility does not add any schedule task into your tenant.

## Dependencies
You need to install and setup [qlik-cli](https://github.com/qlik-oss/qlik-cli) and set it up for your tenant. You need also [jq](https://stedolan.github.io/jq/) used to handle json file.

## JSON Sequence Descriptor file
This tool need a descriptor JSON file to drive the right reload sequence.