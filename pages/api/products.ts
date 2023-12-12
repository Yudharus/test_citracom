// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

type Data = {
  data: {},
  message: string,
  status: number
}

const prisma = new PrismaClient();

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
      const product = await prisma.produk.findMany({
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

      return res.status(200).json({message: "Sukses mendapatkan data" , status: 200,  data: product })
    } catch (e) {
      return res.status(500).json({message: "Gagal mendapatkan data" , status: 500, data: [] })
    }
}
