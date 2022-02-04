const oracledb = require('oracledb');
const errorHandler = require('../utils/errorHandler')


module.exports.getAgents = async function (req, res) {
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        let query = `select a.id kod,  decode(a.vid,1,lastname ||' '|| firstname||' '||middlename, a.org_name) name, 
            a.CONTRACT_NUM, a.CONTRACT_DATE_BEGIN
            from agents a where a.state = 7 and a.date_close is null  and a.vid not in (4, 5)`
        ;
        // run query to get all employees
        result = await connection.execute(query,
            [],  // bind value for :id
            {outFormat: oracledb.OUT_FORMAT_OBJECT});

        const test = result.rows
        //res.send(test);
        res.status(200).json(test)


    } catch (e) {
        errorHandler(res, e)
    }
}