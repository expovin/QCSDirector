fs = require('fs');

module.exports = {

    
    getTask(id,data){
        let tsk = {};
        data.tasks
        .filter(task => task.id==id)
        .forEach(task =>{
            tsk[task.type] = task.app.tenantId+"/"+task.app.id;
                task.connections.forEach(conn => {  
                    
                    if(!tsk[conn.tipo])
                        tsk[conn.tipo]={};
                    tsk[conn.tipo][data.tasks[conn.to].lable]={};
                    let innerResult = this.getTask(data.tasks[conn.to].id,data);
                    tsk[conn.tipo][data.tasks[conn.to].lable] = innerResult;
            
                } )  
                return(tsk)       
        })
        return(tsk);
    },
    
    exportToFile (data) {
        var d = Date.now()
        let exportFile = {exec:{}, state:this.state, info:{}}
        
        exportFile = {exec:{}, state:this.state, info:{}}
        data.tasks.filter(task => task.dependOn == null)
        .forEach(task => {
            exportFile.exec[task.lable] = this.getTask(task.id,data);
        })
        exportFile.info["id"]=data._id;
        exportFile.info["version"]="1.0.0";
        exportFile.info["data"]=d;

        let fileName = __dirname+"/../scripts/sequences/"+data.sequenceName+".json"
        fs.writeFileSync(fileName, JSON.stringify(exportFile ))
        return(fileName)
    }

}