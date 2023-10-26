'use strict';

const helper = {
  formatToDollar: (num) => {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  }
}

module.exports = helper;