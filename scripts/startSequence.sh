#!/bin/bash
# Author : Vincenzo Esposito (ves@qlik.com)
# First release : Sept 11, 2020
# This script traverse the sequence.json file, get as parameter, at the giving level,
# extract all the appId belonging to that level and for each of them call the startTask script.
# When called only with the sequence.json file name extract the appId at the root level
# When called with the task.Status path, extract the apppId in the given level
#
# Git Repo: https://github.com/expovin/QCSDirector

if [ $# -lt 4 ]; then
    echo " "
    echo "               .................................................................."
    echo "               Usage $0 <sequenceFile> <TASK.STATUS> [executionId]"
    echo " "
    echo "               Author: ves@qlik.com"
    echo "               Repo  : https://github.com/expovin/QCSDirector"
    echo " "
    exit 1
fi


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



