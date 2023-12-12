"use client";
import {
  Button,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AllData } from "../lib/fetching/product.lib";
import Image from "next/image";
import TambahData from "../components/TambahData";
import DeleteData from "../components/DeleteData";
import EditData from "../components/EditData";

const TABLE_HEAD = [
  "Nama",
  "Deskripsi",
  "Stok",
  "Harga",
  "Suplier",
  "Foto",
  "Aksi",
];

interface DeleteDataProps {
  v: String;
  id: Number;
}

interface EditDataProps {
  namaProp: string;
  deskripsiProp: string;
  hargaProp: number;
  stokProp: number;
}

export default function ListProducts() {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [valueProduk, setvalueProduk] = useState("")
  const [idProduk, setIdProduk] = useState(0)
  const [nama, setNama] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [harga, setHarga] = useState(0)
  const [stok, setStok] = useState(0)

  const handleOpen = () => setOpen(!open);
  
  const handleOpenEdit = (name, desk, harga, stok, id) => {
    setNama(name)
    setDeskripsi(desk)
    setHarga(harga)
    setStok(stok)
    setIdProduk(id)
    setOpenEdit(!openEdit)
  }

  const handleOpenDelete = (v: DeleteDataProps, id: DeleteDataProps) => {
    setIdProduk(id)
    setvalueProduk(v)
    setOpenDelete(!openDelete);
  }

  const initData = async () => {
    const response = await AllData();
    setProduct(response);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div>
      <Button
        onClick={handleOpen}
        className=" m-2"
        variant="gradient"
        color="green"
      >
        Tambah Data
      </Button>
      <TambahData open={open} handleOpen={handleOpen} />
      <EditData open={openEdit} handleOpen={handleOpenEdit} namaProp={nama} deskripsiProp={deskripsi} hargaProp={harga} stokProp={stok} idProp={idProduk}/>
      <DeleteData open={openDelete} handleOpen={handleOpenDelete} produk={valueProduk} id={idProduk}/>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {product.map(
              ({ deskripsi, foto, harga, nama, stok, suplier, id }, index) => {
                const isLast = index === product.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={nama}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nama}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {deskripsi}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {stok}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {harga}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {suplier.nama_suplier}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Image
                        alt="foto"
                        src={`/uploads/products/${foto}`}
                        width={80}
                        height={80}
                      />
                    </td>
                    <td className={classes}>
                      <div className="flex-col flex">
                        <Button
                          className="mb-2"
                          variant="gradient"
                          color="blue"
                          onClick={() => handleOpenEdit(nama, deskripsi, harga, stok, id)}
                        >
                          Edit
                        </Button>
                        <Button variant="gradient" color="red" onClick={() => handleOpenDelete(nama, id)}>
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
