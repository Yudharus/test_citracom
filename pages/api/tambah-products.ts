// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest,NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import { IncomingForm } from "formidable";
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
}

const prisma = new PrismaClient();

type Data = {
  data: {},
  message: string,
  status: number
}

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
        
      });
    });
     const uploadedFile = data.files.foto[0];
     
     const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExtension = path.extname(uploadedFile.originalFilename).toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(401).json({message: "Format foto hanya JPG/JPEG/PNG", status: 401, data: [{}]})  
      }
    
     if (uploadedFile.size > 2 * 1024 * 1024) {
      return res.status(401).json({message: "Foto tidak boleh lebih dari 2MB", status: 401, data: [{}]})  
    } else {
      const uniqueFilename = `${Date.now()}_${uploadedFile.originalFilename}`;
  
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
   
      const readStream = fs.createReadStream(uploadedFile.filepath);
      const writeStream = fs.createWriteStream(path.join(uploadDir, uniqueFilename));
   
      readStream.pipe(writeStream);
 
      const nama = data.fields.nama[0]
      const deskripsi = data.fields.deskripsi[0]
      const harga = data.fields.harga[0]
      const stok = data.fields.stok[0]
      const foto = uniqueFilename
      const suplier_id = data.fields.suplier_id[0]
 
      const product = await prisma.produk.create({
       data: {
         nama: nama,
         deskripsi: deskripsi,
         harga: Number(harga),
         stok: Number(stok),
         foto: foto,
         suplier_id: Number(suplier_id)
       },
     })
   
       return res.status(200).json({message: "Sukses menambah data produk", status: 200, data: product })  
    }     
  } catch (error) {
    return res.status(500).json({message: "Gagal Menambah Data Produk", status: 500, data: [{}] })  
    // console.log(error)
  }
  
}

