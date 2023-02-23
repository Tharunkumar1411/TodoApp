// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "@/Middleware/DbConnect";
import dotenv from "dotenv";
dotenv.config();

const hello = async(req, res) => {
  
  connectDB();

  if(req.method == 'GET'){
    res.status(200).json({ name: 'John Doe' })
  }
}

export default hello;
