
const oracledb = require('oracledb');
const errorHandler = require('../../utils/errorHandler')// вложенный


module.exports.calculator = async function (req, res) {
    try {
        connection = await oracledb.getConnection(
            {user: "insurance", password: 'insurance', connectString: "192.168.5.191/orcl"});
        let query = `
        BEGIN 
        Insert INTO NSZH_ANDER_RASSCHET_TEMP(
                SMERT_PO_LYUBOI_PRICHINE_PER, 
                SMERT_V_RES_NS_PER, 
                INVALID_PER_VTOR_RES_NS_PER,
                TRAVMA_RES_NS_PER, 
                VREM_NETRUDOSPOSOB_NS_PER, 
                GOSPITAL_RES_NS_PER, 
                CNCT_ID, 
                ID_RISK,
                SMERT_PO_LYUBOI_PRICHINE_PRO, 
                SMERT_V_RES_NS_PRO, 
                INVALID_PER_VTOR_RES_NS_PRO, 
                TRAVMA_RES_NS_PRO, 
                VREM_NETRUDOSPOSOB_NS_PRO, 
                GOSPITAL_RES_NS_PRO
                )
                VALUES (
            ${req.body.SMERT_PO_LYUBOI_PRICHINE_PER} ,
            ${req.body.SMERT_V_RES_NS_PER},
            ${req.body.INVALID_PER_VTOR_RES_NS_PER},
            ${req.body.TRAVMA_RES_NS_PER},
            ${req.body.VREM_NETRUDOSPOSOB_NS_PER},
            ${req.body.GOSPITAL_RES_NS_PER},
            ${req.body.CNCT_ID},
            ${req.body.ID_RISK},
            ${req.body.SMERT_PO_LYUBOI_PRICHINE_PRO},
            ${req.body.SMERT_V_RES_NS_PRO},
            ${req.body.INVALID_PER_VTOR_RES_NS_PRO},
            ${req.body.TRAVMA_RES_NS_PRO},
            ${req.body.VREM_NETRUDOSPOSOB_NS_PRO},
            ${req.body.GOSPITAL_RES_NS_PRO}
           );
           COMMIT; 
           end;`;
        // run query to get all employees
        result = await connection.execute(query,
            [],  // bind value for :id
            {outFormat: oracledb.OUT_FORMAT_OBJECT});

    //
    //     "begin NSJ.ner_nszh(
    //     ".$cnct_id.",
    // :id
    // ); end;"
            res.status(201).json({
                cnctid: req.body.CNCT_ID
        })
    } catch (e) {
        errorHandler(res, e)
    }
}



module.exports.getCalcResult = async function (req, res) {

    //console.log(req.params.id)
    try {
        connection = await oracledb.getConnection({
            user: "insurance",
            password: 'insurance',
            connectString: "192.168.5.191/orcl"
        });
        let query = `begin NSJ.ner_nszh(${parseInt(req.params.id)}, :res); end; `;
        // run query to get all employees

        result = await connection.execute(query,
            {res: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER}});
        let query2 = `select * from nszh_calc_results ns, NSZH_DOP_POKR_STRAH_SUM nds, NSZH_DIC_POKR dp where ns.id = ${parseInt(req.params.id)} and ns.id = nds.CNCT_ID and nds.ID_DOP_POKR = dp.ID order by nds.ID_DOP_POKR DESC`
        ;
        // run query to get all employees
        result2 = await connection.execute(query2,
            [],  // bind value for :id
            {outFormat: oracledb.OUT_FORMAT_OBJECT});

        const test = result2.rows

        res.send(test);


    } catch (e) {
        errorHandler(res, e)
    }
}

//
//
// $this->dan['rasschet_dannie'] = $this->db->select("select * from nszh_calc_results where id = $id");
//
// $this->dan['rasschet_dannie'] = $this->db->select("select * from nszh_calc_results ns, NSZH_DOP_POKR_STRAH_SUM nds, NSZH_DIC_POKR dp where ns.id = $id and ns.id = nds.CNCT_ID and nds.ID_DOP_POKR = dp.ID order by nds.ID_DOP_POKR DESC");
//



