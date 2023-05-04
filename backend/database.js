const res = require('express/lib/response');
const { MongoClient } = require('mongodb');

let client;

exports.client = client;

exports.initiate = async function initiate(uri) {
    // we'll add code here soon
    return new Promise(async (resolve) => {
        let client = new MongoClient(uri);
        await client.connect();

        try {
            await client.connect();

            await this.listDatabases(client);

        } catch (e) {
            console.error(e);
        }
        finally {
            console.log("MongoDB: connection is established")
            this.client = client;
            return resolve(client)
        }
    })
}

//Inserts one document to the collection
exports.createDocument = async (client, newDocument, database, collection) => {
    const result = await client.db(database).collection(collection).insertOne(newDocument);
    console.log(`New document created with the following id: ${result.insertedId} in Database ${database}, collection ${collection}`);
    return result;
}
//Inserts multiple documents to the collection
exports.createMultipleDocuments = async (client, newDocuments, database, collection) => {
    const result = await client.db(database).collection(collection).insertMany(newDocuments);
    console.log(`${result.insertedCount} new document(s) created with the following id(s): `);
    console.log(result.insertedIds);
    console.log(` in Database ${database}, collection ${collection}`);
    return result;
}


exports.findDocument = async (client, filter, database, collection) => {
    const result = await client.db(database).collection(collection).findOne(filter);
    if (result) {
        console.log(`Found a listing in the collection with the name '${JSON.stringify(filter)}':`);
        console.log(result);
        return result;
    } else {
        console.log(`No listings found with the name '${JSON.stringify(filter)}'`);
        return undefined;
    }
}

exports.findMultipleDocuments = async (client, filter, database, collection) => {
    const cursor = await client.db(database).collection(collection).find(filter).sort({ last_review: -1 });;
    const results = await cursor.toArray();
    if (results) {
        console.log(`Found a listing in the collection with the name '${filter}':`);
        console.log(results);
        return results;
    } else {
        console.log(`No listings found with the name '${filter}'`);
    }
}

exports.updateDocument = async (client, filter, update, database, collection, upsertOption = false) => {
    const result = await client.db(database).collection(collection)
        .updateOne(filter, { $set: update }, { upsert: upsertOption });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.vfmodifiedCount} document(s) was/were updated.`);
    return result;
}

exports.updateMultipleDocuments = async (client, filter, update, database, collection, upsertOption = false) => {
    const result = await client.db(database).collection(collection)
        .updateMany(filter, { $set: update }, { upsert: upsertOption });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
    return result;
}

exports.deleteDocument = async (client, filter, database, collection) => {
    const result = await client.db(database).collection(collection)
        .deleteOne(filter);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    return result;
}

exports.deleteMultipleDocuments = async (client, filter, database, collection) => {
    const result = await client.db(database).collection(collection)
        .deleteMany(filter);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    return result;
}



//Displays all databases
exports.listDatabases = async (client) => {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};