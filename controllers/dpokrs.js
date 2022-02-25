const oracledb = require('oracledb');
const errorHandler = require('../utils/errorHandler')


module.exports.getDopPokrById = async function (req, res) {
    console.log(req.params.id)
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        let query = `select * from NSZH_DOP_POKR_STRAH_SUM ns, NSZH_DIC_POKR nd where ns.id_dop_pokr = nd.id and ns.cnct_id = ${req.params.id} and nd.PMAIN = 0`;
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


module.exports.getNagruzById = async function (req, res) {
    console.log(req.params.id)
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        let query = `select n.*, D.ID, D.NAME name_risk from NSZH_NAGRUZ n, DOBR_DIC_SPR d where n.id_risk = d.id and n.cnct_id = ${req.params.id}`;
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