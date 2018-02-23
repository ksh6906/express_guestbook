var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//변수 선언
var entries = [];
//모든 모듈이 접근 가능하게 함
app.locals.entries = entries;

//개발자모드로 로깅
app.use( logger("dev"));

app.use( bodyParser.urlencoded({extended: false}));

//라우팅
app.get("/", function(request, response){
  response.render("index");
});

app.get("/new-entry", function(request, response){
  response.render("new-entry");
});

app.post("/new-entry", function(request, response){
  //제목이나 body 둘 중 하나가 없을 경우
  if(!request.body.title || !request.body.body){
    response.status(400).send("Entries must have a title and a body");
    return;
  }

  var new_entry = {
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  };

  entries.push(new_entry);

  response.redirect("/");
});

app.use(function(request, response){
  //404에러와 404페이지 불러오기
  response.status(404).render("404");
});

http.createServer(app).listen(3000, function(){
  console.log("Guestbook app started on port 3000");
})
