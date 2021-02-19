var atomicalgolia = require("atomic-algolia")
var indexName = "rxrw"
var indexPath = "./public/algolia.json"
var cb = function(error, result) {
    if (error) throw error

    console.log(result)
}

atomicalgolia(indexName, indexPath, cb)