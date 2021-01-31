const crypto = require('crypto');
const AlgorithmEnum = require('../enums/Algorithm');

class UserService {
	constructor(userModel) {
		this.userModel = userModel;
	}

	async create(item) {
    const dataToInsert = item;
    dataToInsert.password = crypto
      .createHmac(AlgorithmEnum.SHA_256, item.password)
      .digest('hex');

    return this.userModel
        .scope('create')
        .create(dataToInsert);
  }

  async findWithCredentials(email, password) {
    const query = {
        email, password: crypto.createHmac(AlgorithmEnum.SHA_256, password).digest('hex'), active: true
    };

    return this.userModel
        .scope('find')
        .findOne({
            where: query,
        });
  }

}

module.exports = UserService;
