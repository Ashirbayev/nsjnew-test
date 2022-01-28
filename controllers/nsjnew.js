const oracledb = require('oracledb');

const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try{
        const categories = await Category.find({user: req.user.id})
        res.status(200).json(categories)
    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.selectAllTest =async function (req, res) {
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
         result = await connection.execute(
            `select * from BORDERO_STATE`,
            [],  // bind value for :id
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

         const test = result.rows
        res.send(test);
        //res.status(200).json(test)


    } catch (e) {
        errorHandler(res, e)
    }

}


module.exports.getByIIN = async function (req, res) {
      try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        let query = `select * from(
    select id, name||' ('||bin||') (Юридическое лицо)' name, 1 type_client from contr_agents where concat(upper(name), bin) like upper('%${req.params.id}%') 
    union all
    select C.SICID id, C.LASTNAME||' '||C.FIRSTNAME||' '||C.MIDDLENAME||' ('||iin||') (Физическое лицо)' name, 0 type_client from clients c where 
    concat(upper(lastname||' '||firstname||' '||middlename), iin) like upper('%${req.params.id}%') 
    order by 3
    ) where rownum <= 8`
        ;
        // run query to get all employees
        result = await connection.execute(query,
            [],  // bind value for :id
            { outFormat: oracledb.OUT_FORMAT_OBJECT });

        const test = result.rows
        res.send(test);
        //res.status(200).json(test)


    } catch (e) {
        errorHandler(res, e)
    }


}







