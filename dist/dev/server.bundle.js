/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/loginController.js":
/*!************************************!*\
  !*** ./src/api/loginController.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_MailConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/MailConfig */ \"./src/config/MailConfig.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ \"./src/config/index.js\");\n/* harmony import */ var _common_Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/Utils */ \"./src/common/Utils.js\");\n/* harmony import */ var _model_User__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../model/User */ \"./src/model/User.js\");\n\n\n\n\n\n\n\n\nclass LoginController {\n  constructor() {}\n\n  async forget(ctx) {\n    const {\n      body\n    } = ctx.request;\n\n    try {\n      // body.username -> database -> email\n      let result = await (0,_config_MailConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        code: '1234',\n        expire: moment__WEBPACK_IMPORTED_MODULE_1___default()().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),\n        email: body.username,\n        user: 'zzy'\n      });\n      ctx.body = {\n        code: 200,\n        data: result,\n        message: '邮件发送成功'\n      };\n    } catch (error) {\n      console.log(error);\n    }\n  }\n\n  async login(ctx) {\n    // 返回token\n    // 接受用户传递的数据\n    const {\n      body\n    } = ctx.request;\n    let code = body.code;\n    let sid = body.sid;\n    let checkCodeResult = await (0,_common_Utils__WEBPACK_IMPORTED_MODULE_5__.checkCode)(sid, code);\n\n    if (checkCodeResult) {\n      // 验证用户账户密码是否正确\n      let checkUserPassword = false;\n      let user = await _model_User__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findOne({\n        username: body.username\n      });\n\n      if (await bcrypt__WEBPACK_IMPORTED_MODULE_3___default().compare(body.password, user.password)) {\n        checkUserPassword = true;\n      }\n\n      if (checkUserPassword) {\n        // 验证通通过，返回token\n        let token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().sign({\n          _id: 'zzy'\n        }, _config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].JWT_SECRET, {\n          expiresIn: '1d'\n        });\n        ctx.body = {\n          code: 200,\n          token: token\n        };\n      } else {\n        ctx.body = {\n          code: 400,\n          msg: '用户名或者密码错误'\n        };\n      }\n    } else {\n      ctx.body = {\n        code: 400,\n        msg: '图片验证码错误'\n      };\n    }\n\n    console.log('hello login');\n  }\n\n  async register(ctx) {\n    // 获取客户端数据\n    const {\n      body\n    } = ctx.request; // 校验验证码时效性\n\n    let checkCodeResult = await (0,_common_Utils__WEBPACK_IMPORTED_MODULE_5__.checkCode)(body.sid, body.code);\n    let message = '';\n\n    if (checkCodeResult) {\n      let userStatus = true; // 查库，看username是否被注册过\n\n      const user1 = await _model_User__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findOne({\n        username: body.username\n      });\n\n      if (user1 !== null && typeof user1.username !== 'undefined') {\n        userStatus = false;\n        message = '此用户名已被注册，换一个吧';\n      } // 查库，看nickname是否被注册过\n\n\n      const user2 = await _model_User__WEBPACK_IMPORTED_MODULE_6__[\"default\"].findOne({\n        nickname: body.nickname\n      });\n\n      if (user2 !== null && typeof user2.nickname !== 'undefined') {\n        userStatus = false;\n        message = '此昵称已被注册，换一个吧';\n      } // 写入数据库\n\n\n      if (userStatus) {\n        body.password = await bcrypt__WEBPACK_IMPORTED_MODULE_3___default().hash(body.password, 5);\n        const user = new _model_User__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n          username: body.username,\n          nickname: body.nickname,\n          password: body.password\n        });\n        const result = await user.save();\n        ctx.body = {\n          code: 200,\n          data: result,\n          msg: '注册成功'\n        };\n        return;\n      }\n    } else {\n      message = '图片验证码已失效，请重新获取';\n    }\n\n    ctx.body = {\n      code: 500,\n      msg: message\n    };\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new LoginController());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBpL2xvZ2luQ29udHJvbGxlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLE1BQU1PLGVBQU4sQ0FBc0I7QUFDbEJDLEVBQUFBLFdBQVcsR0FBRyxDQUFFOztBQUVKLFFBQU5DLE1BQU0sQ0FBQ0MsR0FBRCxFQUFNO0FBQ2QsVUFBTTtBQUFFQyxNQUFBQTtBQUFGLFFBQVdELEdBQUcsQ0FBQ0UsT0FBckI7O0FBQ0EsUUFBSTtBQUNBO0FBQ0EsVUFBSUMsTUFBTSxHQUFHLE1BQU1iLDhEQUFJLENBQUM7QUFDcEJjLFFBQUFBLElBQUksRUFBRSxNQURjO0FBRXBCQyxRQUFBQSxNQUFNLEVBQUVkLDZDQUFNLEdBQUdlLEdBQVQsQ0FBYSxFQUFiLEVBQWlCLFNBQWpCLEVBQTRCQyxNQUE1QixDQUFtQyxxQkFBbkMsQ0FGWTtBQUdwQkMsUUFBQUEsS0FBSyxFQUFFUCxJQUFJLENBQUNRLFFBSFE7QUFJcEJDLFFBQUFBLElBQUksRUFBRTtBQUpjLE9BQUQsQ0FBdkI7QUFNQVYsTUFBQUEsR0FBRyxDQUFDQyxJQUFKLEdBQVc7QUFDUEcsUUFBQUEsSUFBSSxFQUFFLEdBREM7QUFFUE8sUUFBQUEsSUFBSSxFQUFFUixNQUZDO0FBR1BTLFFBQUFBLE9BQU8sRUFBRTtBQUhGLE9BQVg7QUFLSCxLQWJELENBYUUsT0FBT0MsS0FBUCxFQUFjO0FBQ1pDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaO0FBQ0g7QUFDSjs7QUFDVSxRQUFMRyxLQUFLLENBQUNoQixHQUFELEVBQU07QUFDYjtBQUVBO0FBQ0EsVUFBTTtBQUFFQyxNQUFBQTtBQUFGLFFBQVdELEdBQUcsQ0FBQ0UsT0FBckI7QUFDQSxRQUFJRSxJQUFJLEdBQUdILElBQUksQ0FBQ0csSUFBaEI7QUFDQSxRQUFJYSxHQUFHLEdBQUdoQixJQUFJLENBQUNnQixHQUFmO0FBQ0EsUUFBSUMsZUFBZSxHQUFHLE1BQU12Qix3REFBUyxDQUFDc0IsR0FBRCxFQUFNYixJQUFOLENBQXJDOztBQUNBLFFBQUljLGVBQUosRUFBcUI7QUFDakI7QUFDQSxVQUFJQyxpQkFBaUIsR0FBRyxLQUF4QjtBQUNBLFVBQUlULElBQUksR0FBRyxNQUFNZCwyREFBQSxDQUFhO0FBQUVhLFFBQUFBLFFBQVEsRUFBRVIsSUFBSSxDQUFDUTtBQUFqQixPQUFiLENBQWpCOztBQUNBLFVBQUksTUFBTWhCLHFEQUFBLENBQWVRLElBQUksQ0FBQ3FCLFFBQXBCLEVBQThCWixJQUFJLENBQUNZLFFBQW5DLENBQVYsRUFBd0Q7QUFDcERILFFBQUFBLGlCQUFpQixHQUFHLElBQXBCO0FBQ0g7O0FBQ0QsVUFBSUEsaUJBQUosRUFBdUI7QUFDbkI7QUFDQSxZQUFJSSxLQUFLLEdBQUcvQix3REFBQSxDQUFrQjtBQUFFaUMsVUFBQUEsR0FBRyxFQUFFO0FBQVAsU0FBbEIsRUFBa0MvQiwwREFBbEMsRUFBcUQ7QUFBRWlDLFVBQUFBLFNBQVMsRUFBRTtBQUFiLFNBQXJELENBQVo7QUFDQTNCLFFBQUFBLEdBQUcsQ0FBQ0MsSUFBSixHQUFXO0FBQ1BHLFVBQUFBLElBQUksRUFBRSxHQURDO0FBRVBtQixVQUFBQSxLQUFLLEVBQUVBO0FBRkEsU0FBWDtBQUlILE9BUEQsTUFPTztBQUNIdkIsUUFBQUEsR0FBRyxDQUFDQyxJQUFKLEdBQVc7QUFDUEcsVUFBQUEsSUFBSSxFQUFFLEdBREM7QUFFUHdCLFVBQUFBLEdBQUcsRUFBRTtBQUZFLFNBQVg7QUFJSDtBQUNKLEtBcEJELE1Bb0JPO0FBQ0g1QixNQUFBQSxHQUFHLENBQUNDLElBQUosR0FBVztBQUNQRyxRQUFBQSxJQUFJLEVBQUUsR0FEQztBQUVQd0IsUUFBQUEsR0FBRyxFQUFFO0FBRkUsT0FBWDtBQUlIOztBQUNEZCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaO0FBQ0g7O0FBQ2EsUUFBUmMsUUFBUSxDQUFDN0IsR0FBRCxFQUFNO0FBQ2hCO0FBQ0EsVUFBTTtBQUFFQyxNQUFBQTtBQUFGLFFBQVdELEdBQUcsQ0FBQ0UsT0FBckIsQ0FGZ0IsQ0FHaEI7O0FBQ0EsUUFBSWdCLGVBQWUsR0FBRyxNQUFNdkIsd0RBQVMsQ0FBQ00sSUFBSSxDQUFDZ0IsR0FBTixFQUFXaEIsSUFBSSxDQUFDRyxJQUFoQixDQUFyQztBQUNBLFFBQUlRLE9BQU8sR0FBRyxFQUFkOztBQUNBLFFBQUlNLGVBQUosRUFBcUI7QUFDakIsVUFBSVksVUFBVSxHQUFHLElBQWpCLENBRGlCLENBRWpCOztBQUNBLFlBQU1DLEtBQUssR0FBRyxNQUFNbkMsMkRBQUEsQ0FBYTtBQUFFYSxRQUFBQSxRQUFRLEVBQUVSLElBQUksQ0FBQ1E7QUFBakIsT0FBYixDQUFwQjs7QUFDQSxVQUFJc0IsS0FBSyxLQUFLLElBQVYsSUFBa0IsT0FBT0EsS0FBSyxDQUFDdEIsUUFBYixLQUEwQixXQUFoRCxFQUE2RDtBQUN6RHFCLFFBQUFBLFVBQVUsR0FBRyxLQUFiO0FBQ0FsQixRQUFBQSxPQUFPLEdBQUcsZUFBVjtBQUNILE9BUGdCLENBUWpCOzs7QUFDQSxZQUFNb0IsS0FBSyxHQUFHLE1BQU1wQywyREFBQSxDQUFhO0FBQUVxQyxRQUFBQSxRQUFRLEVBQUVoQyxJQUFJLENBQUNnQztBQUFqQixPQUFiLENBQXBCOztBQUNBLFVBQUlELEtBQUssS0FBSyxJQUFWLElBQWtCLE9BQU9BLEtBQUssQ0FBQ0MsUUFBYixLQUEwQixXQUFoRCxFQUE2RDtBQUN6REgsUUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQWxCLFFBQUFBLE9BQU8sR0FBRyxjQUFWO0FBQ0gsT0FiZ0IsQ0FjakI7OztBQUNBLFVBQUlrQixVQUFKLEVBQWdCO0FBQ1o3QixRQUFBQSxJQUFJLENBQUNxQixRQUFMLEdBQWdCLE1BQU03QixrREFBQSxDQUFZUSxJQUFJLENBQUNxQixRQUFqQixFQUEyQixDQUEzQixDQUF0QjtBQUNBLGNBQU1aLElBQUksR0FBRyxJQUFJZCxtREFBSixDQUFTO0FBQ2xCYSxVQUFBQSxRQUFRLEVBQUVSLElBQUksQ0FBQ1EsUUFERztBQUVsQndCLFVBQUFBLFFBQVEsRUFBRWhDLElBQUksQ0FBQ2dDLFFBRkc7QUFHbEJYLFVBQUFBLFFBQVEsRUFBRXJCLElBQUksQ0FBQ3FCO0FBSEcsU0FBVCxDQUFiO0FBS0EsY0FBTW5CLE1BQU0sR0FBRyxNQUFNTyxJQUFJLENBQUN5QixJQUFMLEVBQXJCO0FBQ0FuQyxRQUFBQSxHQUFHLENBQUNDLElBQUosR0FBVztBQUNQRyxVQUFBQSxJQUFJLEVBQUUsR0FEQztBQUVQTyxVQUFBQSxJQUFJLEVBQUVSLE1BRkM7QUFHUHlCLFVBQUFBLEdBQUcsRUFBRTtBQUhFLFNBQVg7QUFLQTtBQUNIO0FBQ0osS0E5QkQsTUE4Qk87QUFDSGhCLE1BQUFBLE9BQU8sR0FBRyxnQkFBVjtBQUNIOztBQUNEWixJQUFBQSxHQUFHLENBQUNDLElBQUosR0FBVztBQUNQRyxNQUFBQSxJQUFJLEVBQUUsR0FEQztBQUVQd0IsTUFBQUEsR0FBRyxFQUFFaEI7QUFGRSxLQUFYO0FBSUg7O0FBckdpQjs7QUF3R3RCLGlFQUFlLElBQUlmLGVBQUosRUFBZiIsInNvdXJjZXMiOlsid2VicGFjazovL2tvYS0xLy4vc3JjL2FwaS9sb2dpbkNvbnRyb2xsZXIuanM/MmE5YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VuZCBmcm9tICcuLi9jb25maWcvTWFpbENvbmZpZydcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuaW1wb3J0IGpzb253ZWJ0b2tlbiBmcm9tICdqc29ud2VidG9rZW4nXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuaW1wb3J0IHsgY2hlY2tDb2RlIH0gZnJvbSAnLi4vY29tbW9uL1V0aWxzJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi4vbW9kZWwvVXNlcidcblxuXG5jbGFzcyBMb2dpbkNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGFzeW5jIGZvcmdldChjdHgpIHtcbiAgICAgICAgY29uc3QgeyBib2R5IH0gPSBjdHgucmVxdWVzdFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gYm9keS51c2VybmFtZSAtPiBkYXRhYmFzZSAtPiBlbWFpbFxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHNlbmQoe1xuICAgICAgICAgICAgICAgIGNvZGU6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBleHBpcmU6IG1vbWVudCgpLmFkZCgzMCwgJ21pbnV0ZXMnKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbiAgICAgICAgICAgICAgICBlbWFpbDogYm9keS51c2VybmFtZSxcbiAgICAgICAgICAgICAgICB1c2VyOiAnenp5J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICAgICAgICAgIGNvZGU6IDIwMCxcbiAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ+mCruS7tuWPkemAgeaIkOWKnydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGxvZ2luKGN0eCkge1xuICAgICAgICAvLyDov5Tlm550b2tlblxuXG4gICAgICAgIC8vIOaOpeWPl+eUqOaIt+S8oOmAkueahOaVsOaNrlxuICAgICAgICBjb25zdCB7IGJvZHkgfSA9IGN0eC5yZXF1ZXN0XG4gICAgICAgIGxldCBjb2RlID0gYm9keS5jb2RlXG4gICAgICAgIGxldCBzaWQgPSBib2R5LnNpZFxuICAgICAgICBsZXQgY2hlY2tDb2RlUmVzdWx0ID0gYXdhaXQgY2hlY2tDb2RlKHNpZCwgY29kZSlcbiAgICAgICAgaWYgKGNoZWNrQ29kZVJlc3VsdCkge1xuICAgICAgICAgICAgLy8g6aqM6K+B55So5oi36LSm5oi35a+G56CB5piv5ZCm5q2j56GuXG4gICAgICAgICAgICBsZXQgY2hlY2tVc2VyUGFzc3dvcmQgPSBmYWxzZVxuICAgICAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyB1c2VybmFtZTogYm9keS51c2VybmFtZSB9KVxuICAgICAgICAgICAgaWYgKGF3YWl0IGJjcnlwdC5jb21wYXJlKGJvZHkucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVc2VyUGFzc3dvcmQgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hlY2tVc2VyUGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAvLyDpqozor4HpgJrpgJrov4fvvIzov5Tlm550b2tlblxuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IGpzb253ZWJ0b2tlbi5zaWduKHsgX2lkOiAnenp5JyB9LCBjb25maWcuSldUX1NFQ1JFVCwgeyBleHBpcmVzSW46ICcxZCd9KVxuICAgICAgICAgICAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiB0b2tlblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3R4LmJvZHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IDQwMCxcbiAgICAgICAgICAgICAgICAgICAgbXNnOiAn55So5oi35ZCN5oiW6ICF5a+G56CB6ZSZ6K+vJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICAgICAgICAgIGNvZGU6IDQwMCxcbiAgICAgICAgICAgICAgICBtc2c6ICflm77niYfpqozor4HnoIHplJnor68nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvIGxvZ2luJylcbiAgICB9XG4gICAgYXN5bmMgcmVnaXN0ZXIoY3R4KSB7XG4gICAgICAgIC8vIOiOt+WPluWuouaIt+err+aVsOaNrlxuICAgICAgICBjb25zdCB7IGJvZHkgfSA9IGN0eC5yZXF1ZXN0XG4gICAgICAgIC8vIOagoemqjOmqjOivgeeggeaXtuaViOaAp1xuICAgICAgICBsZXQgY2hlY2tDb2RlUmVzdWx0ID0gYXdhaXQgY2hlY2tDb2RlKGJvZHkuc2lkLCBib2R5LmNvZGUpXG4gICAgICAgIGxldCBtZXNzYWdlID0gJydcbiAgICAgICAgaWYgKGNoZWNrQ29kZVJlc3VsdCkge1xuICAgICAgICAgICAgbGV0IHVzZXJTdGF0dXMgPSB0cnVlXG4gICAgICAgICAgICAvLyDmn6XlupPvvIznnIt1c2VybmFtZeaYr+WQpuiiq+azqOWGjOi/h1xuICAgICAgICAgICAgY29uc3QgdXNlcjEgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyB1c2VybmFtZTogYm9keS51c2VybmFtZSB9KVxuICAgICAgICAgICAgaWYgKHVzZXIxICE9PSBudWxsICYmIHR5cGVvZiB1c2VyMS51c2VybmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB1c2VyU3RhdHVzID0gZmFsc2VcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ+atpOeUqOaIt+WQjeW3suiiq+azqOWGjO+8jOaNouS4gOS4quWQpydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOafpeW6k++8jOeci25pY2tuYW1l5piv5ZCm6KKr5rOo5YaM6L+HXG4gICAgICAgICAgICBjb25zdCB1c2VyMiA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IG5pY2tuYW1lOiBib2R5Lm5pY2tuYW1lIH0pXG4gICAgICAgICAgICBpZiAodXNlcjIgIT09IG51bGwgJiYgdHlwZW9mIHVzZXIyLm5pY2tuYW1lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHVzZXJTdGF0dXMgPSBmYWxzZVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAn5q2k5pi156ew5bey6KKr5rOo5YaM77yM5o2i5LiA5Liq5ZCnJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5YaZ5YWl5pWw5o2u5bqTXG4gICAgICAgICAgICBpZiAodXNlclN0YXR1cykge1xuICAgICAgICAgICAgICAgIGJvZHkucGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChib2R5LnBhc3N3b3JkLCA1KVxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBib2R5LnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICBuaWNrbmFtZTogYm9keS5uaWNrbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGJvZHkucGFzc3dvcmRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVzZXIuc2F2ZSgpXG4gICAgICAgICAgICAgICAgY3R4LmJvZHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBtc2c6ICfms6jlhozmiJDlip8nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZSA9ICflm77niYfpqozor4HnoIHlt7LlpLHmlYjvvIzor7fph43mlrDojrflj5YnXG4gICAgICAgIH1cbiAgICAgICAgY3R4LmJvZHkgPSB7XG4gICAgICAgICAgICBjb2RlOiA1MDAsXG4gICAgICAgICAgICBtc2c6IG1lc3NhZ2VcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IExvZ2luQ29udHJvbGxlcigpIl0sIm5hbWVzIjpbInNlbmQiLCJtb21lbnQiLCJqc29ud2VidG9rZW4iLCJiY3J5cHQiLCJjb25maWciLCJjaGVja0NvZGUiLCJVc2VyIiwiTG9naW5Db250cm9sbGVyIiwiY29uc3RydWN0b3IiLCJmb3JnZXQiLCJjdHgiLCJib2R5IiwicmVxdWVzdCIsInJlc3VsdCIsImNvZGUiLCJleHBpcmUiLCJhZGQiLCJmb3JtYXQiLCJlbWFpbCIsInVzZXJuYW1lIiwidXNlciIsImRhdGEiLCJtZXNzYWdlIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwibG9naW4iLCJzaWQiLCJjaGVja0NvZGVSZXN1bHQiLCJjaGVja1VzZXJQYXNzd29yZCIsImZpbmRPbmUiLCJjb21wYXJlIiwicGFzc3dvcmQiLCJ0b2tlbiIsInNpZ24iLCJfaWQiLCJKV1RfU0VDUkVUIiwiZXhwaXJlc0luIiwibXNnIiwicmVnaXN0ZXIiLCJ1c2VyU3RhdHVzIiwidXNlcjEiLCJ1c2VyMiIsIm5pY2tuYW1lIiwiaGFzaCIsInNhdmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/api/loginController.js\n");

