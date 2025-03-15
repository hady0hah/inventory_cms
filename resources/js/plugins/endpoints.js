let endpoints = {
    'product_categories': {
        'list':     '/api/category/getAll',
        'add':      '/api/category',
        'delete':   '/api/category/delete/:id',
        'edit':     '/api/category/edit?id=:id',
    },
    'items': {
        'list':     '/api/items/category?id=:id',
        'add':      '/api/items',
        'delete':   '/api/items/delete?id=:id',
        'edit':     '/api/items/edit?id=:id',
    },

    resolve(url, params) {
        let _url = url
        for (let [k, v] of Object.entries(params)) {
            _url = _url.replace(':' + k, v)
        }
        return _url
    },
}

export default endpoints
