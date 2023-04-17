const axios = require('axios');
const crypto = require('crypto');

const apiKey = "lonxskd9ohT7NMqpCVG13tluWGOaPcGP70Hr1fpX";
const privateKey = "pfp0N-YhUsB-rgfbI-m7SEB-c0x3H";

const merchant_code = "T0001";
const merchant_ref = "INV345675";
const demo_mode = '0';

function requestDepo(amount,method) {
  var signature = crypto.createHmac('sha256', privateKey).update(merchant_code + merchant_ref + amount).digest('hex');
  var data = {
    'method': method,
    'merchant_ref': merchant_ref,
    'amount': amount,
    'customer_name': 'AryaManik',
    'customer_email': 'aryamanik104@gmail.com',
    'order_items': [{
      'name': 'DEPOSIT BOT '+amount,
      'price': amount,
      'quantity': 1
    }],
    'return_url': `https://wa.me/6285737134572`,
    'signature': signature
  }
  axios.post((demo_mode === '1') ? 'https://tripay.co.id/api-sandbox/transaction/create' : 'https://tripay.co.id/api/transaction/create', payload, {
    headers: {
      'Authorization': 'Bearer ' + apiKey
    },
    validateStatus: function (status) {
      return status < 999;
    }
  })
  .then((res) => {
    return res;
  })
  .catch((error) => {
    console.error(error)
  });
}
