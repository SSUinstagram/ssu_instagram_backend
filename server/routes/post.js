const express = require("express");
const Post = require("../../models/post");
const Image = require("../../models/images");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {Op} = require("sequelize");
const body_parser = require("body-parser");
const Write = express.Router();
Write.use(express.json());
Write.use(body_parser.urlencoded({
	extended: true
}));
Write.use(body_parser.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
    //   const ext = path.extname(file.originalname);
    //   cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    cb(null,file.originalname);
    },
  });
  
  var upload = multer({ storage: storage });
Write.post('/uploadImages',upload.array("img",1000),async(req,res)=>{
    try{

        const imgFileArr = req.files;	//length 1개
        const images =[];
    
        // console.log("데이터 수 :",req.files.length)
        if(req.files.length >5 || req.files.length===0)
            if(req.files.length >5)
            return res.status(400).send("5개만 이하로만 이미지 넣어주세요");
            else
            return res.status(400).send("다시 이미지를 선택하여 넣어주세요");
        for (var z = 0; z < imgFileArr.length; z++) {
                images.push(imgFileArr[z].filename);
        }
        await Image.create({img1:images[0],img2:images[1],img3:images[2],img4:images[3],img5:images[4]});
        return res.status(200).send("이미지업로드 성공");
    }
catch(err){
    return res.status(500).send(err);
}
});


Write.post('/uploadPost',async(req,res)=>{
    try{
        let {id,date,contents} = req.body;
        // console.log(req.body);
        await Post.create({id:id,date:date,contents:contents}).then(result => {
            return res.status(200).send(result);
         }).catch(err=>{
             return res.status(400).send(err);
         })
    }
    catch(err){
        return res.status(200).send(result/9);
    }
    });

    Write.post('/updateImages',upload.array("img",1000),async(req,res)=>{
        try{
            const {f1,f2,f3,f4,f5,num,fileLength} = req.body;
            const imgFileArr = req.files;	//length 1개
            console.log(imgFileArr.length);
            let images =[f1,f2,f3,f4,f5];
            images = 
            images.filter((element, i) => element !== 'undefined');

            console.log("기존이미지",images);
            for (var z = fileLength; z < imgFileArr.length; z++) {
                    images.push(imgFileArr[z].filename);
            }
          const result =   await Image.update({img1:images[0],img2:images[1],img3:images[2],img4:images[3],img5:images[4]},{where:{number:num}});
          console.log(result);  
          return res.status(200).send("이미지업로드 성공");
        }
    catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
    });

    Write.post('/updatePost',async(req,res)=>{
        try{
            let {id,date,contents,number} = req.body;
            // console.log(req.body);
            const result = await Post.update({
                contents:contents,
                date:date,
              }, {
                where: { number: number }
              }).then(result => {
                return res.status(200).send(result);
             }).catch(err=>{
                 return res.status(400).send(err);
             })
        }
        catch(err){
            return res.status(500).send(err);
        }
        });
    
        