/***/ }),

/***/ "./src/api/publicController.js":
/*!*************************************!*\
  !*** ./src/api/publicController.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var svg_captcha__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-captcha */ \"svg-captcha\");\n/* harmony import */ var svg_captcha__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg_captcha__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_RedisConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/RedisConfig */ \"./src/config/RedisConfig.js\");\n\n\n\nclass PublicController {\n  constructor() {}\n\n  async captcha(ctx) {\n    const body = ctx.request.query;\n    const captcha = svg_captcha__WEBPACK_IMPORTED_MODULE_0___default().create({\n      size: 4,\n      ignoreChars: '0oO1ilLI',\n      color: true,\n      noise: Math.floor(Math.random() * 5),\n      width: 150,\n      height: 38\n    }); // 设置验证码图片超时10分钟\n\n    (0,_config_RedisConfig__WEBPACK_IMPORTED_MODULE_1__.setValue)(body.sid, captcha.text, 10 * 60);\n    ctx.body = {\n      code: 200,\n      data: captcha.data\n    };\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new PublicController());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBpL3B1YmxpY0NvbnRyb2xsZXIuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsTUFBTUcsZ0JBQU4sQ0FBdUI7QUFDbkJDLEVBQUFBLFdBQVcsR0FBRyxDQUFFOztBQUVILFFBQVBDLE9BQU8sQ0FBQ0MsR0FBRCxFQUFNO0FBQ2YsVUFBTUMsSUFBSSxHQUFHRCxHQUFHLENBQUNFLE9BQUosQ0FBWUMsS0FBekI7QUFDQSxVQUFNSixPQUFPLEdBQUdMLHlEQUFBLENBQWtCO0FBQzlCVyxNQUFBQSxJQUFJLEVBQUUsQ0FEd0I7QUFFOUJDLE1BQUFBLFdBQVcsRUFBRSxVQUZpQjtBQUc5QkMsTUFBQUEsS0FBSyxFQUFFLElBSHVCO0FBSTlCQyxNQUFBQSxLQUFLLEVBQUVDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsQ0FBM0IsQ0FKdUI7QUFLOUJDLE1BQUFBLEtBQUssRUFBRSxHQUx1QjtBQU05QkMsTUFBQUEsTUFBTSxFQUFFO0FBTnNCLEtBQWxCLENBQWhCLENBRmUsQ0FVZjs7QUFDQWpCLElBQUFBLDZEQUFRLENBQUNLLElBQUksQ0FBQ2EsR0FBTixFQUFXZixPQUFPLENBQUNnQixJQUFuQixFQUF5QixLQUFLLEVBQTlCLENBQVI7QUFDQWYsSUFBQUEsR0FBRyxDQUFDQyxJQUFKLEdBQVc7QUFDUGUsTUFBQUEsSUFBSSxFQUFFLEdBREM7QUFFUEMsTUFBQUEsSUFBSSxFQUFFbEIsT0FBTyxDQUFDa0I7QUFGUCxLQUFYO0FBSUg7O0FBbkJrQjs7QUFzQnZCLGlFQUFlLElBQUlwQixnQkFBSixFQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29hLTEvLi9zcmMvYXBpL3B1YmxpY0NvbnRyb2xsZXIuanM/OWFlMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3ZnQ2FwdGNoYSBmcm9tICdzdmctY2FwdGNoYSc7XG5pbXBvcnQgeyBnZXRWYWx1ZSwgc2V0VmFsdWUgfSBmcm9tICcuLi9jb25maWcvUmVkaXNDb25maWcnXG5cbmNsYXNzIFB1YmxpY0NvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGFzeW5jIGNhcHRjaGEoY3R4KSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBjdHgucmVxdWVzdC5xdWVyeVxuICAgICAgICBjb25zdCBjYXB0Y2hhID0gc3ZnQ2FwdGNoYS5jcmVhdGUoe1xuICAgICAgICAgICAgc2l6ZTogNCxcbiAgICAgICAgICAgIGlnbm9yZUNoYXJzOiAnMG9PMWlsTEknLFxuICAgICAgICAgICAgY29sb3I6IHRydWUsXG4gICAgICAgICAgICBub2lzZTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSksXG4gICAgICAgICAgICB3aWR0aDogMTUwLFxuICAgICAgICAgICAgaGVpZ2h0OiAzOFxuICAgICAgICB9KVxuICAgICAgICAvLyDorr7nva7pqozor4HnoIHlm77niYfotoXml7YxMOWIhumSn1xuICAgICAgICBzZXRWYWx1ZShib2R5LnNpZCwgY2FwdGNoYS50ZXh0LCAxMCAqIDYwKVxuICAgICAgICBjdHguYm9keSA9IHtcbiAgICAgICAgICAgIGNvZGU6IDIwMCxcbiAgICAgICAgICAgIGRhdGE6IGNhcHRjaGEuZGF0YVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUHVibGljQ29udHJvbGxlcigpOyJdLCJuYW1lcyI6WyJzdmdDYXB0Y2hhIiwiZ2V0VmFsdWUiLCJzZXRWYWx1ZSIsIlB1YmxpY0NvbnRyb2xsZXIiLCJjb25zdHJ1Y3RvciIsImNhcHRjaGEiLCJjdHgiLCJib2R5IiwicmVxdWVzdCIsInF1ZXJ5IiwiY3JlYXRlIiwic2l6ZSIsImlnbm9yZUNoYXJzIiwiY29sb3IiLCJub2lzZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIndpZHRoIiwiaGVpZ2h0Iiwic2lkIiwidGV4dCIsImNvZGUiLCJkYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/api/publicController.js\n");

