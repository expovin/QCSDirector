#!/bin/bash
# Author : Vincenzo Esposito

echo "Start Chaining app"

#Define the app to schedule
app1="c6b0337f-8b23-419f-9441-d92b9d0736bc"
app2="3f30032c-e702-4cd6-adb1-49406c1de43b"
app3=""

function runApp() {
    reload1="$(qlik reload create --appId $1 | jq -r .id)"
    echo "Reload app $1 started with id $reload1"
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
                    echo -n "Task running "$raskId
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
                    status="EXIT"
                    ;;                    

                *)
                    echo -n "$status not handled yet"
                    ;;      
                esac          

            sleep 1; 
    done
}



exec runApp $app1 &
exec runApp $app2 &