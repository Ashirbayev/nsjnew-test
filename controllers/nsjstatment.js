const oracledb = require('oracledb');
const errorHandler = require('../utils/errorHandler')


module.exports.getStatments = async function (req, res) {
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        result = await connection.execute(
            `SELECT * FROM NSZH_STATEMENT where state = 50 or state = 51 or state = 52  order by id desc`,
            [],  // bind value for :id
            {outFormat: oracledb.OUT_FORMAT_OBJECT}
        );

        const test = result.rows
        res.send(test);
        //res.status(200).json(test)


    } catch (e) {
        errorHandler(res, e)
    }

}

module.exports.getStatmentById = async function (req, res) {
    console.log(req.params.id)

    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        let query = `SELECT * FROM NSZH_STATEMENT where ID = ${parseInt(req.params.id)}`
        ;
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


module.exports.getAnswerById = async function (req, res) {
    console.log(req.params.id)
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        let query = `select * from NSZH_CLIENTS_MAIN_BLANK nm, NSZH_BLANK_QUESTION nq where NM.STMNT_ID = ${req.params.id} and nm.id_question = nq.id order by NM.ID`;
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


module.exports.setStatus5152 = async function (req, res) {  //// Тип исполнения
    try {


        if (req.body.TEST == 51) {


            connection = await oracledb.getConnection(
                {user: "insurance", password: 'insurance', connectString: "192.168.5.191/orcl"});
            result = await connection.execute(`begin NSJ.set_edit51(${parseInt(req.params.id)}); end;`);
        } else if (req.body.TEST == 52) {


            connection = await oracledb.getConnection(
                {user: "insurance", password: 'insurance', connectString: "192.168.5.191/orcl"});
            result = await connection.execute(`begin NSJ.set_return(${parseInt(req.params.id)}, ''); end;`);
        }


        res.status(201).json({
            cnctid: req.params.id
        })
    } catch (e) {
        errorHandler(res, e)
    }
}










