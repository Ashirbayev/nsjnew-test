const oracledb = require('oracledb');
const errorHandler = require('../../utils/errorHandler')// вложенный


module.exports.editObtain = async function (req, res) {
    try {
       if (req.body.TEST == 1) { //При редактирований на 52 ом  если надо добавить выгодприобретателя
            connection = await oracledb.getConnection(
                {user: "insurance", password: 'insurance', connectString: "192.168.5.191/orcl"});
            let query = `begin NSJ.InsertObtainNszh(
                ${req.body.CNCT_ID},
                ${req.body.SICID},
                ${req.body.SICID_OBTAIN},
                ${req.body.PROC},
               ${req.body.TYPE},
                :id                
            );
            end;`;
            result = await connection.execute(query,
                {id: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER}});
            res.status(201).json({
                cnctid: result.outBinds.id
            })
        }


        else if (req.body.TEST == 2) { //При редактирований на 52 ом  если надо удлаить выгодприобретателя

 console.log('dsda ',req.body.SICID_OBTAIN)

           connection = await oracledb.getConnection(
               {user: "insurance", password: 'insurance', connectString: "192.168.5.191/orcl"});
           let query = 'DELETE FROM NSZH_CLIENTS_OBTAIN WHERE sicid_obtain = :id  and cnct_id = :id2 ';
           result = await connection.execute(query,
               {id:  req.body.SICID_OBTAIN,
                   id2:  req.body.CNCT_ID
               },  // bind value for :id
               {outFormat: oracledb.OUT_FORMAT_OBJECT,
                   autoCommit: true});
           res.status(201).json({
               cnctid: 'Удален' + req.params.id
           })





        //     connection = await oracledb.getConnection(
        //         {user: "insurance", password: 'insurance', connectString: "192.168.5.191/orcl"});
        //     let query = `
        // begin
        // DELETE FROM NSZH_CLIENTS_OBTAIN WHERE sicid_obtain = ${req.body.SICID_OBTAIN} and cnct_id = ${req.body.CNCT_ID};
        // COMMIT
        //     end;`;
        //
        //    result = await connection.execute(query,
        //        [],  // bind value for :id
        //        {outFormat: oracledb.OUT_FORMAT_OBJECT});
        //
        //     res.status(201).json({
        //         cnctid: 'Удален' + req.params.id
        //     })
        }
    } catch (e) {
        errorHandler(res, e)
    }
}



module.exports.createObtain = async function (req, res) {
    try {
        connection = await oracledb.getConnection(
            {user: "insurance", password: 'insurance', connectString: "192.168.5.191/orcl"});
        let query = `begin NSJ.InsertObtainNszh(
                '${req.body.M_SICID}',
                '${req.body.VIGODO_PRECENT}',
                '${req.body.TYPE_VIGODA}',
                :id                
            );
            end;`;
        result = await connection.execute(query,
            {id: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER}});
        res.status(201).json({
            cnctid: result.outBinds.id
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

