class HttpService {
    _handleErrors(res){
        if(res.ok){
            return res
        }else{
             throw new Error(res.statusText)
        }
    }

    get(url) {
        
        return fetch(url)
            .then(res => _handleErrors(res))
            .then(res => res.json())
            
    }

    post(url, dato){
        return fetch(url, {
            headers:{
                'Content-Type':'application/json',
                method:'post',
                body: JSON.stringify(dato)
            }
        })
        .then(res => _handleErrors(res))
        .then(res => res.json())

    }
}