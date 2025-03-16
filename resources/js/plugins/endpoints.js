let endpoints = {
    'product_categories': {
        'list':     '/api/category/getAll',
        'create':      '/api/category/create',
        'delete':   '/api/category/delete/:id',
        'edit':     '/api/category/edit/:id',
    },
    'items': {
        'list_page':     '/items_list/:category_id',
        'list_data':     '/api/item/getAll/:uid/:category_id',
        'add':      '/api/item',
        'delete':   '/api/item/delete/:id',
        'edit':     '/api/item/edit/:id',
        'change_status': '/api/item/status/:id',
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
