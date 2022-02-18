
// import nodemailer from 'nodemailer'
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function send(sendInfo) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '991710786@qq.com', // generated ethereal user
      pass: 'lsqfqtdokvlzbcbe', // generated ethereal password
    },
  });

//   let sendInfo = {
//       code: '1234',
//       expire: '2022-01-01',
//       email: '991710786@qq.com',
//       user: 'zzy'
//   }
    let url = 'http://www.imooc.com'

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '认证邮件 👻 <991710786@qq.com>', // sender address
    to: sendInfo.email, // list of receivers
    subject: sendInfo.user !== '' ? `你好开发者，${sendInfo.user}, 大前端实践注册码` : '注册码', // Subject line
    text: `你的注册码是${sendInfo.code}, 过期时间是${sendInfo.expire}`, // plain text body
    html: `<div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
    <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">Imooc社区——欢迎来到官方社区</div>
    <div style="padding: 25px">
      <div>您好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${
  sendInfo.expire
  }之前${sendInfo.code ? '重置您的密码' : '修改您的邮箱为：' + sendInfo.data.username}：</div>
      <a href="${url}" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">${sendInfo.code ? '立即重置密码' : '确认设置邮箱'}</a>
      <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>
    </div>
    <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>
</div>`, // html body
  });

  return 'Message sent: %s', info.messageId
//   console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// send().catch(console.error);

export default send