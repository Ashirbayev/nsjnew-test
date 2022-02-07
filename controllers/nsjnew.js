const oracledb = require('oracledb');
const errorHandler = require('../utils/errorHandler')



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



module.exports.getAllRegions = async function (req, res) {
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        let query = `select RFBN_ID, NAME from DIC_BRANCH where nvl(asko, 0) = 0 and rfbn_id <> '0000' order by 1`
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


module.exports.getZavNum = async function (req, res) {
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        let query = `select gen_zv_num('${req.params.id}', '0601000001', '01') cn from dual`
        ;
        // run query to get all employees
        result = await connection.execute(query,
            [],  // bind value for :id
            { outFormat: oracledb.OUT_FORMAT_OBJECT });


        res.send(result.rows);
        //res.status(200).json(test)


    } catch (e) {
        errorHandler(res, e)
    }

}


module.exports.createAns = async function (req, res) {

     k = req.body.ID_QUESTION
     v = req.body.ID_ANSWER
     // q_id = 15
    try {
        connection = await oracledb.getConnection(
            {user: "insurance", password: 'insurance', connectString: "192.168.5.191/orcl"});

        result = await connection.execute(`begin NSJ.Save_attachment('${k}', '${v}', '15', '2', 'kjhjk', '55');  end;`);


        console.log('Rows inserted: ', k);

        res.status(201).json({
            token: `Bearer ${v}`
        })

    } catch (e) {
        errorHandler(res, e)
    }
}



module.exports.createZayav = async function (req, res) {


    try {
        connection = await oracledb.getConnection(
            {user: "insurance", password: 'insurance', connectString: "192.168.5.191/orcl"});

        let query =`begin NSJ.Save_zayav(
            '0',
            '${req.body.BRANCH_ID}',
            '${req.body.ZAV_NUMBER}',
            to_date('${req.body.DATE_ZAV}', 'dd.mm.yyyy'),            
            '${req.body.STRAH_VZNOS}',
            '${req.body.SELECT_ID_AGENT}',
            '${req.body.AGENT_RASHOD}',
            '${req.body.PERIOD}',
            '${req.body.SROK_STRAH}',
            '${req.body.MAIN_POKR}',
            '1',
            '${req.body.GOD_DOHOD}',
            '${req.body.VIGODO_SMERT}',
            '${req.body.VIGODO_ZHIZN}',
            '${req.body.STRAHOVATEL}',
            '${req.body.ZASTRAHOVAN}',
            '${req.body.ANSWERS}',
           '${req.body.EMPID}',
           '${req.body.RISK}',
           :id
            ); end; `;
        result = await connection.execute(query,
            { id: {dir: oracledb.BIND_OUT,type: oracledb.NUMBER} });



        console.log('Output: ' + result.outBinds.id);


        console.log('Rows inserted: ', req.body.ANSWERS);

        res.status(201).json({
            token: `Bearer ${req.body.EMPID}`
        })

    } catch (e) {
        errorHandler(res, e)
    }
}




/*
Procedure Save_zayav(
    icnct number,
    branch_id number,
    num_zav varchar2,
    date_zav date,
    strah_vznos number,
    agents number,
    agent_rashod number,
    periodich varchar2,
    srok_strah number,
    main_pokr number,
    dop_pokr varchar2 default null,
    god_dohod number,
    ilist_user_smert varchar2,
    ilist_user_dozhitia varchar2,
    id_strahovatel number,
    id_zastrahovan number,
    ilist_question varchar2,
    empid number,
    irisk varchar2,
    iids out number
);*/




