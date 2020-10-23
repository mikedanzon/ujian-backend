const Router = require('express').Router()
const { db } = require('../connection')

Router.get('/bestseller',(req,res)=>{
    let sql = `SELECT t.penjualid, p.namatoko, COUNT(*) as totaltransaksi
    FROM transaksi t
    JOIN penjual p
    ON t.penjualid = p.id
    WHERE status='FINISHED'
    GROUP BY t.penjualid`;
    db.query(sql,(err,results)=>{
        if(err){ return res.status(500).send(err) }
        return res.status(200).send(results[0])
    })
})

Router.get('/bestcategory',(req,res)=>{
    let sql = `SELECT cp.namacategory
    FROM transaksi t
    JOIN products p
    ON t.productid = p.id
    JOIN category_products cp
    ON p.categoryprodid = cp.id
    WHERE t.status = 'FINISHED'
    GROUP BY cp.namacategory
    ORDER BY COUNT(*) DESC
    LIMIT 1;`
    db.query(sql,(err,results)=>{
        if(err){ return res.status(500).send(err) }
        return res.status(200).send(results[0])
    })
})

Router.get('/usernotseller',(req,res)=>{
    let sql = `SELECT COUNT(*) AS usernotseller
    FROM users u
    LEFT JOIN penjual p
    ON u.id = p.userid
    WHERE p.id IS NULL;`
    db.query(sql,(err,results)=>{
        if(err){ return res.status(500).send(err) }
        return res.status(200).send(results)
    })
})

Router.get('/income',(req,res)=>{
    let sql = `SELECT SUM(hargabeli) AS totalincome
    FROM transaksi t
    WHERE t.status = 'FINISHED';`
    db.query(sql,(err,income)=>{
        if(err){ return res.status(500).send(err) }
        let sql2 = `SELECT SUM(hargabeli * 0.9) AS potensialincome
        FROM transaksi t;`
        db.query(sql2,(err2,income2)=>{
            if(err2){ return res.status(500).send(err2) }
            return res.status(200).send({
                totalincome: income[0].totalincome,
                potensialincome: income2[0].potensialincome
            })
        })
    })
})

Router.get('/bestproducts',(req,res)=>{
    let sql = `SELECT p.image, pe.namatoko AS namapenjual, p.nama AS namaproduct, p.informasiproduct AS description
    FROM transaksi t
    JOIN products p
    ON t.productid = p.id
    JOIN penjual pe
    ON t.penjualid = pe.id
    GROUP BY t.productid
    ORDER BY COUNT(*) DESC
    LIMIT 6;`
    db.query(sql,(err,results)=>{
        if(err){ return res.status(500).send(err) }
        return res.status(200).send(results)
    })
})

module.exports = Router