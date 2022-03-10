const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')
const oracledb = require('oracledb');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
           try{
               connection = await oracledb.getConnection({
                   user: "insurance",
                   password: 'insurance',
                   connectString: "192.168.5.191/orcl"
               });
               result = await connection.execute(`select * from TB_USERS where USR_ID = ${payload.userId}`)

              user1 =  {
                  email: payload.userId,
                  password: payload.email,
                  role: 5
               }
               console.log(user1)
               const test = result.rows[0]
                if (test[1] == payload.email && user1.role == 5 ){
                    done(null, user1)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}




// module.exports.getZavNum = async function (req, res) {
//     connection = await oracledb.getConnection({
//         user: "insurance",
//         password: 'insurance',
//         connectString: "192.168.5.191/orcl"
//     });
//     result = await connection.execute(`select USR_LOGIN from TB_USERS where USR_LOGIN = (${parseInt(req.params.id)});`);
//
//
//
//
//     try {
//         connection = await oracledb.getConnection({
//             user: "insurance",
//             password: 'insurance',
//             connectString: "192.168.5.191/orcl"
//         });
//         let query = `select gen_zv_num('${req.params.id}', '0601000001', '01') cn from dual`
//         ;
//         // run query to get all employees
//         result = await connection.execute(query,
//             [],  // bind value for :id
//             {outFormat: oracledb.OUT_FORMAT_OBJECT});
//
//
//         res.send(result.rows);
//         //res.status(200).json(test)
//
//
//     } catch (e) {
//         errorHandler(res, e)
//     }
//
// }