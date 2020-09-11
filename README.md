# QCS Director
QCS Director allow you to run sequences of qlik application reloads on your Qlik Cloud Service tenant. They are two pure bash scripts taken a descriptor json file as imput. To start a sequence of reload it is enought to run the script command
```
startSequence.sh Sequences/<sequenceName.json>
```
You can easily schedule that command with CRON or your favorite scheduler, launched from your on-prem server. This utility does not add any schedule task into your tenant.

## Dependencies
You need to install and setup [qlik-cli](https://github.com/qlik-oss/qlik-cli) and set it up for your tenant. You need also [jq](https://stedolan.github.io/jq/) used to handle json file.

## JSON Sequence Descriptor file
This tool need a descriptor JSON file to drive the right reload sequence. The JSON is a dictionary of tasks to run as key value pairs. Each key represent the task label whereas the value contain the application details to run.
All tasks at the same level will run simultaneously, each task can specify the list of dependent reloads to run in case of SUCCESS or FAILURE with the same strcture. You can nested as many level as you want.
![JSON_Example]
(https://raw.githubusercontent.com/expovin/QCSDirector/master/img/JSON_Example.png)
