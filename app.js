const express = require("express") //requiring express package
const connectToDatabase = require("./database")
const Blog = require("./model/blogModel")

const app = express() // storing it in app app vanne variable throught use gareko
app.use(express.json())
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage:storage})



connectToDatabase()




//  / ma gayo vane k dekhaune and request garepachhi response garnai parxa hai keta ho

app.get('/',(req,res)=>{
    res.status(200).json({
        massage: "fuck off everyone"
    })
})


app.post("/blog",upload.single('image'),async(req,res)=>{
      const {title,subtitle,description,image} = req.body
      const filename = req.body.filename
      if(!title || !subtitle || !description ||!image){
     return 
     res.status(400).json({
     massage:"please provide title subtitle description and image" //async and await function hatako hai maile just middleware use garna ko lagi
     })
    }
      await Blog.create({
         title:title,
         subtitle: subtitle,
         description:description,
         image:filename
     })
    res.status(200).json({
        massage : "blog api hit successfully"
    })
})
app.get("/blog", async (req,res)=>{
    const blogs = await Blog.find()
    res.status(200).json({
        massage:"blogs fatch sucessfully",
        data:blogs
    })
 })

 app.get("/blog/:id",async(req,res)=>{
const id = req.params.id
const blog = await Blog.findById(id)
if(!blog){
   return res.status(404).json({
        massege:"data not found"
    })   
}
    res.status(200).json({
        massage:"featch data sucessfully",
        data : blog
    })

 })

 app.delete("/blog/:id",async(req,res)=>{
     const id = req.params.id
     await Blog.findByIdAndDelete(id)
     res.status(200).json({
        massage:"blog delete sucessfully"
     })
 })

app.use(express.static('./storage'))
   

app.listen(3000, function(){
    console.log("port 3000 is sucessfully started")
})


//mongodb+srv://shahishisir087:<db_password>@cluster0.zgzr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0