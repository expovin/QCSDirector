#!/bin/bash
# Author : Vincenzo Esposito (ves@qlik.com)
# First release : Sept 11, 2020
# This script run the app loading giving the specific appId and wait the end of task
# Save the log file in the execution log directory. Each log has the TaskName and Task execution status as log name
# When the execution is completed call startSequence passing the the complete Task path.
#
# Git Repo: https://github.com/expovin/QCSDirector

if [ $# -lt 4 ]; then
    echo " "
    echo "               ............................................................................."
    echo "               Usage $0 <sequenceFile> <parent|null> <TaskName> <appId> [executionId]"
    echo " "
    echo "               Author: ves@qlik.com"
    echo "               Repo  : https://github.com/expovin/QCSDirector"    
    exit 1
fi


function runTask() {
    reload1="$(qlik reload create --appId $4 | jq -r .id)"
    echo "Reload app $4 started with id $reload1"

    status="STARTED"

    while [[ "$status" != "EXIT" ]]; 
    do 
            reload="$(qlik reload get $reload1)"
            if [[ $status != "END" ]]; then 
                status="$(echo $reload | jq -r .status)"
                raskId="$(echo $reload | jq -r .id)"
            fi

            case $status in
                "QUEUED")
                    echo -n "Waiting to start..."
                    ;;

                "RELOADING")
                    echo -n "Task running "$raskId" "
                    ;;

                "SUCCEEDED")
                    echo -n "Task succeeded "
                    status="END"
                    ;;

                "FAILED")
                    echo -n "Task failed "
                    status="END"
                    ;;                    

                "END")
                    appId="$(echo $reload | jq -r .status)"
                    duration="$(echo $reload | jq -r .duration)"
                    endTime="$(echo $reload | jq -r .endTime)"
                    status="$(echo $reload | jq -r .status)"
                    echo "App id $appId ended status $status duration $duration endTime $endTime"
                    echo $reload > ./logs/$5/$3_$status.json

                    echo "Try to start $3.$status"
                    if [[ "$2" != "null" ]]; then    
                        echo ./startSequence.sh $1 $2.$3.$status $5                    
                        ./startSequence.sh $1 $2.$3.$status $5
                    else
                        echo ./startSequence.sh $1 $3.$status $5   
                        ./startSequence.sh $1 $3.$status $5
                    fi    

                    status="EXIT"
                    ;;                    

                *)
                    echo -n "$status not handled yet"
                    ;;      
                esac          

            sleep 1; 
    done
}

runTask $1 $2 $3 $4 $5