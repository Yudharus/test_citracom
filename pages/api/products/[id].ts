import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

type Data = {
  data?: {},
  message: string,
  status: number
}

const prisma = new PrismaClient();

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

    const id = req.query.id
    console.log("id ===", id)
    try {
      const product = await prisma.produk.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          nama: true,
          deskripsi: true,
          foto: true,
          stok: true,
          harga: true,
          suplier_id: true,
          suplier: {
            select: {
              nama_suplier: true,
            },
          },
        },
      })

      const arrProduct = []
      arrProduct.push(product)

      return res.status(200).json({message: "Sukses mendapatkan detail produk", status: 200,  data: arrProduct  })
    } catch (e) {
      return res.status(500).json({message: "Gagal mendapatkan detail produk", status: 200 })
    }
  // }
}
