// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

type Data = {
  message: string,
  status: number
}

const prisma = new PrismaClient();

export default async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const id = req.query.id
    try {
      const product = await prisma.produk.delete({
        where: {
            id: Number(id)
          },
      })

      return res.status(200).json({message: "sukses delete produk" , status: 200})
    } catch (e) {
        console.log(e)
      return res.status(500).json({message: "Gagal delete" , status: 500, })
    }
}
