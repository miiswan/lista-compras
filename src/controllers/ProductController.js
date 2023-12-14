const conn = require("../db/conn");

module.exports = class ProductController {
    static createProductPost(request,response) {
        try{
            if(!request,body.nome || !request.body.quantidade){
                //  status 400 - bad request
                return response.status(400).json({
                    message: "Por favor, prencha todos os campos"
                });
            }

            const { nome, quantidade } = request.body

            const sql = `INSERT INTO tb_produtos(nome,quantidade) VALUES("${nome}", "${quantidade}")`;

            conn.query(sql, (error, data) => {
                if(error){
                    console.log(error);
                }

                const product = data;
                return response.redirect("/product")
                    
                })
            
        }catch(error){
            console.log(error);
        }
    }

    static getAllProducts(request, response) {
        try{
            const sql = `SELECT * FROM tb_produtos`;

            conn.query(sql, (error, data) => {
                if(error){
                    console.log(error)
                }

                const products = data;

                return response.render('product/home', {products});
            });
        }catch(error){
            console.log(error);
            return response.status(500).send(error);
        }
    }

    static getProduct(request, response){
        try{
            const {id} = request.params

            const sql = `SELECT * FROM tb_produtos WHERE id = ${id}`;

            conn.query(sql, (error,data) => {
                if(error){
                    console.log(error);
                }

                const product = data[0];


                return response.render('product/update', {product});
            });
        }catch(error){
            console.log(error);
            return response.status(500).send(error);
        }
    }

    static updateProduct(request, response) {
        try{
            const { id, nome, quantidade } = request.body

            const sql = `UPDATE tb_produtos SET nome = "${nome}", quantidade = "${quantidade}" WHERE id = ${id}`;

            conn.query(sql, (error, data) => {
                if(error){
                    console.log(error);
                }

                return response.redirect('/product');
            });
        }catch(error){
            console.log(error);
            return response.status(500).send(error);
        }
    }

    static removeProduct(request, response){
        const { id } = request.params

        const sql = `DELETE FROM tb_produtos WHERE id = ${id}`;

        conn.query(sql, (error) => {
            if(error){
                console.log(error)
            }

            return response.redirect('/product');
        });
    }
}