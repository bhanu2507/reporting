
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


exports.listprojects = function(req, res) {
    connection.query("Select projectname, status as pstatus from projectstatus", function(err, rows, fields) {
        if (!err) {
            res.send(rows);
            //console.log(rows);
        }
        else
            console.log(err.message);
    });
}

exports.updateprojectstatus = function(req, res) {
    connection.query("update projectstatus set status='" + req.query.status + "' where projectname ='" + req.query.project + "'", function(err, rows, fields) {
        if (!err) {
            //console.log("called");
            res.send(rows);
        }
        else
            console.log(err.message);
    });
}

exports.updatetaskstatus = function(req, res) {
    //console.log("update projecttasks set projecttaskstatus='" + req.query.status + "' where projectname ='" + req.query.project + "' and projecttask='" + req.query.task + "'");
    connection.query("update projecttasks set projecttaskstatus='" + req.query.status + "' where projectname ='" + req.query.project + "' and projecttask='" + req.query.task + "'", function(err, rows, fields) {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err.message);
    });
}

exports.listtasks = function (req, res) {
    var project = req.query.project;
    connection.query("Select projectname, projecttask, projecttaskstatus from projecttasks where projectname='" + project +"'", function(err, rows, fields) {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err.message);
    });

}