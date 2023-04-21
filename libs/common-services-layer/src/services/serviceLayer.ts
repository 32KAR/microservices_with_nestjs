import moment = require('moment-timezone');
import { Op } from 'sequelize';

export function Filter(
  startDate: Date,
  endDate: Date,
  role: string,
  status: number,
  searchBar: string
) {
  const search: any = { is_deleted: 0 };
  const value: any = { is_deleted: 0 };

  if (startDate) {
    search.createdAt = {
      [Op.gte]: moment(startDate).format('YYYY-MM-DD'),
    };
  }

  if (endDate) {
    search.createdAt = { [Op.lte]: moment(endDate).format('YYYY-MM-DD') };
  }

  if (startDate && endDate) {
    search.createdAt = {
      [Op.and]: {
        [Op.gte]: moment(startDate).format('YYYY-MM-DD'),
        [Op.lte]: moment(endDate).format('YYYY-MM-DD'),
      },
    };
  }

  if (status) {
    search.status = status;
  }

  if (role) {
    value.role = role;
  }

  if (searchBar) {
    const orArray: any = [];

    orArray.push(
      { first_name: { [Op.like]: `%${searchBar}%` } },
      { last_name: { [Op.like]: `%${searchBar}%` } },
      { email_id: { [Op.like]: `%${searchBar}%` } },
      { gender: { [Op.like]: `%${searchBar}%` } },
      { role: { [Op.like]: `%${searchBar}%` } }
    );
    search[Op.or] = orArray;
  }

  return {
    search,
    value,
  };
}
