/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema

    .createTable("Order", (table) => {
      table.string("orderId").primary();
      table.integer("value").notNullable();
      table.timestamp("creationDate").notNullable();
    })

    .createTable("Items", (table) => {
      table.increments("id").primary();

      table.string("orderId").notNullable();
      table.integer("productId").notNullable();
      table.integer("quantity").notNullable();
      table.integer("price").notNullable();

      table
        .foreign("orderId")
        .references("orderId")
        .inTable("Order")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("Items")
    .dropTableIfExists("Order");
};
