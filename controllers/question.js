
const oracledb = require('oracledb');

const errorHandler = require('../utils/errorHandler')


module.exports.getAllQuestions =async function (req, res) {
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        result = await connection.execute(
            `select * from NSZH_BLANK_QUESTION q  where  q.type = 1 and id not in (81, 82,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136) order by id`,
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