/***/ }),

/***/ "./src/common/ErrorHandle.js":
/*!***********************************!*\
  !*** ./src/common/ErrorHandle.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((ctx, next) => {\n  return next().catch(err => {\n    if (401 == err.status) {\n      ctx.status = 401;\n      ctx.body = {\n        code: 401,\n        msg: 'Protected resource, use Authorization header to get access\\n'\n      };\n    } else {\n      console.log('err', err);\n      ctx.status = err.status || 500;\n      ctx.body = {\n        code: 500,\n        msg: err.message\n      };\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tbW9uL0Vycm9ySGFuZGxlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpRUFBZSxDQUFDQSxHQUFELEVBQU1DLElBQU4sS0FBZTtBQUMxQixTQUFPQSxJQUFJLEdBQUdDLEtBQVAsQ0FBY0MsR0FBRCxJQUFTO0FBQ3pCLFFBQUksT0FBT0EsR0FBRyxDQUFDQyxNQUFmLEVBQXVCO0FBQ25CSixNQUFBQSxHQUFHLENBQUNJLE1BQUosR0FBYSxHQUFiO0FBQ0FKLE1BQUFBLEdBQUcsQ0FBQ0ssSUFBSixHQUFXO0FBQ1BDLFFBQUFBLElBQUksRUFBRSxHQURDO0FBRVBDLFFBQUFBLEdBQUcsRUFBRTtBQUZFLE9BQVg7QUFJSCxLQU5ELE1BTU87QUFDSEMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBWixFQUFtQk4sR0FBbkI7QUFDQUgsTUFBQUEsR0FBRyxDQUFDSSxNQUFKLEdBQWFELEdBQUcsQ0FBQ0MsTUFBSixJQUFjLEdBQTNCO0FBQ0FKLE1BQUFBLEdBQUcsQ0FBQ0ssSUFBSixHQUFXO0FBQ1BDLFFBQUFBLElBQUksRUFBRSxHQURDO0FBRVBDLFFBQUFBLEdBQUcsRUFBRUosR0FBRyxDQUFDTztBQUZGLE9BQVg7QUFJSDtBQUNKLEdBZk0sQ0FBUDtBQWdCSCxDQWpCRCIsInNvdXJjZXMiOlsid2VicGFjazovL2tvYS0xLy4vc3JjL2NvbW1vbi9FcnJvckhhbmRsZS5qcz80MWViIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IChjdHgsIG5leHQpID0+IHtcbiAgICByZXR1cm4gbmV4dCgpLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgaWYgKDQwMSA9PSBlcnIuc3RhdHVzKSB7XG4gICAgICAgICAgICBjdHguc3RhdHVzID0gNDAxO1xuICAgICAgICAgICAgY3R4LmJvZHkgPSB7XG4gICAgICAgICAgICAgICAgY29kZTogNDAxLFxuICAgICAgICAgICAgICAgIG1zZzogJ1Byb3RlY3RlZCByZXNvdXJjZSwgdXNlIEF1dGhvcml6YXRpb24gaGVhZGVyIHRvIGdldCBhY2Nlc3NcXG4nXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VycicsIGVycik7XG4gICAgICAgICAgICBjdHguc3RhdHVzID0gZXJyLnN0YXR1cyB8fCA1MDBcbiAgICAgICAgICAgIGN0eC5ib2R5ID0ge1xuICAgICAgICAgICAgICAgIGNvZGU6IDUwMCxcbiAgICAgICAgICAgICAgICBtc2c6IGVyci5tZXNzYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0iXSwibmFtZXMiOlsiY3R4IiwibmV4dCIsImNhdGNoIiwiZXJyIiwic3RhdHVzIiwiYm9keSIsImNvZGUiLCJtc2ciLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/common/ErrorHandle.js\n");

/***/ }),

