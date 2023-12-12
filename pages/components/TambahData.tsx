"use client";
import {
  Button,
  Dialog,
  DialogHeader,
  Select,
  Option,
  DialogFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { SupplierData } from "../lib/fetching/suplier.lib";
import { TambahProducts } from "../lib/fetching/product.lib";
import { useRouter } from 'next/router';


interface TambahDataProps {
  open: boolean;
  handleOpen: () => void;
}


export default function TambahData({open, handleOpen}: TambahDataProps) {
  const [supplier, setSupplier] = useState([])
  const [nama, setNama] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [harga, setHarga] = useState(0)
  const [stok, setStok] = useState(0)
  const [foto, setFoto] = useState<File>()
  const [idSupplier, setIdSupplier] = useState(0)
  const router = useRouter();
  

  const initData = async () => {
    const getSuplier = await SupplierData()
    
    setSupplier(getSuplier)
  }

  useEffect(() => {
    initData()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      
      setFoto(i)
    }
  };

  // console.log("foto state", foto)

  const handleTambahData = async () => {
    const response = await TambahProducts(nama, deskripsi, harga, stok, foto, idSupplier)
    if(response.status == 200){
      router.reload();
    }
  }

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Tambah Data Produk</DialogHeader>
      <div className="px-4">
        <div>
          <p className="text-md font-normal text-black mr-2">Nama :</p>
          <input
            className="w-full h-fit h-22 border border-gray focus:ring-transparent text-md font-normal text-black rounded-md p-1 mt-2"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <p className="text-md font-normal text-black mr-2">Deskripsi :</p>
          <input
            className="w-full h-fit h-22 border border-gray focus:ring-transparent text-md font-normal text-black rounded-md p-1 mt-2"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <p className="text-md font-normal text-black mr-2">Harga :</p>
          <input
            type="number"
            className="w-full h-fit h-22 border border-gray focus:ring-transparent text-md font-normal text-black rounded-md p-1 mt-2"
            value={harga}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              setHarga(newValue)
            }}
          />
        </div>
        <div className="mt-2">
          <p className="text-md font-normal text-black mr-2">Stok :</p>
          <input
            type="number"
            className="w-full h-fit h-22 border border-gray focus:ring-transparent text-md font-normal text-black rounded-md p-1 mt-2"
            value={stok}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              setStok(newValue)
            }}
          />
        </div>
        <div className="mt-2">
          <p className="text-md font-normal text-black mr-2">Foto :</p>
          <input type="file" className="mt-2" onChange={handleChange} />
        </div>
        <p className="text-md font-normal text-black mt-4">Pilih Suplier :</p>
        <div className="w-72 mt-4">
          <Select label="Pilih Suplier" onChange={(e) => setIdSupplier(e)}>
            {supplier.map(({ nama_suplier, id_suplier }) => {
              return <Option value={id_suplier}>{nama_suplier}</Option>;
            })}
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleTambahData}>
          <span>Tambah Data</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
