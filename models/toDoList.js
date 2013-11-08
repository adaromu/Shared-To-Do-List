var mongodb = require('./db');
var BSON = require('mongodb').BSONPure;

function ToDoList(toDoList){
	this.listId=toDoList.listId;
	this.title=toDoList.title;
  if(toDoList.title){
    this.listItems= toDoList.listItems;
  }else{
    this.listItems=[];
  }
}

module.exports = ToDoList;

//Save to do list;
ToDoList.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var toDoList = {
      title: this.title
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('toDoLists', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(toDoList, {
        safe: true
      }, function (err, toDoList) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, toDoList[0]);//成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};


//Get To Do Lists
ToDoList.get = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('toDoLists', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if (name) {
        query._id = name;
      }
      //根据 query 对象查询文章
      collection.find(query).sort({
        time: -1
      }).toArray(function (err, docs) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        callback(null, docs);//成功！以数组形式返回查询的结果
       });
    });
  });
};
//Get by id
ToDoList.getByID=function(id,callback){

  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //Read list
    console.log("ID:"+id);
    var obj_id= new require('mongodb').ObjectID(id);
    db.collection('toDoLists').findOne({_id:obj_id}, function(err, document) {
      mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
      callback(null,document);
    });
  });
};
ToDoList.update=function(id,toDoList, callback){
  mongodb.open(function (err, db) {
    console.log("db.open...");
    if (err) {
      return callback(err);
    }
    db.collection('toDoLists', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //更新文章内容
      var obj_id= new require('mongodb').ObjectID(id);
      collection.update({
        "_id": obj_id
      }, toDoList, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
};

ToDoList.addListItem=function(id,listItem, callback){
  console.log("addListItem");
  console.log('List Item:'+listItem);
  console.log("Add List Item List ID1:"+id);
  mongodb.open(function (err, db) {
    console.log("db.open...");
    if (err) {
      console.log("db.open err...");
      return callback(err);
    }else{
      console.log("Add List Item List ID2:"+id);
      var obj_id= new require('mongodb').ObjectID(id);
          db.collection('toDoLists').update({
        "_id": obj_id
      }, {
        $push: {
          listItems: {
            title: listItem,
            status: "todo"
          }
        }
      }, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    }

  });
};