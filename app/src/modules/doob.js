const sqlite3 = require('sqlite3').verbose();

/**
 * 插入数据
 * @method insert
 * @param  {Object} db     数据库对象
 * @param  {String} tb     表名
 * @param  {}       values 解构值
 */
const insert = (db, tb, ...values) => {
  let $insert = '';
  let $values = [];
  // console.log(values);
  for (let i = 0; i < values.length; i++) {
    i === 0 ? $insert = '?' : $insert += ', ?';
    $values.push(values[i]);
  }
  // console.log(`INSERT INTO ${tb} VALUES (${$insert});`);
  // console.log($values);
  db.run(`INSERT INTO ${tb} VALUES (${$insert});`, $values);
};

/**
 * 删除表
 * @method drop
 * @param  {Object} db 数据库对象
 * @param  {String} tb 表名
 */
const drop = (db, tb) => {
  db.run(`DROP TABLE ${tb};`);
}

/**
 * 删除数据
 * @method deprecate
 * @param  {Object} db        数据库对象
 * @param  {String} tb        表名
 * @param  {String} condition 条件
 */
const deprecate = (db, tb, condition) => {
  db.run(`DELETE FROM ${tb} WHERE ${condition};`)
}

/**
 * 更新数据
 * @method update
 * @param  {Object} db        数据库对象
 * @param  {String} tb        表名
 * @param  {String} key       键名
 * @param  {String} value     值
 * @param  {String} condition 条件
 */
const update = (db, tb, key, value, condition) => {
  db.run(`UPDATE ${tb} SET ${key} = ${value} WHERE ${condition};`)
}

export default {
  insert: insert,
  drop: drop,
  delete: deprecate,
  update: update,
};