/***/ "./src/common/Utils.js":
/*!*****************************!*\
  !*** ./src/common/Utils.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkCode\": () => (/* binding */ checkCode)\n/* harmony export */ });\n/* harmony import */ var _config_RedisConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/RedisConfig */ \"./src/config/RedisConfig.js\");\n // 校验验证码图片时效性\n\nconst checkCode = async (key, value) => {\n  const redisData = await (0,_config_RedisConfig__WEBPACK_IMPORTED_MODULE_0__.getValue)(key);\n  console.log('checkCode', redisData, value);\n\n  if (redisData !== null) {\n    if (redisData.toLowerCase() === value.toLowerCase()) {\n      return true;\n    } else {\n      return false;\n    }\n  } else {\n    return false;\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tbW9uL1V0aWxzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0NBRUE7O0FBQ0EsTUFBTUMsU0FBUyxHQUFHLE9BQU9DLEdBQVAsRUFBWUMsS0FBWixLQUFzQjtBQUNwQyxRQUFNQyxTQUFTLEdBQUcsTUFBTUosNkRBQVEsQ0FBQ0UsR0FBRCxDQUFoQztBQUNBRyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCRixTQUF6QixFQUFvQ0QsS0FBcEM7O0FBQ0EsTUFBSUMsU0FBUyxLQUFLLElBQWxCLEVBQXdCO0FBQ3BCLFFBQUlBLFNBQVMsQ0FBQ0csV0FBVixPQUE0QkosS0FBSyxDQUFDSSxXQUFOLEVBQWhDLEVBQXFEO0FBQ2pELGFBQU8sSUFBUDtBQUNILEtBRkQsTUFFTztBQUNILGFBQU8sS0FBUDtBQUNIO0FBQ0osR0FORCxNQU1PO0FBQ0gsV0FBTyxLQUFQO0FBQ0g7QUFDSixDQVpEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29hLTEvLi9zcmMvY29tbW9uL1V0aWxzLmpzP2I0ZGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0VmFsdWUgfSBmcm9tICcuLi9jb25maWcvUmVkaXNDb25maWcnXG5cbi8vIOagoemqjOmqjOivgeeggeWbvueJh+aXtuaViOaAp1xuY29uc3QgY2hlY2tDb2RlID0gYXN5bmMgKGtleSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCByZWRpc0RhdGEgPSBhd2FpdCBnZXRWYWx1ZShrZXkpXG4gICAgY29uc29sZS5sb2coJ2NoZWNrQ29kZScsIHJlZGlzRGF0YSwgdmFsdWUpO1xuICAgIGlmIChyZWRpc0RhdGEgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKHJlZGlzRGF0YS50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgY2hlY2tDb2RlXG59Il0sIm5hbWVzIjpbImdldFZhbHVlIiwiY2hlY2tDb2RlIiwia2V5IiwidmFsdWUiLCJyZWRpc0RhdGEiLCJjb25zb2xlIiwibG9nIiwidG9Mb3dlckNhc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/common/Utils.js\n");

/***/ }),

/***/ "./src/config/DBHelpler.js":
/*!*********************************!*\
  !*** ./src/config/DBHelpler.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/config/index.js\");\n\n // 创建连接\n\nmongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DB_URL); // 连接成功\n\nmongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.on('connected', () => {\n  console.log('Mongoose connection open to ' + _index__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DB_URL);\n}); // 连接异常\n\nmongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.on('error', error => {\n  console.log('Mongoose connection error: ' + error);\n}); // 断开连接\n\nmongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.on('disconnected', () => {\n  console.log('Mongoose disconnectied');\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((mongoose__WEBPACK_IMPORTED_MODULE_0___default()));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29uZmlnL0RCSGVscGxlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Q0FHQTs7QUFDQUEsdURBQUEsQ0FBaUJDLHFEQUFqQixHQUVBOztBQUNBRCw2REFBQSxDQUF1QixXQUF2QixFQUFvQyxNQUFNO0FBQ3RDTSxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQ0FBaUNOLHFEQUE3QztBQUNILENBRkQsR0FJQTs7QUFDQUQsNkRBQUEsQ0FBdUIsT0FBdkIsRUFBaUNRLEtBQUQsSUFBVztBQUN2Q0YsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0NBQWdDQyxLQUE1QztBQUNILENBRkQsR0FJQTs7QUFDQVIsNkRBQUEsQ0FBdUIsY0FBdkIsRUFBdUMsTUFBTTtBQUN6Q00sRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVo7QUFDSCxDQUZEO0FBS0EsaUVBQWVQLGlEQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29hLTEvLi9zcmMvY29uZmlnL0RCSGVscGxlci5qcz9lNjg0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSdcbmltcG9ydCBjb25maWcgZnJvbSAnLi9pbmRleCc7XG5cbi8vIOWIm+W7uui/nuaOpVxubW9uZ29vc2UuY29ubmVjdChjb25maWcuREJfVVJMKVxuXG4vLyDov57mjqXmiJDlip9cbm1vbmdvb3NlLmNvbm5lY3Rpb24ub24oJ2Nvbm5lY3RlZCcsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnTW9uZ29vc2UgY29ubmVjdGlvbiBvcGVuIHRvICcgKyBjb25maWcuREJfVVJMKTtcbn0pXG5cbi8vIOi/nuaOpeW8guW4uFxubW9uZ29vc2UuY29ubmVjdGlvbi5vbignZXJyb3InLCAoZXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmxvZygnTW9uZ29vc2UgY29ubmVjdGlvbiBlcnJvcjogJyArIGVycm9yKTtcbn0pXG5cbi8vIOaWreW8gOi/nuaOpVxubW9uZ29vc2UuY29ubmVjdGlvbi5vbignZGlzY29ubmVjdGVkJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdNb25nb29zZSBkaXNjb25uZWN0aWVkJyk7XG59KVxuXG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiY29uZmlnIiwiY29ubmVjdCIsIkRCX1VSTCIsImNvbm5lY3Rpb24iLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/DBHelpler.js\n");

/***/ }),

