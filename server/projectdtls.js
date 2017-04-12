
var conn = require('./db');
var mysql = require('mysql');
var connection = mysql.createConnection(conn.db);

exports.getprojectstatus = function(req, res) {

//console.log(req.query.project);
var project = req.query.project;
var projectstatus = "";
var projecttaskstatus = "";
	connection.query("Select status from projectstatus where projectname='" + project +"'", function(err, rows, fields) {
	if (!err) {
		//res.send(rows[0].status);
		 projectstatus = rows[0].status;
//console.log(projectstatus);
	   }
	else
		console.log(err.message);
	});

        connection.query("Select projecttask, projecttaskstatus from projecttasks where projectname='" + project +"'", function(err, rows1, fields) {
        if (!err) {
                //res.send(rows1[0].status);
		for (i=0;i<rows1.length;i++){
			projecttaskstatus = projecttaskstatus + rows1[i].projecttask + " is in " + rows1[i].projecttaskstatus + ".  ";
//console.log(projecttaskstatus);     
           	}
		res.send(projectstatus + ". The status of individual tasks are as follows. " + projecttaskstatus);
		}
        else
                console.log(err.message);
        });
//	console.log(projectstatus + "" + projecttaskstatus);
};
