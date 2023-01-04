migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("btl0u6t7g67cvcx")

  collection.name = "notes"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("btl0u6t7g67cvcx")

  collection.name = "test"

  return dao.saveCollection(collection)
})
