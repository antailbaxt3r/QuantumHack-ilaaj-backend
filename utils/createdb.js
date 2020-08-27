var db = require("../db/models/db");

async function public_force(){
    console.log("Public force executed");

    firstUser = await db.models.users.create({
        name: "user1",
        email: "abc@gmail.com",
    })

    doc = await db.models.documents.create({
        name: "Doc 1",
        record_id: 1,
        user_id: 1
    })
    
}

async function main(){

    var schema = ['sequelize', true, public_force];
    
    console.log("Creating the tables");

    console.log(schema);
    public_ret = await db[schema[0]].sequelize.sync({ force: schema[1] });

    console.log( schema[0] +  " created");
    if(schema[1]){
        force_ret = await schema[2]();
        console.log(schema[0] + " force param executed " + force_ret);
    }
    console.log("\n\n\n\n\n");
    process.exit()
}

if(require.main == module){
    main();
}
