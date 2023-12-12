
import Axios from "@/pages/config/Axios.config";

const SupplierData = async () => {
  try {
    const response = await Axios.get(
      `/suplier`,
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



export {
    SupplierData,
};
