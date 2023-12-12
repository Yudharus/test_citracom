
import Axios from "@/pages/config/Axios.config";

const AllData = async () => {
  try {
    const response = await Axios.get(
      `/products`,
      {
        headers: {
          accept: 'Application/json',
        }
      },
    );

    return response.data.data
  } catch (error) {

    return [];
  }
};

const TambahProducts = async (
  nama = "",
  deskripsi = "",
  harga = "",
  stok = "",
  foto = <File>{},
  suplier_id = ""
) => {
  let data = new FormData();

  data.append("nama", nama);
  data.append("deskripsi", deskripsi);
  data.append("harga", harga);
  data.append("stok", stok);
  data.append("suplier_id", suplier_id);
  data.append("foto", foto);

  try {
    const response = await Axios.post('/tambah-products', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {

    return false;
  }
};

const EditProducts = async (
  id = 0,
  nama = "",
  deskripsi = "",
  harga = "",
  stok = "",
  foto = <File>{},
  suplier_id = ""
) => {
  let data = new FormData();

  data.append("nama", nama);
  data.append("deskripsi", deskripsi);
  data.append("harga", harga);
  data.append("stok", stok);
  data.append("suplier_id", suplier_id);
  data.append("foto", foto);

  try {
    const response = await Axios.post(`/edit-products/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    
    return false;
  }
};

const DeleteDataProducts = async (id = 0) => {
  try {
    const response = await Axios.delete(`/delete-product/${id}`, {
    });

    return response.data;
  } catch (error) {
    
    return false;
  }
};

export {
  AllData,
  TambahProducts,
  DeleteDataProducts,
  EditProducts
};