/***/ "./src/config/MailConfig.js":
/*!**********************************!*\
  !*** ./src/config/MailConfig.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// import nodemailer from 'nodemailer'\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\"); // async..await is not allowed in global scope, must use a wrapper\n\n\nasync function send(sendInfo) {\n  // Generate test SMTP service account from ethereal.email\n  // Only needed if you don't have a real mail account for testing\n  //   let testAccount = await nodemailer.createTestAccount();\n  // create reusable transporter object using the default SMTP transport\n  let transporter = nodemailer.createTransport({\n    host: \"smtp.qq.com\",\n    port: 587,\n    secure: false,\n    // true for 465, false for other ports\n    auth: {\n      user: '991710786@qq.com',\n      // generated ethereal user\n      pass: 'lsqfqtdokvlzbcbe' // generated ethereal password\n\n    }\n  }); //   let sendInfo = {\n  //       code: '1234',\n  //       expire: '2022-01-01',\n  //       email: '991710786@qq.com',\n  //       user: 'zzy'\n  //   }\n\n  let url = 'http://www.imooc.com'; // send mail with defined transport object\n\n  let info = await transporter.sendMail({\n    from: '\"认证邮件 👻\" <991710786@qq.com>',\n    // sender address\n    to: sendInfo.email,\n    // list of receivers\n    subject: sendInfo.user !== '' ? `你好开发者，${sendInfo.user}, 大前端实践注册码` : '注册码',\n    // Subject line\n    text: `你的注册码是${sendInfo.code}, 过期时间是${sendInfo.expire}`,\n    // plain text body\n    html: `<div style=\"border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;\">\n    <div style=\"height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;\">Imooc社区——欢迎来到官方社区</div>\n    <div style=\"padding: 25px\">\n      <div>您好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${sendInfo.expire}之前${sendInfo.code ? '重置您的密码' : '修改您的邮箱为：' + sendInfo.data.username}：</div>\n      <a href=\"${url}\" style=\"padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;\">${sendInfo.code ? '立即重置密码' : '确认设置邮箱'}</a>\n      <div style=\"padding: 5px; background: #f2f2f2;\">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>\n    </div>\n    <div style=\"background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;\">系统邮件，请勿直接回复</div>\n</div>` // html body\n\n  });\n  return \"Message sent: %s\", info.messageId; //   console.log(\"Message sent: %s\", info.messageId);\n  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>\n  // Preview only available when sending through an Ethereal account\n  //   console.log(\"Preview URL: %s\", nodemailer.getTestMessageUrl(info));\n  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...\n} // send().catch(console.error);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (send);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29uZmlnL01haWxDb25maWcuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUNBO0FBQ0EsTUFBTUEsVUFBVSxHQUFHQyxtQkFBTyxDQUFDLDhCQUFELENBQTFCLEVBRUE7OztBQUNBLGVBQWVDLElBQWYsQ0FBb0JDLFFBQXBCLEVBQThCO0FBQzVCO0FBQ0E7QUFDRjtBQUVFO0FBQ0EsTUFBSUMsV0FBVyxHQUFHSixVQUFVLENBQUNLLGVBQVgsQ0FBMkI7QUFDM0NDLElBQUFBLElBQUksRUFBRSxhQURxQztBQUUzQ0MsSUFBQUEsSUFBSSxFQUFFLEdBRnFDO0FBRzNDQyxJQUFBQSxNQUFNLEVBQUUsS0FIbUM7QUFHNUI7QUFDZkMsSUFBQUEsSUFBSSxFQUFFO0FBQ0pDLE1BQUFBLElBQUksRUFBRSxrQkFERjtBQUNzQjtBQUMxQkMsTUFBQUEsSUFBSSxFQUFFLGtCQUZGLENBRXNCOztBQUZ0QjtBQUpxQyxHQUEzQixDQUFsQixDQU40QixDQWdCOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNJLE1BQUlDLEdBQUcsR0FBRyxzQkFBVixDQXRCMEIsQ0F3QjVCOztBQUNBLE1BQUlDLElBQUksR0FBRyxNQUFNVCxXQUFXLENBQUNVLFFBQVosQ0FBcUI7QUFDcENDLElBQUFBLElBQUksRUFBRSw4QkFEOEI7QUFDRTtBQUN0Q0MsSUFBQUEsRUFBRSxFQUFFYixRQUFRLENBQUNjLEtBRnVCO0FBRWhCO0FBQ3BCQyxJQUFBQSxPQUFPLEVBQUVmLFFBQVEsQ0FBQ08sSUFBVCxLQUFrQixFQUFsQixHQUF3QixTQUFRUCxRQUFRLENBQUNPLElBQUssWUFBOUMsR0FBNEQsS0FIakM7QUFHd0M7QUFDNUVTLElBQUFBLElBQUksRUFBRyxTQUFRaEIsUUFBUSxDQUFDaUIsSUFBSyxVQUFTakIsUUFBUSxDQUFDa0IsTUFBTyxFQUpsQjtBQUlxQjtBQUN6REMsSUFBQUEsSUFBSSxFQUFHO0FBQ1g7QUFDQTtBQUNBLGdCQUFnQm5CLFFBQVEsQ0FBQ08sSUFBSyxxQkFDNUJQLFFBQVEsQ0FBQ2tCLE1BQ1IsS0FBSWxCLFFBQVEsQ0FBQ2lCLElBQVQsR0FBZ0IsUUFBaEIsR0FBMkIsYUFBYWpCLFFBQVEsQ0FBQ29CLElBQVQsQ0FBY0MsUUFBUztBQUN0RSxpQkFBaUJaLEdBQUkseUdBQXdHVCxRQUFRLENBQUNpQixJQUFULEdBQWdCLFFBQWhCLEdBQTJCLFFBQVM7QUFDaks7QUFDQTtBQUNBO0FBQ0EsT0Fmd0MsQ0FlL0I7O0FBZitCLEdBQXJCLENBQWpCO0FBa0JBLFNBQU8sb0JBQW9CUCxJQUFJLENBQUNZLFNBQWhDLENBM0M0QixDQTRDOUI7QUFDRTtBQUVBO0FBQ0Y7QUFDRTtBQUNELEVBRUQ7OztBQUVBLGlFQUFldkIsSUFBZiIsInNvdXJjZXMiOlsid2VicGFjazovL2tvYS0xLy4vc3JjL2NvbmZpZy9NYWlsQ29uZmlnLmpzPzJkYjEiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBpbXBvcnQgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJ1xuY29uc3Qgbm9kZW1haWxlciA9IHJlcXVpcmUoJ25vZGVtYWlsZXInKVxuXG4vLyBhc3luYy4uYXdhaXQgaXMgbm90IGFsbG93ZWQgaW4gZ2xvYmFsIHNjb3BlLCBtdXN0IHVzZSBhIHdyYXBwZXJcbmFzeW5jIGZ1bmN0aW9uIHNlbmQoc2VuZEluZm8pIHtcbiAgLy8gR2VuZXJhdGUgdGVzdCBTTVRQIHNlcnZpY2UgYWNjb3VudCBmcm9tIGV0aGVyZWFsLmVtYWlsXG4gIC8vIE9ubHkgbmVlZGVkIGlmIHlvdSBkb24ndCBoYXZlIGEgcmVhbCBtYWlsIGFjY291bnQgZm9yIHRlc3Rpbmdcbi8vICAgbGV0IHRlc3RBY2NvdW50ID0gYXdhaXQgbm9kZW1haWxlci5jcmVhdGVUZXN0QWNjb3VudCgpO1xuXG4gIC8vIGNyZWF0ZSByZXVzYWJsZSB0cmFuc3BvcnRlciBvYmplY3QgdXNpbmcgdGhlIGRlZmF1bHQgU01UUCB0cmFuc3BvcnRcbiAgbGV0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgIGhvc3Q6IFwic210cC5xcS5jb21cIixcbiAgICBwb3J0OiA1ODcsXG4gICAgc2VjdXJlOiBmYWxzZSwgLy8gdHJ1ZSBmb3IgNDY1LCBmYWxzZSBmb3Igb3RoZXIgcG9ydHNcbiAgICBhdXRoOiB7XG4gICAgICB1c2VyOiAnOTkxNzEwNzg2QHFxLmNvbScsIC8vIGdlbmVyYXRlZCBldGhlcmVhbCB1c2VyXG4gICAgICBwYXNzOiAnbHNxZnF0ZG9rdmx6YmNiZScsIC8vIGdlbmVyYXRlZCBldGhlcmVhbCBwYXNzd29yZFxuICAgIH0sXG4gIH0pO1xuXG4vLyAgIGxldCBzZW5kSW5mbyA9IHtcbi8vICAgICAgIGNvZGU6ICcxMjM0Jyxcbi8vICAgICAgIGV4cGlyZTogJzIwMjItMDEtMDEnLFxuLy8gICAgICAgZW1haWw6ICc5OTE3MTA3ODZAcXEuY29tJyxcbi8vICAgICAgIHVzZXI6ICd6enknXG4vLyAgIH1cbiAgICBsZXQgdXJsID0gJ2h0dHA6Ly93d3cuaW1vb2MuY29tJ1xuXG4gIC8vIHNlbmQgbWFpbCB3aXRoIGRlZmluZWQgdHJhbnNwb3J0IG9iamVjdFxuICBsZXQgaW5mbyA9IGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKHtcbiAgICBmcm9tOiAnXCLorqTor4Hpgq7ku7Yg8J+Ru1wiIDw5OTE3MTA3ODZAcXEuY29tPicsIC8vIHNlbmRlciBhZGRyZXNzXG4gICAgdG86IHNlbmRJbmZvLmVtYWlsLCAvLyBsaXN0IG9mIHJlY2VpdmVyc1xuICAgIHN1YmplY3Q6IHNlbmRJbmZvLnVzZXIgIT09ICcnID8gYOS9oOWlveW8gOWPkeiAhe+8jCR7c2VuZEluZm8udXNlcn0sIOWkp+WJjeerr+Wunui3teazqOWGjOeggWAgOiAn5rOo5YaM56CBJywgLy8gU3ViamVjdCBsaW5lXG4gICAgdGV4dDogYOS9oOeahOazqOWGjOeggeaYryR7c2VuZEluZm8uY29kZX0sIOi/h+acn+aXtumXtOaYryR7c2VuZEluZm8uZXhwaXJlfWAsIC8vIHBsYWluIHRleHQgYm9keVxuICAgIGh0bWw6IGA8ZGl2IHN0eWxlPVwiYm9yZGVyOiAxcHggc29saWQgI2RjZGNkYztjb2xvcjogIzY3Njc2Nzt3aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvOyBwYWRkaW5nLWJvdHRvbTogNTBweDtwb3NpdGlvbjogcmVsYXRpdmU7XCI+XG4gICAgPGRpdiBzdHlsZT1cImhlaWdodDogNjBweDsgYmFja2dyb3VuZDogIzM5M2Q0OTsgbGluZS1oZWlnaHQ6IDYwcHg7IGNvbG9yOiAjNThhMzZmOyBmb250LXNpemU6IDE4cHg7cGFkZGluZy1sZWZ0OiAxMHB4O1wiPkltb29j56S+5Yy64oCU4oCU5qyi6L+O5p2l5Yiw5a6Y5pa556S+5Yy6PC9kaXY+XG4gICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDI1cHhcIj5cbiAgICAgIDxkaXY+5oKo5aW977yMJHtzZW5kSW5mby51c2Vyfeerpemei++8jOmHjee9rumTvuaOpeacieaViOaXtumXtDMw5YiG6ZKf77yM6K+35ZyoJHtcbiAgc2VuZEluZm8uZXhwaXJlXG4gIH3kuYvliY0ke3NlbmRJbmZvLmNvZGUgPyAn6YeN572u5oKo55qE5a+G56CBJyA6ICfkv67mlLnmgqjnmoTpgq7nrrHkuLrvvJonICsgc2VuZEluZm8uZGF0YS51c2VybmFtZX3vvJo8L2Rpdj5cbiAgICAgIDxhIGhyZWY9XCIke3VybH1cIiBzdHlsZT1cInBhZGRpbmc6IDEwcHggMjBweDsgY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6ICMwMDllOTQ7IGRpc3BsYXk6IGlubGluZS1ibG9jazttYXJnaW46IDE1cHggMDtcIj4ke3NlbmRJbmZvLmNvZGUgPyAn56uL5Y2z6YeN572u5a+G56CBJyA6ICfnoa7orqTorr7nva7pgq7nrrEnfTwvYT5cbiAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nOiA1cHg7IGJhY2tncm91bmQ6ICNmMmYyZjI7XCI+5aaC5p6c6K+l6YKu5Lu25LiN5piv55Sx5L2g5pys5Lq65pON5L2c77yM6K+35Yu/6L+b6KGM5r+A5rS777yB5ZCm5YiZ5L2g55qE6YKu566x5bCG5Lya6KKr5LuW5Lq657uR5a6a44CCPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6ICNmYWZhZmE7IGNvbG9yOiAjYjRiNGI0O3RleHQtYWxpZ246IGNlbnRlcjsgbGluZS1oZWlnaHQ6IDQ1cHg7IGhlaWdodDogNDVweDsgcG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAwOyBib3R0b206IDA7d2lkdGg6IDEwMCU7XCI+57O757uf6YKu5Lu277yM6K+35Yu/55u05o6l5Zue5aSNPC9kaXY+XG48L2Rpdj5gLCAvLyBodG1sIGJvZHlcbiAgfSk7XG5cbiAgcmV0dXJuIFwiTWVzc2FnZSBzZW50OiAlc1wiLCBpbmZvLm1lc3NhZ2VJZFxuLy8gICBjb25zb2xlLmxvZyhcIk1lc3NhZ2Ugc2VudDogJXNcIiwgaW5mby5tZXNzYWdlSWQpO1xuICAvLyBNZXNzYWdlIHNlbnQ6IDxiNjU4ZjhjYS02Mjk2LWNjZjQtODMwNi04N2Q1N2EwYjQzMjFAZXhhbXBsZS5jb20+XG5cbiAgLy8gUHJldmlldyBvbmx5IGF2YWlsYWJsZSB3aGVuIHNlbmRpbmcgdGhyb3VnaCBhbiBFdGhlcmVhbCBhY2NvdW50XG4vLyAgIGNvbnNvbGUubG9nKFwiUHJldmlldyBVUkw6ICVzXCIsIG5vZGVtYWlsZXIuZ2V0VGVzdE1lc3NhZ2VVcmwoaW5mbykpO1xuICAvLyBQcmV2aWV3IFVSTDogaHR0cHM6Ly9ldGhlcmVhbC5lbWFpbC9tZXNzYWdlL1dhUUtNZ0tkZHhRRG9vdS4uLlxufVxuXG4vLyBzZW5kKCkuY2F0Y2goY29uc29sZS5lcnJvcik7XG5cbmV4cG9ydCBkZWZhdWx0IHNlbmQiXSwibmFtZXMiOlsibm9kZW1haWxlciIsInJlcXVpcmUiLCJzZW5kIiwic2VuZEluZm8iLCJ0cmFuc3BvcnRlciIsImNyZWF0ZVRyYW5zcG9ydCIsImhvc3QiLCJwb3J0Iiwic2VjdXJlIiwiYXV0aCIsInVzZXIiLCJwYXNzIiwidXJsIiwiaW5mbyIsInNlbmRNYWlsIiwiZnJvbSIsInRvIiwiZW1haWwiLCJzdWJqZWN0IiwidGV4dCIsImNvZGUiLCJleHBpcmUiLCJodG1sIiwiZGF0YSIsInVzZXJuYW1lIiwibWVzc2FnZUlkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/config/MailConfig.js\n");

/***/ }),

