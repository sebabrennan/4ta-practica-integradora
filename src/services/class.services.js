export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async() => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  getById = async(id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (obj) => {
    try {
      return await this.dao.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, obj) => {
    try {
      return await this.dao.update(id, obj);
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async(id) => {
    try {
      return await this.dao.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}