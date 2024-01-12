const paginate = async (model, pageNumber, PAGE_SIZE, field1 = null, value1 = null, field2 = null, value2 = null) => {
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

export { paginate };
