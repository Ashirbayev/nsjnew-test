

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User =require('../models/User')
const keys = require('../config/keys')
const errorHadler = require('../utils/errorHandler')
const oracledb = require('oracledb');



module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    connection = await oracledb.getConnection({
        user: "insurance",
        password: 'insurance',
        connectString: "192.168.5.191/orcl"
    });
    result = await connection.execute(`select * from TB_USERS where USR_LOGIN = '${req.body.email}' `)


    const test = result.rows[0]
     if (test) {
        //Проверка пароля, пользователь существует
        if (req.body.password == test[2]) {
            //Генерация токена, пароли совпали
            const token = jwt.sign({
                email: test[1],
                userId: test[0]
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }

        else {
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })
        }
    }

    else {
        //Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким емайл не найден.'
        })
    }
}


module.exports.login2 = async function (req, res) {
    try {
    connection = await oracledb.getConnection({
        user: "insurance",
        password: 'insurance',
        connectString: "192.168.5.191/orcl"
    });

    result = await connection.execute(
        `select * from NSJ_USERS  where EMAIL = ${req.body.email}`,
        [],  // bind value for :id
        {outFormat: oracledb.OUT_FORMAT_OBJECT}
    );

        console.log(result.rows.length)

        const test = result.rows
        res.send(test);
    } catch (e) {
        errorHandler(res, e)
    }


    // const candidate = await User.findOne({email: req.body.email})
    //
    // if (candidate) {
    //     //Проверка пароля, пользователь существует
    //     const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    //     if (passwordResult) {
    //         //Генерация токена, пароли совпали
    //
    //         const token = jwt.sign({
    //             email: candidate.email,
    //             userId: candidate._id
    //         }, keys.jwt, {expiresIn: 60 * 60})
    //
    //
    //         res.status(200).json({
    //             token: `Bearer ${token}`
    //         })
    //     } else {
    //         res.status(401).json({
    //             message: 'Пароли не совпадают. Попробуйте снова.'
    //         })
    //     }
    // } else {
    //     //Пользователя нет, ошибка
    //     res.status(404).json({
    //         message: 'Пользователь с таким емайл не найден.'
    //     })
    // }
}




module.exports.register = async function (req, res) {
    // email password
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // Пользователь существует, нужно отправить ошибку
        res.status(409).json({
            message: "Такой емайл уже занят. Пробуйте другой."
        })
    } else {
        //Нужно создать пользователя
         const salt = bcrypt.genSaltSync(10)
         const password = req.body.password
         const user = new User({
             email: req.body.email,
             password: bcrypt.hashSync(password, salt)
         })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHadler(res, e)
        }

    }
}