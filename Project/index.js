import bodyParser from "body-parser";
import express from "express";


const app =express();
const port=3000;
var message="Free To add Your Opinion";
app.use(express.static("public"));
var Title=[];
const about="In today's digital age, having a dynamic and editable webpage is essential for businesses, bloggers, and developers alike. Whether you're looking to maintain a blog, showcase your portfolio, or manage a business website, the ability to make quick and easy updates is crucial. This guide will walk you through the steps to create an editable webpage that you can continuously update and refine to keep your content fresh and engaging."
var number_of_Post=0;
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",(req,res)=>{
    res.render("home.ejs",{
        m:message,
        Title,
        about
    });
});
app.get("/home",(req,res)=>{
    res.redirect("/");
});

app.get("/post",(req,res)=>{
    res.render("post.ejs",{
      
    });
})

app.get("/edit_new",(req,res)=>{
    res.render("edit_new.ejs");
});

app.post("/post",(req,res)=>{
    var new_title=req.body.TitleBox;
    var Post=req.body.AddPost;
    
    const x={
        title:new_title,
        post:Post,
        
        //number:number_of_Post
        
    }
    Title.push(x);
    res.redirect("/");
    number_of_Post+=1;
    

});
app.post("/edit_new",(req,res)=>{
    if(Title.length===0){
        res.redirect('/');
    }else{
     number_of_Post=req.body.numberofPost;
    var Edited_title=Title[number_of_Post]["title"]+" "+req.body.new_title;
    var edit_post=Title[number_of_Post]["post"]+" "+req.body.new_post;
    const y={
        Edited_title,
        edit_post
    }
    Title[number_of_Post]["title"]=Edited_title;
    Title[number_of_Post]["post"]=edit_post;
    res.redirect('/home');
}
});
app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});
app.get("/delete",(req,res)=>{
    res.render("delete.ejs");
});
app.post("/delete",(req,res)=>{
    const delete_post=req.body.Delete_Post;
    Title.shift(delete_post-1);
    res.redirect("/");
});

 
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});