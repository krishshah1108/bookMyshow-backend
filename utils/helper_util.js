import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import moment from 'moment-timezone';

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRES_IN_DAYS}d` });
};

export const otpSender = async (mobileNo, otp) => {
  try {
    const link = process.env.SMS_LINK;
    const payload = {
      flow_id: process.env.SMS_FLOW_ID,
      sender: process.env.SMS_SENDER,
      mobiles: `91${mobileNo}`,
      OTP: otp.toString()
    };
    
    const apiResponse = await superagent.post(link).send(payload).set('authkey', process.env.SMS_AUTHKEY).set('accept', 'json');
    if (apiResponse.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
    
  } catch (error) {
    console.log(`Ereror in sending OTP: ${error}`);
  }
};


export const convertDateToLocal = (date) => moment(date).tz('Asia/Kolkata');
