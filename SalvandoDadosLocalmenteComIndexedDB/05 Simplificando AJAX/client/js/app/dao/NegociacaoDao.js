class NegociacaoDao{
  
 
  
  constructor(connection){
    this._connection = connection;
    this._store = 'negociacoes'
  }


  adiciona(negociacao){
    return new Promise((reseolve, reject) => {
    
      console.log(this._connection)
      console.dir(this._connection)
      console.log(this._connection.transaction([this._store], 'readwrite')
      .objectStore(this._store))

    let request =  this._connection
      .transaction([this._store], 'readwrite')
      .objectStore(this._store)
      .add(negociacao);

      request.onsuccess = e => {
        reseolve()
      }

      request.onerror = e => {
        console.log(e.target.error)
        reject('Não foi possivel adicionar a negociação')
      }
    })


    
  }

  listaTodos(){
    return new Promise((resolve, reject) => {
       
      let cursor = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor()

       
      
      let negociacoes = []
      let negociacoes_indexDB = []
      
      cursor.onsuccess = e => {
        let ponteroAtual = e.target.result

        if(ponteroAtual){
          console.log('ponteroAtual.value', ponteroAtual.value)
          var dado = ponteroAtual.value

          negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor))
          negociacoes_indexDB.push(dado)

          ponteroAtual.continue()
        }else{
          console.log('ACABOU OS DADOS')
          console.log('Todos os dados obtidos', negociacoes)
          console.log('Todos os dados obtidos', negociacoes_indexDB)

          resolve(negociacoes)
        }
      }

        cursor.onerror = e => {
          console.log('Erro', e.target.error)
          reject('Não foi possivel lista as negociações')
        }
    })
  }

  apagaTodos(){
    return new Promise((resolve,reject) =>{
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear()        
       
      
        request.onsuccess= (e) => {
        
          resolve('Todas as negociação removida')
        }

        request.onerror = e => reject('Não foi possivel apagar')
    })
  }

  getID(){
    return new Promise((resolve,reject) =>{
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .get(7)

        window.request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        
       
      
        request.onsuccess= (e) => {
          console.log('delete deu certo', e.target.result)
          resolve('Negociação removida')
        }
    })
  }

  deleteId(){
    return new Promise((resolve,reject) =>{
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .delete(1)

        window.request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        
       
      
        request.onsuccess= (e) => {
          console.log('delete deu certo', e.target.result)
          resolve('Negociação removida')
        }
    })
  }

  getAll(){
    return new Promise((resolve,reject) =>{
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .getAll()

        window.request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        
       
      
        request.onsuccess= (e) => {
          console.log('delete deu certo', e.target.result)
          resolve('Negociação removida')
        }
    })
  }

  put(){
    return new Promise((resolve,reject) =>{
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .put(1)

        window.request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        
       
      
        request.onsuccess= (e) => {
          console.log('delete deu certo', e.target.result)
          resolve('Negociação removida')
        }
    })
  }
}

//ConnectionFactory.getConnection().then(conection => new NegociacaoDao(conection).adiciona(new Negociacao(new Date(), 7 ,100)));
//ConnectionFactory.getConnection().then(conection => new NegociacaoDao(conection).getAll());