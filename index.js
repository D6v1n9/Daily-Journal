import express from "express"
import bodyParser from "body-parser";
import _ from 'lodash';

const app = express();
const port = 8000 ;

// app.set('view engine', 'ejs');

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const aboutContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ip";
const contacContent = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary "

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [] ;

app.get("/", (req,res)=>{
    res.render("home.ejs", {
        homeContent: homeStartingContent,
        posts:posts
    });
})

app.get("/about", (req,res)=>{
    res.render("about.ejs", {
        aboutContent: aboutContent
    });
})

app.get("/contact", (req,res)=>{
    res.render("contact.ejs", {
        contactContent: contacContent
    });
})

app.get("/compose", (req,res) => {
    res.render("compose.ejs")
})

// Very important Part creationg of post object and storing in array 

app.post("/compose", (req,res) => {
    const post = {
        title: req.body.postTitle, 
        content: req.body.postBody
    }
    posts.push(post);
    res.redirect("/");
})

app.get("/posts/:postName", (req,res) => {
    posts.forEach((post)=> {

        const postTitle = (post.title);
        if(_.lowerCase(postTitle) === _.lowerCase(req.params.postName)) {
            res.render("posts.ejs", {
                title:post.title,
                body:post.content
            });
        }
    })
    
    // if(posts.find((post) => _.lowerCase(post.title) === _.lowerCase(req.params.postName))) {
    //     res.render("posts.ejs")
    //     console.log("Match Found!")
    // }
    
})


app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)                
})