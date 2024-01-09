const toAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      const address = data.display_name;
      return address;
    } catch (error) {
      console.error('Lỗi khi lấy địa chỉ:', error);
      return null;
    }
  };

export  {toAddress};