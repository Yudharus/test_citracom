"use client";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { DeleteDataProducts } from "../lib/fetching/product.lib";
import { useRouter } from 'next/router';


interface TambahDataProps {
  open: boolean;
  produk: string;
  id: number;
  handleOpen: () => void;
}


export default function DeleteData({open, handleOpen, produk, id}: TambahDataProps) {
  const router = useRouter();
  const handleHapusData = async () => {
   const response = await DeleteDataProducts(id)
   if(response.status == 200){
    router.reload();
   }
  }

  return (
    <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Hapus Data</DialogHeader>
        <div className="px-4">
          <p className="text-md font-normal text-black mr-2">Yakin ingin menghapus {produk} ?</p>
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
          <Button variant="gradient" color="green" onClick={handleHapusData}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
  );
}
