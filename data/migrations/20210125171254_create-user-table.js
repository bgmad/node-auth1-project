
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('userId');
        tbl.text('username')
            .notNullable();
        tbl.text('password')
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
