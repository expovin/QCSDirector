#!/bin/bash

if [ $# -eq 3 ]; then
    executionId=$3
else
   executionId=$(date +%s)
   mkdir logs/$executionId
fi

echo "current executionId=$3"

if [ $# -eq 1 ]; then
    toExecute=$(cat $1 | jq 'keys')

    echo $toExecute | jq -c -r '.[]' | while read i; do

        appId=$(cat $1 | jq -r .$i.appId)
        echo "Start reload for app $appId"
        ./startTask.sh $1 null $i $appId $executionId &
    done
else
    toExecute=$(cat $1 |jq .$2 | jq 'keys' 2>/dev/null)

    echo $toExecute | jq -c -r '.[]' | while read i; do

        appId=$(cat $1 | jq .$2 | jq -r .$i.appId)
        echo "Start reload task $i for app $appId"        
        ./startTask.sh $1 $2 $i $appId $executionId &
    done    
fi



