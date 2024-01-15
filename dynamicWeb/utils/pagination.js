const paginateReport = async (model, pageNumber, PAGE_SIZE, field1 = null, value1 = null, field2 = null, value2 = null) => {
    const skip = (pageNumber - 1) * PAGE_SIZE;

    const query = {};
    
    if (field1 !== null && value1 !== null) {
        query[field1] = value1;
    }
    
    if (field2 !== null && value2 !== null) {
        query[field2] = value2;
    }
    if (query['district'] === 'Quận' ) {
        query['district'] = { $ne: null };
        
    }
    if (query['ward'] === 'Phường'){
        query['ward'] = { $ne: null };
    }
    const totalDocs = await model.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / PAGE_SIZE);

    const results = await model.find(query).skip(skip).limit(PAGE_SIZE);

    const pageSize = results.length;

    return { results, page: pageNumber, pageSize, totalPages, totalDocs };
};
  
const paginateAds = async (model,pageNumber, PAGE_SIZE, district, ward) => {
    const skip = (pageNumber - 1) * PAGE_SIZE;
    console.log(district, ward)
    const matchQuery = {};
      if (district !== null && district !== undefined) {
        matchQuery['setpointInfo.district'] = district
      }
      if (ward !==  null && ward !== undefined) {
        matchQuery['setpointInfo.ward'] = ward;
      }
    const result = await model.aggregate([
        {
          $lookup: {
            from: 'setpoints',
            localField: 'id_setpoint',
            foreignField: '_id',
            as: 'setpointInfo'
          }
        },
        {
          $unwind: '$setpointInfo'
        },
        {
          $match: matchQuery
        },
        {
          $lookup: {
            from: 'companies',
            localField: 'companyId',
            foreignField: '_id',
            as: 'companyInfo'
          }
        },
        {
          $unwind: '$companyInfo'
        },
        {
          $skip: skip
        },
        {
          $limit: PAGE_SIZE
        },
        // {
        //   $project: {
        //     typeofAds: 1,
        //     width: 1,
        //     height: 1,
        //     quantity: 1,
        //     startDate: 1,
        //     setpointInfo: {
        //       _id: '$setpointInfo._id',
        //       lat: '$setpointInfo.lat',
        //       lng: '$setpointInfo.lng',
        //       typeofLocation: '$setpointInfo.typeofLocation',
        //       adsFormat: '$setpointInfo.adsFormat',
        //       isPlanned: '$setpointInfo.isPlanned',
        //       image: '$setpointInfo.image',
        //       district: '$setpointInfo.district',
        //       ward: '$setpointInfo.ward',
        //       address: '$setpointInfo.address'
        //     },
        //     companyInfo: {
        //       _id: '$companyInfo._id',
        //       name: '$companyInfo.name',
        //       email: '$companyInfo.email',
        //       phoneNumber: '$companyInfo.phoneNumber',
        //       address: '$companyInfo.address',
        //       createdAt: '$companyInfo.createdAt',
        //       updatedAt: '$companyInfo.updatedAt',
        //       __v: '$companyInfo.__v'
        //     },
        //     expireDate: 1,
        //     isLicensed: 1,
        //     image: 1
        //   }
        // }
      ]).exec();
    
  
    const totalDocs = await model.countDocuments(matchQuery);
  
    const totalPages = Math.ceil(totalDocs / PAGE_SIZE);
    console.log(result)
    return {
        results: result.map((item) => ({
          _id: item._id,
          typeofAds: item.typeofAds,
          width: item.width,
          height: item.height,
          quantity: item.quantity,
          startDate: item.startDate,
          setpointInfo: item.setpointInfo,
          companyInfo: item.companyInfo,
          expireDate: item.expireDate,
          isLicensed: item.isLicensed,
          image: item.image
        })),
        page: pageNumber,
        pageSize: result.length,
        totalPages,
        totalDocs
      };
  };

  
  
  
export { paginateReport, paginateAds };
