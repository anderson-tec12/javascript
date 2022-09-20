var ConnectionFactory = (function (){
  const stores = ['negociacoes'];
  const version =4 
  const dbName = 'aluraframe'
  
  var connection = null
  var close = null 
  
  return  class ConnectionFactory{
    constructor(){
      throw new Error("Não é permitido crair instancias de ConnectionFactory")
    }
  
  
    static getConnection(){
      return new Promise((resolve, reject) => {
        let openRequest = window.indexedDB.open(dbName, version)
  
        openRequest.onupgradeneeded = e => {
          const result = e.target.result
          
          ConnectionFactory._createSctore(result)
          
        }
  
        openRequest.onsuccess = e => {
          if(!connection){
            connection = e.target.result
            close = connection.close.bind(connection)
            connection.close = function(){
              throw new Error('Você não pode fechar diretamente a conexao')
            }
          }
  
          resolve(connection)
        }
  
        openRequest.onerror = e => {
          console.log('Error',e.target.error)
          reject(e.target.error.name)
        }
      })
    }
  
    static _createSctore(connection){
      stores.forEach( store => {
        if(connection.objectStoreNames.contains(store)){
          connection.deleteObjectStore(store)
        }
        connection.createObjectStore(store,{autoIncrement: true})
      })
    }

    static _closeConnection(){
      if(connection){
        close()
        connection = null
      }
    }
  }
})()