/***/ "./src/config/RedisConfig.js":
/*!***********************************!*\
  !*** ./src/config/RedisConfig.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"client\": () => (/* binding */ client),\n/* harmony export */   \"setValue\": () => (/* binding */ setValue),\n/* harmony export */   \"getValue\": () => (/* binding */ getValue),\n/* harmony export */   \"getHValue\": () => (/* binding */ getHValue),\n/* harmony export */   \"delValue\": () => (/* binding */ delValue)\n/* harmony export */ });\n/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redis */ \"redis\");\n/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redis__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bluebird */ \"bluebird\");\n/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ \"./src/config/index.js\");\n // import bluebird from 'bluebird'\n\n\n\nconst options = {\n  host: _index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].REDIS.host,\n  port: _index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].REDIS.port,\n  password: _index__WEBPACK_IMPORTED_MODULE_2__[\"default\"].REDIS.password,\n  detect_buffers: true,\n  retry_strategy: function (options) {\n    if (options.error && options.error.code === \"ECONNREFUSED\") {\n      return new Error(\"The server refused the connection\");\n    }\n\n    if (options.total_retry_time > 1000 * 60 * 60) {\n      return new Error(\"Retry time exhausted\");\n    }\n\n    if (options.attempt > 10) {\n      return undefined;\n    } // reconnect after\n\n\n    return Math.min(options.attempt * 100, 3000);\n  }\n}; // const client = redis.createClient(options);\n\nconst client = (0,bluebird__WEBPACK_IMPORTED_MODULE_1__.promisifyAll)(redis__WEBPACK_IMPORTED_MODULE_0___default().createClient(options));\nclient.on('error', err => {\n  console.log('Redis Client Error: ' + err);\n});\n\nconst setValue = (key, value, time) => {\n  if (typeof value === 'undefined' || value === null || value === '') {\n    return;\n  }\n\n  if (typeof value === 'string') {\n    if (typeof time !== 'undefined') {\n      client.set(key, value, 'EX', time);\n    } else {\n      client.set(key, value);\n    }\n  } else if (typeof value === 'object') {\n    Object.keys(value).forEach(item => {\n      return client.hset(key, item, value[item], (redis__WEBPACK_IMPORTED_MODULE_0___default().print));\n    });\n  }\n};\n\nconst getValue = key => {\n  return client.getAsync(key);\n};\n\nconst getHValue = key => {\n  return client.hgetallAsync(key);\n};\n\nconst delValue = key => {\n  client.del(key, (err, res) => {\n    if (res === 1) {\n      console.log('delete successfully');\n    } else {\n      console.log('delete redis key error: ' + err);\n    }\n  });\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVosRUFBZTtBQUNYbkIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQVo7QUFDSCxLQUZELE1BRU87QUFDSEQsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksNkJBQTZCRixHQUF6QztBQUNIO0FBQ0osR0FORDtBQU9ILENBUkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rb2EtMS8uL3NyYy9jb25maWcvUmVkaXNDb25maWcuanM/Yjc4OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVkaXMgZnJvbSAncmVkaXMnXG4vLyBpbXBvcnQgYmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnXG5pbXBvcnQgeyBwcm9taXNpZnlBbGwgfSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCBjb25maWcgZnJvbSAnLi9pbmRleCdcblxuXG5jb25zdCBvcHRpb25zID0ge1xuICAgIGhvc3Q6IGNvbmZpZy5SRURJUy5ob3N0LFxuICAgIHBvcnQ6IGNvbmZpZy5SRURJUy5wb3J0LFxuICAgIHBhc3N3b3JkOiBjb25maWcuUkVESVMucGFzc3dvcmQsXG4gICAgZGV0ZWN0X2J1ZmZlcnM6IHRydWUsXG4gICAgcmV0cnlfc3RyYXRlZ3k6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZXJyb3IgJiYgb3B0aW9ucy5lcnJvci5jb2RlID09PSBcIkVDT05OUkVGVVNFRFwiKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIlRoZSBzZXJ2ZXIgcmVmdXNlZCB0aGUgY29ubmVjdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy50b3RhbF9yZXRyeV90aW1lID4gMTAwMCAqIDYwICogNjApIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiUmV0cnkgdGltZSBleGhhdXN0ZWRcIilcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5hdHRlbXB0ID4gMTApIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlY29ubmVjdCBhZnRlclxuICAgICAgICByZXR1cm4gTWF0aC5taW4ob3B0aW9ucy5hdHRlbXB0ICogMTAwLCAzMDAwKVxuICAgICAgfSxcbn1cblxuXG4vLyBjb25zdCBjbGllbnQgPSByZWRpcy5jcmVhdGVDbGllbnQob3B0aW9ucyk7XG5jb25zdCBjbGllbnQgPSBwcm9taXNpZnlBbGwocmVkaXMuY3JlYXRlQ2xpZW50KG9wdGlvbnMpKVxuXG5jbGllbnQub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdSZWRpcyBDbGllbnQgRXJyb3I6ICcgKyBlcnIpXG59KVxuXG5jb25zdCBzZXRWYWx1ZSA9IChrZXksIHZhbHVlLCB0aW1lKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIHRpbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjbGllbnQuc2V0KGtleSwgdmFsdWUsICdFWCcsIHRpbWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGllbnQuc2V0KGtleSwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNsaWVudC5oc2V0KGtleSwgaXRlbSwgdmFsdWVbaXRlbV0sIHJlZGlzLnByaW50KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuY29uc3QgZ2V0VmFsdWUgPSAoa2V5KSA9PiB7XG4gICAgcmV0dXJuIGNsaWVudC5nZXRBc3luYyhrZXkpXG59XG5cbmNvbnN0IGdldEhWYWx1ZSA9IChrZXkpID0+IHtcbiAgICByZXR1cm4gY2xpZW50LmhnZXRhbGxBc3luYyhrZXkpXG59XG5cbmNvbnN0IGRlbFZhbHVlID0gKGtleSkgPT4ge1xuICAgIGNsaWVudC5kZWwoa2V5LCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcyA9PT0gMSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZSBzdWNjZXNzZnVsbHknKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZSByZWRpcyBrZXkgZXJyb3I6ICcgKyBlcnIpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5leHBvcnQge1xuICAgIGNsaWVudCxcbiAgICBzZXRWYWx1ZSxcbiAgICBnZXRWYWx1ZSxcbiAgICBnZXRIVmFsdWUsXG4gICAgZGVsVmFsdWVcbn0iXSwibmFtZXMiOlsicmVkaXMiLCJwcm9taXNpZnlBbGwiLCJjb25maWciLCJvcHRpb25zIiwiaG9zdCIsIlJFRElTIiwicG9ydCIsInBhc3N3b3JkIiwiZGV0ZWN0X2J1ZmZlcnMiLCJyZXRyeV9zdHJhdGVneSIsImVycm9yIiwiY29kZSIsIkVycm9yIiwidG90YWxfcmV0cnlfdGltZSIsImF0dGVtcHQiLCJ1bmRlZmluZWQiLCJNYXRoIiwibWluIiwiY2xpZW50IiwiY3JlYXRlQ2xpZW50Iiwib24iLCJlcnIiLCJjb25zb2xlIiwibG9nIiwic2V0VmFsdWUiLCJrZXkiLCJ2YWx1ZSIsInRpbWUiLCJzZXQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsIml0ZW0iLCJoc2V0IiwicHJpbnQiLCJnZXRWYWx1ZSIsImdldEFzeW5jIiwiZ2V0SFZhbHVlIiwiaGdldGFsbEFzeW5jIiwiZGVsVmFsdWUiLCJkZWwiLCJyZXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/config/RedisConfig.js\n");

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DB_URL = 'mongodb://test:123456@139.196.76.59:27017/testdb';\nconst REDIS = {\n  host: '139.196.76.59',\n  port: 15001,\n  password: '123456'\n};\nconst JWT_SECRET = '5wvN0CqgJfIdJQ76TfgK7BMW5gEvzToL2MwCyRyaKdY';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  DB_URL,\n  REDIS,\n  JWT_SECRET\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29uZmlnL2luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxNQUFNLEdBQUcsa0RBQWY7QUFDQSxNQUFNQyxLQUFLLEdBQUc7QUFDVkMsRUFBQUEsSUFBSSxFQUFFLGVBREk7QUFFVkMsRUFBQUEsSUFBSSxFQUFFLEtBRkk7QUFHVkMsRUFBQUEsUUFBUSxFQUFFO0FBSEEsQ0FBZDtBQU1BLE1BQU1DLFVBQVUsR0FBRyw2Q0FBbkI7QUFFQSxpRUFBZTtBQUNYTCxFQUFBQSxNQURXO0FBRVhDLEVBQUFBLEtBRlc7QUFHWEksRUFBQUE7QUFIVyxDQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29hLTEvLi9zcmMvY29uZmlnL2luZGV4LmpzP2YxMjEiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgREJfVVJMID0gJ21vbmdvZGI6Ly90ZXN0OjEyMzQ1NkAxMzkuMTk2Ljc2LjU5OjI3MDE3L3Rlc3RkYidcbmNvbnN0IFJFRElTID0ge1xuICAgIGhvc3Q6ICcxMzkuMTk2Ljc2LjU5JyxcbiAgICBwb3J0OiAxNTAwMSxcbiAgICBwYXNzd29yZDogJzEyMzQ1Nidcbn1cblxuY29uc3QgSldUX1NFQ1JFVCA9ICc1d3ZOMENxZ0pmSWRKUTc2VGZnSzdCTVc1Z0V2elRvTDJNd0N5UnlhS2RZJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgREJfVVJMLFxuICAgIFJFRElTLFxuICAgIEpXVF9TRUNSRVRcbn0iXSwibmFtZXMiOlsiREJfVVJMIiwiUkVESVMiLCJob3N0IiwicG9ydCIsInBhc3N3b3JkIiwiSldUX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/config/index.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("var __dirname = \"src\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-jwt */ \"koa-jwt\");\n/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_jwt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var koa_helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-helmet */ \"koa-helmet\");\n/* harmony import */ var koa_helmet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_helmet__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-static */ \"koa-static\");\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _routes_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/routes */ \"./src/routes/routes.js\");\n/* harmony import */ var koa_body__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! koa-body */ \"koa-body\");\n/* harmony import */ var koa_body__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(koa_body__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @koa/cors */ \"@koa/cors\");\n/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_koa_cors__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var koa_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! koa-json */ \"koa-json\");\n/* harmony import */ var koa_json__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(koa_json__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var koa_compress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! koa-compress */ \"koa-compress\");\n/* harmony import */ var koa_compress__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(koa_compress__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var koa_compose__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! koa-compose */ \"koa-compose\");\n/* harmony import */ var koa_compose__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(koa_compose__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./config */ \"./src/config/index.js\");\n/* harmony import */ var _common_ErrorHandle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common/ErrorHandle */ \"./src/common/ErrorHandle.js\");\n// const koa = require('koa');\n// const path = require('path');\n// const helmet = require('koa-helmet');   // 增加安全请求头中间件\n// const koaBody = require('koa-body');    // 格式化body体中间件\n// const cors = require('@koa/cors');      // 跨域中间件\n// const json = require('koa-json');       // json格式话中间件\n// const serve = require('koa-static');    // 静态资源中间件\n// es6语法\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst isDevMode =  false ? 0 : true;\nconst app = new (koa__WEBPACK_IMPORTED_MODULE_1___default())();\nconst jwt = koa_jwt__WEBPACK_IMPORTED_MODULE_2___default()({\n  secret: _config__WEBPACK_IMPORTED_MODULE_11__[\"default\"].JWT_SECRET\n}).unless({\n  path: [/^\\/public/, /^\\/login/]\n});\n/**\n * 使用koa-compose 集成中间件\n */\n\nconst middleware = koa_compose__WEBPACK_IMPORTED_MODULE_10___default()([koa_body__WEBPACK_IMPORTED_MODULE_6___default()(), koa_static__WEBPACK_IMPORTED_MODULE_4___default()(path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, '../public')), _koa_cors__WEBPACK_IMPORTED_MODULE_7___default()(), koa_json__WEBPACK_IMPORTED_MODULE_8___default()({\n  pretty: false,\n  param: 'pretty'\n}), koa_helmet__WEBPACK_IMPORTED_MODULE_3___default()(), _common_ErrorHandle__WEBPACK_IMPORTED_MODULE_12__[\"default\"], jwt]); // koa洋葱模型先进后出\n\nif (!isDevMode) {\n  app.use(koa_compress__WEBPACK_IMPORTED_MODULE_9___default()());\n}\n\napp.use(middleware);\napp.use((0,_routes_routes__WEBPACK_IMPORTED_MODULE_5__[\"default\"])());\napp.listen(9000);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLE1BQU1hLFNBQVMsR0FBR0MsTUFBQSxHQUF3QyxDQUF4QyxHQUFnRCxJQUFsRTtBQUVBLE1BQU1HLEdBQUcsR0FBRyxJQUFJaEIsNENBQUosRUFBWjtBQUVBLE1BQU1pQixHQUFHLEdBQUdoQiw4Q0FBRyxDQUFDO0FBQUVpQixFQUFBQSxNQUFNLEVBQUVSLDJEQUFpQlM7QUFBM0IsQ0FBRCxDQUFILENBQW1DQyxNQUFuQyxDQUEwQztBQUFFckIsRUFBQUEsSUFBSSxFQUFFLENBQUMsV0FBRCxFQUFjLFVBQWQ7QUFBUixDQUExQyxDQUFaO0FBRUE7QUFDQTtBQUNBOztBQUNBLE1BQU1zQixVQUFVLEdBQUdaLG1EQUFPLENBQUMsQ0FDdkJKLCtDQUFPLEVBRGdCLEVBRXZCRixpREFBTyxDQUFDSixnREFBQSxDQUFVd0IsU0FBVixFQUFxQixXQUFyQixDQUFELENBRmdCLEVBR3ZCakIsZ0RBQUksRUFIbUIsRUFJdkJDLCtDQUFRLENBQUM7QUFBRWlCLEVBQUFBLE1BQU0sRUFBRSxLQUFWO0FBQWlCQyxFQUFBQSxLQUFLLEVBQUU7QUFBeEIsQ0FBRCxDQUplLEVBS3ZCdkIsaURBQU0sRUFMaUIsRUFNdkJTLDREQU51QixFQU92Qk0sR0FQdUIsQ0FBRCxDQUExQixFQVVBOztBQUNBLElBQUksQ0FBQ0wsU0FBTCxFQUFnQjtBQUNaSSxFQUFBQSxHQUFHLENBQUNVLEdBQUosQ0FBUWxCLG1EQUFRLEVBQWhCO0FBQ0g7O0FBRURRLEdBQUcsQ0FBQ1UsR0FBSixDQUFRTCxVQUFSO0FBQ0FMLEdBQUcsQ0FBQ1UsR0FBSixDQUFRdEIsMERBQU0sRUFBZDtBQUlBWSxHQUFHLENBQUNXLE1BQUosQ0FBVyxJQUFYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29hLTEvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCBrb2EgPSByZXF1aXJlKCdrb2EnKTtcbi8vIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4vLyBjb25zdCBoZWxtZXQgPSByZXF1aXJlKCdrb2EtaGVsbWV0Jyk7ICAgLy8g5aKe5Yqg5a6J5YWo6K+35rGC5aS05Lit6Ze05Lu2XG4vLyBjb25zdCBrb2FCb2R5ID0gcmVxdWlyZSgna29hLWJvZHknKTsgICAgLy8g5qC85byP5YyWYm9keeS9k+S4remXtOS7tlxuLy8gY29uc3QgY29ycyA9IHJlcXVpcmUoJ0Brb2EvY29ycycpOyAgICAgIC8vIOi3qOWfn+S4remXtOS7tlxuLy8gY29uc3QganNvbiA9IHJlcXVpcmUoJ2tvYS1qc29uJyk7ICAgICAgIC8vIGpzb27moLzlvI/or53kuK3pl7Tku7Zcbi8vIGNvbnN0IHNlcnZlID0gcmVxdWlyZSgna29hLXN0YXRpYycpOyAgICAvLyDpnZnmgIHotYTmupDkuK3pl7Tku7ZcblxuLy8gZXM26K+t5rOVXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBrb2EgZnJvbSAna29hJztcbmltcG9ydCBKV1QgIGZyb20gJ2tvYS1qd3QnO1xuaW1wb3J0IGhlbG1ldCBmcm9tICdrb2EtaGVsbWV0JztcbmltcG9ydCBzdGF0aWNzIGZyb20gJ2tvYS1zdGF0aWMnO1xuaW1wb3J0IHJvdXRlciBmcm9tICcuL3JvdXRlcy9yb3V0ZXMnO1xuaW1wb3J0IGtvYUJvZHkgZnJvbSAna29hLWJvZHknO1xuaW1wb3J0IGNvcnMgZnJvbSAnQGtvYS9jb3JzJztcbmltcG9ydCBqc29uVXRpbCBmcm9tICdrb2EtanNvbic7XG5pbXBvcnQgY29tcHJlc3MgZnJvbSAna29hLWNvbXByZXNzJztcbmltcG9ydCBjb21wb3NlIGZyb20gJ2tvYS1jb21wb3NlJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IGVycm9ySGFuZGxlIGZyb20gJy4vY29tbW9uL0Vycm9ySGFuZGxlJztcblxuY29uc3QgaXNEZXZNb2RlID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyA/IGZhbHNlIDogdHJ1ZVxuXG5jb25zdCBhcHAgPSBuZXcga29hKCk7XG5cbmNvbnN0IGp3dCA9IEpXVCh7IHNlY3JldDogY29uZmlnLkpXVF9TRUNSRVQgfSkudW5sZXNzKHsgcGF0aDogWy9eXFwvcHVibGljLywgL15cXC9sb2dpbi9dIH0pXG5cbi8qKlxuICog5L2/55Soa29hLWNvbXBvc2Ug6ZuG5oiQ5Lit6Ze05Lu2XG4gKi9cbmNvbnN0IG1pZGRsZXdhcmUgPSBjb21wb3NlKFtcbiAgICBrb2FCb2R5KCksXG4gICAgc3RhdGljcyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vcHVibGljJykpLFxuICAgIGNvcnMoKSxcbiAgICBqc29uVXRpbCh7IHByZXR0eTogZmFsc2UsIHBhcmFtOiAncHJldHR5JyB9KSxcbiAgICBoZWxtZXQoKSxcbiAgICBlcnJvckhhbmRsZSxcbiAgICBqd3Rcbl0pXG5cbi8vIGtvYea0i+iRseaooeWei+WFiOi/m+WQjuWHulxuaWYgKCFpc0Rldk1vZGUpIHtcbiAgICBhcHAudXNlKGNvbXByZXNzKCkpO1xufVxuXG5hcHAudXNlKG1pZGRsZXdhcmUpO1xuYXBwLnVzZShyb3V0ZXIoKSk7XG5cblxuXG5hcHAubGlzdGVuKDkwMDApO1xuXG5cblxuIl0sIm5hbWVzIjpbInBhdGgiLCJrb2EiLCJKV1QiLCJoZWxtZXQiLCJzdGF0aWNzIiwicm91dGVyIiwia29hQm9keSIsImNvcnMiLCJqc29uVXRpbCIsImNvbXByZXNzIiwiY29tcG9zZSIsImNvbmZpZyIsImVycm9ySGFuZGxlIiwiaXNEZXZNb2RlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiYXBwIiwiand0Iiwic2VjcmV0IiwiSldUX1NFQ1JFVCIsInVubGVzcyIsIm1pZGRsZXdhcmUiLCJqb2luIiwiX19kaXJuYW1lIiwicHJldHR5IiwicGFyYW0iLCJ1c2UiLCJsaXN0ZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/model/User.js":
/*!***************************!*\
  !*** ./src/model/User.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_DBHelpler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/DBHelpler */ \"./src/config/DBHelpler.js\");\n\nconst Schema = _config_DBHelpler__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Schema;\nconst UserSchema = new Schema({\n  'username': {\n    type: String\n  },\n  'nickname': {\n    type: String\n  },\n  'password': {\n    type: String\n  }\n});\nconst UserModel = _config_DBHelpler__WEBPACK_IMPORTED_MODULE_0__[\"default\"].model('users', UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserModel);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZWwvVXNlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBRUEsTUFBTUMsTUFBTSxHQUFHRCxnRUFBZjtBQUVBLE1BQU1FLFVBQVUsR0FBRyxJQUFJRCxNQUFKLENBQVc7QUFDMUIsY0FBWTtBQUFFRSxJQUFBQSxJQUFJLEVBQUVDO0FBQVIsR0FEYztBQUUxQixjQUFZO0FBQUVELElBQUFBLElBQUksRUFBRUM7QUFBUixHQUZjO0FBRzFCLGNBQVk7QUFBRUQsSUFBQUEsSUFBSSxFQUFFQztBQUFSO0FBSGMsQ0FBWCxDQUFuQjtBQU9BLE1BQU1DLFNBQVMsR0FBR0wsK0RBQUEsQ0FBZSxPQUFmLEVBQXdCRSxVQUF4QixDQUFsQjtBQUVBLGlFQUFlRyxTQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29hLTEvLi9zcmMvbW9kZWwvVXNlci5qcz83NmZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwiLi4vY29uZmlnL0RCSGVscGxlclwiO1xuXG5jb25zdCBTY2hlbWEgPSBtb25nb29zZS5TY2hlbWFcblxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICAgICd1c2VybmFtZSc6IHsgdHlwZTogU3RyaW5nfSxcbiAgICAnbmlja25hbWUnOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICdwYXNzd29yZCc6IHsgdHlwZTogU3RyaW5nfVxufSlcblxuXG5jb25zdCBVc2VyTW9kZWwgPSBtb25nb29zZS5tb2RlbCgndXNlcnMnLCBVc2VyU2NoZW1hKTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlck1vZGVsIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwiVXNlclNjaGVtYSIsInR5cGUiLCJTdHJpbmciLCJVc2VyTW9kZWwiLCJtb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/model/User.js\n");

