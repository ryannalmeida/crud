// import { pool } from "../../../config/db";
import { prisma } from "config/db";

export default async function handler(req , res){

    switch(req.method){

        case "GET" : 
            return await getUsers(req , res);

        case "POST" : 
            return await saveUser(req,res);
        
        default : 
            return res.status(400).send("method not allowed");
    }
}


// const getUsers = async (req , res) => {
//     try{
//         const results = await pool.query("SELECT * FROM users");
//         return res.status(200).json(results);
//     }catch(error){
//         return res.status(500).json(error);
//     }
// }

const getUsers = async (req , res) => {
    try{
        const results = await prisma.users.findMany() ;
        return res.status(200).json(results);
    }catch(error){
        return res.status(500).json(error);
    }
}


// const saveUser = async (req , res) => {
//     try{
//         const {username , email , password} = req.body ;
//         const results = await pool.query(`INSERT INTO users(username , email , password) VALUES("${username}" , "${email}" , "${password}")`);
//         return res.status(200).json({username,email,password,id : results.insertId});
//     }catch(error){
//         return res.status(500).send("error occured");
//     }
// }
const saveUser = async (req , res) => {
    try{
        const {username , email , password} = req.body ;
        // const results = await pool.query(`INSERT INTO users(username , email , password) VALUES("${username}" , "${email}" , "${password}")`);
        const results = await prisma.users.create({
            data : {
                username : username,
                email : email ,
                password : password
            },
            select : {
                id : true
            }
        })
        return res.status(200).json({username,email,password,id : results.id});
    }catch(error){
        return res.status(500).send("error occured");
    }
}