'use strict'

const BillingModel = require('../models/billing');

exports.getBillings = async (req, res, next) => {
    const billingModel = new BillingModel();
    let billings = [];

    try {
        billings = await billingModel.getAll();
    } catch (error) {
        return next(new Error('Error getting billing list.'))
    }

    return res.status(200).send(billings);
}
