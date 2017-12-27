var express = require('express');
var router = express.Router();
var util = require("util"); 
var fs = require("fs");
var path = require('path');
var Fuse = require('fuse.js')
var _ = require("underscore");


var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

var upload = multer({ storage: storage });
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
    auth: {
        api_user: 'dongockhanh3103',
        api_key: 'hiimkhanh1605'
    }
}
var client = nodemailer.createTransport(sgTransport(options));
//home
router.get('/',function(req,res,next){
    res.render('Admin/index.ejs');
})
//danh sách user
router.get('/user-danh-sach',function(req,res,next){
    var db = req.con;
    var data = "";
    db.query('SELECT * FROM user',function(err,rows){
        var data = rows;
        res.json(data);
    })
})
//danh sach loai
router.get('/cate-danh-sach',function(req,res,next){
    var db = req.con;
    var data = "";
    db.query('SELECT * FROM loaisanpham',function(err,rows){
        var data = rows;
        res.json(data);
    })
})

router.post('/cate-them-cate',function(req,res,next){
        var db = req.con;
        var sql = "INSERT INTO `loaisanpham`(`tenloaisanpham`,`hinhanhloaisanpham`) VALUES ('" + req.body.tenloaisanpham + "','" + req.body.hinhanhloaisanpham + "')";
        
        var query = db.query(sql, function(err, result) {
            if (err)
            {
                res.json({ success: false, message: 'Không thêm loại sản phẩm !' });
            }
            res.json({ success: true, message: 'Đã thêm loại sản phẩm !' });
        });
})
router.get('/checkLoaisp/:tenloaisanpham',function(req,res,next){
    var loai= req.params.tenloaisanpham;
    
    var db = req.con;
    if (!loai) {
        res.json({ success: false, message: 'Bạn chưa nhập loại sản phẩm ! ' }); // Return error
      }
    else{
        var sql = 'SELECT * FROM loaisanpham WHERE tenloaisanpham = ?';
        db.query(sql, [req.params.tenloaisanpham] ,function(err,rows){
            if(err){
                throw err;
            }
            if(rows[0] == undefined){
                res.json({ success: true, message: 'Có thể thêm loại sản phẩm này!' });
            }
            else{
                res.json({ success: false, message: 'Loại sản phẩm đã có trong cửa hàng!' });
            }
            
        })
    }
})
router.get('/checkSP/:tensanpham',function(req,res){
    var sp = req.params.tensanpham;
    var db = req.con;
    if (!sp) {
        res.json({ success: false, message: 'Bạn chưa nhập ten sản phẩm ! ' }); // Return error
      }
    else{
        var sql = 'SELECT * FROM sanpham WHERE tensanpham = ?';
        db.query(sql, [req.params.tensanpham] ,function(err,rows){
            if(err){
                throw err;
            }
            else{
                if(!rows || (sp == "")){
                    res.json({ success: false, message: 'Bạn chưa nhập ten sản phẩm ! ' }); // Return error
                }
                else{
                    if(rows[0] == undefined){
                        res.json({ success: true, message: 'Có thể thêm sản phẩm này!' });
                    }
                    else{
                        res.json({ success: false, message: ' Sản phẩm đã có trong cửa hàng!' });
                    }
                }
            }           
        })
    }
})
router.get('/xoaloaisp/:id',function(req,res,next){
    var db = req.con;
    db.query('DELETE FROM loaisanpham WHERE idloaisanpham = ? ',[req.params.id] ,function(err,rows){
		if(err){
			res.json({ success: false, message: 'xảy ra lỗi trong quá trình xóa!' });
		}
		res.json({ success: true, message: 'Đã xóa loại sản phẩm này loại sản phẩm này!' });
	});
})
router.get('/xoasp/:id',function(req,res,next){
    var db = req.con;
    db.query('DELETE FROM sanpham WHERE idsanpham = ? ',[req.params.id] ,function(err,rows){
		if(err){
			res.json({ success: false, message: 'xảy ra lỗi trong quá trình xóa!' });
		}
		res.json({ success: true, message: 'Đã xóa sản phẩm này !' });
	});
})
router.get('/sualoaisp/:id',function(req,res,next){
    var db = req.con;
    var sql = 'SELECT * FROM loaisanpham WHERE idloaisanpham = ?';
    db.query(sql, [req.params.id] ,function(err,rows){
        res.json(rows);
    })
})
router.get('/suasp/:id',function(req,res,next){
    var db = req.con;
    var sql = 'SELECT * FROM sanpham WHERE idsanpham = ?';
    db.query(sql, [req.params.id] ,function(err,rows){
        res.json(rows);
    })
});
router.get('/danhsach-sanpham',function(req,res,next){
    var db = req.con;
    var data = "";
    db.query('SELECT * FROM sanpham',function(err,rows){
        var data = rows;
        res.json(data);
    })
})
router.post('/themsanpham',function(req,res,next){
    var db = req.con;
    var sql = "INSERT INTO sanpham (`idloaisanpham`,`tensanpham`,`thongtinsanpham`,`gia`,`donvi`,`hinhanh`) VALUES ('" + req.body.idloaisanpham + "','" + req.body.tensanpham + "','" + req.body.thongtinsanpham + "','" + req.body.gia + "','" + req.body.donvi + "','" + req.body.hinhanh + "')";
    var query = db.query(sql, function(err, result) {
        if (err)
        {
            res.json({ "success": false, "message": 'Không thêm được sản phẩm !' });
        }
        res.json({ "success": true, "message": 'Đã thêm sản phẩm !' });
    });
})
router.post('/update-loaisp',function(req,res){
    var db = req.con;
    var loaisp ={
            tenloaisanpham: req.body.name,
            hinhanhloaisanpham: req.body.hinhanh
    }
    db.query('UPDATE loaisanpham set ? WHERE idloaisanpham = ?',
    [loaisp,req.body.id], function(err,rows){
        if (err)
        {
            res.json({ success: false, message: 'Không sửa được !' });
        }
        res.json({ success: true, message: 'Đã sửa lại loại sản phẩm !' });
    })
})
router.post('/update-sanpham',function(req,res,next){
    var db = req.con;

    var sp ={
        idloaisanpham: req.body.idloaisp,
        tensanpham: req.body.tensanpham,
        thongtinsanpham: req.body.thongtinsanpham,
        gia: req.body.gia,
        donvi: req.body.donvi,
        hinhanh: req.body.hinhanh
    }
    db.query('UPDATE sanpham set ? WHERE idsanpham = ?',[sp,req.body.id], function(err,rows){
        if (err)
        {
            res.json({ success: false, message: 'Không sửa được !' });
        }
        res.json({ success: true, message: 'Đã sửa lại sản phẩm !' });
    })
})
router.get('/donhang', function(req,res,next){
    var db = req.con;
    var data = "";
    db.query('SELECT * FROM donhang',function(err,rows){
        var data = rows;
        res.json(data);
    })
})
router.get('/donhangcanxem/:id', function(req,res,next){
    var db = req.con;
    var sql = 'SELECT * FROM donhang WHERE iddonhang = ?';
    db.query(sql, [req.params.id] ,function(err,rows){
        res.json(rows);
    })
})
router.get('/chitietdonhang/:id', function(req,res,next){
    var db = req.con;
    var sql = 'SELECT * FROM chitietdonhang WHERE iddonhang = ?';
    db.query(sql, [req.params.id] ,function(err,rows){
        res.json(rows);
    })
})
router.get('/thanhtoanhoadon/:id', function(req,res,next){
    var db = req.con;
    var id= req.body.id;
    
    var sql = "UPDATE donhang SET tinhtrang = '1' WHERE iddonhang = ? ";
    db.query(sql,[req.params.id], function (err, result)
    {
        if (err)
        {
            res.json({ success: false, message: 'Xảy ra lỗi trong quá trình thanh toán !' });
        }
        else{
            var sql1 = 'SELECT * FROM donhang WHERE iddonhang = ?';
            db.query(sql1, [req.params.id] ,function(err,rows){
                


                var iduserkhachhang = rows[0].iduser;
                var sql2 = 'SELECT * FROM user WHERE iduser = ?';
                db.query(sql2, [iduserkhachhang] ,function(err,user){
                    var emailkh = user[0].email;
                    console.log(emailkh);
                    var email = {
                        from: 'Localhost Staff, staff@localhost.com',
                        to: emailkh,
                        subject: 'Thông báo đơn hàng tại Raubb++ !',
                        text: 'Xin chào ' + user[0].tenkhachhang + ', Đơn hàng của bạn đã được duyệt !',
                        html: 'Xin chào<strong> ' + user[0].tenkhachhang + 
                                '</strong>,<br><br>Đơn hàng của bạn đã được duyệt!' +
                                '<ul> <li>Tổng tiền: ' +rows[0].tongtien + ' VND </li> </ul>'
                    };

                    // Send e-mail object to user
                    client.sendMail(email, function (err, info) {
                        if (err) console.log(err); 
                    });
                    
                    res.json({ success: true, message: "Đã thanh toán hóa đơn !" })
                })
            })
        }
        
    })
    
})
module.exports = router;