/***/ }),

/***/ "./src/routes/loginRouter.js":
/*!***********************************!*\
  !*** ./src/routes/loginRouter.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_loginController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/loginController.js */ \"./src/api/loginController.js\");\n\n\nconst router = new (koa_router__WEBPACK_IMPORTED_MODULE_0___default())();\nrouter.prefix('/login');\nrouter.post('/forget', _api_loginController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].forget);\nrouter.post('/login', _api_loginController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].login);\nrouter.post('/register', _api_loginController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVzL2xvZ2luUm91dGVyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBRUEsTUFBTUUsTUFBTSxHQUFHLElBQUlGLG1EQUFKLEVBQWY7QUFFQUUsTUFBTSxDQUFDQyxNQUFQLENBQWMsUUFBZDtBQUNBRCxNQUFNLENBQUNFLElBQVAsQ0FBWSxTQUFaLEVBQXVCSCxzRUFBdkI7QUFDQUMsTUFBTSxDQUFDRSxJQUFQLENBQVksUUFBWixFQUFzQkgscUVBQXRCO0FBQ0FDLE1BQU0sQ0FBQ0UsSUFBUCxDQUFZLFdBQVosRUFBeUJILHdFQUF6QjtBQUVBLGlFQUFlQyxNQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29hLTEvLi9zcmMvcm91dGVzL2xvZ2luUm91dGVyLmpzPzNkZDEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlciBmcm9tICdrb2Etcm91dGVyJ1xuaW1wb3J0IGxvZ2luQ29udHJvbGxlciBmcm9tICcuLi9hcGkvbG9naW5Db250cm9sbGVyLmpzJ1xuXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKClcblxucm91dGVyLnByZWZpeCgnL2xvZ2luJylcbnJvdXRlci5wb3N0KCcvZm9yZ2V0JywgbG9naW5Db250cm9sbGVyLmZvcmdldClcbnJvdXRlci5wb3N0KCcvbG9naW4nLCBsb2dpbkNvbnRyb2xsZXIubG9naW4pXG5yb3V0ZXIucG9zdCgnL3JlZ2lzdGVyJywgbG9naW5Db250cm9sbGVyLnJlZ2lzdGVyKVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXIiXSwibmFtZXMiOlsiUm91dGVyIiwibG9naW5Db250cm9sbGVyIiwicm91dGVyIiwicHJlZml4IiwicG9zdCIsImZvcmdldCIsImxvZ2luIiwicmVnaXN0ZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/routes/loginRouter.js\n");

