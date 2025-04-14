import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogList=[];

// TypeError: Cannot read properties of undefined (reading 'blogtitle') at file:///D:/Web%20Dev/Projects/Blog_site/index.js:14:30
// as this error encounter due to middleware(body-parse) not included which respone by user handle.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/",(req,res)=>{
  res.render("index.ejs");
})

// BlogLists 
// let blogList=[];

// Render home page with blog list
app.get("/home", (req, res) => {
  res.render("home.ejs", {
    bloglist: blogList,
  });
});

app.get("/about",(req,res)=>{
  res.render("about.ejs");
});

app.post("/home",(req,res)=>{
  const blogTitle = req.body.blogtitle;
  const blogDescription = req.body.blogDes;
  blogList.push({
    id:generateID(),
    title:blogTitle,
    description:blogDescription,
  });
  res.render("home.ejs",{bloglist : blogList});
});

function generateID(){
  return Math.floor(Math.random()*10000);
}

// View Blog Lists details 

app.get("/blogDetails/:id",(req,res)=>{
  const blogId= req.params.id;
  const blogDetails = blogList.find((blog) => blog.id === parseInt(blogId));
  res.render("viewBlogList.ejs",{blogDetails:blogDetails});
});

//edit

app.get("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const blogDetails = blogList.find((blog) => blog.id === parseInt(blogId));
  res.render("index.ejs", {
    isEdit: true,
    blogDetails: blogDetails,
  });
});

// update blog --

app.post("/edit/:id",(req,res)=>{
  const blogId = req.params.id;
  const editBlog = blogList.findIndex((blog) => blog.id === parseInt(blogId));
  if(editBlog === -1){
    res.send("<h1> Something went Wrong </h1>");
  }

  const updatedTitle = req.body.blogtitle;
  const updatedDescription = req.body.blogDes;

  const blogTitle = (blogList[editBlog].title = updatedTitle);
  const blogDescription = (blogList[editBlog].description = updatedDescription);
  [...blogList,{ blogTitle:blogTitle , blogDescription:blogDescription }];
  res.render("home.ejs", { isEdit:true , blogList:blogList});
});

// app.post("/edit/:id", (req, res) => {
//   const blogId = req.params.id;
//   const editBlog = blogList.findIndex((blog) => blog.id === parseInt(blogId));
//   if (editBlog === -1) {
//     return res.send("<h1>Something went Wrong</h1>");
//   }

//   blogList[editBlog].title = req.body.blogtitle;
//   blogList[editBlog].description = req.body.blogDes;

//   res.render("home.ejs", { isEdit: true, bloglist: blogList });
// });



// delete log
app.post("/delete/:id",(req,res)=>{
  const blogId= req.params.id;
  blogList = blogList.filter((blog)=> blog.id !== parseInt(blogId));
  res.send('<script>alert("Blog deleted Successfully"); window.location="/home" ; </script>');
  res.redirect("/home");
});



app.listen(port,()=>{
    console.log(`listen all port ${port} `);
})