
/*
 * GET home page.
 */

 var crypto = require('crypto'),
    ToDoList = require('../models/toDoList.js');
    ListItem =require('../models/listItem.js');
module.exports = function(app) {
  app.get('/', function (req, res) {
  ToDoList.get(null, function (err, toDoLists) {
    if (err) {toDoLists = [];}
    res.render('index', {
    title: 'Express',
    toDoLists: toDoLists
     });
  });
	});

  app.post('/addList', function(req,res){
  var title = req.body.title;
  var toDoList = new ToDoList({
      title: req.body.title,
      listItems: []
  });
  if(title!==""){
    toDoList.save(function(err, toDoList){
  if (err) {
  return res.redirect('/');
  }else{
  return res.redirect('/');
  }
  });
  }else{
    return res.redirect('/');
  }
  });
  app.post('/addListItem', function(req,res){
      var title = req.body.title;
      var listId=req.body.id;
      var list=null;
      console.log("listID:"+listId);
  //     ToDoList.getByID(listId, function (err, document) {
  //   if (err) {
  //     return res.redirect('/list?id='+listId);
  //   }else{
  //     if (document!==null) {
  //       var newListItem=new ListItem(title,"todo");
  //       if(document.listItems){

  //       }

  //       list=document;

  //       ToDoList.update(listId,list,function(err){
  //         if (err) {
  //           return res.redirect('/list?id='+listId);
  //         }else{
  //           return res.redirect('/list?id='+listId);
  //         }
  //       });
  //       return res.redirect('/list?id='+listId);
  //     }else{
  //       console.log("Cannot find list");
  //       return res.redirect('/list?id='+listId);
  //     }
  //   }
  // });
  //   });

  ToDoList.addListItem(listId,title,function(err){
    if (err) {
            return res.redirect('/list?id='+listId);
          }else{
            return res.redirect('/list?id='+listId);
          }
        });
});
// if (err) {
//       return res.redirect('/');
//     }else{
//       if (document!==null) {
//         res.render('list', {
//         title: document.title,
//         toDoList: document
//         });
//       }else{
//         console.log("Cannot find list");
//         return res.redirect('/');
//       }
//     }

//   });
//   });

  app.get('/list', function(req,res){
    var id=req.param('id');
    ToDoList.getByID(id, function (err, document) {
    if (err) {
      return res.redirect('/');
    }else{
      if (document!==null) {
        res.render('list', {
        title: document.title,
        toDoList: document
        });
      }else{
        console.log("Cannot find list");
        return res.redirect('/');
      }
    }

  });
  });
};