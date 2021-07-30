const   mongo   =   require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017";
const url = "mongodb+srv://team2_user:team2@cluster0.wwurv.mongodb.net/travelexperts?retryWrites=true&w=majority"

module.exports.getPackages = function (PackageId,callback){ 
  mongo.connect(url, {
                useNewUrlParser:   true,
                useUnifiedTopology:   true
          },
          (err,   client) =>   {
                if   (err)   {throw   err;}
        const   db   =   client.db("travelexperts");
        const   collection   =   db.collection("packages");
        const query = {}

        if (PackageId) query.PackageId = parseInt(PackageId);

        collection.find(query).toArray((err,   items)   =>   {
                //   code   goes   here
          // console.log(items)
          console.log(query);
          callback(err,items)
          });
              
          }
    )};
   