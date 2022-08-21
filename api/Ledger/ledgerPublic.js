import * as sequelize from "sequelize";
import db from "../../db/db";

const getLedgetSelect = async function (model) {
  let sql = `select * from ledger where create_openid = :create_openid and create_userid=:create_userid and ledger_isSelected=1`;

  return await db.pool.query(sql, {
    replacements: {
        create_openid:model.openid,
        create_userid:model.id
    },
    type: sequelize.QueryTypes.SELECT,
  });
};

module.exports = {
    getLedgetSelect,
};
