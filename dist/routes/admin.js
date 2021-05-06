"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var router = express.Router();

var multer = require('multer');

var path = require('path');

var fs = require('fs');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './src/public/uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

var auth = require('../helpers/auth');

var Qr = require('../models/qrcode');

var User = require('../models/users');

var QRCode = require('qrcode');

var admin = function admin(req, res, next) {
  if (req.user.roleId === "admin") return next();
  req.flash('success_msg', 'You are not admin');
  res.redirect("/");
};

router.get('/admin/dashboard', auth, admin, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var payload;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              image: "",
              code: "",
              link: "https://skanz.live"
            }; // for (var i = 1; i < 50; i++) {
            //     payload.code = "A" + String(i).padStart(6, '0');
            //     let promise = new Promise((resolve, reject) => {
            //         let segs = "http://c.skanz.live/" + payload.code;
            //         QRCode.toDataURL(segs, function (err, url) {
            //             resolve(url);
            //         })
            //     });
            //     let url = await promise;
            //     payload.image = url;
            //     let qrcode = await Qr.create(payload);
            // }

            res.locals.page_name = "admin/dashboard";
            res.render('./admin/dashboard');

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/admin/users', auth, admin, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var users;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return User.find({});

          case 2:
            users = _context2.sent;
            res.locals.page_name = "admin/users";
            res.render('./admin/users', {
              users: users
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/admin/user/user', auth, admin, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var users;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return User.find({
              roleId: "user"
            });

          case 2:
            users = _context3.sent;
            res.locals.page_name = "admin/user/user";
            res.render('./admin/users', {
              users: users
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/admin/user/admin', auth, admin, /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var users;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return User.find({
              roleId: "admin"
            });

          case 2:
            users = _context4.sent;
            res.locals.page_name = "admin/user/admin";
            res.render('./admin/users', {
              users: users
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
router.get('/admin/tattoos', auth, admin, /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var qrs;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Qr.find({});

          case 2:
            qrs = _context5.sent;
            res.locals.page_name = "admin/tattoos";
            res.render('./admin/tattoos', {
              qrs: qrs
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
router.get('/admin/tattoo/active', auth, admin, /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var qrs, array, i;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Qr.find({});

          case 2:
            qrs = _context6.sent;
            array = [];

            for (i = 0; i < qrs.length; i++) {
              if (qrs[i].link !== "https://skanz.live") {
                array.push(qrs[i]);
              }
            }

            res.locals.page_name = "admin/tattoo/active";
            res.render('./admin/tattoos', {
              qrs: array
            });

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
router.get('/admin/tattoo/printed', auth, admin, /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var qrs, array, i;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return Qr.find({});

          case 2:
            qrs = _context7.sent;
            array = [];

            for (i = 0; i < qrs.length; i++) {
              if (qrs[i].printed === true) {
                array.push(qrs[i]);
              }
            }

            res.locals.page_name = "admin/tattoo/printed";
            res.render('./admin/tattoos', {
              qrs: array
            });

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}());
router.post('/user/create-account', auth, admin, /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var payload, check, Msg;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            payload = {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              roleId: req.body.type,
              profilePicture: "/assets/img/newUser.png"
            };
            _context8.next = 3;
            return User.findOne({
              email: req.body.email
            });

          case 3:
            check = _context8.sent;

            if (check) {
              req.flash('warning_msg', 'Email has been used!');
              res.redirect('back');
            }

            User.create(payload).then(function (user) {
              req.flash('success_msg', user.email + ' user created.');
              res.redirect('back');
            });

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}());
router.get('/user/delete-account/:id', auth, admin, /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return User.deleteOne({
              _id: req.params.id
            });

          case 2:
            req.flash('success_msg', 'User deleted.');
            res.redirect('back');

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}());
router.get('/tattoo-download/:id', auth, admin, /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var qr, fileName, image;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return Qr.findOne({
              _id: req.params.id
            });

          case 2:
            qr = _context11.sent;
            fileName = './tattoos/' + qr.code + '.png';
            image = qr.image.replace(/^data:image\/\w+;base64,/, "");
            image = image.replace(/ /g, '+');
            fs.writeFile(fileName, image, 'base64', function (err) {
              res.download(fileName, /*#__PURE__*/function () {
                var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(err) {
                  return _regenerator["default"].wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          if (err) {
                            res.status(500).send({
                              message: "Could not download the file. " + err
                            });
                          }

                          _context10.next = 3;
                          return Qr.updateOne({
                            _id: qr.id
                          }, {
                            $set: {
                              printed: true
                            }
                          });

                        case 3:
                          req.flash('success_msg', qr.code + 'Downloaded');

                        case 4:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                }));

                return function (_x31) {
                  return _ref11.apply(this, arguments);
                };
              }()); // res.redirect('back');
            });

          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function (_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}());
module.exports = router;