/***/ }),

/***/ "./src/routes/publicRouter.js":
/*!************************************!*\
  !*** ./src/routes/publicRouter.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_publicController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/publicController.js */ \"./src/api/publicController.js\");\n\n\nconst router = new (koa_router__WEBPACK_IMPORTED_MODULE_0___default())();\nrouter.prefix('/public');\nrouter.get('/getCaptcha', _api_publicController_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].captcha);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVzL3B1YmxpY1JvdXRlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFFQTtBQUVBLE1BQU1FLE1BQU0sR0FBRyxJQUFJRixtREFBSixFQUFmO0FBRUFFLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLFNBQWQ7QUFDQUQsTUFBTSxDQUFDRSxHQUFQLENBQVcsYUFBWCxFQUEwQkgsd0VBQTFCO0FBR0EsaUVBQWVDLE1BQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rb2EtMS8uL3NyYy9yb3V0ZXMvcHVibGljUm91dGVyLmpzP2QzYzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlciBmcm9tICdrb2Etcm91dGVyJztcblxuaW1wb3J0IHB1YmxpY0NvbnRyb2xsZXIgZnJvbSAnLi4vYXBpL3B1YmxpY0NvbnRyb2xsZXIuanMnO1xuXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG5cbnJvdXRlci5wcmVmaXgoJy9wdWJsaWMnKTtcbnJvdXRlci5nZXQoJy9nZXRDYXB0Y2hhJywgcHVibGljQ29udHJvbGxlci5jYXB0Y2hhKTtcblxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iXSwibmFtZXMiOlsiUm91dGVyIiwicHVibGljQ29udHJvbGxlciIsInJvdXRlciIsInByZWZpeCIsImdldCIsImNhcHRjaGEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/routes/publicRouter.js\n");

/***/ }),

/***/ "./src/routes/routes.js":
/*!******************************!*\
  !*** ./src/routes/routes.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var koa_combine_routers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-combine-routers */ \"koa-combine-routers\");\n/* harmony import */ var koa_combine_routers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_combine_routers__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _publicRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./publicRouter */ \"./src/routes/publicRouter.js\");\n/* harmony import */ var _loginRouter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loginRouter */ \"./src/routes/loginRouter.js\");\n // 路由压缩中间件\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (koa_combine_routers__WEBPACK_IMPORTED_MODULE_0___default()(_publicRouter__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _loginRouter__WEBPACK_IMPORTED_MODULE_2__[\"default\"]));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcm91dGVzL3JvdXRlcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztDQUFrRDs7QUFDbEQ7QUFDQTtBQUVBLGlFQUFlQSwwREFBYSxDQUN4QkMscURBRHdCLEVBRXhCQyxvREFGd0IsQ0FBNUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rb2EtMS8uL3NyYy9yb3V0ZXMvcm91dGVzLmpzPzY0MWIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbWJpbmVSb3V0ZXMgZnJvbSAna29hLWNvbWJpbmUtcm91dGVycycgICAvLyDot6/nlLHljovnvKnkuK3pl7Tku7ZcbmltcG9ydCBwdWJsaWNSb3V0ZXIgZnJvbSAnLi9wdWJsaWNSb3V0ZXInXG5pbXBvcnQgbG9naW5Sb3V0ZXIgZnJvbSAnLi9sb2dpblJvdXRlcidcblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJvdXRlcyhcbiAgICBwdWJsaWNSb3V0ZXIsXG4gICAgbG9naW5Sb3V0ZXJcbikiXSwibmFtZXMiOlsiY29tYmluZVJvdXRlcyIsInB1YmxpY1JvdXRlciIsImxvZ2luUm91dGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/routes/routes.js\n");

/***/ }),

/***/ "@koa/cors":
/*!****************************!*\
  !*** external "@koa/cors" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("@koa/cors");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bluebird");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("koa");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("koa-body");

/***/ }),

/***/ "koa-combine-routers":
/*!**************************************!*\
  !*** external "koa-combine-routers" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("koa-combine-routers");

/***/ }),

/***/ "koa-compose":
/*!******************************!*\
  !*** external "koa-compose" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("koa-compose");

/***/ }),

/***/ "koa-compress":
/*!*******************************!*\
  !*** external "koa-compress" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("koa-compress");

/***/ }),

/***/ "koa-helmet":
/*!*****************************!*\
  !*** external "koa-helmet" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("koa-helmet");

/***/ }),

/***/ "koa-json":
/*!***************************!*\
  !*** external "koa-json" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("koa-json");

/***/ }),

/***/ "koa-jwt":
/*!**************************!*\
  !*** external "koa-jwt" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("koa-jwt");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("koa-router");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("koa-static");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/***/ ((module) => {

module.exports = require("redis");

/***/ }),

/***/ "svg-captcha":
/*!******************************!*\
  !*** external "svg-captcha" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("svg-captcha");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;