Write.post('/deletePost',async(req,res)=>{
    try{
        let {id,date,contents,number} = req.body;
        // console.log(number);
        const result = await Post.destroy({where:{number:number}});
        const result2 = await Image.destroy({where:{number:number}});
        return res.status(200).json(result);
    }
    catch(err){
        return res.status(500).json(err);
    }
    });

    Write.get('/getPost',async(req,res)=>{
        try{
        const {page} = req.query;
        // console.log(page);
          const offset = 9 * (page);
          const result = await Post.findAll({limit:9,offset:offset,});
           // console.log(result);
        return res.status(200).json(result);
        }
        catch(err){
            return res.status(500).json(err);
        }
        });


        Write.get('/filterGetPost',async(req,res)=>{
            try{
            const {type,text,page} = req.query;
            // console.log(type,text,page);
              const offset = 9 * (page);
              if(type === "id"){
                const result = await Post.findAll({where:{id:text},offset:offset,limit:9});
                // console.log(result);
                 return res.status(200).json(result);
              }
              else if(type ==="text"){
                const result = await Post.findAll({where:{ [Op.and]: [{ contents: { [Op.like]: `%${text}%` } }, 
                { contents: { [Op.notLike]: `%#${text}%` } }] },offset:offset,limit:9});
                // console.log(result);
                 return res.status(200).json(result);
              }
              else if (type ==="hashtag"){
                const result = await Post.findAll({where:{    contents: {
                    [Op.like]: "%" +`#${text}`+ "%"
                }} ,offset:offset,limit:9});
                // console.log(result);
                 return res.status(200).json(result);
              }
          
            }
            catch(err){
                return res.status(500).json(err);
            }
            });


        Write.get('/filterPage',async(req,res)=>{
                const {type,text} = req.query
                // types : id    text    hashtag 
                query = `SELECT count(*) FROM post`
                try{
                    if(type ==="id"){
                        const result = await Post.count({where:{id:text}});
                        let temp =Number.isInteger(result/9);
                        let page = 0;
                        // console.log(temp);
                        if(temp===false)
                            page = parseInt(result/9)+1;
                        else{
                            page = parseInt(result/9);
                        }
                        return res.status(200).json(page);
                    }
                    else if(type === "text"){
                        // console.log(text);
                        const result = await Post.count({ where: { [Op.and]: [{ contents: { [Op.like]: `%${text}%` } }, 
                        { contents: { [Op.notLike]: `%#${text}%` } }] } });
                        // console.log(result);
                        let temp =Number.isInteger(result/9);
                        let page = 0;
                        // console.log(temp);
                        if(temp===false)
                            page = parseInt(result/9)+1;
                        else{
                            page = parseInt(result/9);
                        }
                        return res.status(200).json(page);
                    }
                    else if(type==="hashtag"){
                        const result = await Post.count({where:{    contents: {
                            [Op.like]: "%" +`#${text}`+ "%"
                        }}});
                        // console.log(result);
                        let temp =Number.isInteger(result/9);
                        let page = 0;
                        // console.log(temp);
                        if(temp===false)
                            page = parseInt(result/9)+1;
                        else{
                            page = parseInt(result/9);
                        }
                        return res.status(200).json(page);
                    }
                }
                catch(err){
                    return res.status(500).send(err);
                }
                });

        Write.get('/getImage',async(req,res)=>{
            try{
            const {page} = req.query;
            console.log(page);
              const offset = 9 * (page);
              const result = await Image.findAll({limit:9,offset:offset,});
            return res.status(200).json(result);
            }
            catch(err){
                return res.status(500).json(err);
            }
            });

        Write.get('/totalPage',async(req,res)=>{
            query = `SELECT count(*) FROM post`
            try{
                const result = await Post.count();
                let temp =Number.isInteger(result/9);
                let page = 0;
              //  console.log(temp);
                if(temp===false)
                    page = parseInt(result/9)+1;
                else{
                    page = parseInt(result/9);
                }
                return res.status(200).json(page);
            }
            catch(err){
                return res.status(500).send(err);
            }
            });

            Write.get("/test",async(req,res)=>{
                console.log(req.query);
                const {image} = req.query;
                console.log("test",image);
                fs.readFile(`./public/images/${image}`, function(error, data) {
                    if(error){
                      res.writeHead(500, {'Content-Type':'text/html'});
                      res.end('500 Internal Server '+error);
                    }else{
                      // 6. Content-Type 에 4번에서 추출한 mime type 을 입력
                      res.writeHead(200, {'Content-Type':"image/png"});
                      res.end(data);
                    }
                  });
            })

            Write.get("/getEachImages",async(req,res)=>{
                const{number} = req.query;
                // console.log("번호",number);
                try{
                    const result = await Image.findOne({where:{number:number}}).then(result => {
                        return res.status(200).send(result);
                     }).catch(err=>{
                         return res.status(400).send(err);
                     })
                }
                catch(err){
                    return res.status(500).send(err);
                }
            })
    

        module.exports = { Write};