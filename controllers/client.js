const oracledb = require('oracledb');
const errorHandler = require('../utils/errorHandler')


module.exports.getClientByID = async function (req, res) {
    console.log(req.params.id)
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        let query = `select * from clients where SICID = ${req.params.id}`;
        // run query to get all employees
        result = await connection.execute(query,
            [],  // bind value for :id
            {outFormat: oracledb.OUT_FORMAT_OBJECT});
        const test = result.rows
        res.send(test);
        //res.status(200).json(test)
    } catch (e) {
        errorHandler(res, e)
    }
}
